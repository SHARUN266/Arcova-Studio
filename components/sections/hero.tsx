"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Star } from "lucide-react"
import { ThreeOrb } from "@/components/ui/three-orb"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { InitialsAvatar } from "@/components/ui/initials-avatar"
import { getFeaturedClients } from "@/data/clients"

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const featuredClients = getFeaturedClients().slice(0, 4)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const yBadge = useTransform(scrollYProgress, [0, 1], [0, 60])
  const yHeadline = useTransform(scrollYProgress, [0, 1], [0, 100])
  const ySub = useTransform(scrollYProgress, [0, 1], [0, 130])
  const yCta = useTransform(scrollYProgress, [0, 1], [0, 160])
  const yTrust = useTransform(scrollYProgress, [0, 1], [0, 180])
  
  const scaleContent = useTransform(scrollYProgress, [0, 0.5], [1, 0.88])
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [0, 6])
  const opacityContent = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const orbOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#09090B]">
      
      <div className="absolute top-[-10%] left-[-15%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none ambient-blob" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-accent/8 rounded-full blur-[130px] pointer-events-none ambient-blob-slow" />
      
      <motion.div style={{ opacity: orbOpacity }} className="absolute inset-0 z-0">
        <ThreeOrb />
      </motion.div>

      <div className="absolute inset-0 bg-[#09090B]/60 z-[1] pointer-events-none" />

      <motion.div 
        style={{ scale: scaleContent, rotateX, opacity: opacityContent, transformPerspective: 1200 }}
        className="container mx-auto px-6 relative z-10 w-full max-w-5xl flex flex-col items-center text-center mt-10 md:mt-20 will-change-transform"
      >
        <motion.div
          style={{ y: yBadge }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 md:mb-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(139,92,246,0.8)] animate-pulse" />
          <span className="text-xs font-mono tracking-widest text-zinc-300 uppercase">Premium Digital Agency</span>
        </motion.div>

        <motion.h1 style={{ y: yHeadline }} className="display-huge text-white mb-6 md:mb-8 flex flex-col gap-2">
          <motion.span initial={{ opacity: 0, y: 40, filter: "blur(12px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}>
            We Build Digital
          </motion.span>
          <motion.span initial={{ opacity: 0, y: 40, filter: "blur(12px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 1.2, delay: 0.35, ease: [0.16, 1, 0.3, 1] }} className="text-zinc-500">
            Experiences That
          </motion.span>
          <motion.span initial={{ opacity: 0, y: 40, filter: "blur(12px)", scale: 0.9 }} animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }} transition={{ duration: 1.4, delay: 0.55, ease: [0.16, 1, 0.3, 1] }} className="font-italic-serif font-light text-primary tracking-normal">
            Convert.
          </motion.span>
        </motion.h1>

        <motion.p style={{ y: ySub }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }} className="text-lg md:text-xl text-zinc-400 max-w-2xl font-light leading-relaxed mb-12">
          Cinematic 3D websites, AI automation, and premium software tailored for ambitious brands ready to scale.
        </motion.p>

        <motion.div style={{ y: yCta }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
          <MagneticButton strength={0.2}>
            <button className="w-full sm:w-auto btn-primary flex items-center justify-center gap-2 group" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Start a Project
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </MagneticButton>
          <MagneticButton strength={0.15}>
            <button className="w-full sm:w-auto h-14 px-8 rounded-full text-zinc-400 hover:text-white font-medium flex items-center justify-center transition-colors relative group" onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}>
              View Our Work
              <div className="absolute bottom-3 left-8 right-8 h-[1px] bg-white/20 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
            </button>
          </MagneticButton>
        </motion.div>

        {/* Trust Indicators — using real data from clients.ts */}
        <motion.div 
          style={{ y: yTrust }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-16 md:mt-24 pt-8 border-t border-white/5 w-full flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12"
        >
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {featuredClients.map((client) => (
                <InitialsAvatar
                  key={client.name}
                  name={client.name}
                  src={client.avatar || undefined}
                  size="sm"
                  className="border-2 border-[#09090B]"
                />
              ))}
            </div>
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={14} className="fill-accent text-accent" />
                ))}
              </div>
              <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">Trusted by 40+ Brands</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 1 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent relative overflow-hidden">
          <motion.div animate={{ y: [-20, 64] }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-primary" />
        </div>
      </motion.div>
    </section>
  )
}
