"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, MapPin, Phone, Mail, CheckCircle2, MessageSquare, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  whatsapp: z.string().regex(/^\d{10}$/, "Enter a valid 10-digit WhatsApp number"),
  business: z.string().min(2, "Business name is required").optional().or(z.literal("")),
  projectType: z.enum(["Website", "E-commerce", "Redesign", "Other"]),
  budget: z.enum(["5K-15K", "15K-30K", "30K-60K", "60K+"]),
  preferWhatsapp: z.boolean(),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactFormData = z.infer<typeof contactSchema>

const projectTypes = ["Website", "E-commerce", "Redesign", "Other"]
const budgetRanges = [
  { label: "₹5K - ₹15K", value: "5K-15K" },
  { label: "₹15K - ₹30K", value: "15K-30K" },
  { label: "₹30K - ₹60K", value: "30K-60K" },
  { label: "₹60K+", value: "60K+" },
]

const features = [
  "Fast 7-Day Delivery",
  "Modern, Conversion-Led Design",
  "GST Registered & 100% Secure",
  "Based in Agra (Face-to-face meetings)",
]

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      preferWhatsapp: true,
      projectType: "Website",
      budget: "15K-30K",
    }
  })

  const currentProjectType = watch("projectType")
  const currentBudget = watch("budget")
  const currentPreferWhatsapp = watch("preferWhatsapp")

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setStatus("success")
        reset()
      } else {
        setStatus("error")
      }
    } catch (error) {
      console.error("Form error:", error)
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Google Maps Background */}
      <div className="absolute inset-0 z-0">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113579.52264639423!2d77.9099719586146!3d27.1763098254202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39740d857c2f41d9%3A0x784aef38a6523f74!2sAgra%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1710660000000!5m2!1sen!2sin"
          className="w-full h-full grayscale opacity-30"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/20 to-background" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 bg-black/20 backdrop-blur-xl">
          {/* Left Panel: Deep Dark BG with Glassy Overlay */}
          <div className="lg:w-2/5 bg-black/60 p-10 md:p-16 text-[#EDE8DF] relative overflow-hidden border-r border-white/5">
            <div className="absolute inset-0 bg-accent/5 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="h2-section mb-8 leading-tight">
                Start Your <br /> <span className="text-accent">Project.</span>
              </h2>
              <p className="body-large opacity-90 mb-12">
                Tell us about your business and we&apos;ll help you build
                a website that works harder than you do.
              </p>

              <div className="space-y-6 mb-16">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-accent" />
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-8 pt-8 border-t border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-accent">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest opacity-40 mb-1 font-mono">Call Us</p>
                    <p className="text-lg font-bold">+91 8279934295</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-accent">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest opacity-40 mb-1 font-mono">Visit Us</p>
                    <p className="text-lg font-bold">Agra, Uttar Pradesh</p>
                  </div>
                </div>
              </div>

              <Button
                className="w-full mt-12 h-16 rounded-2xl bg-accent text-[#0A0908] hover:bg-accent/90 font-black text-lg gap-3 border-0"
                onClick={() => window.open("https://wa.me/918279934295?text=Hello%20Arcova!%20I%20want%20to%20start%20a%20project.", "_blank")}
              >
                <MessageSquare size={24} />
                WhatsApp Now
              </Button>
            </div>
          </div>

          {/* Right Panel: Surface BG with Glassy Effect */}
          <div className="lg:w-3/5 bg-white/[0.02] backdrop-blur-2xl p-10 md:p-16 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20"
                >
                  <div className="w-24 h-24 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-4xl font-black text-[#EDE8DF] mb-4">Request Sent!</h3>
                  <p className="body-large mb-10">
                    Thank you for reaching out. We&apos;ll get back to you
                    on WhatsApp within 2 hours.
                  </p>
                  <Button
                    variant="outline"
                    className="rounded-full border-accent/20"
                    onClick={() => setStatus("idle")}
                  >
                    Send another request
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3 className="h3-card mb-10 text-[#EDE8DF]">Project Inquiry</h3>
                  <form className="grid grid-cols-1 gap-8" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <div className="relative group">
                          <Input
                            {...register("name")}
                            placeholder="Your Name"
                            className={`bg-transparent border-0 border-b rounded-none h-12 px-0 focus-visible:ring-0 focus-visible:border-accent transition-colors text-lg placeholder:text-[#555550] ${errors.name ? 'border-red-500/50' : 'border-white/10'}`}
                          />
                          <div className="absolute bottom-0 left-0 h-0.5 bg-accent w-0 group-focus-within:w-full transition-all duration-300" />
                        </div>
                        {errors.name && <p className="text-xs text-red-500/80 font-medium">{errors.name.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <div className="relative group">
                          <Input
                            {...register("whatsapp")}
                            type="tel"
                            placeholder="WhatsApp Number"
                            className={`bg-transparent border-0 border-b rounded-none h-12 px-0 focus-visible:ring-0 focus-visible:border-accent transition-colors text-lg placeholder:text-[#555550] ${errors.whatsapp ? 'border-red-500/50' : 'border-white/10'}`}
                          />
                          <div className="absolute bottom-0 left-0 h-0.5 bg-accent w-0 group-focus-within:w-full transition-all duration-300" />
                        </div>
                        {errors.whatsapp && <p className="text-xs text-red-500/80 font-medium">{errors.whatsapp.message}</p>}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-sm font-bold uppercase tracking-widest text-[#555550]">Project Type</p>
                      <div className="flex flex-wrap gap-3">
                        {projectTypes.map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setValue("projectType", type as any)}
                            className={`px-6 py-2 rounded-full border text-xs font-bold transition-all duration-300 ${
                              currentProjectType === type
                                ? "bg-accent border-accent text-accent-foreground"
                                : "border-white/10 text-white/40 hover:border-white/30"
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-sm font-bold uppercase tracking-widest text-[#555550]">Budget Range</p>
                      <div className="flex flex-wrap gap-3">
                        {budgetRanges.map((range) => (
                          <button
                            key={range.value}
                            type="button"
                            onClick={() => setValue("budget", range.value as any)}
                            className={`px-6 py-2 rounded-full border text-xs font-bold transition-all duration-300 ${
                              currentBudget === range.value
                                ? "bg-accent border-accent text-accent-foreground"
                                : "border-white/10 text-white/40 hover:border-white/30"
                            }`}
                          >
                            {range.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="relative group">
                        <Textarea
                          {...register("message")}
                          placeholder="Tell us about your project requirements..."
                          className={`bg-transparent border-0 border-b rounded-none min-h-[100px] px-0 focus-visible:ring-0 focus-visible:border-accent transition-colors text-lg resize-none placeholder:text-[#555550] ${errors.message ? 'border-red-500/50' : 'border-white/10'}`}
                        />
                        <div className="absolute bottom-0 left-0 h-0.5 bg-accent w-0 group-focus-within:w-full transition-all duration-300" />
                      </div>
                      {errors.message && <p className="text-xs text-red-500/80 font-medium">{errors.message.message}</p>}
                    </div>

                    <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => setValue("preferWhatsapp", !currentPreferWhatsapp)}>
                      <div className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${currentPreferWhatsapp ? 'bg-accent border-accent' : 'border-white/20'}`}>
                        {currentPreferWhatsapp && <CheckCircle2 size={16} className="text-accent-foreground" />}
                      </div>
                      <span className="text-sm text-[#EDE8DF]/60 font-medium">📱 Contact me on WhatsApp instead</span>
                    </div>

                    <div className="space-y-4">
                      <Button
                        type="submit"
                        disabled={status === "loading"}
                        className="h-16 px-12 rounded-2xl text-lg font-black group bg-accent text-[#0A0908] hover:bg-accent/90 border-0 disabled:opacity-50"
                      >
                        {status === "loading" ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          <>
                            Get Free Consultation →
                          </>
                        )}
                      </Button>
                      <p className="text-sm text-[#555550] italic flex items-center gap-2">
                        <span className="text-accent">🔒</span> We reply within 2 hours. No spam, ever.
                      </p>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
