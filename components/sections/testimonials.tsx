"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Star, Quote, TrendingUp } from "lucide-react"
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
      className="group relative bg-[#0C0C0F] border border-white/5 rounded-[2rem] p-8 md:p-10 flex flex-col h-full overflow-hidden shadow-premium hover:border-primary/20 transition-all duration-500"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-screen" />
      
      <div className="flex justify-between items-start mb-10 relative z-10 w-full">
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex items-center gap-4 backdrop-blur-md">
          <div className="w-10 h-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <TrendingUp size={18} />
          </div>
          <div>
            <div className="text-2xl font-black text-white flex items-baseline leading-none mb-1 tracking-tight">
              <Counter value={testimonial.results.value} />
              <span className="text-primary text-xl ml-0.5">{testimonial.results.suffix}</span>
            </div>
            <p className="text-[9px] uppercase font-bold tracking-widest text-zinc-500 leading-tight block w-24 sm:w-auto break-words">{testimonial.results.label}</p>
          </div>
        </div>
        <Quote className="text-white/5 group-hover:text-primary/20 transition-colors duration-500 transform group-hover:scale-110 group-hover:rotate-6 shrink-0 ml-4" size={50} strokeWidth={1} />
      </div>

      <p className="text-lg mb-12 flex-grow text-zinc-300 font-light leading-relaxed">
        &ldquo;{testimonial.text}&rdquo;
      </p>

      <div className="flex items-center gap-5 pt-8 border-t border-white/5 relative z-10">
        <InitialsAvatar
          name={testimonial.name}
          src={testimonial.avatar || undefined}
          size="lg"
          className="group-hover:scale-105 transition-transform duration-500"
        />
        <div className="flex flex-col">
          <span className="font-bold text-base text-white leading-tight mb-1">{testimonial.name}</span>
          <span className="text-xs text-zinc-500 mb-1">{testimonial.role}, {testimonial.business}</span>
          <span className="text-[10px] uppercase font-mono tracking-widest text-primary/60">{testimonial.tag}</span>
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
    offset: ["start end", "end start"]
  })
  
  const yOffset1 = useTransform(scrollYProgress, [0, 1], [0, -20])
  const yOffset2 = useTransform(scrollYProgress, [0, 1], [30, -30])
  const yOffset3 = useTransform(scrollYProgress, [0, 1], [60, -15])
  const offsets = [yOffset1, yOffset2, yOffset3]

  return (
    <section id="testimonials" className="section-cinematic relative overflow-hidden bg-[#09090B] section-border" ref={containerRef}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[200px] pointer-events-none ambient-blob-slow" />
      
      <div className="container mx-auto relative z-10 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-10 mb-16 md:mb-24">
          <div className="max-w-2xl text-center md:text-left">
            <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="label-mono mb-4 block text-primary tracking-widest uppercase">
              Client Success
            </motion.span>
            <h2 className="text-white">
              <SplitText>Real impact for</SplitText>
              <br />
              <span className="text-zinc-500 font-italic-serif font-light">
                <SplitText>ambitious brands.</SplitText>
              </span>
            </h2>
          </div>
          <div className="pb-2 w-full flex justify-center md:justify-end">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="flex items-center gap-3 px-6 py-3 rounded-full bg-[#0C0C0F] border border-white/10 backdrop-blur-md group hover:border-primary/30 transition-colors">
              <div className="flex gap-1 text-amber-500 group-hover:scale-105 transition-transform">
                {[...Array(5)].map((_, i) => (<Star key={i} size={14} fill="currentColor" />))}
              </div>
              <span className="text-sm font-bold text-white tracking-widest uppercase text-[10px]">4.9/5 Average Rating</span>
            </motion.div>
          </div>
        </div>

        {/* Dynamic grid from clients.ts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pb-12">
          {featuredClients.map((client, i) => (
            <motion.div key={client.name} style={{ y: offsets[i % offsets.length] }} className={i === 1 ? "md:translate-y-12 lg:translate-y-16" : i === 2 ? "md:translate-y-0 lg:translate-y-32" : ""}>
              <TestimonialCard testimonial={client} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
