"use client"

import * as React from "react"
import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight, Zap, AlertCircle, CheckCircle2, Globe, ExternalLink } from "lucide-react"
import { SplitText } from "@/lib/motion"
import { getFeaturedProjects, type Project } from "@/data/projects"

function ProjectCard({ project, index, progress }: { project: Project; index: number; progress: any }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const offset = index * 0.2
  const cardScale = useTransform(progress, [offset, offset + 0.2], [1, 0.96])
  const cardOpacity = useTransform(progress, [offset, offset + 0.2], [1, 0.8])

  const { scrollYProgress: imageScroll } = useScroll({ target: cardRef, offset: ["start end", "end start"] })
  const imageY = useTransform(imageScroll, [0, 1], ["-5%", "5%"])

  return (
    <motion.div
      ref={cardRef}
      style={{ scale: cardScale, opacity: cardOpacity }}
      className="sticky top-24 w-full min-h-[70vh] rounded-[2.5rem] p-6 md:p-12 mb-12 md:mb-24 border border-gray-200/90 bg-white shadow-stripe overflow-hidden group flex flex-col lg:flex-row gap-8 lg:gap-12 items-center origin-top transition-all duration-500 hover:border-[#F26530]/40"
    >
      {/* Content Column */}
      <div className="w-full lg:w-5/12 flex flex-col gap-6 relative z-10">
        <div className="flex items-center gap-3">
          <span className="px-3.5 py-1.5 rounded-full border border-gray-200 bg-[#F5F5F3] text-[11px] font-mono font-bold text-gray-700 uppercase tracking-wider">
            {project.category}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Client
          </span>
        </div>

        <h3 className="text-3xl md:text-5xl font-extrabold text-[#1A1A1A] leading-tight tracking-tight">
          <SplitText>{project.title}</SplitText>
        </h3>

        <div className="flex flex-col gap-5 mt-1">
          <div className="flex flex-col gap-1 text-left p-4 rounded-2xl bg-[#F5F5F3]/60 border border-gray-200/60">
            <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
              <AlertCircle size={12} className="text-amber-500" /> The Challenge
            </span>
            <p className="text-xs md:text-sm text-gray-700 leading-relaxed font-normal">{project.problem}</p>
          </div>

          <div className="flex flex-col gap-1 text-left p-4 rounded-2xl bg-[#F5F5F3]/60 border border-gray-200/60">
            <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
              <CheckCircle2 size={12} className="text-emerald-500" /> The Strategy
            </span>
            <p className="text-xs md:text-sm text-gray-700 leading-relaxed font-normal">{project.solution}</p>
          </div>

          {/* Verified ROI Result Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-1.5 p-5 rounded-2xl bg-[#F26530]/10 border border-[#F26530]/25 relative overflow-hidden group/result"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-[#F26530] uppercase tracking-widest flex items-center gap-1.5">
                <Zap size={12} className="fill-[#F26530]" /> Measured Impact
              </span>
              <span className="text-[10px] font-mono font-bold text-[#F26530] bg-[#F26530]/20 px-2 py-0.5 rounded-full">Verified</span>
            </div>
            <p className="text-xl md:text-2xl font-black text-[#1A1A1A] leading-tight tracking-tight">{project.result}</p>
          </motion.div>
        </div>

        {/* CTA Link */}
        <button
          onClick={() => window.open(project.url, "_blank")}
          className="mt-4 flex items-center gap-3 text-xs md:text-sm font-bold uppercase tracking-widest text-[#F26530] hover:text-[#E0531E] transition-colors group/btn w-fit"
        >
          <span className="border-b border-transparent group-hover/btn:border-[#F26530] pb-0.5 transition-all">Visit Live Website</span>
          <div className="w-9 h-9 rounded-full border border-[#F26530]/40 flex items-center justify-center group-hover/btn:bg-[#F26530] group-hover/btn:text-white transition-all shadow-xs">
            <ArrowUpRight size={16} className="group-hover/btn:rotate-12 transition-transform" />
          </div>
        </button>
      </div>

      {/* Safari Mac Window Frame Preview Column */}
      <div
        className="w-full lg:w-7/12 h-[38vh] lg:h-[62vh] rounded-2xl lg:rounded-[2rem] overflow-hidden bg-[#F5F5F3] border border-gray-200/90 relative group/mockup cursor-pointer shadow-stripe flex flex-col"
        onClick={() => window.open(project.url, "_blank")}
      >
        {/* Safari Header Bar */}
        <div className="h-10 bg-white border-b border-gray-200/80 px-4 flex items-center justify-between shrink-0 z-20">
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-400 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
          </div>
          <div className="px-4 py-1 rounded-md bg-gray-100 border border-gray-200 text-[11px] font-mono text-gray-500 flex items-center gap-1.5 max-w-[200px] truncate">
            <Globe size={11} className="text-gray-400 shrink-0" />
            <span className="truncate">{project.url.replace(/^https?:\/\//, "")}</span>
          </div>
          <ExternalLink size={14} className="text-gray-400 group-hover/mockup:text-[#F26530] transition-colors" />
        </div>

        {/* Mockup Image Viewport */}
        <div className="relative flex-1 overflow-hidden bg-[#F5F5F3] flex items-center justify-center p-4">
          <motion.div className="w-full h-full flex items-center justify-center" style={{ y: imageY }}>
            <img
              src={project.image}
              alt={`${project.title} Preview`}
              className="w-full h-full object-contain opacity-95 group-hover/mockup:opacity-100 group-hover/mockup:scale-[1.02] transition-all duration-700 ease-[0.16,1,0.3,1]"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null)
  const featuredProjects = getFeaturedProjects()

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] })

  return (
    <section id="work" ref={containerRef} className="section-cinematic bg-[#FAFAF8] relative z-20">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="label-mono mb-4 text-[#ff6321] tracking-widest uppercase"
          >
            Selected Client Work
          </motion.span>
          <h2 className="text-[#1A1A1A] max-w-3xl">
            <SplitText>Digital excellence,</SplitText>{" "}
            <span className="text-gray-500 font-normal font-serif italic">
              <SplitText>proven results.</SplitText>
            </span>
          </h2>
        </div>

        <div className="relative pb-12 w-full">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  )
}
