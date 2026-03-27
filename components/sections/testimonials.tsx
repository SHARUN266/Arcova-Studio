"use client"

import React from "react"
import { motion } from "framer-motion"
import { Star, Quote, TrendingUp } from "lucide-react"
import { Counter } from "@/components/ui/counter"

const testimonials = [
  {
    name: "Mohit Bansal",
    business: "Bansal Leather Exports",
    role: "Owner",
    avatar: "/images/testimonials/avatar1.png",
    location: "Sadar Bazaar, Agra",
    text: "Actually, we were struggling with an old website that didn't show our craft properly. The Arcova team came to our workshop, understood how we work, and built something that genuinely represents us.",
    tag: "Traditional Business",
    results: {
      value: 215,
      suffix: "%",
      label: "Increase in B2B Inquiries"
    }
  },
  {
    name: "Dr. Varun Kalra",
    business: "Kalra Eye Center",
    role: "Lead Surgeon",
    avatar: "/images/testimonials/avatar2.png",
    location: "Sanjay Place, Agra",
    text: "Most agencies just promised traffic, but these guys fixed our patient booking flow. It's much simpler now. Being able to meet them locally makes everything so much easier than working with an agency far away.",
    tag: "Healthcare",
    results: {
      value: 40,
      suffix: "%",
      label: "More Online Bookings"
    }
  },
  {
    name: "Karan Malhotra",
    business: "The Mughal Kitchen",
    role: "Founder",
    avatar: "/images/testimonials/avatar3.png",
    location: "Fatehabad Road, Agra",
    text: "Our restaurant needed a digital presence that matched our food quality. They did an amazing job with the photography and the layout. Our reservations have definitely seen a boost. Very grounded team.",
    tag: "Hospitality",
    results: {
      value: 3,
      suffix: "x",
      label: "Return on Investment"
    }
  },
]

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0], index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15, 
        ease: [0.16, 1, 0.3, 1] as any 
      }}
      className="group relative bg-card border border-white/5 rounded-[2rem] p-8 md:p-10 flex flex-col h-full overflow-hidden shadow-premium hover:border-primary/20 transition-all duration-500"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-screen" />
      
      {/* Metric Highlight (Case Study Feel) */}
      <div className="flex justify-between items-start mb-10 relative z-10 w-full">
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex items-center gap-4 backdrop-blur-md">
          <div className="w-10 h-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <TrendingUp size={18} />
          </div>
          <div>
            <div className="text-2xl font-black font-display text-white flex items-baseline leading-none mb-1">
              {testimonial.results.suffix === "x" ? (
                 <><Counter value={testimonial.results.value} /><span className="text-primary text-xl ml-0.5">{testimonial.results.suffix}</span></>
              ) : (
                <><Counter value={testimonial.results.value} /><span className="text-primary text-xl ml-0.5">{testimonial.results.suffix}</span></>
              )}
            </div>
            <p className="text-[9px] uppercase font-bold tracking-widest text-white/50 leading-tight block w-24 sm:w-auto break-words">{testimonial.results.label}</p>
          </div>
        </div>
        <Quote className="text-white/5 group-hover:text-primary/20 transition-colors duration-500 transform group-hover:scale-110 group-hover:rotate-6 shrink-0 ml-4" size={50} strokeWidth={1} />
      </div>

      <p className="body-large mb-12 flex-grow text-white/80 font-light leading-relaxed">
        &ldquo;{testimonial.text}&rdquo;
      </p>

      {/* Human Touch / Avatar */}
      <div className="flex items-center gap-5 pt-8 border-t border-white/5 relative z-10">
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary transition-colors duration-500 shrink-0">
          <div className="absolute inset-0 bg-primary/20 animate-pulse mix-blend-overlay" />
          <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-lg text-white leading-tight mb-1">
            {testimonial.name}
          </span>
          <span className="text-xs text-white/40 mb-1">{testimonial.role}, {testimonial.business}</span>
          <span className="text-[10px] uppercase font-mono tracking-widest text-primary/60">{testimonial.tag}</span>
        </div>
      </div>
    </motion.div>
  )
}

export function Testimonials() {
  return (
    <section id="testimonials" className="section-padding py-32 relative overflow-hidden bg-dark-surface">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[200px] pointer-events-none" />
      
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
          <div className="max-w-2xl">
            <span className="label-mono mb-4 block text-primary/80 tracking-[0.3em] uppercase">Client Success</span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-tighter leading-tight mb-0">
              Real Impact for <br />
              <span className="text-gradient font-italic-serif font-light">Agra Brands.</span>
            </h2>
          </div>
          <div className="pb-2">
            <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md group hover:bg-white/10 transition-colors">
              <div className="flex gap-1 text-primary group-hover:scale-105 transition-transform">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <span className="text-sm font-bold text-white font-mono">4.9/5 Average Rating</span>
            </div>
          </div>
        </div>

        {/* Masonry-style/Case-study Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
          {testimonials.map((testimonial, idx) => (
            <div key={testimonial.name} className={idx === 1 ? "md:translate-y-12 lg:translate-y-16" : idx === 2 ? "md:translate-y-0 lg:translate-y-32" : ""}>
               <TestimonialCard testimonial={testimonial} index={idx} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
