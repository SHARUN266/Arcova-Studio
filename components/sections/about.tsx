"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { RevealSection, SplitText, staggerContainer, staggerItem } from "@/lib/motion"

// Simplified counter for the stats
function StatCounter({ value, label, suffix = "" }: { value: string, label: string, suffix?: string }) {
  return (
    <motion.div
      variants={staggerItem}
      className="flex flex-col gap-2 p-6 rounded-2xl bg-[#0C0C0F] border border-white/5 relative overflow-hidden group hover:border-primary/20 transition-colors duration-500"
    >
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
      <span className="text-4xl md:text-5xl font-black text-white tracking-tighter">
        {value}<span className="text-primary">{suffix}</span>
      </span>
      <span className="text-sm font-medium text-zinc-500 uppercase tracking-widest">{label}</span>
    </motion.div>
  )
}

export function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  // Subtle parallax on stats grid
  const yStats = useTransform(scrollYProgress, [0, 1], [50, -30])

  return (
    <section id="about" className="section-cinematic bg-[#09090B] relative section-border" ref={containerRef}>
      <div className="container mx-auto max-w-7xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left: Typography & Story */}
          <RevealSection variant={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
          }}>
            <div className="flex flex-col gap-8">
              <span className="label-mono text-primary">About Nexora</span>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-white font-medium leading-tight">
                <SplitText>We build digital</SplitText>
                <br />
                <span className="font-italic-serif text-zinc-500 font-light">
                  <SplitText>experiences that</SplitText>
                </span>
                <br />
                <SplitText>leave a mark.</SplitText>
              </h2>
              
              <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-xl">
                We are a boutique digital studio specializing in premium web development, 3D interactions, and AI-driven automation. We don't just build websites; we engineer scalable digital infrastructure for ambitious brands worldwide.
              </p>

              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="flex flex-wrap gap-4 mt-4"
              >
                {['Premium Quality', 'High Performance', 'Scalable Code'].map((badge) => (
                  <motion.div 
                    key={badge} 
                    variants={staggerItem}
                    className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-zinc-300"
                  >
                    {badge}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </RevealSection>

          {/* Right: Stats Grid — with parallax */}
          <motion.div style={{ y: yStats }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-15%" }}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              <div className="sm:col-span-2">
                <StatCounter value="50" suffix="+" label="Projects Delivered" />
              </div>
              <StatCounter value="4.9" suffix="★" label="Client Rating" />
              <StatCounter value="<2" suffix="h" label="Avg Response Time" />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
