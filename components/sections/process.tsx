"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { PhoneCall, PencilRuler, ClipboardCheck, Rocket } from "lucide-react"
import { SplitText, staggerContainer, staggerItem } from "@/lib/motion"

const steps = [
  { number: "01", title: "Discovery", description: "We dive deep into your brand, understanding your goals, audience, and the unique value you provide to your market.", icon: PhoneCall },
  { number: "02", title: "Design & Build", description: "We architect a premium cinematic experience using cutting-edge technologies like Next.js, Three.js, and Framer Motion.", icon: PencilRuler },
  { number: "03", title: "Deployment", description: "Rigorous testing across all devices. We deploy your system to edge networks for instantaneous global loading speeds.", icon: ClipboardCheck },
  { number: "04", title: "Scale", description: "Post-launch, we monitor analytics and optimize conversion rates to ensure maximum ROI for your digital asset.", icon: Rocket },
]

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const lineInView = useInView(lineRef, { once: true, margin: "-20%" })
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] })
  const yGlow = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section id="process" className="section-cinematic relative overflow-hidden bg-[#09090B] section-border" ref={containerRef}>
      <motion.div style={{ y: yGlow }} className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="container mx-auto relative z-10 max-w-7xl">
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="label-mono text-primary mb-4 tracking-widest uppercase">The Protocol</motion.span>
          <h2 className="text-white">
            <SplitText>From concept to</SplitText><br />
            <span className="text-zinc-500 font-light font-italic-serif"><SplitText>conversion.</SplitText></span>
          </h2>
        </div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative">
          <div ref={lineRef} className="hidden lg:block absolute top-12 left-24 right-24 h-px z-0 overflow-hidden">
            <motion.div className="w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent origin-left" initial={{ scaleX: 0 }} animate={lineInView ? { scaleX: 1 } : { scaleX: 0 }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }} />
          </div>
          {steps.map((step) => (
            <motion.div key={step.title} variants={staggerItem} className="group relative z-10">
              <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="bg-[#0C0C0F] border border-white/5 group-hover:border-primary/20 p-8 md:p-10 rounded-3xl transition-colors duration-500 h-full overflow-hidden flex flex-col items-center text-center">
                <span className="absolute -top-4 -right-2 text-7xl font-black text-white/[0.02] group-hover:text-primary/[0.05] transition-colors duration-500 select-none pointer-events-none">{step.number}</span>
                <motion.div className="w-14 h-14 rounded-2xl bg-[#111114] border border-white/5 flex items-center justify-center text-zinc-500 mb-8 group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/30 transition-all duration-500 relative z-10 glow-purple" whileHover={{ scale: 1.1, rotate: 8 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                  <step.icon size={24} />
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-4 relative z-10 tracking-tight">{step.title}</h3>
                <p className="text-sm text-zinc-400 font-light leading-relaxed relative z-10">{step.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
