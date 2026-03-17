"use client"

import { motion } from "framer-motion"
import { Check, X } from "lucide-react"

const comparisonData = [
  {
    feature: "Face-to-face meetings",
    arcova: true,
    delhiAgency: false,
    freelancer: false,
  },
  {
    feature: "Local market knowledge",
    arcova: true,
    delhiAgency: false,
    freelancer: "maybe",
  },
  {
    feature: "Price",
    arcova: "₹₹",
    delhiAgency: "₹₹₹₹",
    freelancer: "₹",
  },
  {
    feature: "Response time",
    arcova: "< 2 hrs",
    delhiAgency: "24+ hrs",
    freelancer: "Varies",
  },
  {
    feature: "Ongoing support",
    arcova: true,
    delhiAgency: "extra",
    freelancer: false,
  },
]

export function LocalComparison() {
  return (
    <section className="section-padding bg-black relative overflow-hidden">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <span className="label-mono mb-4 block text-accent">Why Local Beats Remote</span>
          <h2 className="h2-section text-foreground">
            Why Agra Businesses Choose Us Over <span className="text-accent underline decoration-accent/20 italic">Delhi</span> Agencies
          </h2>
        </div>

        <div className="max-w-5xl mx-auto overflow-x-auto">
          <table className="w-full text-left border-collapse glass rounded-3xl overflow-hidden shadow-2xl border border-white/5">
            <thead>
              <tr className="bg-accent/10 border-b border-accent/20">
                <th className="py-8 px-10 text-xs font-black uppercase tracking-widest text-accent">Feature</th>
                <th className="py-8 px-10 text-xs font-black uppercase tracking-widest text-accent text-center bg-accent/5">Arcova</th>
                <th className="py-8 px-10 text-xs font-black uppercase tracking-widest text-foreground/40 text-center">Delhi Agency</th>
                <th className="py-8 px-10 text-xs font-black uppercase tracking-widest text-foreground/40 text-center">Freelancer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {comparisonData.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-white/[0.02]" : "bg-transparent text-foreground/80"}>
                  <td className="py-6 px-10 font-medium text-lg">{row.feature}</td>
                  <td className="py-6 px-10 text-center bg-accent/5">
                    <span className="flex justify-center">
                      {row.arcova === true ? (
                        <Check className="text-accent" size={24} />
                      ) : (
                        <span className="font-black text-accent">{row.arcova}</span>
                      )}
                    </span>
                  </td>
                  <td className="py-6 px-10 text-center grayscale opacity-40">
                    <span className="flex justify-center">
                      {row.delhiAgency === true ? (
                        <Check size={20} />
                      ) : row.delhiAgency === false ? (
                        <X size={20} />
                      ) : (
                        <span className="text-sm font-bold">{row.delhiAgency}</span>
                      )}
                    </span>
                  </td>
                  <td className="py-6 px-10 text-center grayscale opacity-40">
                    <span className="flex justify-center">
                      {row.freelancer === true ? (
                        <Check size={20} />
                      ) : row.freelancer === false ? (
                        <X size={20} />
                      ) : (
                        <span className="text-sm font-bold italic">{row.freelancer}</span>
                      )}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <p className="text-center mt-12 text-sm italic opacity-40">
          * Based on average market feedback from local Agra businesses.
        </p>
      </div>
    </section>
  )
}
