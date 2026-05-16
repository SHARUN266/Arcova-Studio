"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle } from "lucide-react"

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    // Show after 3 seconds for a clean initial hero entrance
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleWhatsApp = () => {
    window.open("https://wa.me/918279934295?text=Hello%20Nexora!%20I%20want%20to%20start%20a%20project.", "_blank")
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleWhatsApp}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[90] flex items-center justify-center bg-zinc-900 border border-white/10 text-white rounded-full shadow-[0_10px_40px_-10px_rgba(139,92,246,0.3)] hover:shadow-[0_10px_40px_-10px_rgba(139,92,246,0.5)] transition-all duration-300 h-14 px-4 overflow-hidden group"
          aria-label="Contact on WhatsApp"
        >
          <div className="flex items-center gap-2">
            <div className="relative flex items-center justify-center w-6 h-6 text-purple-400 group-hover:text-purple-300 transition-colors">
              <MessageCircle size={24} />
            </div>
            
            {/* The text expands on hover (desktop only) */}
            <motion.span 
              initial={{ width: 0, opacity: 0 }}
              animate={{ 
                width: isHovered ? "auto" : 0, 
                opacity: isHovered ? 1 : 0 
              }}
              className="hidden md:block font-medium whitespace-nowrap overflow-hidden text-sm"
            >
              <span className="pl-1 pr-2">Chat with us</span>
            </motion.span>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
