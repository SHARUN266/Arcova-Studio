import { NextResponse } from "next/server";
import { generateBlogWithGemini } from "@/lib/gemini";
import { CITIES, SERVICES } from "@/lib/seo-data";
import { sql, initBlogTable } from "@/lib/db";

/**
 * Cron endpoint for automated blog generation.
 * Called by Vercel Cron on Mon/Wed/Fri at 6:00 AM IST.
 * 
 * Secured with CRON_SECRET environment variable.
 */
export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.POSTGRES_URL) {
    return NextResponse.json({ error: "POSTGRES_URL not configured" }, { status: 500 });
  }

  try {
    await initBlogTable();

    // Pick random city and service
    const city = CITIES[Math.floor(Math.random() * CITIES.length)].name;
    const service = SERVICES[Math.floor(Math.random() * SERVICES.length)].name;

    // Generate blog post
    const newPost = await generateBlogWithGemini(city, service);

    const slug = newPost.slug || newPost.title.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
    const date = new Date().toISOString().split("T")[0];

    // Save to database
    await sql`
      INSERT INTO blog_posts (slug, title, excerpt, date, read_time, category, content)
      VALUES (
        ${slug},
        ${newPost.title},
        ${newPost.excerpt},
        ${date},
        ${newPost.readTime || "5 min read"},
        ${newPost.category || "Web Development"},
        ${newPost.content}
      )
      ON CONFLICT (slug) DO NOTHING
    `;

    console.log(`[CRON] Blog generated: "${newPost.title}" for ${city} / ${service}`);

    return NextResponse.json({
      success: true,
      post: { title: newPost.title, slug, city, service },
    });
  } catch (error: any) {
    console.error("[CRON] Blog generation failed:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
