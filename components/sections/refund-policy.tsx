"use client"

import { CheckCircle, Shield, Clock } from "lucide-react"
import { motion } from "framer-motion"

export default function RefundPolicy() {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Glowing background card */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-3xl blur-xl" />

          <div className="relative bg-slate-800/40 backdrop-blur-md border border-green-500/30 rounded-3xl p-12 overflow-hidden">
            {/* Animated background patterns */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/10 to-emerald-500/10 rounded-full blur-2xl animate-pulse" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-400/10 to-green-500/10 rounded-full blur-2xl animate-pulse delay-1000" />

            <div className="relative z-10 text-center">
              {/* Badge icon with 3D effect */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
                viewport={{ once: true }}
                className="relative mx-auto mb-8"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center relative">
                  <Shield className="w-12 h-12 text-white relative z-10" />

                  {/* 3D effect layers */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full transform translate-x-1 translate-y-1 opacity-60 -z-10" />
                  <div className="absolute inset-0 bg-gradient-to-br from-green-300 to-emerald-400 rounded-full transform translate-x-2 translate-y-2 opacity-30 -z-20" />

                  {/* Rotating ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="absolute inset-0 border-2 border-green-400/50 rounded-full"
                  />
                </div>

                {/* Floating checkmarks */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center"
                >
                  <CheckCircle className="w-5 h-5 text-white" />
                </motion.div>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"
              >
                100% Money-Back Guarantee
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-xl text-slate-300 mb-8 leading-relaxed max-w-3xl mx-auto"
              >
                If your file fails plagiarism or similarity check, you get a refund within 24 hours. We stand behind our
                work with complete confidence in our quality standards.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex flex-wrap justify-center gap-6"
              >
                <div className="flex items-center px-6 py-3 bg-green-500/20 border border-green-500/30 rounded-full">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                  <span className="text-green-400 font-semibold">Plagiarism-Free Guarantee</span>
                </div>

                <div className="flex items-center px-6 py-3 bg-blue-500/20 border border-blue-500/30 rounded-full">
                  <Clock className="w-5 h-5 text-blue-400 mr-2" />
                  <span className="text-blue-400 font-semibold">24-Hour Refund Process</span>
                </div>
              </motion.div>

              {/* Animated guarantee seal */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
                className="mt-8 inline-block"
              >
                <div className="relative">
                  <div className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-full shadow-lg">
                    QUALITY GUARANTEED
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-lg opacity-50 animate-pulse" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
