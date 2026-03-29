"use client"

import * as React from "react"
import { useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Zap, AlertCircle, CheckCircle2 } from "lucide-react"

const projects = [
  {
    title: "Electro Care",
    problem: "Losing 60% of potential bookings due to a slow, non-responsive legacy site.",
    solution: "Implemented a Next.js Conversion-Engine with instant WhatsApp hooks.",
    result: "240% increase in service inquiries within 30 days of launch.",
    category: "Service / E-commerce",
    url: "https://electro-care.vercel.app",
    tags: ["Conversion Engine", "WhatsApp Hooks", "Next.js"],
    accent: "from-orange-500/20 to-yellow-500/20"
  },
  {
    title: "ShortLink Pro",
    problem: "High bounce rates on long, complex marketing URLs for local ads.",
    solution: "Developed a branded, high-performance link management SaaS.",
    result: "45% higher click-through rate on local Facebook/Instagram ads.",
    category: "Ads / Utility",
    url: "https://shorturlbysharun.netlify.app",
    tags: ["Ads Optimization", "Analytics", "Redis"],
    accent: "from-blue-500/20 to-cyan-500/20"
  },
  {
    title: "Harvest Core",
    problem: "Manual lead tracking causing 40% of inquiries to go unanswered.",
    solution: "Integrated Auto-Pilot Lead Capture with automated CRM workflows.",
    result: "Zero missed leads and a 55% faster response time for the sales team.",
    category: "Automation / EdTech",
    url: "https://get-harvest-rct201clone.netlify.app",
    tags: ["Automation", "CRM", "Lead Capture"],
    accent: "from-secondary/20 to-primary/20"
  },
  {
    title: "Violent Hope",
    problem: "Brand perceived as 'cheap' due to outdated, flat web design.",
    solution: "Designed a premium, immersive digital experience and identity.",
    result: "Successfully raised service prices by 80% with zero drop in leads.",
    category: "Identity / Luxury",
    url: "https://violent-hope.netlify.app",
    tags: ["Premium UI", "Branding", "Framer Motion"],
    accent: "from-purple-500/20 to-pink-500/20"
  },
]


function ProjectCard({ project, index, progress }: { project: typeof projects[0], index: number, progress: any }) {
  const [isLoading, setIsLoading] = React.useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  // Dynamic scale and opacity based on scroll to create a stacking effect
  const offset = index * 0.2
  const cardScale = useTransform(progress, [offset, offset + 0.2], [1, 0.95])
  const cardOpacity = useTransform(progress, [offset, offset + 0.2], [1, 0.5])

  return (
    <motion.div
      style={{ scale: cardScale, opacity: cardOpacity }}
      className="sticky top-20 md:top-24 w-full min-h-[70vh] rounded-[2.5rem] p-6 md:p-12 mb-12 md:mb-24 border border-white/5 bg-card shadow-2xl overflow-hidden group flex flex-col md:flex-row gap-8 md:gap-12 items-center origin-top will-change-transform"
    >

      {/* Background Glow Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-0 group-hover:opacity-20 transition-opacity duration-1000 blur-3xl pointer-events-none mix-blend-screen`} />

      {/* Content Side */}
      <div className="w-full md:w-1/3 flex flex-col gap-6 relative z-10">
        <div className="px-4 py-2 rounded-full border border-white/10 w-fit backdrop-blur-md">
          <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest">
            {project.category}
          </span>
        </div>

        <h3 className="text-4xl md:text-5xl font-display font-black text-white leading-tight">
          {project.title}
        </h3>

        <div className="flex flex-col gap-6 mt-4">
          <div className="flex flex-col gap-1 text-left">
            <span className="text-[10px] font-mono font-bold text-red-500/80 uppercase tracking-widest flex items-center gap-1.5">
              <AlertCircle size={10} />
              The Problem
            </span>
            <p className="text-sm text-white/70 leading-relaxed font-light">{project.problem}</p>
          </div>
          <div className="flex flex-col gap-1 text-left">
            <span className="text-[10px] font-mono font-bold text-blue-400/80 uppercase tracking-widest flex items-center gap-1.5">
              <CheckCircle2 size={10} />
              The Solution
            </span>
            <p className="text-sm text-white/70 leading-relaxed font-light">{project.solution}</p>
          </div>
          <div className="flex flex-col gap-2 p-5 rounded-2xl bg-primary/5 border border-primary/10 mt-2">
            <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest flex items-center gap-1.5">
              <Zap size={10} className="fill-primary" />
              Verified Result
            </span>
            <p className="text-xl font-bold text-white leading-tight tracking-tight">{project.result}</p>
          </div>
        </div>



        <div className="flex flex-wrap gap-2 mt-2">
          {project.tags.map(tag => (
            <span key={tag} className="px-3 py-1 rounded-full bg-white/5 text-[10px] uppercase font-bold tracking-widest text-white/50 border border-white/5">
              {tag}
            </span>
          ))}
        </div>

        <button
          onClick={() => window.open(project.url, "_blank")}
          className="mt-6 flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-primary hover:text-white transition-colors group/btn w-fit"
        >
          <span className="border-b border-transparent group-hover/btn:border-primary pb-1 transition-all">Explore Live Site</span>
          <div className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:text-black transition-all">
            <ArrowUpRight size={16} className="group-hover/btn:rotate-12 transition-transform" />
          </div>
        </button>
      </div>

      {/* Visual Preview Side (Iframe with scroll simulation) */}
      <div
        ref={containerRef}
        className="w-full md:w-2/3 h-[50vh] md:h-[65vh] rounded-2xl md:rounded-[2rem] overflow-hidden bg-black/50 border border-white/10 relative group/mockup cursor-pointer shadow-premium"
        onClick={() => window.open(project.url, "_blank")}
      >
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-40 flex items-center justify-center bg-[#0a1612]"
            >
              <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-full h-full absolute top-0 left-0">
          <iframe
            src={project.url}
            onLoad={() => setIsLoading(false)}
            className="w-full h-full border-0 pointer-events-none opacity-80 group-hover/mockup:opacity-100 transition-opacity duration-500"
            title={project.title}
            loading="lazy"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-100 group-hover/mockup:opacity-0 transition-opacity duration-700 z-10 pointer-events-none" />
      </div>
    </motion.div>
  )
}

export function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  return (
    <section id="work" ref={containerRef} className="section-padding py-32 bg-dark-background relative z-20">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16 md:mb-32">
          <div className="max-w-3xl relative">
            <span className="label-mono mb-6 block text-primary/80 tracking-[0.3em] uppercase">Impact Driven</span>
            <h2 className="text-5xl md:text-7xl font-display font-black tracking-tighter leading-tight mb-8">
              Selected <span className="text-gradient italic font-light font-serif">Work.</span>
            </h2>
            <p className="body-large opacity-70 leading-relaxed max-w-xl">
              We create robust, premium platforms that separate our clients from their competition.
            </p>
          </div>
        </div>

        <div className="relative pb-12 w-full">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
