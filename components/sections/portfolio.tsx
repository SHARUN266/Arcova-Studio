"use client"

import * as React from "react"
import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

const projects = [
  {
    title: "ShortLink Pro",
    description: "A high-performance URL shortening SaaS with real-time analytics and lightning-fast redirection.",
    category: "SaaS / Utility",
    url: "https://shorturlbysharun.netlify.app",
    tags: ["Next.js", "Redis", "Analytics"]
  },
  {
    title: "Violent Hope",
    description: "An immersive, luxury-focused digital experience pushing the boundaries of modern web UI.",
    category: "Creative / UI",
    url: "https://violent-hope.netlify.app",
    tags: ["Framer Motion", "GSAP", "Premium"]
  },
  {
    title: "Harvest Core",
    description: "Full-stack productivity platform featuring complex state management and intuitive user workflows.",
    category: "EdTech / Productivity",
    url: "https://get-harvest-rct201clone.netlify.app",
    tags: ["React", "Redux", "Fullstack"]
  },
  {
    title: "Electro Care",
    description: "Service-oriented E-commerce solution optimized for conversion and seamless user interaction.",
    category: "E-commerce / Service",
    url: "https://electro-care.vercel.app",
    tags: ["Tailwind", "Responsive", "Sales"]
  },
]

function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
  const [isLoading, setIsLoading] = React.useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = React.useState(1)

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth
        setScale(width / 1200) // Base width for scaling
      }
    }

    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col"
    >
      {/* Visual Preview Container (Live Iframe) */}
      <div
        ref={containerRef}
        className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-[#0A0908] border border-white/5 cursor-pointer group-hover:border-accent/40 transition-all duration-500 shadow-2xl"
        onClick={() => window.open(project.url, "_blank")}
      >
        {/* Loading Spinner */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-40 flex items-center justify-center bg-black"
            >
              <div className="w-8 h-8 border-2 border-accent/20 border-t-accent rounded-full animate-spin" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Iframe Scaling Container */}
        <div
          className="absolute top-0 left-0 w-[1200px] origin-top-left"
          style={{
            transform: `scale(${scale})`,
            height: `${100 / scale}%`
          }}
        >
          <iframe
            src={project.url}
            allow="geolocation"
            onLoad={() => setIsLoading(false)}
            className="w-full h-full border-0 pointer-events-none grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 animate-portfolio-scroll group-hover:[animation-play-state:paused]"
            title={project.title}
            loading="lazy"
          />
        </div>

        {/* Protective & Interactive Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-500" />

        <div className="absolute inset-0 z-20 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
          <Button
            className="rounded-full bg-accent text-accent-foreground font-black px-8 py-6 h-auto shadow-2xl hover:scale-110 transition-transform border-0 flex items-center gap-2"
          >
            VISIT LIVE SITE <ArrowUpRight size={20} />
          </Button>
        </div>

        {/* Floating Category Badge */}
        <div className="absolute top-6 left-6 z-30 px-4 py-2 rounded-full bg-black/60 backdrop-blur-xl border border-white/10">
          <span className="text-[10px] font-mono font-bold text-accent uppercase tracking-widest">
            {project.category}
          </span>
        </div>
      </div>

      {/* Project Details */}
      <div className="mt-8 px-2">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-2xl font-display font-bold text-[#EDE8DF]">
            {project.title}
          </h3>
          <div className="flex gap-2">
            {project.tags.map(tag => (
              <span key={tag} className="text-[10px] uppercase tracking-wider opacity-40 font-mono">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <p className="body-base opacity-60 leading-relaxed max-w-lg mb-6 line-clamp-2">
          {project.description}
        </p>

        <button
          onClick={() => window.open(project.url, "_blank")}
          className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-accent hover:text-accent/80 transition-colors group/link"
        >
          View Live Project
          <ArrowUpRight size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </motion.div>
  )
}

export function Portfolio() {
  return (
    <section id="work" className="section-padding py-32 overflow-hidden bg-background">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-24">
          <div className="max-w-2xl">
            <span className="label-mono mb-4 block text-accent/60 uppercase tracking-[0.3em]">Featured Impact</span>
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter">
              Selected <span className="text-accent italic underline decoration-accent/20">Work.</span>
            </h2>
            <p className="body-large opacity-70 leading-relaxed">
              We focus on quality over quantity. Here are the partners we&apos;ve helped
              transform into digital leaders in the Agra market.
            </p>
          </div>
          <Button variant="outline" className="rounded-full px-10 h-14 border-accent/20 hover:bg-accent/5 hidden md:flex text-sm font-bold uppercase tracking-widest">
            View All Projects
            <ArrowUpRight className="ml-2" size={20} />
          </Button>
        </div>

        {/* Projects Grid - Focused & Breathable */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
