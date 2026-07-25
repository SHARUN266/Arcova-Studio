import Link from "next/link"
import { ArrowUpRight, MapPin } from "lucide-react"

const footerLinks = [
  {
    title: "Capabilities",
    links: [
      { name: "Web Development", href: "#services" },
      { name: "AI Automation", href: "#services" },
      { name: "UI/UX Design", href: "#services" },
      { name: "Performance SEO", href: "#services" },
    ],
  },
  {
    title: "Agency",
    links: [
      { name: "Portfolio", href: "#work" },
      { name: "About Us", href: "#about" },
      { name: "Process", href: "#process" },
      { name: "Contact", href: "#contact" },
    ],
  },
]

const cityLinks = [
  { name: "Agra", href: "/cities/agra" },
  { name: "Mathura", href: "/cities/mathura" },
  { name: "Firozabad", href: "/cities/firozabad" },
  { name: "Vrindavan", href: "/cities/vrindavan" },
  { name: "Hathras", href: "/cities/hathras" },
]

export function Footer() {
  return (
    <footer className="relative bg-[#FAFAF8] pt-24 pb-12 border-t border-gray-200 overflow-hidden section-cinematic">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-12 sm:gap-16 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-3 flex flex-col items-start px-2">
            <Link href="/" className="mb-8 group">
              <span className="text-4xl md:text-5xl font-black uppercase tracking-[0.2em] text-[#1A1A1A] transition-opacity">
                Arcova
              </span>
            </Link>
            <p className="text-xl md:text-2xl font-normal text-gray-600 mb-8 max-w-md leading-relaxed font-serif italic">
              "We combine strategy, design, and technology to move people."
            </p>

            {/* Local SEO Paragraph */}
            <p className="text-sm text-gray-500 max-w-sm mb-10 font-normal leading-relaxed">
              Arcova Studio is a premium web development & AI automation agency.
              We serve forward-thinking businesses across Agra, Mathura, Firozabad & globally.
            </p>

            <div className="flex items-center gap-6">
              <a href="mailto:hello@arcovastudio.com" className="text-xs font-mono uppercase tracking-[0.2em] text-gray-600 hover:text-[#ff6321] transition-colors">
                hello@arcovastudio.com
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((section) => (
            <div key={section.title} className="lg:col-span-1">
              <h4 className="label-mono mb-8 text-[#ff6321]">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-base text-gray-600 hover:text-[#1A1A1A] transition-colors flex items-center gap-2 group"
                    >
                      {link.name}
                      <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 text-[#ff6321]" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* City Links */}
          <div className="lg:col-span-1">
            <h4 className="label-mono mb-8 text-[#ff6321]">
              Local Focus
            </h4>
            <ul className="space-y-4">
              {cityLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-base text-gray-600 hover:text-[#1A1A1A] transition-colors flex items-center gap-2 group"
                  >
                    {link.name}
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 text-[#ff6321]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-gray-200 items-start">
          <div className="flex flex-col gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Arcova Studio.
            </p>
            <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-gray-400">
              GST Registered · Agra, UP
            </span>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <h4 className="font-bold text-[#ff6321] mb-4 uppercase tracking-[0.2em] text-[10px]">Location</h4>
              <div className="flex items-start gap-3 text-gray-600 hover:text-[#1A1A1A] transition-colors cursor-pointer group">
                <MapPin size={18} className="mt-1 flex-shrink-0 text-[#ff6321]" />
                <p className="text-sm leading-relaxed font-normal">
                  Taj East Gate Road, Tajganj,<br />
                  Agra, UP 282001
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 md:items-end">
            <div className="md:text-right">
              <h4 className="font-bold text-[#ff6321] mb-4 uppercase tracking-[0.2em] text-[10px]">Working Hours</h4>
              <p className="text-sm text-gray-600 font-medium">Mon–Sat: 10AM – 7PM</p>
            </div>

            <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-full border border-gray-200 shadow-xs">
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#ff6321]">
                Made by Arcova ✦
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
