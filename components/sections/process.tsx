"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { PhoneCall, PencilRuler, ClipboardCheck, Rocket } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Pehle Hum Baat Karenge",
    description: "Hum aapke business ko samjhenge, aapki audience ko dekhenge aur budget guide karenge. Sab face-to-face ya call par.",
    icon: PhoneCall,
  },
  {
    number: "02",
    title: "Phir Aapka Design Banega",
    description: "Aapka design finalize hone ke baad, hum agle 7 din mein code likhkar aapki site ready kar denge.",
    icon: PencilRuler,
  },
  {
    number: "03",
    title: "Aap Dekhenge, Hum Sudharenge",
    description: "Site banne ke baad, hum aapko dikhayenge. Agar kuch badalna ho toh hum 2 revisions bilkul free karenge.",
    icon: ClipboardCheck,
  },
  {
    number: "04",
    title: "Finally, Aapki Site Live",
    description: "Sab perfect hone par site live jayegi. Aur hum hamesha support ke liye available rahenge.",
    icon: Rocket,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
}

export function Process() {
  return (
    <section id="process" className="section-padding relative overflow-hidden bg-dark-elevated">
      {/* Background Image Integration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Image
          src="/hacker-using-computer-keyboard-with-data-visualization.jpg"
          alt="Technical Process Background"
          fill
          className="object-cover opacity-10 brightness-[0.3] grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
      </div>
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="h2-section"
          >
            <span className="text-gradient font-italic-serif font-light">7 Days.</span> Live.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl body-large"
          >
            Our streamlined process ensures your business gets a premium online presence
            quickly without compromising on quality or performance.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              {/* Connector Line (Desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-px bg-white/10 group-hover:bg-primary/30 transition-colors duration-500 z-0" />
              )}

              <div className="glass group-hover:border-primary/20 p-8 rounded-3xl transition-all duration-500 h-full relative z-10 overflow-hidden hover:shadow-premium group-hover:-translate-y-3">
                <div className="glass-reflection" />
                <div className="glow-bg w-32 h-32 -right-10 -top-10 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none" />
                
                {/* Step Number */}
                <span className="absolute top-6 right-8 text-4xl font-black text-foreground/5 group-hover:text-primary/10 transition-colors font-display">
                  {step.number}
                </span>

                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent/60 mb-6 group-hover:scale-110 group-hover:bg-primary/20 group-hover:text-primary group-hover:border-primary/30 transition-all duration-300 relative z-10">
                  <step.icon size={24} />
                </div>

                <h3 className="text-xl font-bold mb-3 relative z-10 font-display">
                  {step.title}
                </h3>

                <p className="body-base relative z-10">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
