// ===========================================================================
// Centralized SEO Data — Arcova Studio
// Single source of truth for all SEO-related content across the site.
// ===========================================================================

export const SITE_CONFIG = {
  name: "Arcova Studio",
  url: "https://arcova-studio.vercel.app",
  tagline: "We build what scales.",
  phone: "+91-8279934295", // TODO: Replace with actual phone number
  email: "sharunattari266@gmail.com",
  address: {
    street: "Taj East Gate Road, Tajganj",
    city: "Agra",
    state: "Uttar Pradesh",
    postalCode: "282001",
    country: "IN",
  },
  hours: {
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "10:00",
    closes: "19:00",
  },
  social: {
    instagram: "",
    linkedin: "",
    twitter: "",
  },
} as const;

// ---------------------------------------------------------------------------
// Service definitions
// ---------------------------------------------------------------------------
export interface ServiceData {
  name: string;
  slug: string;
  shortDescription: string;
  startingPrice: string;
}

export const SERVICES: ServiceData[] = [
  {
    name: "Website Design",
    slug: "website-design",
    shortDescription:
      "Modern, conversion-focused designs that communicate professionalism and build trust with your audience.",
    startingPrice: "₹8,000",
  },
  {
    name: "Web Development",
    slug: "web-development",
    shortDescription:
      "Fast, scalable websites built with cutting-edge technology. Optimized for performance and SEO.",
    startingPrice: "₹15,000",
  },
  {
    name: "E-commerce Stores",
    slug: "ecommerce",
    shortDescription:
      "Complete online storefronts with secure payment integration, inventory management, and mobile-first design.",
    startingPrice: "₹40,000",
  },
  {
    name: "Maintenance & AMC",
    slug: "maintenance",
    shortDescription:
      "Ongoing support, security patches, performance monitoring, and content updates to keep your site running smoothly.",
    startingPrice: "₹1,500/mo",
  },
];

// ---------------------------------------------------------------------------
// City data — each city has genuinely unique content
// ---------------------------------------------------------------------------
export interface CityData {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  heroTagline: string;
  heroDescription: string;
  /** Unique paragraph about why this city matters */
  localContext: string;
  /** City-specific service descriptions */
  serviceHighlights: {
    service: string;
    description: string;
  }[];
  /** Nearby areas for internal linking context */
  nearbyAreas: string[];
  /** Unique trust signals */
  stats: {
    label: string;
    value: string;
  }[];
}

export const CITIES: CityData[] = [
  {
    slug: "agra",
    name: "Agra",
    metaTitle: "Web Design & Development in Agra | Arcova Studio",
    metaDescription:
      "Premium websites for businesses in Agra. From heritage tourism to local retail — we build fast, modern websites that help Agra businesses grow online.",
    heroTagline: "Building Digital Presence for Agra's Businesses",
    heroDescription:
      "From the bustling lanes of Sadar Bazaar to the tourist-facing shops near Taj Mahal — Agra businesses deserve websites that match the city's global reputation.",
    localContext:
      "Agra attracts millions of visitors annually, yet most local businesses still lack a proper online presence. Whether you run a marble handicraft showroom on Fatehabad Road, a hotel near Taj East Gate, or a sweet shop in Belanganj — a professional website is no longer optional. Your customers search online before they visit. We help Agra businesses capture that intent with fast, beautiful websites optimized for local search.",
    serviceHighlights: [
      {
        service: "Website Design",
        description:
          "Designs that reflect Agra's rich heritage while looking thoroughly modern. Perfect for tourism businesses, hotels, restaurants, and retail showrooms.",
      },
      {
        service: "E-commerce Stores",
        description:
          "Sell Agra's famous marble inlay, petha, leather goods, and handicrafts to customers around the world with a professional online store.",
      },
      {
        service: "Web Development",
        description:
          "Fast-loading websites that rank well on Google for searches like 'best hotel in Agra' or 'marble showroom near Taj Mahal'.",
      },
    ],
    nearbyAreas: ["Mathura", "Firozabad", "Vrindavan", "Hathras"],
    stats: [
      { label: "Agra Clients Served", value: "30+" },
      { label: "Tourism Sites Built", value: "12+" },
      { label: "Avg. Load Time", value: "<1.5s" },
    ],
  },
  {
    slug: "mathura",
    name: "Mathura",
    metaTitle: "Web Design & Development in Mathura | Arcova Studio",
    metaDescription:
      "Professional website design for Mathura businesses. We help temples, dairies, hospitality, and retail brands establish a strong online presence.",
    heroTagline: "Websites That Serve Mathura's Unique Market",
    heroDescription:
      "Mathura's economy is powered by religious tourism, dairy, and traditional crafts. We build websites that understand this market.",
    localContext:
      "Mathura is one of India's most visited pilgrimage destinations, with the dairy industry forming its economic backbone. From dharamshalas near Shri Krishna Janmasthan to dairy brands supplying across UP — businesses here have a massive untapped online audience. A well-built website helps you reach devotees planning their visit, customers looking for authentic Mathura peda, or retailers searching for wholesale suppliers. We understand Mathura's market dynamics and build accordingly.",
    serviceHighlights: [
      {
        service: "Website Design",
        description:
          "Warm, inviting designs suited for Mathura's temple trusts, dharamshalas, and pilgrimage tourism businesses.",
      },
      {
        service: "E-commerce Stores",
        description:
          "Online stores for Mathura's dairy brands, peda shops, and religious artifact sellers to reach devotees nationwide.",
      },
      {
        service: "Maintenance & AMC",
        description:
          "Regular updates and festival season promotions management for businesses that see seasonal traffic spikes.",
      },
    ],
    nearbyAreas: ["Vrindavan", "Agra", "Hathras", "Firozabad"],
    stats: [
      { label: "Mathura Projects", value: "8+" },
      { label: "Temple Sites Built", value: "5+" },
      { label: "Client Satisfaction", value: "100%" },
    ],
  },
  {
    slug: "firozabad",
    name: "Firozabad",
    metaTitle: "Web Design & Development in Firozabad | Arcova Studio",
    metaDescription:
      "Custom websites for Firozabad's glass industry and local businesses. We build online storefronts that help Firozabad manufacturers reach global buyers.",
    heroTagline: "Digital Solutions for Firozabad's Glass Capital",
    heroDescription:
      "Known worldwide as India's Glass City, Firozabad's manufacturers need websites that open doors to national and international markets.",
    localContext:
      "Firozabad produces over 50% of India's glass products — bangles, scientific glassware, decorative items, and industrial glass. Yet most manufacturers and exporters rely solely on word-of-mouth and local agents. A professional website with a product catalog, inquiry forms, and export certifications can transform a local factory into a global supplier. We've worked with Firozabad businesses and understand the B2B-focused web presence they need.",
    serviceHighlights: [
      {
        service: "E-commerce Stores",
        description:
          "Product catalog websites for glass manufacturers with bulk inquiry forms, MOQ details, and export documentation.",
      },
      {
        service: "Web Development",
        description:
          "Fast, professional websites that help Firozabad's glass exporters rank for international B2B searches.",
      },
      {
        service: "Website Design",
        description:
          "Clean, trust-building designs with high-quality product photography integration for glass and bangle showrooms.",
      },
    ],
    nearbyAreas: ["Agra", "Hathras", "Mathura", "Vrindavan"],
    stats: [
      { label: "Industry Sites Built", value: "6+" },
      { label: "B2B Portals", value: "4+" },
      { label: "Export Inquiries Generated", value: "200+" },
    ],
  },
  {
    slug: "vrindavan",
    name: "Vrindavan",
    metaTitle: "Web Design & Development in Vrindavan | Arcova Studio",
    metaDescription:
      "Beautiful websites for Vrindavan's temples, ashrams, and hospitality businesses. We create serene digital experiences that match Vrindavan's spiritual essence.",
    heroTagline: "Serene Digital Experiences for Vrindavan",
    heroDescription:
      "Vrindavan's spiritual ecosystem — temples, ashrams, guest houses, and charitable trusts — deserves a digital presence as thoughtful as its traditions.",
    localContext:
      "Vrindavan welcomes lakhs of devotees every month, especially during Holi, Janmashtami, and the Braj parikrama season. Temples and ashrams need websites for darshan schedules, donation portals, and live streaming. Guest houses and homestays compete for bookings on Google before devotees even arrive. A beautiful, mobile-friendly website with booking integration, event calendars, and donation gateways helps Vrindavan's spiritual organizations serve their community better — both online and offline.",
    serviceHighlights: [
      {
        service: "Website Design",
        description:
          "Serene, spiritually-aligned designs for temples, ashrams, and trusts. Reflects the devotion and peace of Vrindavan.",
      },
      {
        service: "Web Development",
        description:
          "Donation portals, live darshan streaming integration, and event calendars for Vrindavan's religious institutions.",
      },
      {
        service: "Maintenance & AMC",
        description:
          "Festival season updates, event schedule management, and traffic scaling for high-footfall periods like Janmashtami.",
      },
    ],
    nearbyAreas: ["Mathura", "Agra", "Hathras", "Firozabad"],
    stats: [
      { label: "Temple Sites", value: "7+" },
      { label: "Donation Portals", value: "4+" },
      { label: "Monthly Visitors Served", value: "50K+" },
    ],
  },
  {
    slug: "hathras",
    name: "Hathras",
    metaTitle: "Web Design & Development in Hathras | Arcova Studio",
    metaDescription:
      "Affordable, professional websites for Hathras businesses. We help local shops, schools, clinics, and startups launch their online presence.",
    heroTagline: "Bringing Hathras Businesses Online",
    heroDescription:
      "Hathras is growing fast — new businesses, educational institutions, and healthcare facilities all need a digital presence to keep up.",
    localContext:
      "As Hathras develops rapidly with new educational institutions, healthcare facilities, and retail businesses, the need for professional websites is surging. Local coaching centers, clinics, grocery stores, and emerging startups all compete for attention. A clean, mobile-friendly website helps you stand out from competitors who still rely only on pamphlets and word-of-mouth. We offer Hathras businesses affordable, professional web solutions that punch above their price point.",
    serviceHighlights: [
      {
        service: "Website Design",
        description:
          "Clean, professional designs for Hathras's growing businesses — coaching centers, clinics, retail shops, and startups.",
      },
      {
        service: "Web Development",
        description:
          "Mobile-first websites optimized for the way Hathras customers search — primarily on smartphones via Google.",
      },
      {
        service: "E-commerce Stores",
        description:
          "Simple online stores for local retailers looking to expand beyond their physical shopfront.",
      },
    ],
    nearbyAreas: ["Agra", "Mathura", "Firozabad", "Vrindavan"],
    stats: [
      { label: "Hathras Projects", value: "5+" },
      { label: "Startups Launched", value: "3+" },
      { label: "Avg. Project Time", value: "7 days" },
    ],
  },
];

// ---------------------------------------------------------------------------
// Helper to look up a city by slug
// ---------------------------------------------------------------------------
export function getCityBySlug(slug: string): CityData | undefined {
  return CITIES.find((city) => city.slug === slug);
}
