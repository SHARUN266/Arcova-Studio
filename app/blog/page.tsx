import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { getAllPosts } from "@/lib/blog-data";
import { SITE_CONFIG } from "@/lib/seo-data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on web design, development, and digital growth for businesses in Agra, Mathura, and across Uttar Pradesh.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/blog`,
  },
  openGraph: {
    title: "Blog | Arcova Studio",
    description:
      "Insights on web design, development, and digital growth for local businesses.",
    url: `${SITE_CONFIG.url}/blog`,
    siteName: SITE_CONFIG.name,
    type: "website",
  },
};

export default async function BlogPage() {
  const posts = (await getAllPosts()).filter((post) => post.slug);
  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <main className="relative bg-[#0A0908] min-h-screen">
      {/* Subtle ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] left-[15%] w-[600px] h-[600px] rounded-full bg-accent/[0.015] blur-[150px] animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-accent/[0.02] blur-[130px] animate-[pulse_10s_ease-in-out_2s_infinite]" />
      </div>

      {/* Hero */}
      <section className="relative z-10 pt-32 md:pt-40 pb-20 md:pb-28">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <span className="label-mono mb-6 block text-accent/60">
              Blog · {posts.length} Articles
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-8 leading-[1.05]">
              Insights for
              <br />
              <span className="text-accent">Growing</span> Online
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto">
              Web design, development, and digital strategy — focused on businesses in Agra and nearby cities.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="relative z-10 pb-12 md:pb-16">
          <div className="container mx-auto px-6">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group relative block rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden transition-all duration-500 hover:border-accent/20"
            >
              <div className="p-8 md:p-14">
                <div className="flex items-center gap-3 mb-8">
                  <span className="px-3 py-1 text-[10px] font-mono uppercase tracking-[0.15em] text-accent font-bold bg-accent/10 rounded-full">
                    Featured
                  </span>
                  <span className="px-3 py-1 text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground bg-white/5 rounded-full">
                    {featuredPost.category}
                  </span>
                </div>

                <h2 className="text-2xl md:text-4xl font-bold leading-[1.2] mb-5 max-w-3xl group-hover:text-accent transition-colors duration-300">
                  {featuredPost.title}
                </h2>

                <p className="text-base text-muted-foreground leading-relaxed mb-10 max-w-2xl">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} />
                      {featuredPost.readTime}
                    </span>
                    <span>
                      {new Date(featuredPost.date).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <span className="flex items-center gap-2 text-sm font-bold text-accent opacity-0 group-hover:opacity-100 transition-all">
                    Read
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>

              {/* Hover glow */}
              <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-accent/[0.04] blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </Link>
          </div>
        </section>
      )}

      {/* Divider */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="border-t border-white/[0.04]" />
      </div>

      {/* Blog Grid */}
      <section className="relative z-10 py-12 md:py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {otherPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col p-7 rounded-xl border border-white/[0.04] hover:border-accent/15 bg-transparent hover:bg-white/[0.015] transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-5">
                  <Tag size={11} className="text-accent/70" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-accent/70 font-semibold">
                    {post.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold mb-3 leading-snug group-hover:text-accent transition-colors duration-200 line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed mb-auto pb-6 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-5 border-t border-white/[0.04]">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock size={11} />
                    <span className="text-xs">{post.readTime}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(post.date).toLocaleDateString("en-IN", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="max-w-xl mx-auto text-center">
            <p className="text-muted-foreground mb-8">
              Want to discuss your project?
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full px-10 h-14 text-sm font-bold bg-accent text-accent-foreground hover:scale-[1.02] transition-transform uppercase tracking-[0.15em]"
            >
              Get in Touch
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
