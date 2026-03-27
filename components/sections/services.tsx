"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const services = [
  {
    id: "01",
    title: "Premium Website Design",
    description: "Modern, high-converting designs built to grab attention and establish unshakeable trust in the Agra market.",
    features: ["Bespoke UI/UX Design", "Conversion Rate Optimization", "Interactive Prototypes", "Responsive Matrix"],
    price: "Starting from ₹8,000",
    glow: "radial-gradient(circle at top left, rgba(56, 189, 248, 0.15), transparent 50%)", // Blue top left
  },
  {
    id: "02",
    title: "High-Performance Development",
    description: "Lightning-fast, scalable frontend coding using Next.js, Framer Motion, and Tailwind CSS. We don't use templates.",
    features: ["Next.js Architecture", "Advanced Animations", "Headless CMS Integration", "SEO Optimization"],
    price: "Starting from ₹15,000",
    glow: "radial-gradient(circle at top right, rgba(255, 75, 51, 0.15), transparent 50%)", // Orange top right
  },
  {
    id: "03",
    title: "E-commerce & Web Apps",
    description: "Intelligent digital storefronts and web applications engineered for maximum revenue and frictionless user journeys.",
    features: ["Custom Shopping Carts", "Payment Gateways", "Inventory Sync", "User Dashboards"],
    price: "Starting from ₹40,000",
    glow: "radial-gradient(circle at bottom left, rgba(255, 75, 51, 0.15), transparent 50%)", // Orange bottom left
  },
  {
    id: "04",
    title: "Maintenance & Scale",
    description: "Ongoing technical partnerships. We monitor performance, handle updates, and introduce new features as you grow.",
    features: ["24/7 Monitoring", "Security Audits", "Content Updates", "A/B Testing"],
    price: "Starting from ₹1,500/mo",
    glow: "radial-gradient(circle at bottom right, rgba(56, 189, 248, 0.15), transparent 50%)", // Blue bottom right
  },
]

export function Services() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-10%" })

  return (
    <section id="services" className="section-padding py-40 relative flex items-center justify-center bg-[#000000] overflow-hidden">
      <div className="container mx-auto relative z-10 max-w-6xl" ref={containerRef}>
        
        {/* Section Header */}
        <div className="text-center mb-20 flex flex-col items-center">
          <span className="label-mono mb-6 text-primary tracking-[0.3em] uppercase">Capabilities</span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-sans font-medium tracking-tight leading-tight mb-8">
            World-class <br />
            <span className="text-gradient font-italic-serif font-light">Execution.</span>
          </h2>
          <p className="body-large opacity-60 max-w-2xl leading-relaxed">
            We bring top-tier engineering and design to local businesses. Discover how we scale teams and revenue.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative group bg-[#0A0A0A] rounded-[2rem] border border-white/5 overflow-hidden flex flex-col items-center text-center p-8 md:p-12 lg:p-16 min-h-[350px] md:min-h-[400px] h-auto justify-center transition-all duration-500 hover:border-white/10"
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
                  <span className="text-primary font-mono text-sm tracking-widest uppercase font-bold">
                    {service.price}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  )
}
