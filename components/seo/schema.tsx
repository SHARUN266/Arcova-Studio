import { SITE_CONFIG, SERVICES, CITIES } from "@/lib/seo-data";

/**
 * ServiceAreaBusiness JSON-LD Schema
 * Used instead of LocalBusiness because there's no public-facing physical office.
 * Rendered in <head> via Next.js layout.
 */
export function Schema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ServiceAreaBusiness",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    description:
      "Premium web design and development studio serving businesses across Agra, Mathura, Firozabad, Vrindavan, and Hathras.",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.state,
      postalCode: SITE_CONFIG.address.postalCode,
      addressCountry: SITE_CONFIG.address.country,
    },
    areaServed: CITIES.map((city) => ({
      "@type": "City",
      name: city.name,
    })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: SITE_CONFIG.hours.dayOfWeek,
      opens: SITE_CONFIG.hours.opens,
      closes: SITE_CONFIG.hours.closes,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web Services",
      itemListElement: SERVICES.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.shortDescription,
        },
      })),
    },
    priceRange: "₹8,000 – ₹80,000",
    image: `${SITE_CONFIG.url}/logo.png`,
    sameAs: Object.values(SITE_CONFIG.social).filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Article JSON-LD Schema for individual blog posts
 */
export function ArticleSchema({
  title,
  description,
  slug,
  datePublished,
  dateModified,
}: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${SITE_CONFIG.url}/blog/${slug}`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/logo.png`,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
