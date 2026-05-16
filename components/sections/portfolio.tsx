"use client"
// Sharun
import * as React from "react"
import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight, Zap, AlertCircle, CheckCircle2 } from "lucide-react"
import { SplitText } from "@/lib/motion"
import { getFeaturedProjects, type Project } from "@/data/projects"

function ProjectCard({ project, index, progress }: { project: Project; index: number; progress: any }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const offset = index * 0.2
  const cardScale = useTransform(progress, [offset, offset + 0.2], [1, 0.95])
  const cardOpacity = useTransform(progress, [offset, offset + 0.2], [1, 0.5])

  const { scrollYProgress: imageScroll } = useScroll({ target: cardRef, offset: ["start end", "end start"] })
  const imageY = useTransform(imageScroll, [0, 1], ["-8%", "8%"])

  return (
    <motion.div
      ref={cardRef}
      style={{ scale: cardScale, opacity: cardOpacity }}
      className="sticky top-24 w-full min-h-[70vh] rounded-[2.5rem] p-6 md:p-12 mb-12 md:mb-24 border border-white/5 bg-[#0C0C0F] shadow-2xl overflow-hidden group flex flex-col md:flex-row gap-8 md:gap-12 items-center origin-top will-change-transform transition-colors duration-500 hover:border-white/10"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-0 group-hover:opacity-40 transition-opacity duration-1000 blur-[100px] pointer-events-none mix-blend-screen`} />

      <div className="w-full md:w-5/12 flex flex-col gap-6 relative z-10">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="px-4 py-2 rounded-full border border-white/10 w-fit bg-white/5 backdrop-blur-md">
          <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">{project.category}</span>
        </motion.div>

        <h3 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
          <SplitText>{project.title}</SplitText>
        </h3>

        <div className="flex flex-col gap-6 mt-2">
          <div className="flex flex-col gap-1 text-left">
            <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5"><AlertCircle size={10} />The Problem</span>
            <p className="text-sm text-zinc-300 leading-relaxed font-light">{project.problem}</p>
          </div>
          <div className="flex flex-col gap-1 text-left">
            <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5"><CheckCircle2 size={10} />The Solution</span>
            <p className="text-sm text-zinc-300 leading-relaxed font-light">{project.solution}</p>
          </div>

          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col gap-2 p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 mt-2 relative overflow-hidden group/result">
            <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover/result:opacity-100 transition-opacity" />
            <span className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-widest flex items-center gap-1.5"><Zap size={10} className="fill-amber-500" />Verified Result</span>
            <p className="text-xl font-bold text-white leading-tight tracking-tight">{project.result}</p>
          </motion.div>
        </div>

        <button onClick={() => window.open(project.url, "_blank")} className="mt-6 flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-primary hover:text-primary-light transition-colors group/btn w-fit">
          <span className="border-b border-transparent group-hover/btn:border-primary pb-1 transition-all">Explore Case Study</span>
          <div className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:text-white transition-all shadow-[0_0_15px_rgba(139,92,246,0)] group-hover/btn:shadow-[0_0_20px_rgba(139,92,246,0.4)]">
            <ArrowUpRight size={16} className="group-hover/btn:rotate-12 transition-transform" />
          </div>
        </button>
      </div>

      <div className="w-full md:w-7/12 h-[40vh] md:h-[65vh] rounded-2xl md:rounded-[2rem] overflow-hidden bg-[#111114] border border-white/5 relative group/mockup cursor-pointer shadow-premium" onClick={() => window.open(project.url, "_blank")}>
        <motion.div className="w-full h-[100%] absolute  left-0" style={{ y: imageY }}>
          <img src={project.image} alt={`${project.title} Preview`} className="w-full h-full object-contain opacity-60 group-hover/mockup:opacity-100 transition-all duration-700 ease-[0.16,1,0.3,1]" loading="lazy" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0F]/80 via-[#0C0C0F]/20 to-transparent pointer-events-none" />
      </div>
    </motion.div>
  )
}

export function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null)
  const featuredProjects = getFeaturedProjects()

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] })

  return (
    <section id="work" ref={containerRef} className="section-cinematic bg-[#09090B] relative z-20">
      <motion.div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[200px] pointer-events-none" style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]), opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.8, 0.3]) }} />

      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center mb-16 md:mb-32">
          <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="label-mono mb-4 text-primary tracking-widest uppercase">Selected Work</motion.span>
          <h2 className="text-white">
            <SplitText>Digital excellence,</SplitText><br />
            <span className="text-zinc-500 font-light font-italic-serif"><SplitText>proven results.</SplitText></span>
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
