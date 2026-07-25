import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, ArrowUpRight } from "lucide-react";
import { CITIES, SERVICES, getCityBySlug, SITE_CONFIG } from "@/lib/seo-data";
import { generateCityMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return CITIES.map((city) => ({ slug: city.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return generateCityMetadata(slug);
}

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
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-[#FAFAF8] pt-32 pb-20">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F26530]/10 border border-[#F26530]/20 mb-8">
              <MapPin size={14} className="text-[#F26530]" />
              <span className="text-xs font-mono uppercase tracking-[0.15em] text-[#F26530] font-semibold">
                {city.name}, Uttar Pradesh
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6 tracking-tight text-[#1A1A1A]">
              {city.heroTagline.split(" ").map((word, i) => (
                <span key={i}>
                  {word === city.name ? (
                    <span className="text-[#F26530]">{word}</span>
                  ) : (
                    word
                  )}{" "}
                </span>
              ))}
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
              {city.heroDescription}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 border-l-2 border-[#F26530]/20 pl-6 mb-12">
              {city.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl md:text-3xl font-black text-[#F26530] mb-1 font-display">
                    {stat.value}
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full px-10 h-14 text-base font-bold bg-[#F26530] text-white hover:bg-[#E0531E] hover:scale-[1.02] transition-transform shadow-lg shadow-[#F26530]/20 uppercase tracking-widest"
            >
              Start Your Project
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Local Context Section */}
      <section className="section-padding border-t border-gray-200 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <span className="label-mono mb-4 block text-[#F26530]">
              Why {city.name}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-8 tracking-tight text-[#1A1A1A]">
              Understanding the{" "}
              <span className="text-[#F26530]">{city.name}</span> Market
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed font-normal">
              {city.localContext}
            </p>
          </div>
        </div>
      </section>

      {/* Services for This City */}
      <section className="section-padding border-t border-gray-200 bg-[#FAFAF8]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col mb-16">
            <span className="label-mono mb-4 text-[#F26530]">
              What We Offer in {city.name}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#1A1A1A]">
              Services Tailored for{" "}
              <span className="text-[#F26530]">{city.name}</span>
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
                  className="group p-8 rounded-2xl border border-gray-200 bg-white hover:border-[#F26530]/30 shadow-xs hover:shadow-md transition-all duration-300"
                >
                  <h3 className="text-xl font-bold mb-3 text-[#1A1A1A] group-hover:text-[#F26530] transition-colors">
                    {highlight.service}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {highlight.description}
                  </p>
                  {serviceData && (
                    <span className="text-[#F26530] font-mono font-bold text-sm">
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
      <section className="section-padding border-t border-gray-200 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <span className="label-mono mb-4 block text-[#F26530]">
              We Also Serve
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-12 tracking-tight text-[#1A1A1A]">
              Explore Other <span className="text-[#F26530]">Cities</span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {otherCities.map((otherCity) => (
                <Link
                  key={otherCity.slug}
                  href={`/cities/${otherCity.slug}`}
                  className="group flex items-center justify-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-[#F26530]/30 hover:bg-[#F26530]/5 transition-all text-[#1A1A1A]"
                >
                  <MapPin
                    size={14}
                    className="text-[#F26530]"
                  />
                  <span className="font-semibold group-hover:text-[#F26530] transition-colors">
                    {otherCity.name}
                  </span>
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 text-[#F26530]"
                  />
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-20 text-center">
            <p className="text-gray-600 mb-6 text-lg">
              Ready to grow your {city.name} business online?
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full px-10 h-14 text-base font-bold bg-[#F26530] text-white hover:bg-[#E0531E] hover:scale-[1.02] transition-transform shadow-lg shadow-[#F26530]/20 uppercase tracking-widest"
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
