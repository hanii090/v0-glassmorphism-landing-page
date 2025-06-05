"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Clock, Shield, ArrowRight, CheckCircle } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/sections/footer"
import { Button } from "@/components/ui/button"

export default function ManualPaymentsBlogPost() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900/50 to-slate-900 pointer-events-none" />

      <div className="fixed top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-float" />
      <div className="fixed top-40 right-20 w-24 h-24 bg-orange-500/10 rounded-full blur-xl animate-float-delayed" />

      <Navbar />

      {/* Floating back button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-24 left-8 z-40"
      >
        <Link href="/blog">
          <Button
            variant="ghost"
            size="sm"
            icon={<ArrowLeft />}
            className="bg-slate-800/50 backdrop-blur-md border border-white/10 hover:bg-slate-700/50"
          >
            Back to Blog
          </Button>
        </Link>
      </motion.div>

      <div className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="mb-6">
              <span className="px-4 py-2 bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 rounded-full text-blue-400 font-medium">
                Security
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent leading-tight">
              Manual Payments: Ensuring Student Safety and Security
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-slate-400">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                <span>Michael Chen</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>January 12, 2024</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span>4 min read</span>
              </div>
            </div>
          </motion.header>

          {/* Article Content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg prose-invert max-w-none"
          >
            <div className="bg-slate-800/30 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12">
              <div className="space-y-8 text-slate-300 leading-relaxed">
                <p className="text-xl text-slate-200 font-medium">
                  In an era where digital fraud and online scams are increasingly common, Submitly's manual payment
                  system stands as a beacon of security and transparency for students worldwide.
                </p>

                <h2 className="text-3xl font-bold text-white mt-12 mb-6">Why Manual Payments Matter</h2>
                <p>
                  While automated payment systems might seem more convenient, they often come with hidden risks and
                  vulnerabilities. Manual payments provide several key advantages that directly benefit student safety:
                </p>

                {/* Security Features List */}
                <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-8 my-8">
                  <h3 className="text-2xl font-bold text-blue-300 mb-6 flex items-center">
                    <Shield className="w-6 h-6 mr-3" />
                    Security Benefits
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      "No stored payment information",
                      "Complete transaction transparency",
                      "Student-controlled payment timing",
                      "Reduced fraud risk",
                      "Bank-level security protection",
                      "No automatic recurring charges",
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                        <span className="text-slate-300">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-white mt-12 mb-6">How Our Process Works</h2>
                <p>
                  Our manual payment process is designed to be both secure and straightforward. Here's how it protects
                  students at every step:
                </p>

                <div className="space-y-6">
                  <div className="bg-slate-700/30 rounded-2xl p-6 border-l-4 border-orange-500">
                    <h4 className="text-xl font-semibold text-white mb-2">Step 1: Assignment Submission</h4>
                    <p>Students submit their assignment details without any payment information required upfront.</p>
                  </div>

                  <div className="bg-slate-700/30 rounded-2xl p-6 border-l-4 border-blue-500">
                    <h4 className="text-xl font-semibold text-white mb-2">Step 2: Secure Payment Details</h4>
                    <p>
                      We provide bank transfer details through our secure platform, ensuring all information is
                      encrypted and protected.
                    </p>
                  </div>

                  <div className="bg-slate-700/30 rounded-2xl p-6 border-l-4 border-green-500">
                    <h4 className="text-xl font-semibold text-white mb-2">Step 3: Payment Verification</h4>
                    <p>
                      Students upload payment proof, which our team verifies manually to ensure accuracy and security.
                    </p>
                  </div>

                  <div className="bg-slate-700/30 rounded-2xl p-6 border-l-4 border-purple-500">
                    <h4 className="text-xl font-semibold text-white mb-2">Step 4: Work Commencement</h4>
                    <p>Only after payment verification do we begin work on the assignment, ensuring mutual trust.</p>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-white mt-12 mb-6">Student Privacy Protection</h2>
                <p>
                  Privacy is a fundamental right, especially for students who may face academic or personal consequences
                  if their use of assignment help services becomes known. Our manual payment system enhances privacy
                  protection in several ways:
                </p>

                <ul className="list-disc list-inside space-y-3 ml-4">
                  <li>No digital payment footprints that can be easily tracked</li>
                  <li>Minimal personal information required for transactions</li>
                  <li>No integration with social media or other platforms</li>
                  <li>Complete anonymity options available</li>
                  <li>Secure deletion of payment records after completion</li>
                </ul>
              </div>
            </div>
          </motion.article>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="bg-slate-800/30 backdrop-blur-md border border-white/10 rounded-3xl p-12">
              <h3 className="text-3xl font-bold text-white mb-4">Experience Secure Assignment Help</h3>
              <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
                Join thousands of students who trust our secure, manual payment system for their academic needs.
              </p>
              <Link href="/submit">
                <Button
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight />}
                  className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white border-orange-400/30"
                >
                  Submit Securely Now
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
