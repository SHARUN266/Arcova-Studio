"use client"

import { useRef } from "react"
import { motion, useInView, type Variants } from "framer-motion"

// ─── Premium easing constants ───
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const
export const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const
export const EASE_SMOOTH = [0.76, 0, 0.24, 1] as const

// ─── Reusable animation variants ───

export const revealUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
}

export const revealLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
}

export const revealRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
}

export const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: EASE_OUT_EXPO },
  },
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
}

export const splitWordReveal: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04 },
  },
}

export const splitWordChild: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
}

// ─── RevealSection wrapper component ───

interface RevealSectionProps {
  children: React.ReactNode
  className?: string
  variant?: Variants
  delay?: number
  once?: boolean
  margin?: string
}

export function RevealSection({
  children,
  className = "",
  variant = revealUp,
  delay = 0,
  once = true,
  margin = "-15%",
}: RevealSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: margin as any })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variant}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── SplitText component for word-by-word reveals ───

interface SplitTextProps {
  children: string
  className?: string
  once?: boolean
}

export function SplitText({ children, className = "", once = true }: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once, margin: "-10%" as any })

  const words = children.split(" ")

  return (
    <motion.span
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={splitWordReveal}
      className={className}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span variants={splitWordChild} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
