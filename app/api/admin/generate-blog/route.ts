import { NextResponse } from "next/server";
import { generateBlogWithGemini } from "@/lib/gemini";
import { CITIES, SERVICES } from "@/lib/seo-data";
import { sql, initBlogTable } from "@/lib/db";
import fs from "fs";
import path from "path";

/**
 * Generate a new AI blog post and save to Vercel Postgres (or local JSON fallback).
 */
export async function POST() {
  try {
    // 1. Randomly select city and service
    const city = CITIES[Math.floor(Math.random() * CITIES.length)].name;
    const service = SERVICES[Math.floor(Math.random() * SERVICES.length)].name;

    // 2. Generate with Gemini
    const newPost = await generateBlogWithGemini(city, service);

    const postWithMeta = {
      ...newPost,
      slug: newPost.slug || newPost.title.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-"),
      date: new Date().toISOString().split("T")[0],
    };

    // 3. Save to DB if available, else local JSON
    if (process.env.POSTGRES_URL) {
      await initBlogTable();

      await sql`
        INSERT INTO blog_posts (slug, title, excerpt, date, read_time, category, content)
        VALUES (
          ${postWithMeta.slug},
          ${postWithMeta.title},
          ${postWithMeta.excerpt},
          ${postWithMeta.date},
          ${postWithMeta.readTime || "5 min read"},
          ${postWithMeta.category || "Web Development"},
          ${postWithMeta.content}
        )
        ON CONFLICT (slug) DO NOTHING
      `;
    } else {
      // Local JSON fallback
      const filePath = path.join(process.cwd(), "data", "posts.json");
      const dirPath = path.dirname(filePath);
      if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });

      let existingPosts: any[] = [];
      if (fs.existsSync(filePath)) {
        try { existingPosts = JSON.parse(fs.readFileSync(filePath, "utf-8")); } catch { existingPosts = []; }
      }

      if (!existingPosts.some((p: any) => p.slug === postWithMeta.slug)) {
        existingPosts.unshift(postWithMeta);
        fs.writeFileSync(filePath, JSON.stringify(existingPosts, null, 2));
      }
    }

    return NextResponse.json({
      success: true,
      message: "Blog post generated and saved!",
      post: { title: postWithMeta.title, slug: postWithMeta.slug, category: postWithMeta.category },
    });
  } catch (error: any) {
    console.error("AI Generation Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "Send a POST request to trigger generation." });
}
