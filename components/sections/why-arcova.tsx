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
    <section className="section-padding relative overflow-hidden bg-[#0D0D0D]">
      {/* Background Image Integration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Image 
          src="/hero_background.jpg" 
          alt="Agra Growth Background" 
          fill 
          className="object-cover opacity-30 grayscale brightness-[0.4]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D] via-transparent to-[#0D0D0D]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-transparent to-[#0D0D0D]" />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Trust Badges Bar */}
        <div className="flex flex-wrap justify-center gap-8 mb-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {trustBadges.map((badge) => (
            <div key={badge.label} className="flex items-center gap-3">
              <badge.icon size={20} className="text-muted-foreground" />
              <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                {badge.label}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="label-mono mb-4 block text-accent/60 tracking-[0.3em]">Engineering Brilliance</span>
            <h2 className="h2-section">
              Agra's Dedicated <br />
              <span className="text-accent">Growth</span> Partners.
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-lg">
              We understand the local market better than anyone. We help Agra's businesses
              bridge the gap between local charm and digital excellence.
            </p>

            {/* The SVG Visual - TechCore */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="mt-8 hidden lg:block"
            >
              <TechCore />
            </motion.div>
          </div>

          <div className="space-y-8">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass p-8 rounded-3xl border-white/5 flex gap-6 hover:border-primary/50 transition-colors group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground shrink-0 group-hover:bg-[#EDE8DF] group-hover:text-[#0A0908] transition-all duration-300">
                  <reason.icon size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{reason.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
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
