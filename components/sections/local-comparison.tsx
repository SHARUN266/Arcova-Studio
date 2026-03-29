"use client"

import { motion } from "framer-motion"
import { Check, X } from "lucide-react"

const comparisonData = [
  { feature: "Primary Website Goal", arcova: "Leads & Sales", others: "Just Looks Pretty" },
  { feature: "Lead Capture & Automation", arcova: "Fully Automated", others: "Manual / None" },
  { feature: "Agra Market Expertise", arcova: "Deep Rooted", others: "Generic" },
  { feature: "Advertising Approach", arcova: "ROI Focused", others: "Vague Impressions" },
  { feature: "Response Time", arcova: "< 2 Hours", others: "24-48 Hours" },
]


export function LocalComparison() {
  return (
    <section className="section-padding bg-dark-surface relative overflow-hidden py-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-24">
          <span className="label-mono mb-4 block text-primary/80 tracking-[0.3em] uppercase">The Arcova Standard</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white">
            The Result-First <br className="md:hidden" />
            <span className="text-gradient font-italic-serif font-light">Alternative.</span>
          </h2>
        </div>


        <div className="max-w-4xl mx-auto flex flex-col gap-4">
          {/* Header */}
          <div className="grid grid-cols-12 gap-4 px-6 md:px-10 pb-4 border-b border-white/10">
            <div className="col-span-6 md:col-span-6 text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/40">Feature</div>
            <div className="col-span-3 md:col-span-3 text-center text-[10px] md:text-xs font-bold uppercase tracking-widest text-primary">Arcova</div>
            <div className="col-span-3 md:col-span-3 text-center text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/40">Others</div>
          </div>

          {/* Rows */}
          {comparisonData.map((row, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative"
            >
              {/* Hover highlight */}
              <div className="absolute inset-0 bg-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-screen" />
              
              <div className="grid grid-cols-12 gap-4 px-6 md:px-10 py-6 md:py-8 items-center relative z-10 border border-transparent group-hover:border-primary/20 rounded-2xl transition-all duration-300">
                <div className="col-span-6 md:col-span-6 text-sm md:text-lg font-bold text-white/80 group-hover:text-white transition-colors">
                  {row.feature}
                </div>
                
                <div className="col-span-3 md:col-span-3 flex justify-center items-center">
                  <span className="font-black font-mono text-sm md:text-base text-primary whitespace-nowrap group-hover:text-white transition-colors duration-300 drop-shadow-[0_0_10px_rgba(255,69,51,0)] group-hover:drop-shadow-[0_0_15px_rgba(255,69,51,0.8)]">
                    {row.arcova}
                  </span>
                </div>

                <div className="col-span-3 md:col-span-3 flex justify-center items-center opacity-40 group-hover:opacity-20 transition-opacity duration-300 grayscale">
                  <span className="text-xs md:text-sm font-bold font-mono text-center">{row.others}</span>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
