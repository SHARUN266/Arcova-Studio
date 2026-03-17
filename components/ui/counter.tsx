"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, useMotionValue, useSpring } from "framer-motion"

export function Counter({
  value,
  direction = "up",
}: {
  value: number
  direction?: "up" | "down"
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(direction === "down" ? value : 0)
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  })
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    if (isInView) {
      motionValue.set(direction === "down" ? 0 : value)
    }
  }, [motionValue, isInView, value, direction])

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US").format(
          Math.round(latest)
        )
      }
    })
    return () => unsubscribe()
  }, [springValue])

  return <span ref={ref}>{direction === "down" ? value : 0}</span>
}
