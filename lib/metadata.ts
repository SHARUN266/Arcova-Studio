import type { Metadata } from "next";
import { SITE_CONFIG, getCityBySlug } from "./seo-data";

/**
 * Generates metadata for city landing pages.
 * Each city gets a fully unique title and description — no keyword stuffing.
 */
export function generateCityMetadata(slug: string): Metadata {
  const city = getCityBySlug(slug);
  if (!city) {
    return {
      title: `${SITE_CONFIG.name} | Web Design & Development`,
      description: SITE_CONFIG.tagline,
    };
  }

  return {
    title: city.metaTitle,
    description: city.metaDescription,
    alternates: {
      canonical: `${SITE_CONFIG.url}/cities/${city.slug}`,
    },
    openGraph: {
      title: city.metaTitle,
      description: city.metaDescription,
      url: `${SITE_CONFIG.url}/cities/${city.slug}`,
      siteName: SITE_CONFIG.name,
      type: "website",
      images: [
        {
          url: `${SITE_CONFIG.url}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${SITE_CONFIG.name} — ${city.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: city.metaTitle,
      description: city.metaDescription,
      images: [`${SITE_CONFIG.url}/og-image.png`],
    },
  };
}

/**
 * Blog post metadata interface
 */
interface BlogMetaInput {
  title: string;
  excerpt: string;
  slug: string;
}

/**
 * Generates metadata for individual blog posts.
 */
export function generateBlogPostMetadata(post: BlogMetaInput): Metadata {
  return {
    title: `${post.title} | ${SITE_CONFIG.name} Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `${SITE_CONFIG.url}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${SITE_CONFIG.url}/blog/${post.slug}`,
      siteName: SITE_CONFIG.name,
      type: "article",
      images: [
        {
          url: `${SITE_CONFIG.url}/og-image.png`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [`${SITE_CONFIG.url}/og-image.png`],
    },
  };
}
