"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Loader2, CheckCircle2, AlertCircle } from "lucide-react"

export default function AdminPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch("/api/admin/generate-blog", {
        method: "POST",
      })
      const data = await res.json()
      
      if (data.success) {
        setResult(data.post)
      } else {
        setError(data.error || "Failed to generate blog")
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-6 py-24 max-w-4xl">
      <div className="flex flex-col items-center text-center mb-16">
        <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6">
          <Sparkles className="text-accent" size={32} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
          AI Blog <span className="text-accent">Auto-Pilot</span>
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
          Trigger the Gemini AI to generate a high-quality, SEO-optimized blog post for a random city and service area.
        </p>
      </div>

      <div className="glass p-12 rounded-3xl border flex flex-col items-center shadow-2xl">
        {!result && !error && (
          <div className="text-center">
            <p className="text-muted-foreground mb-8 italic">
              Ready to generate fresh content? Click the button below.
            </p>
            <Button 
              size="lg" 
              onClick={handleGenerate} 
              disabled={loading}
              className="rounded-full px-12 h-16 text-lg font-bold bg-accent text-accent-foreground hover:scale-[1.05] transition-transform shadow-xl shadow-accent/20 uppercase tracking-widest border-0"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 animate-spin" size={24} />
                  Generating...
                </>
              ) : (
                <>
                  Generate New Post
                  <ArrowRight className="ml-2" size={24} />
                </>
              )}
            </Button>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
              <AlertCircle className="text-destructive" size={24} />
            </div>
            <p className="text-destructive font-bold mb-6">{error}</p>
            <Button variant="outline" onClick={() => setError(null)} className="rounded-full px-8">
              Try Again
            </Button>
          </div>
        )}

        {result && (
          <div className="w-full text-left">
            <div className="flex items-center gap-3 mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
              <CheckCircle2 className="text-emerald-500" size={24} />
              <p className="text-emerald-500 font-bold">Success! New post generated and saved.</p>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-accent">{result.title}</h2>
              <div className="flex gap-4">
                <span className="label-mono opacity-50">{result.category}</span>
                <span className="label-mono opacity-50">{result.readTime}</span>
              </div>
              <p className="text-muted-foreground">{result.excerpt}</p>
              <div className="pt-8 flex gap-4">
                <Button 
                  onClick={() => window.open(`/blog/${result.slug}`, "_blank")}
                  variant="outline"
                  className="rounded-full px-8"
                >
                  View Live Post
                </Button>
                <Button 
                   onClick={() => setResult(null)}
                   className="rounded-full px-8"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-12 text-center text-xs text-muted-foreground/40 font-mono uppercase tracking-[0.2em]">
        Powered by Gemini 2.0 Flash — Arcova Studio Automation
      </div>
    </div>
  )
}
