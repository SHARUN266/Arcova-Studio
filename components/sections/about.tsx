"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { CheckCircle2, ShieldCheck, Zap, Award, Sparkles, ArrowUpRight } from "lucide-react"
import { RevealSection, SplitText, staggerContainer, staggerItem } from "@/lib/motion"

function StatCounter({ value, label, suffix = "", icon: Icon }: { value: string; label: string; suffix?: string; icon: any }) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white border border-gray-200/90 shadow-stripe relative overflow-hidden group hover:border-[#ff6321]/40 transition-all duration-500"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-[#ff6321]/10 flex items-center justify-center text-[#ff6321] group-hover:scale-110 transition-transform">
          <Icon size={20} />
        </div>
        <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Verified</span>
      </div>
      <div>
        <span className="text-4xl md:text-5xl font-black text-[#1A1A1A] tracking-tight block mb-1">
          {value}<span className="text-[#ff6321]">{suffix}</span>
        </span>
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">{label}</span>
      </div>
    </motion.div>
  )
}

export function About() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const yParallax = useTransform(scrollYProgress, [0, 1], [30, -30])

  return (
    <section id="about" className="section-cinematic bg-[#FAFAF8] relative section-border" ref={containerRef}>
      <div className="container mx-auto max-w-7xl">
        
        {/* Header Tagline */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="label-mono text-[#ff6321] mb-4 tracking-widest uppercase"
          >
            The Arcova Standard
          </motion.span>
          <h2 className="text-[#1A1A1A] max-w-3xl">
            <SplitText>Craftsmanship over</SplitText>{" "}
            <span className="font-serif italic text-gray-500 font-normal">
              <SplitText>templates.</SplitText>
            </span>
          </h2>
        </div>

        {/* Bento Storytelling Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Story Card (Lg: 7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-white border border-gray-200/90 rounded-[2.5rem] p-8 md:p-12 shadow-stripe flex flex-col justify-between relative overflow-hidden group hover:border-[#ff6321]/30 transition-all duration-500"
          >
            <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#ff6321]/[0.04] rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gray-200 bg-[#F5F5F3] w-fit">
                <Sparkles size={14} className="text-[#ff6321]" />
                <span className="text-[11px] font-mono font-bold text-gray-600 uppercase tracking-wider">Our Philosophy</span>
              </div>

              <h3 className="text-3xl md:text-4xl text-[#1A1A1A] font-extrabold leading-tight tracking-tight">
                We build digital experiences that <br />
                <span className="font-serif italic font-normal text-[#ff6321]">leave a permanent mark.</span>
              </h3>

              <p className="text-base md:text-lg text-gray-600 font-normal leading-relaxed">
                We are a boutique digital studio specializing in strategic brand design, high-performance web development, and AI-driven growth solutions. We don't just build websites; we engineer digital assets for ambitious brands worldwide.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                {["Pixel-Perfect UI", "Edge Performance", "Zero Code Bloat", "Conversion Science"].map((badge) => (
                  <div
                    key={badge}
                    className="px-4 py-2 rounded-full border border-gray-200/90 bg-[#F5F5F3] text-xs font-bold text-gray-700 shadow-2xs flex items-center gap-1.5"
                  >
                    <CheckCircle2 size={13} className="text-[#ff6321]" />
                    {badge}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column Bento Cards (Lg: 5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Bento Top: Craft Comparison Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white border border-gray-200/90 rounded-[2.5rem] p-8 shadow-stripe relative overflow-hidden group hover:border-[#ff6321]/30 transition-all duration-500"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-[#ff6321] uppercase tracking-wider">Architecture Difference</span>
                <span className="w-2 h-2 rounded-full bg-[#ff6321] animate-ping" />
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/60">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    <span className="text-xs font-bold text-gray-900">Arcova Engine</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-emerald-700">Next.js + 100/100 Vitals</span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 border border-gray-200/60 opacity-60">
                  <div className="flex items-center gap-2.5">
                    <span className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center text-[10px] text-gray-400">✕</span>
                    <span className="text-xs font-medium text-gray-600">Generic Templates</span>
                  </div>
                  <span className="text-[11px] font-mono text-gray-500">Heavy Plugins & Slow</span>
                </div>
              </div>
            </motion.div>

            {/* Bento Bottom: Stat Grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              variants={staggerContainer}
              className="grid grid-cols-2 gap-4"
            >
              <StatCounter value="50" suffix="+" label="Projects Built" icon={Award} />
              <StatCounter value="4.9" suffix="★" label="Client Rating" icon={ShieldCheck} />
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  )
}
