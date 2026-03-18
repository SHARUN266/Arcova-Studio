"use client"

import React from "react"
import { motion } from "framer-motion"
import { Star, Quote, MapPin } from "lucide-react"

const testimonials = [
  {
    name: "Mohit Bansal",
    business: "Bansal Leather Exports",
    role: "Owner",
    avatar: "/images/testimonials/avatar1.png",
    location: "Sadar Bazaar, Agra",
    text: "Actually, we were struggling with an old website that didn't show our craft properly. The Arcova team came to our workshop, understood how we work, and built something that genuinely represents us. It's not just about a website; they understand the Agra business mindset.",
    tag: "Traditional Business"
  },
  {
    name: "Dr. Varun Kalra",
    business: "Kalra Eye Center",
    role: "Lead Surgeon",
    avatar: "/images/testimonials/avatar2.png",
    location: "Sanjay Place, Agra",
    text: "Most agencies just promised traffic, but these guys fixed our patient booking flow. It's much simpler now. Being able to meet them at Sanjay Place for a quick discussion makes everything so much easier than working with someone in Delhi or Bangalore.",
    tag: "Healthcare"
  },
  {
    name: "Karan Malhotra",
    business: "The Mughal Kitchen",
    role: "Founder",
    avatar: "/images/testimonials/avatar3.png",
    location: "Fatehabad Road, Agra",
    text: "Our restaurant needed a digital presence that matched our food quality. They did an amazing job with the photography and the layout. Our reservations have definitely seen a boost. Very grounded and professional team.",
    tag: "Hospitality"
  },
  
  
]

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0], index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1, 
        ease: [0.16, 1, 0.3, 1] as any 
      }}
      className="group bg-card border border-border p-8 md:p-12 rounded-[2rem] hover:border-accent/40 transition-all duration-500 relative flex flex-col h-full shadow-sm"
    >
      <div className="flex justify-between items-start mb-8 md:mb-10">
        <div className="flex gap-1 text-accent/80">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} fill="currentColor" className="opacity-80" />
          ))}
        </div>
        <Quote className="text-white/5 group-hover:text-accent/10 transition-colors duration-500" size={40} strokeWidth={1} />
      </div>

      <p className="body-large mb-12 flex-grow text-foreground/90 font-light tracking-tight italic">
        &ldquo;{testimonial.text}&rdquo;
      </p>

      <div className="flex items-center gap-5 pt-8 border-t border-white/5">
        <div className="w-14 h-14 rounded-2xl border border-accent/10 overflow-hidden bg-accent/5">
          <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-xl text-foreground leading-tight mb-1">
            {testimonial.name}
          </span>
          <div className="flex items-center gap-2 opacity-40">
            <MapPin size={10} className="text-accent" />
            <span className="text-[10px] uppercase font-mono tracking-widest">{testimonial.business}</span>
            <span className="w-1 h-1 rounded-full bg-accent/20" />
            <span className="text-[10px] uppercase font-mono tracking-widest">{testimonial.location}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function Testimonials() {
  return (
    <section id="testimonials" className="section-padding bg-background relative border-t border-white/5">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mb-16 md:mb-24 items-end">
          <div className="max-w-xl">
            <span className="label-mono mb-4 block text-accent/60">Direct Feedback</span>
            <h2 className="h2-section font-black mb-0 tracking-tighter">
              Real Stories from <br />
              <span className="text-accent italic">Agra Businesses.</span>
            </h2>
          </div>
          <div>
            <p className="body-large opacity-80 max-w-lg">
              We don&apos;t just build websites; we build partnerships. Here is how we help local business owners succeed in the digital age.
            </p>
          </div>
        </div>

        {/* Masonry-style Grid for an organic feel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {testimonials.map((testimonial, idx) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} index={idx} />
          ))}
        </div>

        {/* Reputation Footer */}
        <div className="mt-16 md:mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex -space-x-4 shrink-0">
              {Object.values(testimonials).slice(0, 4).map((t, i) => (
                <div key={i} className="w-12 h-12 md:w-10 md:h-10 rounded-full border-2 border-[#0A0908] overflow-hidden shadow-lg hover:z-10 transition-all duration-300">
                  <img src={t.avatar} alt="Client" className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="w-12 h-12 md:w-10 md:h-10 rounded-full border-2 border-[#0A0908] bg-accent/20 flex items-center justify-center text-[10px] font-black text-accent-foreground shadow-lg backdrop-blur-sm relative z-0">
                +
              </div>
            </div>
            <p className="text-xs md:text-sm md:opacity-40 font-mono tracking-wide uppercase text-muted-foreground md:text-inherit">
              Joined by 28+ local partners in Agra
            </p>
          </div>
          
          <div className="flex items-center justify-center w-full md:w-auto gap-4 bg-secondary border border-accent/20 px-8 py-5 md:py-4 rounded-2xl shadow-xl shadow-accent/5 backdrop-blur-3xl group hover:border-accent/40 transition-colors duration-500">
            <div className="flex gap-1 text-accent">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
            </div>
            <span className="text-sm font-bold text-foreground">4.9 on Google Business</span>
          </div>
        </div>
      </div>
    </section>
  )
}
