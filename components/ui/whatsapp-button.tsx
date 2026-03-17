"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { MessageCircle } from "lucide-react"

export function WhatsAppButton() {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!buttonRef.current) return

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 4 })
    tl.to(buttonRef.current, { scale: 1.1, duration: 0.2, ease: "power2.out" })
      .to(buttonRef.current, { scale: 1, duration: 0.8, ease: "elastic.out(1, 0.3)" })

    return () => {
      tl.kill()
    }
  }, [])

  const handleWhatsApp = () => {
    window.open("https://wa.me/918279934295?text=Hello%20Arcova!%20I%20want%20to%20start%20a%20project.", "_blank")
  }

  return (
    <button
      ref={buttonRef}
      onClick={handleWhatsApp}
      className="fixed bottom-10 right-10 z-[100] w-16 h-16 bg-accent text-accent-foreground rounded-full shadow-2xl shadow-accent/40 flex items-center justify-center hover:scale-110 transition-transform"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle size={32} />
    </button>
  )
}
