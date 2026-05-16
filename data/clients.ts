/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  CLIENT DATA — Edit this file to update testimonials        ║
 * ║  across the entire website.                                 ║
 * ║                                                             ║
 * ║  To add a new client:                                       ║
 * ║  1. Copy any existing object                                ║
 * ║  2. Fill in the details                                     ║
 * ║  3. Set `featured: true` to show on homepage                ║
 * ║                                                             ║
 * ║  Avatar: If `avatar` is empty, initials will be generated   ║
 * ║  automatically from the client's name.                      ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

export interface Client {
  /** Client's full name */
  name: string
  /** Business or company name */
  business: string
  /** Role or title */
  role: string
  /** Avatar image URL — leave empty "" to use initials */
  avatar: string
  /** City / Location */
  location: string
  /** Testimonial quote */
  text: string
  /** Industry tag (e.g., "Healthcare", "E-commerce") */
  tag: string
  /** Show on homepage? Set false to hide without deleting */
  featured: boolean
  /** Result metrics */
  results: {
    value: number
    suffix: string
    label: string
  }
}

const clients: Client[] = [
  {
    name: "Mohit Bansal",
    business: "Bansal Leather Exports",
    role: "Owner",
    avatar: "", // Leave empty for initials avatar
    location: "Agra",
    text: "Actually, we were struggling with an old website that didn't show our craft properly. The Nexora team understood how we work and built something that genuinely represents us.",
    tag: "Traditional Business",
    featured: true,
    results: {
      value: 215,
      suffix: "%",
      label: "Increase in B2B Inquiries",
    },
  },
  {
    name: "Dr. Varun Kalra",
    business: "Kalra Eye Center",
    role: "Lead Surgeon",
    avatar: "", // Leave empty for initials avatar
    location: "Agra",
    text: "Most agencies just promised traffic, but these guys fixed our patient booking flow. It's much simpler now. Highly recommended for any serious medical practice.",
    tag: "Healthcare",
    featured: true,
    results: {
      value: 40,
      suffix: "%",
      label: "More Online Bookings",
    },
  },
  {
    name: "Karan Malhotra",
    business: "The Mughal Kitchen",
    role: "Founder",
    avatar: "", // Leave empty for initials avatar
    location: "Agra",
    text: "Our restaurant needed a digital presence that matched our food quality. They did an amazing job with the photography and the layout. Our reservations have definitely seen a boost.",
    tag: "Hospitality",
    featured: true,
    results: {
      value: 3,
      suffix: "x",
      label: "Return on Investment",
    },
  },

  // ───────────────────────────────────────────────────
  // Add more clients below. Set featured: true to show
  // on the homepage testimonials section.
  // ───────────────────────────────────────────────────

  // {
  //   name: "New Client Name",
  //   business: "Their Business",
  //   role: "CEO",
  //   avatar: "", 
  //   location: "Delhi",
  //   text: "Their testimonial quote here.",
  //   tag: "Industry",
  //   featured: true,
  //   results: { value: 50, suffix: "%", label: "Some Metric" },
  // },
]

/** Get all featured clients (for homepage) */
export function getFeaturedClients(): Client[] {
  return clients.filter((c) => c.featured)
}

/** Get all clients */
export function getAllClients(): Client[] {
  return clients
}

export default clients
