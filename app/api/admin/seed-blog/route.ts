import { NextResponse } from "next/server";
import { sql, initBlogTable } from "@/lib/db";
import fs from "fs";
import path from "path";

/**
 * Seed endpoint — migrates existing posts from data/posts.json into Vercel Postgres.
 * Run once after setting up the database. Protected by CRON_SECRET.
 * 
 * Usage: POST /api/admin/seed-blog (with Authorization: Bearer <CRON_SECRET>)
 */
export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.POSTGRES_URL) {
    return NextResponse.json({ error: "POSTGRES_URL not configured" }, { status: 500 });
  }

  try {
    await initBlogTable();

    // Read existing posts from JSON
    const filePath = path.join(process.cwd(), "data", "posts.json");
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ message: "No posts.json found, nothing to seed." });
    }

    const posts = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    let seeded = 0;

    for (const post of posts) {
      try {
        await sql`
          INSERT INTO blog_posts (slug, title, excerpt, date, read_time, category, content)
          VALUES (
            ${post.slug},
            ${post.title},
            ${post.excerpt},
            ${post.date},
            ${post.readTime || "5 min read"},
            ${post.category || "Web Development"},
            ${post.content}
          )
          ON CONFLICT (slug) DO NOTHING
        `;
        seeded++;
      } catch (e: any) {
        console.error(`Failed to seed: ${post.slug}`, e.message);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Seeded ${seeded} of ${posts.length} posts into Vercel Postgres.`,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
