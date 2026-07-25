"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, CheckCircle2, Loader2, Sparkles, MessageSquare, Clock, ShieldCheck } from "lucide-react"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { scaleReveal, SplitText } from "@/lib/motion"

const budgets = ["< ₹50,000", "₹50,000 - ₹1.5 Lakh", "₹1.5 Lakh+"]
const scopes = ["Website Design", "AI Automation", "Full Rebrand & SEO"]

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")
  const [selectedBudget, setSelectedBudget] = useState("₹50,000 - ₹1.5 Lakh")
  const [selectedScope, setSelectedScope] = useState("Website Design")
  const [formData, setFormData] = useState({ name: "", phone: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.phone) return
    const phoneRegex = /^[6-9]\d{9}$/
    if (!phoneRegex.test(formData.phone)) {
      alert("Please enter a valid 10-digit WhatsApp number (starting with 6-9).")
      return
    }
    setStatus("loading")
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          whatsapp: formData.phone,
          message: `Interested in ${selectedScope} (Budget: ${selectedBudget})`,
          projectType: selectedScope,
          budget: selectedBudget,
          preferWhatsapp: true,
        }),
      })
      if (response.ok) {
        setStatus("success")
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to send lead")
      }
    } catch (error: any) {
      console.error("Submission error:", error)
      setStatus("idle")
      alert(error.message || "Failed to submit. Please try again or WhatsApp us directly.")
    }
  }

  return (
    <section id="contact" className="section-cinematic relative overflow-hidden bg-[#FAFAF8] section-border">
      <div className="container mx-auto relative z-10 max-w-5xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={scaleReveal}
          className="bg-white border border-gray-200/90 rounded-[3rem] p-8 md:p-16 lg:p-20 shadow-stripe relative overflow-hidden flex flex-col items-center text-center group hover:border-[#F26530]/40 transition-all duration-500"
        >
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#F26530]/30 bg-[#F26530]/10 text-[#F26530] mb-8"
          >
            <Sparkles size={14} />
            <span className="text-xs font-mono font-bold uppercase tracking-wider">Start Your Transformation</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black leading-tight mb-4 text-[#1A1A1A] tracking-tight">
            <SplitText>Ready to</SplitText>{" "}
            <span className="text-[#F26530] font-serif italic font-normal">
              <SplitText>Scale?</SplitText>
            </span>
          </h2>

          <p className="text-base md:text-lg text-gray-600 mb-10 max-w-lg font-normal">
            Select your scope & budget below. Our lead team will reach out via WhatsApp within 2 hours.
          </p>

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center py-10"
              >
                <div className="w-20 h-20 rounded-full bg-[#F26530]/10 border border-[#F26530]/30 flex items-center justify-center text-[#F26530] mb-6 shadow-md">
                  <CheckCircle2 size={44} />
                </div>
                <h3 className="text-3xl font-bold text-[#1A1A1A] mb-2 tracking-tight">Consultation Requested!</h3>
                <p className="text-gray-600 font-medium max-w-md">
                  Thank you, <span className="text-[#1A1A1A] font-bold">{formData.name}</span>. Our strategist will ping you on WhatsApp (<span className="text-[#F26530] font-bold">{formData.phone}</span>) within 2 hours.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="w-full max-w-xl flex flex-col gap-6 relative z-20 text-left"
              >
                {/* Scope Selection Pills */}
                <div>
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 mb-2.5 block">
                    1. Select Service Needed
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {scopes.map((scope) => (
                      <button
                        type="button"
                        key={scope}
                        onClick={() => setSelectedScope(scope)}
                        className={`p-3 rounded-2xl text-xs font-bold border transition-all text-center ${
                          selectedScope === scope
                            ? "bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-xs"
                            : "bg-[#F5F5F3] text-gray-700 border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {scope}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget Selection Pills */}
                <div>
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 mb-2.5 block">
                    2. Estimated Budget Range
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {budgets.map((b) => (
                      <button
                        type="button"
                        key={b}
                        onClick={() => setSelectedBudget(b)}
                        className={`p-3 rounded-2xl text-xs font-bold border transition-all text-center ${
                          selectedBudget === b
                            ? "bg-[#F26530] text-white border-[#F26530] shadow-xs"
                            : "bg-[#F5F5F3] text-gray-700 border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Phone Inputs */}
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="flex-1 h-14 bg-[#F5F5F3] border border-gray-200 rounded-2xl px-5 text-[#1A1A1A] placeholder:text-gray-400 focus:outline-none focus:border-[#F26530] focus:bg-white transition-all text-base font-medium"
                  />
                  <input
                    type="tel"
                    placeholder="WhatsApp Number"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="flex-1 h-14 bg-[#F5F5F3] border border-gray-200 rounded-2xl px-5 text-[#1A1A1A] placeholder:text-gray-400 focus:outline-none focus:border-[#F26530] focus:bg-white transition-all text-base font-medium"
                  />
                </div>

                {/* Submit Button */}
                <MagneticButton strength={0.15} className="w-full mt-2">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full h-16 rounded-2xl bg-[#F26530] text-white font-bold text-lg flex items-center justify-center gap-3 hover:bg-[#E0531E] hover:scale-[1.01] active:scale-95 transition-all shadow-[0_10px_30px_rgba(242,101,48,0.35)] relative overflow-hidden group border-0"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {status === "loading" ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <>
                          <span>Request Free Consultation</span>
                          <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
                        </>
                      )}
                    </span>
                  </button>
                </MagneticButton>

                {/* Guarantees & Response Time */}
                <div className="flex flex-wrap items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Clock size={14} className="text-[#F26530]" />
                    <span>Avg Response Time: <strong>&lt; 2 Hours</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium">
                    <ShieldCheck size={14} className="text-emerald-600" />
                    <span>Zero Spam Guaranteed</span>
                  </div>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
