import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, ArrowUpRight } from "lucide-react";
import { CITIES, SERVICES, getCityBySlug, SITE_CONFIG } from "@/lib/seo-data";
import { generateCityMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";

// ---------------------------------------------------------------------------
// Static params for SSG
// ---------------------------------------------------------------------------
export function generateStaticParams() {
  return CITIES.map((city) => ({ slug: city.slug }));
}

// ---------------------------------------------------------------------------
// Dynamic metadata per city
// ---------------------------------------------------------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return generateCityMetadata(slug);
}

// ---------------------------------------------------------------------------
// City Page Component
// ---------------------------------------------------------------------------
export default async function CityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = getCityBySlug(slug);

  if (!city) {
    notFound();
  }

  // City-specific JSON-LD
  const citySchema = {
    "@context": "https://schema.org",
    "@type": "ServiceAreaBusiness",
    name: SITE_CONFIG.name,
    url: `${SITE_CONFIG.url}/cities/${city.slug}`,
    description: city.metaDescription,
    areaServed: {
      "@type": "City",
      name: city.name,
    },
  };

  const otherCities = CITIES.filter((c) => c.slug !== city.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(citySchema) }}
      />

      {/* Hero Section */}
      <section
        className="relative min-h-[70vh] flex items-center overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 80% 50%, rgba(232, 160, 69, 0.04), transparent), #0A0908",
        }}
      >
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8">
              <MapPin size={14} className="text-accent" />
              <span className="text-xs font-mono uppercase tracking-[0.15em] text-accent">
                {city.name}, Uttar Pradesh
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-6 tracking-tight">
              {city.heroTagline.split(" ").map((word, i) => (
                <span key={i}>
                  {word === city.name ? (
                    <span className="text-accent">{word}</span>
                  ) : (
                    word
                  )}{" "}
                </span>
              ))}
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
              {city.heroDescription}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 border-l border-accent/10 pl-6 mb-12">
              {city.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl md:text-3xl font-black text-accent mb-1 font-display">
                    {stat.value}
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-40">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full px-10 h-14 text-base font-bold bg-accent text-accent-foreground hover:scale-[1.02] transition-transform shadow-xl shadow-accent/20 uppercase tracking-widest"
            >
              Start Your Project
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* Decorative element */}
        <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-accent/5 rounded-full pointer-events-none" />
        <div className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[250px] h-[250px] border border-accent/5 rounded-full pointer-events-none" />
      </section>

      {/* Local Context Section */}
      <section className="section-padding border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <span className="label-mono mb-4 block text-muted-foreground">
              Why {city.name}
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-8 tracking-tight">
              Understanding the{" "}
              <span className="text-accent">{city.name}</span> Market
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {city.localContext}
            </p>
          </div>
        </div>
      </section>

      {/* Services for This City */}
      <section className="section-padding border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col mb-16">
            <span className="label-mono mb-4 text-muted-foreground">
              What We Offer in {city.name}
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">
              Services Tailored for{" "}
              <span className="text-accent">{city.name}</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {city.serviceHighlights.map((highlight) => {
              const serviceData = SERVICES.find(
                (s) => s.name === highlight.service
              );
              return (
                <div
                  key={highlight.service}
                  className="group p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-accent/20 hover:bg-accent/[0.03] transition-all duration-300"
                >
                  <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">
                    {highlight.service}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {highlight.description}
                  </p>
                  {serviceData && (
                    <span className="text-accent font-mono font-bold text-sm">
                      From {serviceData.startingPrice}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA — Other Cities */}
      <section className="section-padding border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <span className="label-mono mb-4 block text-muted-foreground">
              We Also Serve
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-12 tracking-tight">
              Explore Other <span className="text-accent">Cities</span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {otherCities.map((otherCity) => (
                <Link
                  key={otherCity.slug}
                  href={`/cities/${otherCity.slug}`}
                  className="group flex items-center justify-center gap-2 p-4 rounded-xl border border-white/5 hover:border-accent/30 hover:bg-accent/5 transition-all"
                >
                  <MapPin
                    size={14}
                    className="text-accent opacity-50 group-hover:opacity-100 transition-opacity"
                  />
                  <span className="font-semibold group-hover:text-accent transition-colors">
                    {otherCity.name}
                  </span>
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="mt-20 text-center">
            <p className="text-muted-foreground mb-6 text-lg">
              Ready to grow your {city.name} business online?
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full px-10 h-14 text-base font-bold bg-accent text-accent-foreground hover:scale-[1.02] transition-transform shadow-xl shadow-accent/20 uppercase tracking-widest"
            >
              Get a Free Quote
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
