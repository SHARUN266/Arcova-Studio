"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, CheckCircle2, Loader2, Sparkles } from "lucide-react"

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")
  const [formData, setFormData] = useState({ name: "", phone: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.phone) return
    setStatus("loading")
    // Simulate API call for friction-less UI feel locally
    setTimeout(() => {
        setStatus("success")
        // Optional: Trigger your actual API here
        // fetch('/api/contact', { ... })
    }, 1500)
  }

  return (
    <section id="contact" className="section-padding py-32 relative overflow-hidden bg-background">
      {/* Dynamic Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-primary/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen animate-pulse duration-[8000ms]" />

      <div className="container mx-auto relative z-10 max-w-4xl">
        <div className="bg-card border border-white/5 rounded-[3rem] p-8 md:p-16 lg:p-24 shadow-premium relative overflow-hidden flex flex-col items-center text-center">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary mb-8"
          >
            <Sparkles size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">Start Your Project</span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-black leading-tight mb-6">
            Ready to <span className="text-gradient font-italic-serif font-light">Scale?</span>
          </h2>
          
          <p className="body-large text-white/60 mb-12 max-w-lg">
            Drop your details below. We'll reach out via WhatsApp within 2 hours to discuss your vision.
          </p>

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center py-10"
              >
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-3xl font-bold font-display text-white mb-2">Request Received.</h3>
                <p className="text-white/50">Talk to you soon.</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="w-full max-w-md flex flex-col gap-4 relative z-20"
              >
                <div className="relative group">
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-16 bg-white/[0.03] border border-white/10 rounded-2xl px-6 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all text-lg"
                  />
                </div>
                <div className="relative group">
                  <input 
                    type="tel" 
                    placeholder="WhatsApp Number" 
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full h-16 bg-white/[0.03] border border-white/10 rounded-2xl px-6 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all text-lg"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full h-16 mt-4 rounded-2xl bg-primary text-black font-black text-lg flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_30px_rgba(255,69,51,0.3)] hover:shadow-[0_0_40px_rgba(255,69,51,0.5)] relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <span className="relative z-10 flex items-center">
                    {status === "loading" ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <>
                        Get Free Consultation
                        <ArrowRight size={20} className="ml-2 group-hover:translate-x-1.5 transition-transform" />
                      </>
                    )}
                  </span>
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
