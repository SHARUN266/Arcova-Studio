"use client"

import { useRef, useState } from "react"
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import { Layout, Cpu, BarChart3, ArrowRight, CheckCircle2, Code2, Zap, Sparkles } from "lucide-react"
import { SplitText, staggerContainer, staggerItem } from "@/lib/motion"

const services = [
  {
    id: "01",
    title: "Premium Websites",
    description: "Cinematic, high-performance web experiences engineered to elevate your brand and drive measurable conversions.",
    icon: Layout,
    deliverables: ["Next.js 15 App Architecture", "Core Web Vitals 99+", "Tailwind 4 & Motion Physics", "SEO Schema Structure"],
    previewType: "code",
  },
  {
    id: "02",
    title: "AI Lead Automation",
    description: "Autonomous intelligent workflows that capture, qualify, and nurture inbound customer leads 24/7.",
    icon: Cpu,
    deliverables: ["WhatsApp Bot Integration", "Instant Lead Response (<2m)", "CRM Synchronization", "Smart Qualification Engine"],
    previewType: "nodes",
  },
  {
    id: "03",
    title: "Analytics Dashboards",
    description: "Real-time visual telemetry that transforms complex business metrics into clear, actionable growth insights.",
    icon: BarChart3,
    deliverables: ["Live Conversion Telemetry", "Custom KPI Tracking", "Automated Weekly Reports", "Heatmap & Funnel Analysis"],
    previewType: "chart",
  },
]

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [activeChartBar, setActiveChartBar] = useState<number | null>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 180, damping: 18 })
  const mouseYSpring = useSpring(y, { stiffness: 180, damping: 18 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"])

  const glowX = useTransform(mouseXSpring, [-0.5, 0.5], ["15%", "85%"])
  const glowY = useTransform(mouseYSpring, [-0.5, 0.5], ["15%", "85%"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    x.set(mouseX / width - 0.5)
    y.set(mouseY / height - 0.5)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div variants={staggerItem} className="perspective-1000">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative group h-full bg-white border border-gray-200/90 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:border-[#F26530]/40 shadow-stripe hover:shadow-[0_25px_50px_rgba(242,101,48,0.12)] min-h-[520px]"
      >
        {/* Dynamic Cursor Light Glow */}
        <motion.div
          className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([gx, gy]) => `radial-gradient(400px circle at ${gx} ${gy}, rgba(242, 101, 48, 0.09), transparent 70%)`
            ),
          }}
        />

        {/* Background Watermark Number */}
        <div
          className="absolute -top-6 -right-4 text-[9rem] font-black text-gray-100 group-hover:text-[#F26530]/10 transition-colors duration-500 z-0 select-none pointer-events-none font-display"
          style={{ transform: "translateZ(-40px)" }}
        >
          {service.id}
        </div>

        {/* Card Content Header */}
        <div className="relative z-10 flex flex-col" style={{ transform: "translateZ(30px)" }}>
          <div className="flex items-center justify-between mb-8">
            <motion.div
              className="w-14 h-14 rounded-2xl bg-[#F5F5F3] border border-gray-200 flex items-center justify-center group-hover:bg-[#F26530] group-hover:border-[#F26530] group-hover:text-white transition-all duration-500 shadow-xs"
              whileHover={{ scale: 1.1, rotate: 6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <service.icon className="w-6 h-6 text-gray-700 group-hover:text-white transition-colors" />
            </motion.div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#F26530] bg-[#F26530]/10 px-3 py-1 rounded-full border border-[#F26530]/20">
              Capability
            </span>
          </div>

          <h3 className="text-2xl md:text-3xl font-extrabold text-[#1A1A1A] mb-4 tracking-tight">
            {service.title}
          </h3>

          <p className="text-gray-600 leading-relaxed font-normal text-sm md:text-base mb-8">
            {service.description}
          </p>

          {/* Micro-Interactive Visual Preview Widgets */}
          <div className="mb-8 p-4 rounded-2xl bg-[#F5F5F3]/80 border border-gray-200/80">
            {service.previewType === "code" && (
              <div className="flex flex-col gap-2 font-mono text-xs text-gray-600">
                <div className="flex items-center justify-between border-b border-gray-200 pb-2 text-[10px] text-gray-400">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                  </div>
                  <span>page.tsx</span>
                </div>
                <div className="text-gray-800">
                  <span className="text-[#F26530] font-bold">export const</span> Performance = &#123;
                  <br />
                  &nbsp;&nbsp;score: <span className="text-emerald-600 font-bold">100</span>,
                  <br />
                  &nbsp;&nbsp;speed: <span className="text-emerald-600 font-bold">&quot;0.4s&quot;</span>
                  <br />
                  &#125;
                </div>
              </div>
            )}

            {service.previewType === "nodes" && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-[11px] font-mono font-bold text-gray-500">
                  <span>Lead Pipeline</span>
                  <span className="text-emerald-600 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Active
                  </span>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <div className="flex-1 p-2 rounded-xl bg-white border border-gray-200 text-[10px] text-gray-700 text-center font-semibold shadow-2xs">Inbound Form</div>
                  <span className="text-[#F26530] font-bold">→</span>
                  <div className="flex-1 p-2 rounded-xl bg-[#F26530] text-white text-[10px] text-center font-bold shadow-2xs">WhatsApp Bot</div>
                </div>
              </div>
            )}

            {service.previewType === "chart" && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-[11px] font-mono font-bold text-gray-500">
                  <span>Conversion Rate</span>
                  <span className="text-[#F26530] font-bold">+240% YoY</span>
                </div>
                <div className="flex items-end gap-2 h-12 pt-2">
                  {[35, 55, 45, 75, 95].map((val, i) => (
                    <div
                      key={i}
                      onMouseEnter={() => setActiveChartBar(i)}
                      onMouseLeave={() => setActiveChartBar(null)}
                      className={`flex-1 rounded-t-lg transition-all cursor-pointer ${
                        activeChartBar === i ? "bg-[#F26530]" : "bg-gray-300 group-hover:bg-[#F26530]/40"
                      }`}
                      style={{ height: `${val}%` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Deliverable Checklist */}
          <div className="space-y-2 mb-6">
            {service.deliverables.map((item) => (
              <div key={item} className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                <CheckCircle2 size={14} className="text-[#F26530] shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card Footer CTA */}
        <div
          className="relative z-10 pt-6 border-t border-gray-100 flex items-center justify-between group/cta cursor-pointer"
          style={{ transform: "translateZ(30px)" }}
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
        >
          <span className="text-xs font-bold text-[#1A1A1A] group-hover:text-[#F26530] uppercase tracking-wider transition-colors">
            Get Proposal
          </span>
          <motion.div
            animate={isHovered ? { x: 5 } : { x: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-9 h-9 rounded-full bg-[#F5F5F3] group-hover:bg-[#F26530] group-hover:text-white flex items-center justify-center text-gray-700 transition-all shadow-2xs"
          >
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function Services() {
  return (
    <section id="services" className="section-cinematic bg-[#FAFAF8] relative">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="label-mono text-[#F26530] mb-4 md:mb-6 tracking-widest uppercase"
          >
            Our Core Offerings
          </motion.span>
          <h2 className="text-[#1A1A1A] max-w-4xl">
            <SplitText>Digital craftsmanship</SplitText>
            <br />
            <span className="text-gray-500 font-serif italic font-normal">
              <SplitText>engineered for scale.</SplitText>
            </span>
          </h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-5%" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr"
        >
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
