"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { PhoneCall, PencilRuler, ClipboardCheck, Rocket, CheckCircle2 } from "lucide-react"
import { SplitText, staggerContainer, staggerItem } from "@/lib/motion"

const steps = [
  {
    number: "01",
    title: "Discovery & Strategy",
    description: "We audit your existing ecosystem, identify conversion leaks, and engineer a customized digital blueprint.",
    timeline: "Week 1",
    deliverables: ["Competitor Audit", "Conversion Architecture", "Brand Positioning"],
    icon: PhoneCall,
  },
  {
    number: "02",
    title: "Design & Craft",
    description: "We craft custom high-fidelity UI components, micro-animations, and interactive responsive layouts.",
    timeline: "Week 2-3",
    deliverables: ["Custom Figma UI", "Design System", "Motion Prototypes"],
    icon: PencilRuler,
  },
  {
    number: "03",
    title: "Build & Optimize",
    description: "We write clean Next.js 15 code, integrate AI automations, and optimize Core Web Vitals to 99+.",
    timeline: "Week 4",
    deliverables: ["Next.js App", "Fast Edge Deploy", "AI Automation Setup"],
    icon: ClipboardCheck,
  },
  {
    number: "04",
    title: "Launch & Scale",
    description: "We deploy to global CDN edge networks, monitor real-time telemetry, and optimize for max ROI.",
    timeline: "Ongoing",
    deliverables: ["Global CDN Edge", "Telemetry Tracking", "Continuous Optimization"],
    icon: Rocket,
  },
]

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const lineInView = useInView(lineRef, { once: true, margin: "-20%" })

  return (
    <section id="process" className="section-cinematic relative overflow-hidden bg-[#FAFAF8] section-border" ref={containerRef}>
      <div className="container mx-auto relative z-10 max-w-7xl">
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="label-mono text-[#F26530] mb-4 tracking-widest uppercase"
          >
            The Arcova Methodology
          </motion.span>
          <h2 className="text-[#1A1A1A]">
            <SplitText>From concept to</SplitText>
            <br />
            <span className="text-gray-500 font-serif italic font-normal">
              <SplitText>conversion.</SplitText>
            </span>
          </h2>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative"
        >
          {/* Animated Connecting Beam Line */}
          <div ref={lineRef} className="hidden lg:block absolute top-14 left-24 right-24 h-[2px] z-0 overflow-hidden">
            <motion.div
              className="w-full h-full bg-gradient-to-r from-[#F26530]/20 via-[#F26530] to-[#F26530]/20 origin-left"
              initial={{ scaleX: 0 }}
              animate={lineInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            />
          </div>

          {steps.map((step) => (
            <motion.div key={step.title} variants={staggerItem} className="group relative z-10">
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="bg-white border border-gray-200/90 group-hover:border-[#F26530]/40 p-8 rounded-[2.5rem] transition-all duration-500 h-full overflow-hidden flex flex-col justify-between shadow-stripe hover:shadow-[0_25px_50px_rgba(242,101,48,0.12)]"
              >
                {/* Background Watermark Step Number */}
                <span className="absolute -top-4 -right-2 text-7xl font-black text-gray-100 group-hover:text-[#F26530]/10 transition-colors duration-500 select-none pointer-events-none font-display">
                  {step.number}
                </span>

                <div>
                  <div className="flex items-center justify-between mb-8">
                    <motion.div
                      className="w-14 h-14 rounded-2xl bg-[#F5F5F3] border border-gray-200 flex items-center justify-center text-gray-700 group-hover:bg-[#F26530] group-hover:text-white group-hover:border-[#F26530] transition-all duration-500 shadow-xs relative z-10"
                      whileHover={{ scale: 1.1, rotate: 6 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <step.icon size={22} />
                    </motion.div>

                    <span className="text-[10px] font-mono font-bold text-[#F26530] bg-[#F26530]/10 px-2.5 py-1 rounded-full border border-[#F26530]/20">
                      {step.timeline}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-3 tracking-tight">{step.title}</h3>
                  <p className="text-xs md:text-sm text-gray-600 font-normal leading-relaxed mb-6">{step.description}</p>
                </div>

                {/* Scope Deliverables */}
                <div className="pt-4 border-t border-gray-100 space-y-1.5">
                  {step.deliverables.map((item) => (
                    <div key={item} className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-500">
                      <CheckCircle2 size={12} className="text-[#F26530] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
