import { sql, initBlogTable } from "@/lib/db";

// ===========================================================================
// Blog Data — Arcova Studio
// Fetches from Vercel Postgres + static fallback posts.
// ===========================================================================

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  content: string;
}

// Static posts (always available, no DB needed)
const STATIC_POSTS: BlogPost[] = [
  {
    slug: "why-every-business-in-agra-needs-a-website",
    title: "Why Every Business in Agra Needs a Website in 2026",
    excerpt:
      "Agra welcomes 6-8 million tourists annually. If your business isn't online, you're invisible to the majority of potential customers who search before they visit.",
    date: "2026-03-10",
    readTime: "5 min read",
    category: "Local Business",
    content: `## The Shift Is Already Happening

Walk through Sadar Bazaar or Fatehabad Road today, and you'll notice something: customers are checking their phones before they walk into a shop. They're comparing prices, reading reviews, and looking at photos — all before spending a single rupee.

This isn't a future prediction. It's happening right now in Agra.

## The Numbers Don't Lie

Agra welcomes **6-8 million tourists every year**. Add to that the city's own population of over 1.5 million residents, and you have a massive pool of potential customers. Here's the problem — the vast majority of them start their journey on Google, not on foot.

When someone types "best marble showroom near Taj Mahal" or "petha shop in Agra" into Google, does your business show up? If you don't have a website, the answer is no.

## What a Website Actually Does for Your Business

A website isn't just a digital brochure. For Agra businesses, it serves as:

**A 24/7 Salesperson** — Your shop closes at 8 PM. Your website never closes. A tourist planning their Agra trip at midnight in Delhi can find your business, see your products, and decide to visit you the next morning.

**A Trust Signal** — When a customer sees a professional website with real photos, genuine reviews, and clear pricing, their trust in your business increases dramatically.

**A Google Ranking Tool** — Without a website, you can't rank on Google Search. A properly optimized website puts you ahead of competitors who only have a GMB listing.

## The Bottom Line

The question isn't whether Agra businesses need websites. The question is whether you'll get one before or after your competitors do.

---

*Ready to bring your Agra business online? [Contact Arcova Studio](/contact) for a free consultation.*`,
  },
  
 
  {
    slug: "fast-website-increases-revenue-local-shops",
    title: "5 Ways a Fast Website Increases Revenue for Local Shops",
    excerpt:
      "Website speed directly impacts whether visitors become customers. Here's how page load time affects bounce rates, trust, and actual sales.",
    date: "2026-02-28",
    readTime: "4 min read",
    category: "Performance",
    content: `## Speed Isn't a Technical Detail — It's a Business Metric

When we talk to local shop owners about website speed, most think it's a technical detail for developers to worry about. It's not. Website speed directly translates to revenue.

## 1. Faster Sites = Lower Bounce Rates

Google's research shows that as page load time goes from 1 second to 3 seconds, the probability of a visitor leaving increases by **32%**.

## 2. Google Ranks Fast Sites Higher

Since 2021, Google has used **Core Web Vitals** as a ranking factor.

## 3. Speed Builds Instant Trust

When a customer clicks on your website and it loads instantly, it sends a subconscious message: *this business is professional.*

## 4. Mobile Users Are Less Patient

In India, over **75% of internet traffic comes from mobile devices**.

## 5. Fast Sites Convert Better

A **0.1-second improvement in load time** led to **8.4% increase** in conversions.

---

*Want to know how fast your website really is? [Get a free performance audit from Arcova Studio](/contact).*`,
  },
];

/**
 * Fetch AI-generated posts from Vercel Postgres.
 * Falls back to empty array if DB is unavailable (local dev without DB).
 */
async function getDbPosts(): Promise<BlogPost[]> {
  try {
    // Skip DB if no connection string (local dev without Postgres)
    if (!process.env.POSTGRES_URL) {
      // Fallback: read from local JSON file
      const fs = await import("fs");
      const path = await import("path");
      const filePath = path.join(process.cwd(), "data", "posts.json");
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(content);
      }
      return [];
    }

    await initBlogTable();

    const { rows } = await sql`
      SELECT slug, title, excerpt, date, read_time, category, content
      FROM blog_posts
      ORDER BY date DESC, created_at DESC
    `;

    return rows.map((row) => ({
      slug: row.slug,
      title: row.title,
      excerpt: row.excerpt,
      date: row.date instanceof Date ? row.date.toISOString().split("T")[0] : String(row.date),
      readTime: row.read_time,
      category: row.category,
      content: row.content,
    }));
  } catch (error) {
    console.warn("⚠️ Error fetching blog posts from DB (falling back to static):", error);
    return [];
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const dbPosts = await getDbPosts();
  return [...dbPosts, ...STATIC_POSTS];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug);
}
