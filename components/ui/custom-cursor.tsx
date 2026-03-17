"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const ring = ringRef.current
    if (!cursor || !ring) return

    const xToCursor = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power2.out" })
    const yToCursor = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power2.out" })
    
    const xToRing = gsap.quickTo(ring, "x", { duration: 0.4, ease: "power2.out" })
    const yToRing = gsap.quickTo(ring, "y", { duration: 0.4, ease: "power2.out" })

    const moveCursor = (e: MouseEvent) => {
      xToCursor(e.clientX)
      yToCursor(e.clientY)
      xToRing(e.clientX)
      yToRing(e.clientY)
    }

    const handleLinkHover = () => {
      gsap.to(ring, { scale: 1.5, backgroundColor: "rgba(232, 160, 69, 0.2)", duration: 0.3 })
    }

    const handleLinkLeave = () => {
      gsap.to(ring, { scale: 1, backgroundColor: "transparent", duration: 0.3 })
    }

    window.addEventListener("mousemove", moveCursor)
    
    const links = document.querySelectorAll("a, button")
    links.forEach(link => {
      link.addEventListener("mouseenter", handleLinkHover)
      link.addEventListener("mouseleave", handleLinkLeave)
    })

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      links.forEach(link => {
        link.removeEventListener("mouseenter", handleLinkHover)
        link.removeEventListener("mouseleave", handleLinkLeave)
      })
    }
  }, [])

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-3 h-3 bg-accent rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block shadow-[0_0_10px_rgba(232,160,69,0.5)]"
      />
      <div 
        ref={ringRef} 
        className="fixed top-0 left-0 w-12 h-12 border-2 border-accent/30 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
    </>
  )
}
