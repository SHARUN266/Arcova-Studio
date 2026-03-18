"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Globe, Zap, Shield, BarChart3, ChevronRight, CheckCircle2, AlertCircle, Loader2, Cpu, Activity, Layout, Lock } from "lucide-react"
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

// Animated Gauge Component
function ScoreGauge({ score, label, icon: Icon, color }: { score: number, label: string, icon: any, color: string }) {
  return (
    <div className="flex flex-col items-center p-5 bg-white/[0.03] rounded-2xl border border-white/5 relative group hover:border-accent/20 transition-all duration-500 overflow-hidden">
      <div className={`absolute top-0 right-0 w-12 h-12 bg-${color}-500/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity`} />

      <div className="relative w-20 h-20 mb-3">
        {/* Background Track */}
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/5" />
          <motion.circle
            initial={{ strokeDasharray: "0 226" }}
            animate={{ strokeDasharray: `${(score / 100) * 226} 226` }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
            cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="4" fill="transparent" strokeLinecap="round"
            className={`${color === 'accent' ? 'text-accent' : 'text-blue-500'}`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-black leading-none">{score}</span>
          <span className="text-[7px] font-mono uppercase opacity-50">Score</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Icon size={12} className="opacity-60" />
        <span className="text-[9px] font-mono uppercase tracking-widest font-bold opacity-80">{label}</span>
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

      // Track successful audit event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'generate_audit', {
          'event_category': 'Engagement',
          'event_label': url,
          'value': data.score
        });
      }

      setTimeout(() => {
        setState("REPORT")
      }, 1000)

    } catch (err: any) {
      setError(err.message)
      setState("INPUT")
    }
  }

  return (
    <section id="auditor" className="section-padding relative overflow-hidden bg-background border-y border-white/5">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <AnimatePresence>
        {state === "ANALYZING" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-accent/5 z-0">
            <motion.div animate={{ opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 4, repeat: Infinity }} className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--accent)_0%,transparent_70%)] opacity-10" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-6"
          >
            <Activity size={14} className="text-accent animate-pulse" />
            <span className="text-[10px] uppercase font-mono font-bold tracking-[0.2em] text-accent">Deep AI Analysis Engaged</span>
          </motion.div>

          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="h2-section max-w-4xl tracking-tighter">
            Stop Guessing. <br />
            <span className="text-accent underline decoration-accent/20 underline-offset-[12px]">Quantify</span> Your Visual Impact.
          </motion.h2>
        </div>

        <div className="max-w-6xl mx-auto">
          {error && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mb-8 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl text-sm text-center font-bold font-mono tracking-tight">
              SYSTEM_FAULT: {error.toUpperCase()}
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {state === "INPUT" && (
              <motion.div key="input" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="glass p-1 rounded-3xl md:rounded-[3rem] border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.5)] relative group overflow-hidden">
                <div className="bg-background/80 p-4 sm:p-8 md:p-12 rounded-[1.4rem] md:rounded-[2.8rem] border border-white/5 relative z-10">
                  <form onSubmit={handleStartAudit} className="flex flex-col md:flex-row gap-4 relative z-20">
                    <div className="relative flex-1">
                      <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-focus-within:border-accent/40 transition-colors">
                        <Globe className="text-muted-foreground group-focus-within:text-accent transition-colors" size={16} />
                      </div>
                      <input
                        type="text"
                        placeholder="Enter domain (e.g. sharmajewellers.com)"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl md:rounded-[1.5rem] py-4 md:py-6 pl-14 md:pl-20 pr-4 md:pr-8 text-base md:text-xl focus:outline-none focus:border-accent/30 focus:bg-white/[0.06] transition-all font-light tracking-tight"
                        value={url} onChange={(e) => setUrl(e.target.value)} required
                      />
                    </div>
                    <Button type="submit" size="lg" className="bg-accent hover:bg-accent/90 text-black font-black text-base md:text-lg h-auto py-5 md:py-6 px-8 md:px-12 rounded-2xl md:rounded-[1.5rem] shadow-[0_20px_40px_rgba(245,166,35,0.2)] active:scale-[0.98] transition-all group/btn w-full md:w-auto mt-4 md:mt-0">
                      SCAN NOW <Search className="ml-3 w-5 h-5 md:w-6 md:h-6 group-hover/btn:rotate-12 transition-transform" />
                    </Button>
                  </form>
                  <div className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
                    {[
                      { icon: Zap, text: "Lighthouse Performance" },
                      { icon: Shield, text: "Security Header Validation" },
                      { icon: Activity, text: "Local SEO Saturation" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 group/item">
                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center group-hover/item:bg-accent/10 group-hover/item:border-accent/30 transition-all flex-shrink-0">
                          <item.icon size={16} className="text-muted-foreground group-hover/item:text-accent transition-colors" />
                        </div>
                        <span className="text-[10px] sm:text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-muted-foreground/80 md:text-muted-foreground/60">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {state === "ANALYZING" && (
              <motion.div key="analyzing" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="glass p-6 sm:p-10 md:p-16 rounded-3xl md:rounded-[3rem] border-accent/20 shadow-[0_0_100px_rgba(245,166,35,0.1)] relative overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
                  <div className="relative flex flex-col items-center">
                    <div className="relative w-64 h-64">
                      <div className="absolute inset-0 border-[1px] border-accent/20 rounded-full" />
                      <div className="absolute inset-8 border-[1px] border-accent/10 rounded-full" />
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-t-2 border-accent rounded-full" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex flex-col items-center">
                          <span className="text-5xl font-black text-accent">{Math.round(progress)}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-12 text-center">
                      <h3 className="text-2xl font-bold mb-3">AI Deep Scan: {url}</h3>
                      <p className="text-accent font-mono text-xs uppercase tracking-[0.3em] font-bold animate-pulse">{analysisLogs[logIndex]}</p>
                    </div>
                  </div>
                  <div className="bg-black/50 border border-white/5 rounded-3xl p-8 font-mono text-[11px] leading-relaxed relative">
                    <div className="mt-2 h-[240px] overflow-hidden" ref={logContainerRef}>
                      <div className="space-y-3 opacity-80">
                        {analysisLogs.slice(0, logIndex + 1).map((log, i) => (
                          <div key={i} className="flex gap-4">
                            <span className="text-accent/40">[{new Date().toLocaleTimeString()}]</span>
                            <span className="text-white/80">{log}</span>
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
                {/* Left Column: Diagnostics & Analysis */}
                <div className="space-y-8">
                  <div className="glass p-6 sm:p-8 md:p-10 rounded-3xl md:rounded-[3rem] border-white/5 shadow-xl">
                    <div className="flex items-center gap-3 mb-6 md:mb-8">
                      <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
                        <CheckCircle2 size={20} />
                      </div>
                      <div>
                        <h4 className="font-black text-xl uppercase tracking-tighter">Diagnostic Report</h4>
                        <p className="text-[10px] font-mono uppercase tracking-widest opacity-40">{url}</p>
                      </div>
                    </div>

                    <div className="mb-10 p-6 bg-white/[0.02] rounded-2xl border border-white/5 italic text-muted-foreground leading-relaxed">
                      "{report.summary}"
                    </div>

                    <div className="space-y-4">
                      <h5 className="text-[10px] font-mono font-bold uppercase tracking-widest text-accent mb-4">Strategic Vulnerabilities</h5>
                      {report.criticalImprovements.map((tip, i) => (
                        <div key={i} className="flex items-start gap-4 p-5 bg-white/[0.03] rounded-2xl border border-white/5">
                          <span className="w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center font-mono font-bold text-[9px] flex-shrink-0">0{i + 1}</span>
                          <p className="text-sm font-light leading-snug text-white/90">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button onClick={() => setState("INPUT")} className="w-full py-4 text-muted-foreground hover:text-accent font-mono text-[9px] uppercase tracking-[0.3em] font-bold border border-white/5 rounded-2xl hover:border-accent/20 transition-all">
                    ← Audit Another Domain
                  </button>
                </div>

                {/* Right Column: Scores & CTA */}
                <div className="space-y-8">
                  <div className="glass p-6 sm:p-8 md:p-10 rounded-3xl md:rounded-[3rem] border-white/5 shadow-xl relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 md:mb-10">
                      <h4 className="font-black text-xl uppercase tracking-tighter text-center sm:text-left">Metric Analysis</h4>
                      <div className="px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-[9px] font-mono font-bold text-accent uppercase mx-auto sm:mx-0">Overall Impact Score</div>
                    </div>

                    <div className="flex flex-col items-center mb-12">
                      <div className="relative w-48 h-48 flex items-center justify-center mb-6">
                        <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                          <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/5" />
                          <motion.circle
                            initial={{ strokeDashoffset: 553 }} animate={{ strokeDashoffset: 553 - (553 * report.score / 100) }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            cx="96" cy="96" r="88" stroke="var(--accent)" strokeWidth="12" fill="transparent" strokeDasharray="553" strokeLinecap="round" className="shadow-[0_0_30px_var(--accent)]"
                          />
                        </svg>
                        <div className="text-center z-10">
                          <span className="text-6xl font-black block">{report.score}</span>
                          <span className="text-xs font-mono uppercase opacity-50 tracking-widest">Aggregate</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 w-full">
                        <ScoreGauge score={report.scores.seo} label="SEO" icon={Globe} color="accent" />
                        <ScoreGauge score={report.scores.performance} label="Speed" icon={Zap} color="blue" />
                        <ScoreGauge score={report.scores.design} label="UI/UX" icon={Layout} color="accent" />
                        <ScoreGauge score={report.scores.security} label="Security" icon={Lock} color="blue" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-accent p-6 sm:p-8 md:p-10 rounded-3xl md:rounded-[3rem] text-background text-center shadow-[0_30px_80px_rgba(245,166,35,0.2)] group hover:translate-y-[-5px] transition-all duration-500">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-background rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <BarChart3 className="text-accent w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter leading-[1.1] mb-4">Redeem Full <br />AI Strategy (PDF)</h3>
                    <p className="text-background/80 text-xs mb-8 font-medium">Get a deep-dive competitor analysis for the Agra market.</p>
                    <Button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="w-full bg-background text-foreground hover:bg-white font-black py-7 rounded-2xl shadow-xl">
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
