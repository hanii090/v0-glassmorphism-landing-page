"use client"

import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import TypingAnimation from "@/components/ui/typing-animation"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Floating animated shapes */}
        <motion.div
          className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-orange-500/20 to-yellow-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -top-10 -right-20 w-60 h-60 bg-gradient-to-r from-yellow-500/15 to-orange-500/15 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center px-6 py-3 bg-slate-800/40 backdrop-blur-md border border-white/10 rounded-full mb-8 shadow-2xl"
        >
          <Sparkles className="w-5 h-5 text-orange-400 mr-3 animate-pulse" />
          <span className="text-sm text-slate-300 font-medium">AI-Powered Academic Solutions</span>
          <div className="w-2 h-2 bg-green-400 rounded-full ml-3 animate-pulse" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-6xl md:text-8xl font-bold mb-8 leading-tight"
        >
          <span className="bg-gradient-to-r from-white via-orange-100 to-yellow-200 bg-clip-text text-transparent">
            Submit Assignments,
          </span>
          <br />
          <span className="bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Get Expert PDF Solutions
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-2xl text-slate-400 mb-12 max-w-4xl mx-auto leading-relaxed"
        >
          <TypingAnimation
            text="AI-assisted, plagiarism-free, human-written academic help"
            className="font-light"
            speed={80}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Link href="/submit">
            <Button
              variant="primary"
              size="lg"
              icon={<ArrowRight />}
              className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white border-orange-400/30 shadow-lg shadow-orange-500/25"
            >
              Submit Now
            </Button>
          </Link>

          <div className="flex items-center space-x-4 text-slate-400">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 bg-gradient-to-r from-orange-500 to-yellow-600 rounded-full border-2 border-slate-800 flex items-center justify-center text-white text-sm font-semibold"
                >
                  {i}
                </div>
              ))}
            </div>
            <span className="text-sm">1000+ Students Helped</span>
          </div>
        </motion.div>

        {/* Floating light beams */}
        <div className="absolute top-1/2 left-1/4 w-1 h-32 bg-gradient-to-b from-transparent via-orange-400/30 to-transparent rotate-12 animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-1 h-24 bg-gradient-to-b from-transparent via-yellow-400/30 to-transparent -rotate-12 animate-pulse delay-1000" />
      </div>
    </section>
  )
}
