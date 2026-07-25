"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle } from "lucide-react"

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleWhatsApp = () => {
    window.open("https://wa.me/918279934295?text=Hello%20Arcova!%20I%20want%20to%20start%20a%20project.", "_blank")
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
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[90] flex items-center justify-center bg-white border border-gray-200 text-[#1A1A1A] rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(242,101,48,0.2)] transition-all duration-300 h-14 px-4 overflow-hidden group"
          aria-label="Contact on WhatsApp"
        >
          <div className="flex items-center gap-2">
            <div className="relative flex items-center justify-center w-6 h-6 text-[#F26530]">
              <MessageCircle size={24} />
            </div>
            
            <motion.span 
              initial={{ width: 0, opacity: 0 }}
              animate={{ 
                width: isHovered ? "auto" : 0, 
                opacity: isHovered ? 1 : 0 
              }}
              className="hidden md:block font-semibold whitespace-nowrap overflow-hidden text-sm text-[#1A1A1A]"
            >
              <span className="pl-1 pr-2">Chat with us</span>
            </motion.span>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
