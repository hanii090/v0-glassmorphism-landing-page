"use client"

import React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Upload, CreditCard, FileCheck, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const steps = [
  { icon: User, title: "Enter Details", description: "Name, university email or Gmail" },
  { icon: Upload, title: "Upload File", description: "Assignment document" },
  { icon: CreditCard, title: "Payment", description: "Bank details + timer" },
  { icon: FileCheck, title: "Upload Proof", description: "Payment screenshot" },
]

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1)

  return (
    <section id="submit-form" className="py-32 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Ready to Submit?
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Follow our simple 4-step process to get expert help with your assignment
          </p>
        </motion.div>

        {/* Step indicators */}
        <div className="flex justify-center mb-16">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    index + 1 <= currentStep
                      ? "bg-gradient-to-br from-orange-500 to-yellow-600 shadow-lg"
                      : "bg-slate-700/50 border border-white/10"
                  }`}
                  onHoverStart={() => setCurrentStep(index + 1)}
                >
                  <step.icon className={`w-8 h-8 ${index + 1 <= currentStep ? "text-white" : "text-slate-400"}`} />

                  {/* Step number */}
                  <div
                    className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      index + 1 <= currentStep ? "bg-white text-orange-600" : "bg-slate-600 text-slate-300"
                    }`}
                  >
                    {index + 1}
                  </div>
                </motion.div>

                {index < steps.length - 1 && (
                  <div
                    className={`w-12 h-0.5 mx-4 transition-all duration-300 ${
                      index + 1 < currentStep ? "bg-gradient-to-r from-orange-500 to-yellow-600" : "bg-slate-600"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-slate-800/30 backdrop-blur-md border border-white/10 rounded-3xl p-12 text-center"
        >
          <div className="max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
              {React.createElement(steps[currentStep - 1].icon, { className: "w-10 h-10 text-white" })}
            </div>

            <h3 className="text-3xl font-bold text-white mb-4">{steps[currentStep - 1].title}</h3>

            <p className="text-xl text-slate-400 mb-8">{steps[currentStep - 1].description}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/info">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-slate-700/50 hover:bg-slate-600/50 text-white border-white/20"
                >
                  Learn How It Works
                </Button>
              </Link>

              <Link href="/submit">
                <Button
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight />}
                  className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white border-orange-400/30"
                >
                  Start Submission Process
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
