"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, MapPin } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Counter } from "@/components/ui/counter"

export function Hero() {
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const TajRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const decoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!h1Ref.current) return

    // Word-by-word animation
    const textArr = h1Ref.current.innerText.split(" ")
    h1Ref.current.innerHTML = textArr
      .map(word => `<span class="inline-block overflow-hidden"><span class="inline-block transform translate-y-full">${word}</span></span>`)
      .join(" ")

    gsap.to(h1Ref.current.querySelectorAll("span span"), {
      y: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: "power4.out",
      delay: 0.5,
    })

    // Parallax Effects
    if (TajRef.current) {
      gsap.to(TajRef.current, {
        y: -150, // More pronounced
        opacity: 0.4,
        scale: 1.1,
        scrollTrigger: {
          trigger: "section",
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      })
    }

    if (contentRef.current) {
      gsap.to(contentRef.current, {
        y: -80, // Move up slightly for natural parallax
        opacity: 0.8, // Fade out slightly
        scrollTrigger: {
          trigger: "section",
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      })
    }

    if (decoRef.current) {
      gsap.to(decoRef.current, {
        y: -200,
        rotate: 15,
        scrollTrigger: {
          trigger: "section",
          start: "top top",
          end: "bottom top",
          scrub: 2
        }
      })
    }
  }, [])

  return (
    <section
      className="relative min-h-[95vh] flex items-center justify-center overflow-hidden pt-24 bg-[#0A0908]"
    >

      {/* Decorative Grid Element */}
      <div ref={decoRef} className="absolute left-[-10%] top-[20%] w-[500px] h-[500px] border border-accent/10 rounded-full pointer-events-none" />

      {/* Golden Taj Mahal Illustration */}
      <div ref={TajRef} className="absolute right-[-5%] md:right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none w-[500px] md:w-[650px] lg:w-[750px] h-[500px] md:h-[650px] lg:h-[750px]">
        <Image
          src="/taj-mahal-illustration.png"
          alt=""
          fill
          className="object-contain opacity-20"
          priority={false}
          aria-hidden="true"
        />
      </div>

      <div ref={contentRef} className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          {/* Hero Badges */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="label-mono">Agra, UP — Est. 2024</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 shadow-[0_0_15px_rgba(232,160,69,0.15)] animate-pulse"
            >
              <span className="text-accent text-xs">⚡</span>
              <span className="label-mono text-accent">Currently accepting new projects</span>
            </motion.div>
          </div>

          <h1
            ref={h1Ref}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-[-0.02em] mb-8 font-sans"
          >
            Agra&apos;s <br />
            <span className="text-accent">Premium</span> Web Studio.
          </h1>

          {/* Trust Indicators / Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12 border-l border-accent/10 pl-6 md:pl-8"
          >
            <div>
              <div className="text-3xl md:text-4xl font-black text-accent mb-1 font-display">
                <Counter value={50} />+
              </div>
              <p className="text-xs uppercase tracking-[0.2em] font-bold opacity-40">Websites Delivered</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-accent mb-1 font-display">
                <Counter value={40} />+
              </div>
              <p className="text-xs uppercase tracking-[0.2em] font-bold opacity-40">Happy Clients</p>
            </div>
            <div className="hidden md:block">
              <div className="text-3xl md:text-4xl font-black text-accent mb-1 font-display">
                <Counter value={2} />+
              </div>
              <p className="text-xs uppercase tracking-[0.2em] font-bold opacity-40">Years Experience</p>
            </div>
          </motion.div>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="text-lg md:text-xl italic text-[#555550] mb-12 max-w-2xl"
          >
            We build what scales.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.8 }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <Button
              size="lg"
              className="rounded-full px-10 h-16 text-lg font-bold bg-accent text-accent-foreground hover:scale-[1.02] transition-transform shadow-xl shadow-accent/20 group uppercase tracking-widest border-0"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Your Project
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
            <Button
              variant="ghost"
              className="text-lg hover:bg-white/5 h-16 px-8 rounded-full"
              onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Our Work
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="label-mono opacity-50">Scroll to Explore</span>
        <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent" />
      </motion.div>
    </section>
  )
}
