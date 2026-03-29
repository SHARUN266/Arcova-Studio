"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const services = [
  {
    id: "01",
    title: "Conversion-Engine Websites",
    description: "Stop losing customers to competitors because of a slow, outdated site. We build high-performance sales machines that force local Agra traffic to take action.",
    features: ["Direct-Response Design", "Speed-Optimized Architecture", "WhatsApp Lead Hooks", "Mobile-First Conversion"],
    glow: "radial-gradient(circle at top left, rgba(255, 75, 51, 0.15), transparent 50%)",
  },
  {
    id: "02",
    title: "Auto-Pilot Lead Capture",
    description: "40% of local leads are lost due to slow response. Our intelligent systems respond to and nurture your leads 24/7 so you never miss another booking.",
    features: ["24/7 Automated Response", "CRM Integration", "Instant WhatsApp Alerts", "Booking Workflows"],
    glow: "radial-gradient(circle at top right, rgba(56, 189, 248, 0.15), transparent 50%)",
  },
  {
    id: "03",
    title: "Agra-Targeted Ads (ROI Focus)",
    description: "Stop wasting money on vague 'brand awareness' ads. We run high-performance Meta and Google campaigns that put your offer in front of ready-to-buy customers.",
    features: ["Local Market Targeting", "Creative Ad Straegy", "Lead Quality Filtering", "Monthly ROI Reports"],
    glow: "radial-gradient(circle at bottom, rgba(255, 75, 51, 0.15), transparent 50%)",
  },
]



export function Services() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-10%" })

  return (
    <section id="services" className="section-padding py-40 relative flex items-center justify-center bg-[#000000] overflow-hidden">
      <div className="container mx-auto relative z-10 max-w-6xl" ref={containerRef}>
        
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-20 flex flex-col items-center">

          <span className="label-mono mb-6 text-primary tracking-[0.3em] uppercase">The Growth System</span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-sans font-medium tracking-tight leading-tight mb-8">
            Engineered for <br />
            <span className="text-gradient font-italic-serif font-light">ROI.</span>
          </h2>
          <p className="body-large opacity-60 max-w-2xl leading-relaxed">
            We don't just "make websites." We build the entire infrastructure your local business needs to dominate the Agra market.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full auto-rows-fr">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`relative group bg-[#0A0A0A] rounded-[2rem] border border-white/5 overflow-hidden flex flex-col items-center text-center p-8 md:p-12 lg:p-16 h-full justify-center transition-all duration-500 hover:border-white/10 ${index === 2 ? 'md:col-span-2 max-w-4xl mx-auto w-full' : ''}`}
            >
              {/* Ambient Edge Glow */}
              <div 
                className="absolute inset-0 z-0 opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-screen"
                style={{ background: service.glow }}
              />

              {/* Card Content */}
              <div className="relative z-10 flex flex-col items-center w-full">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-sans font-medium tracking-tight text-white mb-4 md:mb-6">
                  {service.title}
                </h3>
                <p className="text-white/60 text-base sm:text-lg leading-relaxed max-w-sm md:max-w-md mx-auto mb-6 md:mb-8 font-light">
                  {service.description}
                </p>

                {/* Hidden Features & Price (Hover Reveal) to maintain minimal look by default */}
                <div className="w-full h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 overflow-hidden flex flex-col items-center">
                  <div className="flex flex-wrap justify-center gap-2 mb-6 pointer-events-none">
                    {service.features.map(f => (
                      <span key={f} className="text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/70 font-mono">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        
      </div>
    </section>
  )
}
