"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Star, Quote, TrendingUp, ShieldCheck } from "lucide-react"
import { Counter } from "@/components/ui/counter"
import { InitialsAvatar } from "@/components/ui/initials-avatar"
import { scaleReveal, SplitText } from "@/lib/motion"
import { getFeaturedClients, type Client } from "@/data/clients"

function TestimonialCard({ testimonial, index }: { testimonial: Client; index: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={scaleReveal}
      transition={{ delay: index * 0.12 }}
      className="group relative bg-white border border-gray-200/90 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between h-full overflow-hidden shadow-stripe hover:border-[#ff6321]/40 hover:shadow-[0_25px_50px_rgba(255,99,33,0.1)] transition-all duration-500"
    >
      <div>
        <div className="flex justify-between items-start mb-8 relative z-10 w-full">
          <div className="bg-[#ff6321]/10 border border-[#ff6321]/20 rounded-2xl p-3.5 flex items-center gap-3.5">
            <div className="w-10 h-10 shrink-0 rounded-xl bg-[#ff6321] flex items-center justify-center text-white shadow-xs">
              <TrendingUp size={18} />
            </div>
            <div>
              <div className="text-2xl font-black text-[#1A1A1A] flex items-baseline leading-none mb-1 tracking-tight">
                <Counter value={testimonial.results.value} />
                <span className="text-[#ff6321] text-xl ml-0.5">{testimonial.results.suffix}</span>
              </div>
              <p className="text-[9px] uppercase font-mono font-bold tracking-widest text-gray-500 leading-tight">
                {testimonial.results.label}
              </p>
            </div>
          </div>
          <Quote className="text-gray-200 group-hover:text-[#ff6321]/20 transition-colors duration-500 shrink-0 ml-4" size={40} strokeWidth={1.5} />
        </div>

        <p className="text-base md:text-lg mb-8 text-gray-700 font-normal leading-relaxed">
          &ldquo;{testimonial.text}&rdquo;
        </p>
      </div>

      <div className="flex items-center gap-4 pt-6 border-t border-gray-100 relative z-10">
        <InitialsAvatar
          name={testimonial.name}
          src={testimonial.avatar || undefined}
          size="lg"
          className="group-hover:scale-105 transition-transform duration-500 border-2 border-gray-100 shrink-0"
        />
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="font-bold text-base text-[#1A1A1A] leading-tight">{testimonial.name}</span>
            <ShieldCheck size={14} className="text-[#ff6321]" />
          </div>
          <span className="text-xs text-gray-500 mb-1">{testimonial.role}, {testimonial.business}</span>
          <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#ff6321] bg-[#ff6321]/10 px-2 py-0.5 rounded-md w-fit">
            {testimonial.tag}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null)
  const featuredClients = getFeaturedClients()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const yOffset1 = useTransform(scrollYProgress, [0, 1], [0, -20])
  const yOffset2 = useTransform(scrollYProgress, [0, 1], [20, -20])
  const yOffset3 = useTransform(scrollYProgress, [0, 1], [40, -10])
  const offsets = [yOffset1, yOffset2, yOffset3]

  return (
    <section id="testimonials" className="section-cinematic relative overflow-hidden bg-[#FAFAF8] section-border" ref={containerRef}>
      <div className="container mx-auto relative z-10 max-w-7xl">
        {/* Centered Clean Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="label-mono mb-4 text-[#ff6321] tracking-widest uppercase"
          >
            Verified Client Outcomes
          </motion.span>
          
          <h2 className="text-[#1A1A1A] max-w-3xl">
            <SplitText>Real impact for</SplitText>{" "}
            <span className="text-gray-500 font-serif italic font-normal">
              <SplitText>ambitious brands.</SplitText>
            </span>
          </h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white border border-gray-200 shadow-stripe"
          >
            <div className="flex gap-1 text-[#ff6321]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
            </div>
            <span className="text-xs font-mono font-bold text-gray-800 tracking-wider uppercase text-[11px]">
              4.9 / 5.0 Rating Across 40+ Clients
            </span>
          </motion.div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
          {featuredClients.map((client, i) => (
            <motion.div key={client.name} style={{ y: offsets[i % offsets.length] }}>
              <TestimonialCard testimonial={client} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
