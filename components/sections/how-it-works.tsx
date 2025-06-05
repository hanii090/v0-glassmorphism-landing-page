"use client"

import { Upload, CreditCard, Mail, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

const steps = [
  {
    icon: Upload,
    title: "Fill Details & Upload",
    description: "Share your assignment details, requirements, and upload your file",
    step: "01",
  },
  {
    icon: CreditCard,
    title: "Manual Payment",
    description: "Complete payment via bank transfer and upload screenshot proof",
    step: "02",
  },
  {
    icon: Mail,
    title: "Get PDF Solution",
    description: "Receive your high-quality, plagiarism-free solution by deadline",
    step: "03",
  },
]

export default function HowItWorks() {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Get your assignments done in three simple steps with our streamlined process
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Progress line */}
          <div className="hidden md:block absolute top-24 left-1/2 transform -translate-x-1/2 w-full h-0.5">
            <div className="w-full h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-30" />
            <motion.div
              className="h-full bg-gradient-to-r from-blue-400 to-purple-600"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 2, delay: 0.5 }}
              viewport={{ once: true }}
            />
          </div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="bg-slate-800/30 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-slate-800/50 transition-all duration-500 transform hover:-translate-y-4 hover:shadow-2xl hover:shadow-blue-500/10 relative overflow-hidden">
                {/* Glowing background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Step number */}
                <div className="absolute top-4 right-4 text-6xl font-bold text-slate-700/50 group-hover:text-slate-600/50 transition-colors">
                  {step.step}
                </div>

                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-slate-400 leading-relaxed mb-6">{step.description}</p>

                  {/* Progress indicator */}
                  <div className="w-full h-1 bg-slate-700/50 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-400 to-purple-600"
                      initial={{ width: "0%" }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1, delay: index * 0.3 + 0.5 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
              </div>

              {/* Arrow connector */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                  <div className="w-8 h-8 bg-slate-800/80 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-blue-400" />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
