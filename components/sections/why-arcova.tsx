"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ShieldCheck, Zap, Users, Star, IndianRupee, MapPin } from "lucide-react"
import { TechCore } from "@/components/ui/tech-core"

const trustBadges = [
  { icon: ShieldCheck, label: "GST Registered" },
  { icon: IndianRupee, label: "Money-Back 30 Days" },
  { icon: Zap, label: "7-Day Delivery" },
  { icon: ShieldCheck, label: "Secure Payment" },
  { icon: Star, label: "5.0 Google Rating" },
]

const reasons = [
  {
    title: "Local Agency (Agra mein hain)",
    description: "No more calling remote agencies. We are based right here in Agra, ready to meet face-to-face.",
    icon: MapPin,
  },
  {
    title: "Delhi Quality at Half the Price",
    description: "Get premium, world-class design and performance without the high-tier metropolitan costs.",
    icon: Star,
  },
  {
    title: "Face-to-Face Meetings Possible",
    description: "We value personal connection. Direct communication leads to better results and faster delivery.",
    icon: Users,
  },
]

export function WhyArcova() {
  return (
    <section className="section-padding relative overflow-hidden bg-dark-elevated">
      {/* Background Image Integration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Image
          src="/hero_background.jpg"
          alt="Agra Growth Background"
          fill
          className="object-cover opacity-10 grayscale brightness-[0.3]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Trust Badges Bar */}
        <div className="flex flex-wrap justify-center gap-8 mb-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
          {trustBadges.map((badge) => (
            <div key={badge.label} className="flex items-center gap-3">
              <badge.icon size={18} className="text-accent/60" />
              <span className="label-mono text-[10px] tracking-widest text-muted-foreground">
                {badge.label}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative z-10">
            <span className="label-mono mb-4 block text-accent/60 tracking-[0.3em]">Engineering Brilliance</span>
            <h2 className="h2-section">
              Agra's Dedicated <br />
              <span className="text-gradient font-italic-serif font-light">Growth</span> Partners.
            </h2>
            <p className="body-large mb-12 max-w-lg">
              We understand the local market better than anyone. We help Agra's businesses
              bridge the gap between local charm and digital excellence.
            </p>

            {/* The SVG Visual - TechCore */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="mt-8 hidden lg:block p-8 border-white/5 "
            >
              {/* <div className="glass-reflection" /> */}
              <TechCore />
            </motion.div>
          </div>

          <div className="space-y-6">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass group p-8 rounded-3xl border-white/5 flex gap-6 hover:-translate-y-3 transition-all duration-500 relative overflow-hidden hover:border-primary/20 shadow-premium"
              >
                <div className="glass-reflection" />
                <div className="glow-bg w-24 h-24 -right-10 -bottom-10 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none" />
                
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent/60 shrink-0 group-hover:bg-primary/20 group-hover:text-primary group-hover:border-primary/30 transition-all duration-300 relative z-10">
                  <reason.icon size={28} />
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2 font-display">{reason.title}</h3>
                  <p className="body-base">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
