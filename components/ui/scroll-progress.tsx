"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!progressRef.current) return

    gsap.to(progressRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    })
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-white/10 z-[100] origin-left">
      <div 
        ref={progressRef}
        className="h-full bg-primary scale-x-0 origin-left"
      />
    </div>
  )
}
