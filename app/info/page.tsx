"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Upload, CreditCard, Mail, CheckCircle, Clock, Shield } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/sections/footer"
import { Button } from "@/components/ui/button"

const steps = [
  {
    icon: Upload,
    title: "Submit Your Assignment",
    description:
      "Fill out the form with your details and upload your assignment file. We accept PDF, DOC, and DOCX formats.",
    details: [
      "Enter your full name and university email (Gmail or .edu domains only)",
      "Select your subject and provide detailed assignment requirements",
      "Upload your assignment file (up to 10MB)",
      "Set your deadline for completion",
    ],
  },
  {
    icon: CreditCard,
    title: "Complete Payment",
    description: "View our secure bank transfer details and complete your payment within the time limit.",
    details: [
      "Receive bank transfer details after form submission",
      "Complete payment via bank transfer within 3 minutes",
      "Take a screenshot of your payment confirmation",
      "Keep your transaction reference for records",
    ],
  },
  {
    icon: Mail,
    title: "Upload Payment Proof",
    description: "Upload your payment screenshot to verify your transaction and start the assignment process.",
    details: [
      "Upload clear screenshot showing transaction details",
      "Ensure payment amount and reference are visible",
      "Submit within the time limit to avoid delays",
      "Receive confirmation email once verified",
    ],
  },
  {
    icon: CheckCircle,
    title: "Receive Your Solution",
    description: "Get your high-quality, plagiarism-free assignment solution delivered to your email.",
    details: [
      "Expert writers begin work immediately after payment verification",
      "Receive progress updates throughout the process",
      "Get your completed assignment via email before deadline",
      "100% original work with plagiarism report included",
    ],
  },
]

const features = [
  {
    icon: Shield,
    title: "100% Secure Process",
    description: "Your personal information and payment details are protected with bank-level security.",
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    description: "Most assignments completed within 24-48 hours, with rush options available.",
  },
  {
    icon: CheckCircle,
    title: "Quality Guarantee",
    description: "All work is original, plagiarism-free, and comes with a satisfaction guarantee.",
  },
]

export default function InfoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900/50 to-slate-900 pointer-events-none" />

      {/* Floating glowing orbs */}
      <div className="fixed top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-float" />
      <div className="fixed top-40 right-20 w-24 h-24 bg-orange-500/10 rounded-full blur-xl animate-float-delayed" />
      <div className="fixed bottom-20 left-1/4 w-40 h-40 bg-cyan-500/10 rounded-full blur-xl animate-float-slow" />

      <Navbar />

      <div className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              How It Works
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Getting expert help with your assignments is simple and secure. Follow our streamlined 4-step process to
              receive high-quality, plagiarism-free solutions delivered on time.
            </p>
          </motion.div>

          {/* Steps Section */}
          <div className="space-y-16 mb-20">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-slate-800/30 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden group hover:bg-slate-800/50 transition-all duration-500">
                  {/* Glowing background effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10 grid md:grid-cols-3 gap-8 items-start">
                    {/* Step Icon and Number */}
                    <div className="text-center md:text-left">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-orange-500 rounded-2xl mb-6 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                        <step.icon className="w-10 h-10 text-white" />
                      </div>
                      <div className="text-6xl font-bold text-slate-700/50 group-hover:text-slate-600/50 transition-colors">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                    </div>

                    {/* Step Content */}
                    <div className="md:col-span-2">
                      <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-xl text-slate-400 mb-6 leading-relaxed">{step.description}</p>

                      {/* Step Details */}
                      <ul className="space-y-3">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start">
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-orange-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                            <span className="text-slate-300">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
                </div>

                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 -bottom-8 w-0.5 h-16 bg-gradient-to-b from-blue-500/50 to-orange-500/50" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-4xl font-bold text-center text-white mb-12">Why Choose Our Process?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-slate-800/30 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center hover:bg-slate-800/50 transition-all duration-300 group"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-slate-800/30 backdrop-blur-md border border-white/10 rounded-3xl p-12 relative overflow-hidden">
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-orange-500/5 opacity-50" />

              <div className="relative z-10">
                <h3 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h3>
                <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
                  Join thousands of students who have achieved academic success with our expert assignment solutions.
                </p>
                <Link href="/submit">
                  <Button
                    variant="primary"
                    size="lg"
                    icon={<ArrowRight />}
                    className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white border-orange-400/30 shadow-lg shadow-orange-500/20"
                  >
                    Submit Your Assignment
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
