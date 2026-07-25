"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const cursor = cursorRef.current
    const ring = ringRef.current
    if (!cursor || !ring) return

    // Disable on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      cursor.style.display = 'none'
      ring.style.display = 'none'
      return
    }

    const xToCursor = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power2.out" })
    const yToCursor = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power2.out" })
    const xToRing = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power2.out" })
    const yToRing = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power2.out" })

    const moveCursor = (e: MouseEvent) => {
      xToCursor(e.clientX)
      yToCursor(e.clientY)
      xToRing(e.clientX)
      yToRing(e.clientY)
    }

    const handleLinkHover = () => {
      setIsHovering(true)
      gsap.to(ring, { scale: 2.2, backgroundColor: "rgba(242, 101, 48, 0.1)", borderColor: "rgba(242, 101, 48, 0.4)", duration: 0.4, ease: "power3.out" })
      gsap.to(cursor, { scale: 0.4, backgroundColor: "#F26530", duration: 0.4, ease: "power3.out" })
    }

    const handleLinkLeave = () => {
      setIsHovering(false)
      gsap.to(ring, { scale: 1, backgroundColor: "transparent", borderColor: "rgba(26, 26, 26, 0.2)", duration: 0.5, ease: "elastic.out(1, 0.4)" })
      gsap.to(cursor, { scale: 1, backgroundColor: "#1A1A1A", duration: 0.5, ease: "elastic.out(1, 0.4)" })
    }

    window.addEventListener("mousemove", moveCursor)

    const attachListeners = () => {
      const links = document.querySelectorAll("a, button, .interactive-card, [role='button']")
      links.forEach(link => {
        link.removeEventListener("mouseenter", handleLinkHover)
        link.removeEventListener("mouseleave", handleLinkLeave)
        link.addEventListener("mouseenter", handleLinkHover)
        link.addEventListener("mouseleave", handleLinkLeave)
      })
    }

    attachListeners()

    let rafId: number
    const observer = new MutationObserver(() => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(attachListeners)
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      observer.disconnect()
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-3 h-3 bg-[#1A1A1A] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
      <div 
        ref={ringRef} 
        className="fixed top-0 left-0 w-10 h-10 border border-black/20 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
    </>
  )
}
