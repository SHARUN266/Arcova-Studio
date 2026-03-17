"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const lines = [
  "Initializing Arcova OS...",
  "Loading premium design patterns...",
  "Optimizing performance modules...",
  "Success: Systems Ready.",
]

export function TerminalBlock() {
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentText = lines[textIndex]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentText.length) {
          setCharIndex(prev => prev + 1)
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (charIndex > 0) {
          setCharIndex(prev => prev - 1)
        } else {
          setIsDeleting(false)
          setTextIndex(prev => (prev + 1) % lines.length)
        }
      }
    }, isDeleting ? 30 : 60)

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, textIndex])

  return (
    <div className="w-full max-w-2xl glass rounded-xl overflow-hidden border border-white/5 shadow-2xl font-mono">
      <div className="bg-white/5 px-4 py-2 flex items-center gap-2 border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
        </div>
        <span className="text-[10px] opacity-40 uppercase tracking-widest ml-auto">arcova_v1.0</span>
      </div>
      
      <div className="p-6 h-32 flex items-center">
        <div className="flex items-center gap-2 text-sm md:text-base">
          <span className="text-accent font-bold">$</span>
          <span className="text-foreground/90">
            {lines[textIndex].substring(0, charIndex)}
          </span>
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="w-2 h-5 bg-accent"
          />
        </div>
      </div>
    </div>
  )
}
