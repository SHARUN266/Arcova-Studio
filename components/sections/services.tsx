"use client"

import { useRef, useState } from "react"
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import { Layout, Cpu, BarChart3, ArrowRight } from "lucide-react"
import { SplitText, staggerContainer, staggerItem } from "@/lib/motion"

const services = [
  {
    id: "01",
    title: "Premium Websites",
    description: "Cinematic, high-performance web experiences that elevate your brand and drive measurable conversions.",
    icon: Layout,
  },
  {
    id: "02",
    title: "AI Automation",
    description: "Intelligent autonomous systems that capture, nurture, and convert leads while you sleep.",
    icon: Cpu,
  },
  {
    id: "03",
    title: "Analytics Dashboards",
    description: "Real-time data visualization that turns complex metrics into clear, actionable growth insights.",
    icon: BarChart3,
  },
]

// 3D Tilt Card Component with enhanced motion
function ServiceCard({ service, index }: { service: typeof services[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"])
  
  // Glow follows mouse position
  const glowX = useTransform(mouseXSpring, [-0.5, 0.5], ["20%", "80%"])
  const glowY = useTransform(mouseYSpring, [-0.5, 0.5], ["20%", "80%"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      variants={staggerItem}
      className="perspective-1000"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative group h-full bg-[#0C0C0F] border border-white/5 rounded-3xl p-8 md:p-10 flex flex-col justify-between overflow-hidden transition-colors duration-500 hover:border-primary/20 aspect-[4/5] sm:aspect-auto sm:min-h-[400px]"
      >
        {/* Mouse-following glow */}
        <motion.div 
          className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-screen"
          style={{ 
            background: useTransform(
              [glowX, glowY],
              ([gx, gy]) => `radial-gradient(circle at ${gx} ${gy}, rgba(139, 92, 246, 0.2), transparent 60%)`
            )
          }}
        />

        {/* Huge faded background number */}
        <div 
          className="absolute -top-6 -right-4 text-[8rem] font-black text-white/[0.02] group-hover:text-primary/[0.05] transition-colors duration-500 z-0 select-none pointer-events-none font-display"
          style={{ transform: "translateZ(-50px)" }}
        >
          {service.id}
        </div>

        {/* Content (pushed forward in 3D space) */}
        <div className="relative z-10 flex flex-col h-full" style={{ transform: "translateZ(30px)" }}>
          <div className="mb-auto">
            <motion.div 
              className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-500 glow-purple"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <service.icon className="w-6 h-6 text-zinc-400 group-hover:text-primary transition-colors" />
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
              {service.title}
            </h3>
            <p className="text-zinc-400 leading-relaxed font-light">
              {service.description}
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">Learn more</span>
            <motion.div
              animate={isHovered ? { x: 4 } : { x: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <ArrowRight className="w-5 h-5 text-primary" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function Services() {
  return (
    <section id="services" className="section-cinematic bg-[#09090B] relative">
      <div className="container mx-auto max-w-7xl">
        
        {/* Section Header — centered for balance */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="label-mono text-primary mb-4 md:mb-6"
          >
            Our Capabilities
          </motion.span>
          <h2 className="text-white max-w-4xl">
            <SplitText>Digital craftsmanship</SplitText>
            <br />
            <span className="text-zinc-500">
              <SplitText>engineered for scale.</SplitText>
            </span>
          </h2>
        </div>

        {/* 3D Cards Grid — improved trigger margin */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-5%" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-fr"
        >
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </motion.div>
        
      </div>
    </section>
  )
}
