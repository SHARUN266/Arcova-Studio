import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, Tag } from "lucide-react";
import { getAllPosts, getBlogPostBySlug } from "@/lib/blog-data";
import { generateBlogPostMetadata } from "@/lib/metadata";
import { ArticleSchema } from "@/components/seo/schema";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// ---------------------------------------------------------------------------
// Static params for SSG
// ---------------------------------------------------------------------------
export async function generateStaticParams() {
  return (await getAllPosts()).filter((post) => post.slug).map((post) => ({
    slug: post.slug,
  }));
}

// ---------------------------------------------------------------------------
// Dynamic metadata per blog post
// ---------------------------------------------------------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) {
    return { title: "Post Not Found" };
  }
  return generateBlogPostMetadata({
    title: post.title,
    excerpt: post.excerpt,
    slug: post.slug,
  });
}

// ---------------------------------------------------------------------------
// Simple markdown-to-JSX renderer for blog content
// ---------------------------------------------------------------------------
function renderMarkdown(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let inTable = false;
  let tableRows: string[][] = [];
  let tableHeaders: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Table detection
    if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
      if (!inTable) {
        inTable = true;
        tableHeaders = line
          .split("|")
          .filter(Boolean)
          .map((cell) => cell.trim());
        // Skip separator line
        if (
          i + 1 < lines.length &&
          lines[i + 1].includes("---")
        ) {
          i++;
        }
        tableRows = [];
        continue;
      }
      tableRows.push(
        line
          .split("|")
          .filter(Boolean)
          .map((cell) => cell.trim())
      );
      continue;
    } else if (inTable) {
      // End of table
      elements.push(
        <div key={`table-${i}`} className="overflow-x-auto my-8">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                {tableHeaders.map((header, j) => (
                  <th
                    key={j}
                    className="text-left py-3 px-4 text-accent font-bold text-xs uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, j) => (
                <tr key={j} className="border-b border-white/5">
                  {row.map((cell, k) => (
                    <td key={k} className="py-3 px-4 text-muted-foreground">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      inTable = false;
      tableRows = [];
      tableHeaders = [];
    }

    // Headings
    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={i}
          className="text-2xl md:text-3xl font-black mt-12 mb-4 tracking-tight"
        >
          {line.replace("## ", "")}
        </h2>
      );
      continue;
    }

    // Horizontal rule
    if (line.trim() === "---") {
      elements.push(
        <hr key={i} className="border-white/5 my-12" />
      );
      continue;
    }

    // List items
    if (line.startsWith("- **")) {
      const match = line.match(/^- \*\*(.+?)\*\*\s*[-—]\s*(.+)$/);
      if (match) {
        elements.push(
          <li key={i} className="flex gap-2 ml-4 mb-3 text-muted-foreground leading-relaxed">
            <span className="text-accent mt-1.5 text-xs">▸</span>
            <span>
              <strong className="text-foreground">{match[1]}</strong> — {match[2]}
            </span>
          </li>
        );
        continue;
      }
    }
    if (line.startsWith("- ")) {
      elements.push(
        <li key={i} className="flex gap-2 ml-4 mb-2 text-muted-foreground leading-relaxed">
          <span className="text-accent mt-1.5 text-xs">▸</span>
          <span
            dangerouslySetInnerHTML={{
              __html: line
                .replace("- ", "")
                .replace(/\*\*(.+?)\*\*/g, '<strong class="text-foreground">$1</strong>'),
            }}
          />
        </li>
      );
      continue;
    }

    // Numbered list
    const numMatch = line.match(/^(\d+)\.\s+\*\*(.+?)\*\*\s*[-—]\s*(.+)$/);
    if (numMatch) {
      elements.push(
        <li key={i} className="flex gap-3 ml-4 mb-3 text-muted-foreground leading-relaxed">
          <span className="text-accent font-mono font-bold text-sm">
            {numMatch[1]}.
          </span>
          <span>
            <strong className="text-foreground">{numMatch[2]}</strong> — {numMatch[3]}
          </span>
        </li>
      );
      continue;
    }

    // Empty lines
    if (line.trim() === "") {
      continue;
    }

    // Paragraphs with inline formatting
    elements.push(
      <p
        key={i}
        className="text-muted-foreground leading-relaxed mb-4"
        dangerouslySetInnerHTML={{
          __html: line
            .replace(/\*\*(.+?)\*\*/g, '<strong class="text-foreground">$1</strong>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            .replace(
              /\[(.+?)\]\((.+?)\)/g,
              '<a href="$2" class="text-accent hover:underline">$1</a>'
            ),
        }}
      />
    );
  }

  return elements;
}

// ---------------------------------------------------------------------------
// Blog Post Page
// ---------------------------------------------------------------------------
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = (await getAllPosts()).filter((p) => p.slug !== post.slug);

  return (
    <>
      <ArticleSchema
        title={post.title}
        description={post.excerpt}
        slug={post.slug}
        datePublished={post.date}
      />

      {/* Article Header */}
      <section
        className="relative py-20 md:py-28 overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 30% 50%, rgba(232, 160, 69, 0.04), transparent), #0A0908",
        }}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            {/* Breadcrumb */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-8"
            >
              <ArrowLeft size={14} />
              <span className="text-sm">Back to Blog</span>
            </Link>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="inline-flex items-center gap-2">
                <Tag size={12} className="text-accent" />
                <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-accent font-bold">
                  {post.category}
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock size={12} />
                <span className="text-xs">{post.readTime}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {new Date(post.date).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-6">
              {post.title}
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="section-padding border-t border-white/5">
        <div className="container mx-auto px-6">
          <article className="max-w-3xl mx-auto prose-custom">
            {renderMarkdown(post.content)}
          </article>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="section-padding border-t border-white/5">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-black mb-8 tracking-tight">
                More <span className="text-accent">Articles</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group p-6 rounded-xl border border-white/5 hover:border-accent/20 hover:bg-accent/[0.03] transition-all"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Tag size={10} className="text-accent" />
                      <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-accent font-bold">
                        {related.category}
                      </span>
                    </div>
                    <h3 className="font-bold mb-2 group-hover:text-accent transition-colors leading-snug">
                      {related.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {related.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Ready to bring your business online?
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-full px-10 h-14 text-base font-bold bg-accent text-accent-foreground hover:scale-[1.02] transition-transform shadow-xl shadow-accent/20 uppercase tracking-widest"
          >
            Start Your Project
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
