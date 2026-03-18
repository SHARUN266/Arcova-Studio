import { sql } from "@vercel/postgres";

/**
 * Initialize the blog_posts table if it doesn't exist.
 * Called automatically on first query.
 */
export async function initBlogTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id SERIAL PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      date DATE NOT NULL DEFAULT CURRENT_DATE,
      read_time TEXT NOT NULL DEFAULT '5 min read',
      category TEXT NOT NULL DEFAULT 'Web Development',
      content TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;
}

export { sql };
