"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Zap, Star, Shield, Award, CheckCircle } from "lucide-react"

const trustItems = [
  { label: "🏨 Hotel Taj View" },
  { label: "💍 Sharma Jewellers" },
  { label: "🏥 Dr. Verma Clinic" },
  { label: "⭐ 4.9 Google Rating" },
  { label: "🚀 50+ Projects Delivered" },
]

export function TrustMarquee() {
  return (
    <div className="py-6 border-y border-accent/10 bg-accent/5 overflow-hidden flex whitespace-nowrap relative z-20 shadow-[0_0_30px_rgba(245,166,35,0.05)]">
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="flex gap-20 pr-20 items-center"
      >
        {[...trustItems, ...trustItems, ...trustItems].map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-sm font-display font-black tracking-[0.15em] text-accent uppercase flex items-center gap-4">
              {item.label}
              <span className="text-accent/20">|</span>
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
