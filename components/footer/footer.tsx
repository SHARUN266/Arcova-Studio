import Link from "next/link"
import Image from "next/image"
import { Instagram, Linkedin, Twitter, ArrowUpRight, Github, MapPin } from "lucide-react"

const footerLinks = [
  {
    title: "Services",
    links: [
      { name: "Web Design", href: "#services" },
      { name: "Development", href: "#services" },
      { name: "E-commerce", href: "#services" },
      { name: "Maintenance", href: "#services" },
    ],
  },
  {
    title: "Agency",
    links: [
      { name: "Our Work", href: "#work" },
      { name: "Process", href: "#process" },
      { name: "Why Us", href: "/#why" },
      { name: "Blog", href: "/blog" },
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
    <footer className="relative bg-background pt-24 pb-12 border-t border-white/5 overflow-hidden group">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-16 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-3 flex flex-col items-start px-2">
            <Link href="/" className="mb-8">
              <span className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-foreground">
                Arc<span className="text-accent tracking-widest">ova</span>
              </span>
            </Link>
            <p className="text-xl md:text-2xl font-light text-muted-foreground mb-8 max-w-md leading-relaxed">
              &ldquo;We build what scales.&rdquo;
            </p>

            {/* Local SEO Paragraph */}
            <p className="text-sm text-muted-foreground/60 max-w-sm mb-10 italic leading-relaxed">
              Arcova is Agra&apos;s leading web design & development studio.
              We serve businesses across Agra, Mathura, Firozabad & nearby cities.
              Looking for a web designer in Agra? Call us today.
            </p>

            <div className="flex items-center gap-6">
              <p className="text-xs font-mono uppercase tracking-[0.2em] opacity-30">Arcova Socials Coming Soon</p>
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((section) => (
            <div key={section.title} className="lg:col-span-1">
              <h4 className="label-mono mb-8 opacity-40">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-lg text-muted-foreground hover:text-accent transition-colors flex items-center gap-2 group"
                    >
                      {link.name}
                      <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* City Links */}
          <div className="lg:col-span-1">
            <h4 className="label-mono mb-8 opacity-40">
              Cities We Serve
            </h4>
            <ul className="space-y-4">
              {cityLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-lg text-muted-foreground hover:text-accent transition-colors flex items-center gap-2 group"
                  >
                    {link.name}
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-white/5 items-start">
          <div className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Arcova Studio.
            </p>
            <span className="text-xs font-mono uppercase tracking-widest font-bold opacity-40">
              GST Registered · Agra, UP
            </span>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <h4 className="font-bold text-accent mb-4 uppercase tracking-[0.2em] text-[10px]">Location</h4>
              <div className="flex items-start gap-3 text-muted-foreground hover:text-foreground transition-colors cursor-pointer group">
                <MapPin size={18} className="mt-1 flex-shrink-0 text-accent" />
                <p className="text-sm leading-relaxed">
                  Taj East Gate Road, Tajganj,<br />
                  Agra, UP 282001
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 md:items-end">
            <div className="md:text-right">
              <h4 className="font-bold text-accent mb-4 uppercase tracking-[0.2em] text-[10px]">Working Hours</h4>
              <p className="text-sm text-muted-foreground font-medium">Mon–Sat: 10AM – 7PM</p>
              <p className="text-xs text-muted-foreground opacity-40 mt-1 italic">Sunday: Family & Chai ☕</p>
            </div>

            <div className="flex items-center gap-3 px-4 py-2 bg-accent/5 rounded-full border border-accent/10 w-fit">
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-accent">
                Made in Arcova 🏛️
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Background Image in Bottom Right Corner */}
      <div className="absolute bottom-0 right-0 w-64 h-64 pointer-events-none overflow-hidden opacity-20 grayscale transition-all duration-1000 group-hover:opacity-40 group-hover:grayscale-0">
        <Image 
          src="/growtika-nGoCBxiaRO0-unsplash.jpg" 
          alt="Technical Background" 
          fill 
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tl from-background via-background/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>
    </footer>
  )
}
