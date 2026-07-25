"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function PageTransition() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="page-transition"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-[#FAFAF8] flex items-center justify-center pointer-events-auto"
        >
          {/* Ambient glow behind text */}
          <div className="absolute w-[300px] h-[300px] bg-[#F26530]/10 rounded-full blur-[120px] pointer-events-none" />

          {/* Brand name — staggered letter reveal */}
          <div className="flex items-center gap-[0.08em] overflow-hidden">
            {"ARCOVA".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.2 + i * 0.08,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-5xl md:text-7xl font-black tracking-[0.3em] text-[#1A1A1A] uppercase"
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Bottom line animation */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-[40%] left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-[#F26530] to-transparent origin-center"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
