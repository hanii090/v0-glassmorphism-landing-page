"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, CheckCircle, AlertTriangle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PlagiarismChecker() {
  const [text, setText] = useState("")
  const [isChecking, setIsChecking] = useState(false)
  const [result, setResult] = useState<null | { original: number; matches: any[] }>(null)
  const [error, setError] = useState("")

  const handleCheck = () => {
    // Reset states
    setError("")
    setResult(null)

    // Validate input
    if (text.trim().length < 50) {
      setError("Please enter at least 50 characters to check for plagiarism.")
      return
    }

    // Simulate plagiarism check
    setIsChecking(true)
    setTimeout(() => {
      setIsChecking(false)
      // Always show 100% original in demo mode
      setResult({
        original: 100,
        matches: [],
      })
    }, 2500) // Simulate processing time
  }

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Want to Test for Plagiarism?
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Try our demo plagiarism checker to see how we ensure 100% originality in every assignment we deliver
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-slate-800/30 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden"
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-30" />

          {/* Floating particles */}
          <div className="absolute top-20 right-20 w-20 h-20 bg-purple-500/10 rounded-full blur-xl animate-float" />
          <div className="absolute bottom-20 left-20 w-16 h-16 bg-blue-500/10 rounded-full blur-xl animate-float-delayed" />

          <div className="relative z-10">
            {/* Text Input Area */}
            <div className="mb-6">
              <label htmlFor="plagiarism-text" className="block text-white text-lg font-semibold mb-3">
                Paste your text below
              </label>
              <textarea
                id="plagiarism-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste at least 50 characters of text to check for plagiarism..."
                className="w-full h-40 px-4 py-3 bg-slate-700/50 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 resize-none transition-all duration-300"
                disabled={isChecking}
              ></textarea>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-2"
                >
                  {error}
                </motion.p>
              )}
            </div>

            {/* Check Button */}
            <div className="flex justify-center mb-8">
              <Button
                onClick={handleCheck}
                disabled={isChecking || text.trim().length < 50}
                variant="primary"
                size="lg"
                icon={isChecking ? <Loader2 className="animate-spin" /> : <Search />}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-purple-400/30 shadow-lg shadow-purple-500/20"
              >
                {isChecking ? "Checking..." : "Check for Plagiarism"}
              </Button>
            </div>

            {/* Results Display */}
            {result && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="bg-slate-700/30 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>

                  <h3 className="text-3xl font-bold text-white mb-2">100% Original</h3>
                  <p className="text-green-400 text-lg mb-6">No matches found in our database</p>

                  <div className="w-full bg-slate-600/50 h-4 rounded-full mb-8 overflow-hidden">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                    ></motion.div>
                  </div>

                  <div className="text-center text-slate-400 text-sm">
                    <p>
                      All submissions are checked against billions of web pages, academic papers, and publications to
                      ensure 100% originality.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Disclaimer */}
            <div className="mt-8 flex items-start space-x-3 bg-slate-700/20 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-4">
              <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-slate-400">
                <span className="text-yellow-500 font-semibold">For demonstration only.</span> All real submissions go
                through multiple professional plagiarism detection tools including Turnitin, Copyscape, and our
                proprietary AI-powered content analysis system to guarantee 100% originality.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
