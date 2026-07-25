"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { name: "Services", href: "#services" },
  { name: "Work", href: "#work" },
  { name: "About", href: "#about" },
  { name: "Process", href: "#process" },
  { name: "Blog", href: "/blog" },
  { name: "Free Audit", href: "/audit" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const [showCta, setShowCta] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      setShowCta(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
          scrolled || isOpen
            ? "bg-[#FAFAF8]/90 backdrop-blur-md border-b border-black/5 py-4 shadow-sm"
            : "bg-transparent py-5 md:py-8"
        )}
      >
        <nav className="container mx-auto px-4 md:px-12 lg:px-24 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group relative z-[210]">
            <span className="text-lg sm:text-xl md:text-2xl font-black tracking-[0.2em] text-[#1A1A1A] uppercase transition-opacity">
              Arcova
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-gray-600 hover:text-[#ff6321] transition-all duration-300 block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4 border-l border-black/10 pl-8">
              <AnimatePresence mode="wait">
                {showCta ? (
                  <motion.div
                    key="cta-btn"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button 
                      className="h-10 px-6 rounded-full bg-[#ff6321] hover:bg-[#E0531E] text-white font-medium border-0 transition-all shadow-md shadow-[#ff6321]/20"
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Let's Talk
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="ghost-btn"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button 
                      variant="ghost"
                      className="h-10 px-6 rounded-full text-gray-800 hover:text-[#ff6321] hover:bg-black/5 transition-colors"
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Let's Talk
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-4 md:hidden relative z-[210]">
            <AnimatePresence>
              {showCta && !isOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Button 
                    size="sm" 
                    className="rounded-full px-3 sm:px-5 h-8 sm:h-9 bg-[#ff6321] text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest border-0"
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Talk →
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 sm:p-2 text-[#1A1A1A] focus:outline-none hover:bg-black/5 rounded-full transition-colors"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Fullscreen Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-[#FAFAF8] flex flex-col"
          >
            {/* Ambient background glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(242,101,48,0.08)_0%,transparent_60%)] pointer-events-none" />
            
            {/* Mobile Menu Header */}
            <div className="container mx-auto px-4 py-5 flex items-center justify-between relative z-[210]">
              <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
                <span className="text-lg sm:text-xl font-black tracking-[0.2em] text-[#1A1A1A] uppercase opacity-90">
                  Arcova
                </span>
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-[#1A1A1A] hover:bg-black/5 rounded-full transition-colors"
              >
                <X size={26} />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 relative z-10">
              <nav>
                <ul className="flex flex-col gap-4 sm:gap-6">
                  {navLinks.map((link, i) => (
                    <motion.li 
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={link.href}
                        onClick={(e) => {
                          setIsOpen(false);
                          if (link.href.startsWith('#')) {
                            e.preventDefault();
                            document.getElementById(link.href.substring(1))?.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        className="group flex items-center gap-4"
                      >
                        <span className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-700 group-hover:text-[#ff6321] group-hover:pl-2 transition-all duration-300 uppercase">
                          {link.name}
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-10 sm:mt-12"
              >
                <Button 
                  size="lg" 
                  className="w-full h-12 sm:h-14 rounded-full bg-[#ff6321] hover:bg-[#E0531E] text-white font-black uppercase tracking-widest border-0 text-xs sm:text-sm shadow-lg shadow-[#ff6321]/20"
                  onClick={() => {
                    setIsOpen(false);
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Start A Project
                </Button>
              </motion.div>
            </div>

            {/* Bottom Menu Info */}
            <div className="px-6 sm:px-12 pb-10 relative z-10">
              <div className="h-[1px] w-full bg-black/5 mb-6" />
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
                <div>
                  <p className="text-gray-400 text-[10px] uppercase tracking-widest mb-1">Get in touch</p>
                  <a href="mailto:hello@arcovastudio.com" className="text-sm text-[#1A1A1A] hover:text-[#ff6321] transition-colors">
                    hello@arcovastudio.com
                  </a>
                </div>
                <div className="flex gap-6">
                  {['Twitter', 'Instagram', 'Dribbble'].map((social) => (
                    <a key={social} href="#" className="text-gray-500 hover:text-[#1A1A1A] transition-colors text-xs">
                      {social}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
