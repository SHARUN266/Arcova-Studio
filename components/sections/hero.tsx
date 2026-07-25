"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Star, Layers, Sparkles, Command, ShieldCheck, Zap, TrendingUp, CheckCircle2 } from "lucide-react"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { InitialsAvatar } from "@/components/ui/initials-avatar"
import { getFeaturedClients } from "@/data/clients"

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const featuredClients = getFeaturedClients().slice(0, 4)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const yContent = useTransform(scrollYProgress, [0, 1], [0, 80])
  const opacityContent = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[95vh] flex items-center justify-center pt-28 pb-20 overflow-hidden bg-[#FAFAF8] bg-grid-pattern"
    >
      {/* Dynamic Cursor Spotlight Effect */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 opacity-60"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(242, 101, 48, 0.07), transparent 70%)`,
        }}
      />

      {/* Ambient Radial Blur */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] bg-[#ff6321]/[0.06] rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Left Floating Interactive Micro-Widget (Core Web Vitals Metric) */}
      <div className="hidden xl:block absolute left-[3%] top-[42%] -translate-y-1/2 z-20">
        <motion.div
          initial={{ opacity: 0, x: -50, rotate: -4 }}
          animate={{ opacity: 1, x: 0, rotate: -3 }}
          transition={{ duration: 1, delay: 0.3 }}
          whileHover={{ scale: 1.05, rotate: 0 }}
          className="w-60 p-4 rounded-2xl bg-white/90 backdrop-blur-xl border border-gray-200/90 shadow-stripe flex flex-col gap-3 group cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">Speed Index</span>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">0.4s Fast</span>
          </div>
          <div className="flex items-baseline justify-between border-t border-gray-100 pt-2">
            <div>
              <p className="text-2xl font-extrabold text-[#1A1A1A]">99<span className="text-sm font-normal text-gray-400">/100</span></p>
              <p className="text-[11px] text-gray-500 font-medium">Core Web Vitals</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#ff6321]/10 flex items-center justify-center text-[#ff6321]">
              <Zap size={18} className="fill-[#ff6321]" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Floating Interactive Micro-Widget (AI Lead Engine) */}
      <div className="hidden xl:block absolute right-[3%] top-[42%] -translate-y-1/2 z-20">
        <motion.div
          initial={{ opacity: 0, x: 50, rotate: 4 }}
          animate={{ opacity: 1, x: 0, rotate: 3 }}
          transition={{ duration: 1, delay: 0.4 }}
          whileHover={{ scale: 1.05, rotate: 0 }}
          className="w-60 p-4 rounded-2xl bg-white/90 backdrop-blur-xl border border-gray-200/90 shadow-stripe flex flex-col gap-3 group cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Sparkles size={14} className="text-[#ff6321]" />
              <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">AI Engine</span>
            </div>
            <span className="text-[10px] font-mono font-bold text-[#ff6321] bg-[#ff6321]/10 px-2 py-0.5 rounded-full border border-[#ff6321]/20">Active</span>
          </div>
          <div className="flex items-center gap-3 border-t border-gray-100 pt-2">
            <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center text-white shrink-0">
              <TrendingUp size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-[#1A1A1A] leading-tight">+310% Leads</p>
              <p className="text-[11px] text-gray-500 font-medium">Auto-Nurture 24/7</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Hero Content */}
      <motion.div
        style={{ y: yContent, opacity: opacityContent }}
        className="container mx-auto px-6 relative z-10 w-full max-w-4xl flex flex-col items-center text-center mt-4 md:mt-10"
      >
        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 mb-8 rounded-full border border-gray-200/90 bg-white/90 backdrop-blur-md shadow-xs group cursor-pointer hover:border-[#ff6321]/40 transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-[#ff6321] animate-ping" />
          <span className="text-xs font-mono tracking-widest text-gray-600 uppercase font-bold">
            DIGITAL AGENCY ✦ STRATEGY & CODE
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-[#1A1A1A] tracking-tight leading-[1.06] mb-6"
        >
          We design brands <br className="hidden sm:inline" />
          that move{" "}
          <span className="relative inline-block text-[#ff6321]">
            people
            <svg
              className="absolute -bottom-2 left-0 w-full h-3 text-[#ff6321]/30"
              viewBox="0 0 100 20"
              preserveAspectRatio="none"
              fill="none"
            >
              <path d="M0,15 Q50,0 100,15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl font-normal leading-relaxed mb-10"
        >
          We combine strategy, design, and technology to help ambitious brands stand out & create meaningful digital experiences.
        </motion.p>

        {/* Action Buttons & Annotation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="relative flex flex-col items-center"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full sm:w-auto">
            <MagneticButton strength={0.2}>
              <button
                className="w-full sm:w-auto h-14 px-9 rounded-2xl bg-[#ff6321] text-white font-bold text-base hover:bg-[#E0531E] hover:scale-[1.02] shadow-[0_10px_30px_rgba(242,101,48,0.35)] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                <span>Discuss your ideas</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </MagneticButton>
            <MagneticButton strength={0.15}>
              <button
                className="w-full sm:w-auto h-14 px-9 rounded-2xl bg-[#1A1A1A] text-white font-bold text-base hover:bg-black hover:scale-[1.02] shadow-[0_8px_25px_rgba(0,0,0,0.15)] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
              >
                View Services
              </button>
            </MagneticButton>
          </div>

          {/* Handwritten Annotation */}
          <div className="hidden sm:flex items-center gap-2 mt-5 -ml-28 text-left">
            <svg className="w-8 h-8 text-[#ff6321] transform -rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            <span className="font-[family-name:var(--font-caveat)] text-2xl text-[#ff6321] tracking-wide font-semibold">
              Schedule a free call now
            </span>
          </div>
        </motion.div>

        {/* Social Proof / Trust Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.65 }}
          className="mt-16 md:mt-20 pt-8 border-t border-gray-200/80 w-full flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12"
        >
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {featuredClients.map((client) => (
                <InitialsAvatar
                  key={client.name}
                  name={client.name}
                  src={client.avatar || undefined}
                  size="sm"
                  className="border-2 border-[#FAFAF8]"
                />
              ))}
            </div>
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={14} className="fill-[#F26530] text-[#F26530]" />
                ))}
              </div>
              <span className="text-xs font-mono tracking-widest text-gray-500 uppercase font-semibold">
                Trusted by 40+ Brands
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
