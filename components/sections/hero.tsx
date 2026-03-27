"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Star, TrendingUp, CheckCircle2 } from "lucide-react"

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Minimal scroll parallax for the right column to add depth (hardware accelerated)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const yElement = useTransform(scrollYProgress, [0, 1], [0, 80])
  const opacityElement = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={containerRef} className="relative min-h-[100vh] flex items-center pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden bg-[#000000]">
      
      {/* 
        Background: Static Conic Glow. 
        Performance-friendly approach: No constant pulsing, purely a static heavily blurred element 
        using the exact colors requested, pushed heavily to the right behind the UI mockups. 
      */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center lg:justify-end items-end lg:items-center opacity-70 mix-blend-screen z-0">
        <div 
          className="w-[140vw] lg:w-[80vw] max-w-[1200px] aspect-square lg:aspect-[2/1] rounded-full blur-[100px] sm:blur-[140px] translate-y-[30%] lg:translate-y-0 lg:translate-x-[20%]"
          style={{
            background: "conic-gradient(red 0deg,#ff001a 54.8916deg,#00a6ff 106.699deg,#4797ff 162deg,#04f 252deg,#ff8000 306deg,red 360deg)"
          }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          
          {/* Left Column: Copy & Trust & CTAs */}
          <div className="col-span-1 lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Minimal Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full bg-white/[0.05] border border-white/10"
            >
              <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]" />
              <span className="text-xs font-mono tracking-widest text-white/80 uppercase">Premium Digital Agency</span>
            </motion.div>

            {/* Headline with structured 'Smoke' reveal */}
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.05 } }
              }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5rem] leading-[1.1] font-sans font-medium tracking-tight mb-8 w-full flex flex-wrap justify-center lg:justify-start gap-x-[0.25em] gap-y-2 lg:gap-y-4"
            >
              {[
                { text: "We" }, { text: "Build" }, { text: "Digital" }, { text: "Experiences", br: true },
                { text: "That" }, { text: "Dominate.", highlight: true }
              ].map((item, i) => (
                <span key={i} className="inline-block relative">
                   <motion.span
                     variants={{
                       hidden: { opacity: 0, filter: "blur(12px)", y: 20 },
                       visible: { opacity: 1, filter: "blur(0px)", y: 0 }
                     }}
                     transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                     className={`inline-block ${item.highlight ? "font-serif italic text-primary font-light tracking-normal" : "text-white"}`}
                   >
                     {item.text}
                   </motion.span>
                   {item.br && <div className="w-full hidden lg:block" />}
                </span>
              ))}
            </motion.h1>

            {/* Benefit-Driven Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl text-white/60 max-w-xl font-light leading-relaxed mb-10"
            >
              Arcova Studio partners with forward-thinking companies to design, engineer, and scale high-converting websites that perform ruthlessly.
            </motion.p>

            {/* High-Converting CTA Hierarchy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6"
            >
              <button
                className="w-full sm:w-auto h-14 px-8 rounded-full bg-primary text-white font-sans font-semibold text-lg flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-transform duration-300 shadow-[0_0_20px_rgba(255,69,51,0.3)] hover:shadow-[0_0_30px_rgba(255,69,51,0.5)]"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Book a Call
                <ArrowRight size={18} className="translate-y-[1px]" />
              </button>
              <button
                className="w-full sm:w-auto h-14 px-8 rounded-full text-white/60 hover:text-white font-sans font-medium text-base flex items-center justify-center transition-colors duration-300 relative group"
                onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Selected Work
                {/* Secondary CTA Subdued Underline */}
                <div className="absolute bottom-3 left-8 right-8 h-[1px] bg-white/20 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </button>
            </motion.div>

            {/* Instant Trust Indicators */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-12 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 pt-8 border-t border-white/10 w-full max-w-sm lg:max-w-none"
            >
              <div className="flex -space-x-3">
                {[11, 12, 13, 14].map((id) => (
                  <div key={id} className="w-10 h-10 rounded-full border-2 border-black bg-[#1A1A1A] flex items-center justify-center overflow-hidden">
                    {/* Using Pravatar for sleek generic user faces as placeholder */}
                    <img src={`https://i.pravatar.cc/100?img=${id}`} alt={`Client ${id}`} className="w-full h-full object-cover opacity-90 grayscale" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center sm:items-start gap-1">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={14} className="fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-sm font-sans text-white/50">Trusted by 40+ ambitious brands</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: HTML/CSS Based UI Mockups (Performance Friendly 3D) */}
          <motion.div 
            style={{ y: yElement, opacity: opacityElement }}
            className="col-span-1 lg:col-span-5 relative w-full aspect-[4/3] sm:aspect-video lg:aspect-square mt-4 lg:mt-0 perspective-[2000px]"
          >
            {/* Top UI Mockup: Conversion Chart */}
            <motion.div 
              animate={{ y: [-6, 6, -6] }} 
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute top-[10%] right-[5%] sm:right-[15%] lg:right-[5%] w-[85%] sm:w-[70%] lg:w-[85%] bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-5 sm:p-6 shadow-2xl z-10 transform lg:rotate-y-[-10deg] rotate-0"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                    <TrendingUp size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">Conversion Rate</h4>
                    <p className="text-white/40 text-xs">Past 30 Days</p>
                  </div>
                </div>
                <span className="text-primary font-mono text-sm font-bold bg-primary/10 px-2 py-1 rounded-md">+24.8%</span>
              </div>
              {/* Semantic CSS Bar Chart */}
              <div className="w-full h-24 flex items-end justify-between gap-1.5 sm:gap-2 pb-2">
                {[40, 70, 45, 90, 65, 100].map((h, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 1.2, delay: 0.5 + (i * 0.1), ease: "easeOut" }}
                    className="w-full bg-gradient-to-t from-primary/30 to-primary rounded-sm relative group cursor-pointer"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black text-[10px] font-bold py-1 px-2 rounded">
                      {h}%
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Bottom UI Mockup: Task Completion */}
            <motion.div 
              animate={{ y: [6, -6, 6] }} 
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
              className="absolute bottom-[10%] left-[5%] sm:left-[15%] lg:left-[0%] w-[80%] sm:w-[65%] lg:w-[80%] bg-[#050505]/90 backdrop-blur-xl border border-white/5 rounded-3xl p-5 sm:p-6 shadow-2xl z-20 transform lg:-rotate-y-[15deg] rotate-0"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#1A1A1A] border border-primary/30 flex items-center justify-center shadow-[0_0_15px_rgba(255,69,51,0.2)]">
                    <CheckCircle2 size={24} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">Arcova Studio Protocol</h4>
                    <p className="text-white/40 text-xs">Project Deployed Live</p>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mt-2">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
                    className="h-full bg-primary rounded-full relative"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
