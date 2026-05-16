/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  PROJECT DATA — Edit this file to update the portfolio      ║
 * ║  across the entire website.                                 ║
 * ║                                                             ║
 * ║  To add a new project:                                      ║
 * ║  1. Copy any existing object                                ║
 * ║  2. Fill in all the fields                                  ║
 * ║  3. Set `featured: true` to show on homepage                ║
 * ║                                                             ║
 * ║  Image: Use a real screenshot of the delivered website.     ║
 * ║  Place images in /public/projects/ folder.                  ║
 * ║  Example: "/projects/electro-care.png"                      ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

export interface Project {
  /** URL-safe slug (used for routing if case study pages are added) */
  slug: string
  /** Project display title */
  title: string
  /** The client's problem before your solution */
  problem: string
  /** What you built / implemented */
  solution: string
  /** Measurable outcome / result */
  result: string
  /** Industry category label */
  category: string
  /** Live URL of the project */
  url: string
  /**
   * Screenshot image path.
   * - For local images: "/projects/your-image.png" (place in /public/projects/)
   * - For external URLs: "https://..."
   */
  image: string
  /** Gradient accent for card hover glow (Tailwind classes) */
  accent: string
  /** Show on homepage? Set false to hide without deleting */
  featured: boolean
  /** Year the project was delivered */
  year?: string
  /** Technologies used */
  tech?: string[]
}

const projects: Project[] = [
  {
    slug: "electro-care",
    title: "Electro Care",
    problem:
      "Losing 60% of potential bookings due to a slow, non-responsive legacy site.",
    solution:
      "Implemented a Next.js Conversion-Engine with instant WhatsApp hooks.",
    result: "240% increase in service inquiries within 30 days of launch.",
    category: "Service / E-commerce",
    url: "https://electro-care.vercel.app",
    image: "/projects/electro-care.png",
    accent: "from-[#8B5CF6]/20 to-[#7C3AED]/20",
    featured: true,
    year: "2025",
    tech: ["Next.js", "Tailwind", "WhatsApp API"],
  },
  {
    slug: "gstcalc",
    title: "GST Calculator",
    problem:
      "Small business owners struggling with complex Indian tax calculations and compliance.",
    solution:
      "A high-performance, mobile-first GST calculator with real-time HSN search.",
    result: "Trusted by 10,000+ monthly users for fast, accurate tax computations.",
    category: "FinTech / Utility",
    url: "https://gstcalc.online",
    image: "/projects/gst-calculator.png",
    accent: "from-[#F59E0B]/20 to-[#D97706]/20",
    featured: true,
    year: "2025",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    slug: "ai-interview",
    title: "AI Interview Mocker",
    problem:
      "Candidates facing high anxiety and lack of feedback during technical interview prep.",
    solution:
      "AI-driven interview simulation with real-time feedback and sentiment analysis.",
    result: "Reduced candidate anxiety by 40% and improved interview performance.",
    category: "EdTech / AI",
    url: "https://ai-interview-mocker-two.vercel.app",
    image: "/projects/ai-interview.png",
    accent: "from-[#3B82F6]/20 to-[#2563EB]/20",
    featured: true,
    year: "2025",
    tech: ["React", "Gemini AI", "Node.js"],
  },
  {
    slug: "intellinote",
    title: "IntelliNote AI",
    problem:
      "Students and professionals overwhelmed by long lectures and messy note-taking.",
    solution:
      "Smart note-taking app that automatically summarizes and categorizes content.",
    result: "Saves users an average of 5 hours per week on study and review time.",
    category: "Productivity / AI",
    url: "https://intelli-note-ai.vercel.app",
    image: "/projects/intelli-note.png",
    accent: "from-[#10B981]/20 to-[#059669]/20",
    featured: true,
    year: "2025",
    tech: ["Next.js", "OpenAI", "Prisma"],
  },
  {
    slug: "harvest-core",
    title: "Harvest Invoice",
    problem:
      "Manual lead tracking causing 40% of inquiries to go unanswered.",
    solution:
      "Integrated Auto-Pilot Lead Capture with automated CRM workflows.",
    result:
      "Zero missed leads and a 55% faster response time for the sales team.",
    category: "Automation / EdTech",
    url: "https://get-harvest-rct201clone.netlify.app",
    image: "/projects/get-harvest.png",
    accent: "from-[#8B5CF6]/20 to-[#F59E0B]/20",
    featured: true,
    year: "2025",
    tech: ["React", "Firebase", "Automation"],
  },
]

/** Get featured projects (for homepage) */
export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured)
}

/** Get all projects */
export function getAllProjects(): Project[] {
  return projects
}

/** Get a single project by slug */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export default projects
