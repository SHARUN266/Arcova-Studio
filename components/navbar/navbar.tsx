"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "#services" },
  { name: "Work", href: "#work" },
  { name: "Process", href: "#process" },
  { name: "Contact", href: "#contact" },
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

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "glass py-3 border-b"
          : "bg-transparent py-6"
      )}
    >
      <nav className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10">
            <img 
              src="/logo.png" 
              alt="Arcova Logo" 
              className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(245,166,35,0.3)] group-hover:drop-shadow-[0_0_12px_rgba(245,166,35,0.5)] transition-all duration-300"
            />
          </div>
          <span className="text-xl font-black tracking-tighter text-foreground uppercase">
            Arcova<span className="text-primary tracking-[0.2em] ml-1">Studio</span>
          </span>
        </Link>

        {/* Currently available indicator */}
        <div className="hidden lg:flex items-center gap-3 px-4 py-1.5 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground">Currently available for new projects</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4 border-l border-border pl-8">
            <AnimatePresence>
              {showCta ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <Button 
                    size="sm" 
                    className="rounded-full px-8 bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20 border-0 font-bold"
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Start Project →
                  </Button>
                </motion.div>
              ) : (
                <Button 
                  size="sm" 
                  variant="ghost"
                  className="rounded-full px-8 hover:bg-accent/10 hover:text-accent transition-colors"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Contact Us
                </Button>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <AnimatePresence>
            {showCta && !isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Button 
                  size="sm" 
                  className="rounded-full px-4 h-9 bg-accent text-accent-foreground text-[10px] font-black uppercase tracking-widest border-0"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Start →
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-foreground focus:outline-none hover:bg-muted rounded-full transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden glass border-b overflow-hidden shadow-2xl"
          >
            <div className="container mx-auto px-6 py-10 flex flex-col gap-8">
              <ul className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.li 
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
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
                      className="text-2xl font-semibold text-foreground hover:text-primary transition-colors flex items-center justify-between group"
                    >
                      {link.name}
                      <span className="w-8 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <Button 
                size="lg" 
                className="w-full rounded-2xl bg-accent text-accent-foreground font-black uppercase tracking-widest shadow-xl shadow-accent/20 border-0"
                onClick={() => {
                  setIsOpen(false);
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Start Project →
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
