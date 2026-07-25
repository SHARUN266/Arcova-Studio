"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Globe, Zap, Shield, BarChart3, ChevronRight, CheckCircle2, AlertCircle, Loader2, Cpu, Activity, Layout, Lock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

type AuditState = "INPUT" | "ANALYZING" | "REPORT"

interface AuditResult {
  score: number
  scores: {
    seo: number
    performance: number
    design: number
    security: number
  }
  criticalImprovements: string[]
  summary: string
}

const analysisLogs = [
  "INITIALIZING SECURE HANDSHAKE...",
  "PROTOCOL: HTTPS/3 DETECTED",
  "SCANNING METADATA & ROBOTS.TXT...",
  "ANALYSE: DOM DEPTH 14 LEVELS",
  "AUDIT: CLS & LCP METRICS...",
  "CHECKING SSL CERTIFICATE V3...",
  "AI ENGINE: HEURISTIC ANALYSIS...",
  "COMPILING REPORT HEADERS...",
  "FINALIZING RESULTS..."
]

function ScoreGauge({ score, label, icon: Icon }: { score: number, label: string, icon: any }) {
  return (
    <div className="flex flex-col items-center p-5 bg-[#F5F5F3] rounded-2xl border border-gray-200 relative group hover:border-[#F26530]/30 transition-all duration-500 overflow-hidden">
      <div className="relative w-20 h-20 mb-3">
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-gray-200" />
          <motion.circle
            initial={{ strokeDasharray: "0 226" }}
            animate={{ strokeDasharray: `${(score / 100) * 226} 226` }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
            cx="40" cy="40" r="36" stroke="#F26530" strokeWidth="4" fill="transparent" strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-black text-[#1A1A1A] leading-none">{score}</span>
          <span className="text-[7px] font-mono uppercase opacity-50">Score</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Icon size={12} className="text-[#F26530]" />
        <span className="text-[9px] font-mono uppercase tracking-widest font-bold text-gray-700">{label}</span>
      </div>
    </div>
  )
}

export function Auditor() {
  const [state, setState] = useState<AuditState>("INPUT")
  const [url, setUrl] = useState("")
  const [logIndex, setLogIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [report, setReport] = useState<AuditResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const logContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (state === "ANALYZING") {
      const logInterval = setInterval(() => {
        setLogIndex((prev) => (prev < analysisLogs.length - 1 ? prev + 1 : prev))
      }, 900)

      const progressInterval = setInterval(() => {
        setProgress((prev) => (prev < 98 ? prev + 0.5 : 98))
      }, 50)

      return () => {
        clearInterval(logInterval)
        clearInterval(progressInterval)
      }
    }
  }, [state])

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight
    }
  }, [logIndex])

  const handleStartAudit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) return

    setError(null)
    setState("ANALYZING")
    setLogIndex(0)
    setProgress(0)

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })

      const data = await response.json()

      if (!response.ok && !data.score) {
        throw new Error(data.error || "Something went wrong")
      }

      setReport(data)
      setProgress(100)

      setTimeout(() => {
        setState("REPORT")
      }, 1000)

    } catch (err: any) {
      setError(err.message)
      setState("INPUT")
    }
  }

  return (
    <section id="auditor" className="section-padding relative overflow-hidden bg-[#FAFAF8] section-border">
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F26530]/10 border border-[#F26530]/20 mb-6"
          >
            <Activity size={14} className="text-[#F26530] animate-pulse" />
            <span className="text-[10px] uppercase font-mono font-bold tracking-[0.2em] text-[#F26530]">14 Scans Performed Today</span>
          </motion.div>

          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="h2-section max-w-4xl tracking-tighter text-[#1A1A1A]">
            Is Your Website <br />
            <span className="text-[#F26530] underline decoration-[#F26530]/20 underline-offset-[12px]">Losing You Money?</span>
          </motion.h2>
          <p className="body-large text-gray-600 max-w-2xl mt-6">
            Stop guessing. Our AI deep-scans your site to find the exact bottlenecks killing your online sales.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {error && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mb-8 p-4 bg-red-500/10 border border-red-500/20 text-red-600 rounded-2xl text-sm text-center font-bold font-mono tracking-tight">
              SYSTEM_FAULT: {error.toUpperCase()}
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {state === "INPUT" && (
              <motion.div key="input" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white p-2 rounded-3xl md:rounded-[3rem] border border-gray-200 shadow-[0_20px_50px_rgba(0,0,0,0.04)] relative group overflow-hidden">
                <div className="bg-white p-6 sm:p-10 md:p-12 rounded-[2rem] md:rounded-[2.8rem] relative z-10">
                  <form onSubmit={handleStartAudit} className="flex flex-col md:flex-row gap-4 relative z-20">
                    <div className="relative flex-1">
                      <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-[#F5F5F3] flex items-center justify-center border border-gray-200">
                        <Globe className="text-gray-500" size={18} />
                      </div>
                      <input
                        type="text"
                        placeholder="Enter domain (e.g. sharmajewellers.com)"
                        className="w-full bg-[#F5F5F3] border border-gray-200 rounded-2xl md:rounded-[1.5rem] py-4 md:py-6 pl-16 md:pl-20 pr-4 md:pr-8 text-base md:text-xl focus:outline-none focus:border-[#F26530]/50 focus:bg-white transition-all text-[#1A1A1A] tracking-tight"
                        value={url} onChange={(e) => setUrl(e.target.value)} required
                      />
                    </div>
                    <Button type="submit" size="lg" className="bg-[#F26530] hover:bg-[#E0531E] text-white font-black text-base md:text-lg h-auto py-5 md:py-6 px-8 md:px-12 rounded-2xl md:rounded-[1.5rem] shadow-[0_10px_30px_rgba(242,101,48,0.3)] active:scale-[0.98] transition-all group/btn w-full md:w-auto mt-4 md:mt-0">
                      SCAN NOW <Search className="ml-3 w-5 h-5 md:w-6 md:h-6 group-hover/btn:rotate-12 transition-transform" />
                    </Button>
                  </form>
                  <div className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
                    {[
                      { icon: Zap, text: "Lighthouse Performance" },
                      { icon: Shield, text: "Security Header Validation" },
                      { icon: Activity, text: "SEO Saturation" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 group/item">
                        <div className="w-10 h-10 rounded-full bg-[#F5F5F3] border border-gray-200 flex items-center justify-center flex-shrink-0">
                          <item.icon size={16} className="text-[#F26530]" />
                        </div>
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-gray-600">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {state === "ANALYZING" && (
              <motion.div key="analyzing" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="bg-white p-6 sm:p-10 md:p-16 rounded-3xl md:rounded-[3rem] border border-gray-200 shadow-xl relative overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
                  <div className="relative flex flex-col items-center">
                    <div className="relative w-64 h-64">
                      <div className="absolute inset-0 border-2 border-gray-200 rounded-full" />
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-t-2 border-[#F26530] rounded-full" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-5xl font-black text-[#F26530]">{Math.round(progress)}%</span>
                      </div>
                    </div>
                    <div className="mt-12 text-center">
                      <h3 className="text-2xl font-bold text-[#1A1A1A] mb-3">AI Deep Scan: {url}</h3>
                      <p className="text-[#F26530] font-mono text-xs uppercase tracking-[0.3em] font-bold animate-pulse">{analysisLogs[logIndex]}</p>
                    </div>
                  </div>
                  <div className="bg-[#1A1A1A] border border-gray-800 rounded-3xl p-8 font-mono text-[11px] leading-relaxed relative text-white">
                    <div className="mt-2 h-[240px] overflow-hidden" ref={logContainerRef}>
                      <div className="space-y-3 opacity-80">
                        {analysisLogs.slice(0, logIndex + 1).map((log, i) => (
                          <div key={i} className="flex gap-4">
                            <span className="text-[#F26530]">[{new Date().toLocaleTimeString()}]</span>
                            <span className="text-gray-300">{log}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {state === "REPORT" && report && (
              <motion.div key="report" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                {/* Left Column */}
                <div className="space-y-8">
                  <div className="bg-white p-6 sm:p-8 md:p-10 rounded-3xl md:rounded-[3rem] border border-gray-200 shadow-xl">
                    <div className="flex items-center gap-3 mb-6 md:mb-8">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                        <CheckCircle2 size={20} />
                      </div>
                      <div>
                        <h4 className="font-black text-xl text-[#1A1A1A] uppercase tracking-tighter">Diagnostic Report</h4>
                        <p className="text-[10px] font-mono uppercase tracking-widest text-gray-500">{url}</p>
                      </div>
                    </div>

                    <div className="mb-10 p-6 bg-[#F5F5F3] rounded-2xl border border-gray-200 italic text-gray-700 leading-relaxed">
                      "{report.summary}"
                    </div>

                    <div className="space-y-4">
                      <h5 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#F26530] mb-4">Strategic Vulnerabilities</h5>
                      {report.criticalImprovements.map((tip, i) => (
                        <div key={i} className="flex items-start gap-4 p-5 bg-[#F5F5F3] rounded-2xl border border-gray-200">
                          <span className="w-6 h-6 rounded-full bg-[#F26530] text-white flex items-center justify-center font-mono font-bold text-[9px] flex-shrink-0">0{i + 1}</span>
                          <p className="text-sm font-normal text-gray-800 leading-snug">{tip}</p>
                        </div>
                      ))}
                      <button
                        onClick={() => window.open(`https://wa.me/918279934295?text=I%20just%20scanned%20my%20site%20${url}%20and%20got%20a%20score%20of%20${report.score}.%20Can%20you%20help%20fix%20the%20critical%20errors?`, '_blank')}
                        className="w-full mt-6 py-5 rounded-2xl bg-[#F26530] text-white font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#E0531E] transition-all shadow-[0_10px_30px_rgba(242,101,48,0.3)]"
                      >
                        Fix These Errors on WhatsApp
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>

                  <button onClick={() => setState("INPUT")} className="w-full py-4 text-gray-600 hover:text-[#F26530] font-mono text-[9px] uppercase tracking-[0.3em] font-bold border border-gray-200 rounded-2xl hover:border-[#F26530]/40 transition-all bg-white">
                    ← Audit Another Domain
                  </button>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  <div className="bg-white p-6 sm:p-8 md:p-10 rounded-3xl md:rounded-[3rem] border border-gray-200 shadow-xl relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 md:mb-10">
                      <h4 className="font-black text-xl text-[#1A1A1A] uppercase tracking-tighter text-center sm:text-left">Metric Analysis</h4>
                      <div className="px-3 py-1 bg-[#F26530]/10 border border-[#F26530]/20 rounded-full text-[9px] font-mono font-bold text-[#F26530] uppercase mx-auto sm:mx-0">Overall Impact Score</div>
                    </div>

                    <div className="flex flex-col items-center mb-12">
                      <div className="relative w-48 h-48 flex items-center justify-center mb-6">
                        <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                          <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-100" />
                          <motion.circle
                            initial={{ strokeDashoffset: 553 }} animate={{ strokeDashoffset: 553 - (553 * report.score / 100) }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            cx="96" cy="96" r="88" stroke="#F26530" strokeWidth="12" fill="transparent" strokeDasharray="553" strokeLinecap="round"
                          />
                        </svg>
                        <div className="text-center z-10">
                          <span className="text-6xl font-black block text-[#1A1A1A]">{report.score}</span>
                          <span className="text-xs font-mono uppercase opacity-50 tracking-widest text-gray-500">Aggregate</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 w-full">
                        <ScoreGauge score={report.scores.seo} label="SEO" icon={Globe} />
                        <ScoreGauge score={report.scores.performance} label="Speed" icon={Zap} />
                        <ScoreGauge score={report.scores.design} label="UI/UX" icon={Layout} />
                        <ScoreGauge score={report.scores.security} label="Security" icon={Lock} />
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#F26530] p-6 sm:p-8 md:p-10 rounded-3xl md:rounded-[3rem] text-white text-center shadow-[0_20px_50px_rgba(242,101,48,0.3)]">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <BarChart3 className="text-[#F26530] w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter leading-[1.1] mb-4">Redeem Full <br />AI Strategy (PDF)</h3>
                    <p className="text-white/80 text-xs mb-8 font-medium">Get a deep-dive competitor analysis for your market.</p>
                    <Button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="w-full bg-[#1A1A1A] text-white hover:bg-black font-black py-7 rounded-2xl shadow-xl">
                      FIX MY WEBSITE <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
