"use client"

import Link from "next/link"
import { ArrowRight, Zap, Shield } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function FinalCTA() {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative">
        {/* Animated background elements */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-orange-500/20 to-yellow-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -right-20 w-32 h-32 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="bg-slate-800/40 backdrop-blur-md border border-white/10 rounded-3xl p-16 text-center relative overflow-hidden">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-yellow-500/5 to-orange-500/5 animate-pulse" />

            {/* Floating light beams */}
            <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-transparent via-orange-400/20 to-transparent animate-pulse" />
            <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-transparent via-yellow-400/20 to-transparent animate-pulse delay-500" />

            <div className="relative z-10">
              {/* Glowing badge */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                viewport={{ once: true }}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500/20 to-yellow-600/20 border border-orange-500/30 rounded-full mb-8"
              >
                <Zap className="w-5 h-5 text-orange-400 mr-2 animate-pulse" />
                <span className="text-orange-400 font-semibold">Ready to Get Started?</span>
                <div className="w-2 h-2 bg-green-400 rounded-full ml-3 animate-ping" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
              >
                <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  Submit Assignment
                </span>
                <br />
                <span className="bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Now
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-2xl text-slate-400 mb-12 leading-relaxed max-w-3xl mx-auto"
              >
                Get expert help. Fast. Plagiarism-free.
                <br />
                <span className="text-lg text-slate-500">
                  Join thousands of students who achieved academic success with us
                </span>
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              >
                <Link href="/submit">
                  <Button
                    variant="primary"
                    size="lg"
                    icon={<ArrowRight />}
                    className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white border-orange-400/30 shadow-lg shadow-orange-500/25"
                  >
                    Submit Assignment Now
                  </Button>
                </Link>

                <div className="flex items-center space-x-4 text-slate-400">
                  <Shield className="w-6 h-6 text-green-400" />
                  <span className="text-sm">100% Secure & Confidential</span>
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex flex-wrap justify-center gap-8 mt-12 pt-8 border-t border-white/10"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                    1000+
                  </div>
                  <div className="text-slate-400 text-sm">Students Helped</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    98%
                  </div>
                  <div className="text-slate-400 text-sm">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    24/7
                  </div>
                  <div className="text-slate-400 text-sm">Support</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
