"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const services = [
  {
    number: "01",
    title: "Website Design",
    description: "Modern, high-converting designs built to grab attention in the Agra market.",
    price: "Starting from ₹8,000",
  },
  {
    number: "02",
    title: "Web Development",
    description: "Fast, scalable coding using Next.js and Tailwind. 7-day delivery guaranteed.",
    price: "Starting from ₹15,000",
  },
  {
    number: "03",
    title: "E-commerce Stores",
    description: "Complete online stores for Sadar Bazaar & local shops with payment integration.",
    price: "Starting from ₹40,000",
  },
  {
    number: "04",
    title: "Maintenance & AMC",
    description: "Ongoing support, security updates, and performance monitoring.",
    price: "Starting from ₹1,500/mo",
  },
]

const packages = [
  { name: "Starter", price: "₹8K – ₹15K", features: ["1 Page Landing", "Contact Form", "Basic SEO", "7-Day Delivery"] },
  { name: "Business", price: "₹20K – ₹40K", features: ["5-10 Pages", "CMS Integration", "Google Maps", "Social Media Setup"] },
  { name: "E-commerce", price: "₹40K – ₹80K", features: ["Product Catalog", "Payment Gateway", "Inventory Sync", "Admin Panel"] },
  { name: "AMC", price: "₹1.5K – ₹3K/mo", features: ["Monthly Updates", "Security Scans", "Daily Backups", "Priority Support"] },
]

function ServiceRow({ service }: { service: typeof services[0] }) {
  const rowRef = useRef<HTMLDivElement>(null)
  const borderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const row = rowRef.current
    const border = borderRef.current
    if (!row || !border) return

    const tl = gsap.timeline({ paused: true })
    tl.to(border, { width: "8px", backgroundColor: "var(--accent)", duration: 0.3, ease: "power2.out" })
    tl.to(row, { x: 10, duration: 0.3, ease: "power2.out" }, 0)

    row.addEventListener("mouseenter", () => tl.play())
    row.addEventListener("mouseleave", () => tl.reverse())

    return () => {
      row.removeEventListener("mouseenter", () => tl.play())
      row.removeEventListener("mouseleave", () => tl.reverse())
    }
  }, [])

  return (
    <div 
      ref={rowRef}
      className="group relative flex flex-col md:flex-row md:items-center justify-between py-10 border-b border-white/5 cursor-pointer hover:bg-white/[0.02] transition-colors"
    >
      <div ref={borderRef} className="absolute left-0 top-0 bottom-0 w-0 bg-transparent" />
      
      <div className="flex items-center gap-8 md:gap-16 pl-6">
        <span className="label-mono opacity-30 text-2xl">{service.number}</span>
        <div className="max-w-md">
          <h3 className="h3-card group-hover:text-accent transition-colors">
            {service.title}
          </h3>
          <p className="body-base">
            {service.description}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-12 mt-6 md:mt-0 pr-6 pl-6 md:pl-0">
        <span className="text-xl font-bold font-mono tracking-tight text-accent">
          {service.price}
        </span>
        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#EDE8DF] group-hover:text-[#0A0908] transition-all">
          <ArrowRight size={20} />
        </div>
      </div>
    </div>
  )
}

export function Services() {
  return (
    <section id="services" className="section-padding overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col mb-20">
          <span className="label-mono mb-4 text-muted-foreground">Our Services</span>
          <h2 className="h2-section">
            <span className="text-accent">World-class</span> code. <br />
            Local Prices.
          </h2>
        </div>

        {/* Standard Services List */}
        <div className="flex flex-col border-t border-white/5">
          {services.map((service) => (
            <ServiceRow key={service.number} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}
