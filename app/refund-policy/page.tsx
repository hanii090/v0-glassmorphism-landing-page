"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Shield, Clock, CheckCircle, AlertTriangle } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/sections/footer"
import { Button } from "@/components/ui/button"

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900/50 to-slate-900 pointer-events-none" />

      <div className="fixed top-20 left-10 w-32 h-32 bg-green-500/10 rounded-full blur-xl animate-float" />
      <div className="fixed top-40 right-20 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl animate-float-delayed" />

      <Navbar />

      <div className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              100% Money-Back Guarantee
            </h1>
            <p className="text-xl text-slate-400">Our commitment to your satisfaction</p>
          </motion.div>

          {/* Guarantee Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-6 shadow-lg shadow-green-500/20">
              <Shield className="w-16 h-16 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Quality Guaranteed</h2>
            <p className="text-slate-400">If your work fails plagiarism check, get your money back within 24 hours</p>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-slate-800/30 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12"
          >
            <div className="space-y-8 text-slate-300 leading-relaxed">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <CheckCircle className="w-6 h-6 mr-3 text-green-400" />
                  Our Guarantee Promise
                </h2>
                <p className="text-lg mb-4">
                  At Submitly, we stand behind the quality of our work with a comprehensive money-back guarantee. If
                  your assignment fails any plagiarism or similarity check, we will provide a full refund within 24
                  hours.
                </p>
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                  <h3 className="text-green-400 font-semibold mb-3">What's Covered:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      Plagiarism detection failures
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      AI content detection issues
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      Similarity index above acceptable limits
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      Failure to meet specified requirements
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <Clock className="w-6 h-6 mr-3 text-blue-400" />
                  Refund Process Timeline
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-slate-700/30 rounded-xl p-6 text-center">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <h3 className="font-semibold text-white mb-2">Report Issue</h3>
                    <p className="text-sm text-slate-400">
                      Contact us with plagiarism report within 7 days of delivery
                    </p>
                  </div>
                  <div className="bg-slate-700/30 rounded-xl p-6 text-center">
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <h3 className="font-semibold text-white mb-2">Review</h3>
                    <p className="text-sm text-slate-400">Our team reviews your case within 12 hours</p>
                  </div>
                  <div className="bg-slate-700/30 rounded-xl p-6 text-center">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <h3 className="font-semibold text-white mb-2">Refund</h3>
                    <p className="text-sm text-slate-400">Full refund processed within 24 hours if claim is valid</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Refund Eligibility</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                    <h3 className="text-green-400 font-semibold mb-3 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Eligible for Refund
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li>• Plagiarism detected above 15%</li>
                      <li>• AI content detected above 20%</li>
                      <li>• Work not delivered by deadline</li>
                      <li>• Requirements not met as specified</li>
                      <li>• Quality below academic standards</li>
                    </ul>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                    <h3 className="text-red-400 font-semibold mb-3 flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      Not Eligible for Refund
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li>• Change of mind after delivery</li>
                      <li>• Requests made after 7 days</li>
                      <li>• Minor formatting issues</li>
                      <li>• Subjective quality complaints</li>
                      <li>• Work already submitted by student</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">How to Request a Refund</h2>
                <div className="bg-slate-700/30 rounded-xl p-6">
                  <ol className="space-y-4">
                    <li className="flex items-start">
                      <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                        1
                      </span>
                      <div>
                        <strong className="text-white">Email us at support@submitly.com</strong>
                        <p className="text-slate-400 text-sm">
                          Include your order ID and detailed explanation of the issue
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                        2
                      </span>
                      <div>
                        <strong className="text-white">Provide Evidence</strong>
                        <p className="text-slate-400 text-sm">
                          Attach plagiarism report or other supporting documentation
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                        3
                      </span>
                      <div>
                        <strong className="text-white">Wait for Review</strong>
                        <p className="text-slate-400 text-sm">Our team will investigate and respond within 12 hours</p>
                      </div>
                    </li>
                  </ol>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                  <p className="mb-4">For refund requests or questions about our guarantee:</p>
                  <div className="space-y-2">
                    <p>
                      <strong>Email:</strong> support@submitly.com
                    </p>
                    <p>
                      <strong>Subject Line:</strong> "Refund Request - Order #[Your Order ID]"
                    </p>
                    <p>
                      <strong>Response Time:</strong> Within 12 hours
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </motion.div>

          {/* Back to Home */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link href="/">
              <Button
                variant="primary"
                icon={<ArrowLeft />}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
              >
                Back to Home
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
