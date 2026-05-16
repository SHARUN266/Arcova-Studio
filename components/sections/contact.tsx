"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, CheckCircle2, Loader2, Sparkles } from "lucide-react"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { scaleReveal, SplitText } from "@/lib/motion"

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")
  const [formData, setFormData] = useState({ name: "", phone: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.phone) return
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) { alert("Please enter a valid 10-digit WhatsApp number (starting with 6-9)."); return; }
    setStatus("loading")
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: formData.name, whatsapp: formData.phone, message: "Interested in a Free Consultation via Website Form", projectType: "Web Development/Consultation", budget: "To be discussed", preferWhatsapp: true }) })
      if (response.ok) { setStatus("success") } else { const errorData = await response.json(); throw new Error(errorData.error || "Failed to send lead") }
    } catch (error: any) { console.error("Submission error:", error); setStatus("idle"); alert(error.message || "Failed to submit. Please try again or WhatsApp us directly.") }
  }

  return (
    <section id="contact" className="section-cinematic relative overflow-hidden bg-[#000000]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-primary/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen ambient-blob-slow" />
      <div className="container mx-auto relative z-10 max-w-5xl">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={scaleReveal} className="bg-[#09090B] border border-white/5 rounded-[3rem] p-8 md:p-16 lg:p-24 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary mb-8">
            <Sparkles size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">Start Your Project</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black leading-tight mb-6 text-white tracking-tight">
            <SplitText>Ready to</SplitText> <span className="text-zinc-500 font-italic-serif font-light"><SplitText>Scale?</SplitText></span>
          </h2>
          <p className="text-lg text-zinc-400 mb-12 max-w-lg font-light">Drop your details below. We'll reach out via WhatsApp within 2 hours to discuss your vision.</p>
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center py-10">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-6 glow-purple"><CheckCircle2 size={40} /></div>
                <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">Request Received.</h3>
                <p className="text-zinc-400">Talk to you soon.</p>
              </motion.div>
            ) : (
              <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-4 relative z-20">
                <input type="text" placeholder="Your Name" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full h-16 bg-[#111114] border border-white/5 rounded-2xl px-6 text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary/50 focus:bg-[#151518] transition-all text-lg" />
                <input type="tel" placeholder="WhatsApp Number" required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full h-16 bg-[#111114] border border-white/5 rounded-2xl px-6 text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary/50 focus:bg-[#151518] transition-all text-lg" />
                <MagneticButton strength={0.15} className="w-full mt-4">
                  <button type="submit" disabled={status === "loading"} className="w-full h-16 rounded-2xl bg-primary text-white font-bold text-lg flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all glow-purple relative overflow-hidden group border-0">
                    <span className="relative z-10 flex items-center">
                      {status === "loading" ? <Loader2 className="animate-spin" /> : <>Get Free Consultation<ArrowRight size={20} className="ml-2 group-hover:translate-x-1.5 transition-transform" /></>}
                    </span>
                  </button>
                </MagneticButton>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
