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
    <main className="relative bg-[#FAFAF8] min-h-screen">
      {/* Hero */}
      <section className="relative z-10 pt-32 md:pt-40 pb-20 md:pb-28">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <span className="label-mono mb-6 block text-[#F26530]">
              Blog · {posts.length} Articles
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.05] text-[#1A1A1A]">
              Insights for
              <br />
              <span className="text-[#F26530]">Growing</span> Online
            </h1>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-lg mx-auto">
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
              className="group relative block rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden transition-all duration-500 hover:border-[#F26530]/40 hover:shadow-md"
            >
              <div className="p-8 md:p-14">
                <div className="flex items-center gap-3 mb-8">
                  <span className="px-3 py-1 text-[10px] font-mono uppercase tracking-[0.15em] text-[#F26530] font-bold bg-[#F26530]/10 rounded-full">
                    Featured
                  </span>
                  <span className="px-3 py-1 text-[10px] font-mono uppercase tracking-[0.15em] text-gray-600 bg-gray-100 rounded-full">
                    {featuredPost.category}
                  </span>
                </div>

                <h2 className="text-2xl md:text-4xl font-bold leading-[1.2] mb-5 max-w-3xl text-[#1A1A1A] group-hover:text-[#F26530] transition-colors duration-300">
                  {featuredPost.title}
                </h2>

                <p className="text-base text-gray-600 leading-relaxed mb-10 max-w-2xl">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5 text-sm text-gray-500">
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
                  <span className="flex items-center gap-2 text-sm font-bold text-[#F26530] opacity-0 group-hover:opacity-100 transition-all">
                    Read
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Divider */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="border-t border-gray-200" />
      </div>

      {/* Blog Grid */}
      <section className="relative z-10 py-12 md:py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {otherPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col p-7 rounded-2xl border border-gray-200 bg-white hover:border-[#F26530]/30 shadow-xs hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-5">
                  <Tag size={11} className="text-[#F26530]" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#F26530] font-semibold">
                    {post.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#1A1A1A] mb-3 leading-snug group-hover:text-[#F26530] transition-colors duration-200 line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed mb-auto pb-6 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <Clock size={11} />
                    <span className="text-xs">{post.readTime}</span>
                  </div>
                  <span className="text-xs text-gray-500">
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
            <p className="text-gray-600 mb-8">
              Want to discuss your project?
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full px-10 h-14 text-sm font-bold bg-[#F26530] text-white hover:bg-[#E0531E] hover:scale-[1.02] transition-transform uppercase tracking-[0.15em] shadow-lg shadow-[#F26530]/20"
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
