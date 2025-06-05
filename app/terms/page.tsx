"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Shield, FileText } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/sections/footer"
import { Button } from "@/components/ui/button"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900/50 to-slate-900 pointer-events-none" />

      <div className="fixed top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-float" />
      <div className="fixed top-40 right-20 w-24 h-24 bg-orange-500/10 rounded-full blur-xl animate-float-delayed" />

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
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Terms of Service
            </h1>
            <p className="text-xl text-slate-400">Last updated: January 2024</p>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-slate-800/30 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12"
          >
            <div className="prose prose-lg prose-invert max-w-none">
              <div className="space-y-8 text-slate-300 leading-relaxed">
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <Shield className="w-6 h-6 mr-3 text-blue-400" />
                    1. Acceptance of Terms
                  </h2>
                  <p>
                    By accessing and using Submitly's services, you accept and agree to be bound by the terms and
                    provision of this agreement. If you do not agree to abide by the above, please do not use this
                    service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <FileText className="w-6 h-6 mr-3 text-orange-400" />
                    2. Service Description
                  </h2>
                  <p>
                    Submitly provides academic assistance services including but not limited to essay writing, research
                    papers, programming help, and other educational support materials. All work is provided for
                    reference and learning purposes only.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">3. Payment Terms</h2>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Payment must be completed via bank transfer within the specified time limit</li>
                    <li>Payment proof must be uploaded within 3 minutes of receiving bank details</li>
                    <li>All prices are in GBP and include applicable taxes</li>
                    <li>Refunds are processed according to our refund policy</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">4. User Responsibilities</h2>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Provide accurate and complete information when submitting assignments</li>
                    <li>Use our services ethically and in accordance with your institution's policies</li>
                    <li>Maintain confidentiality of your account information</li>
                    <li>Report any issues or concerns promptly</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">5. Quality Guarantee</h2>
                  <p>We guarantee that all work delivered is:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>100% original and plagiarism-free</li>
                    <li>Written by qualified experts in the relevant field</li>
                    <li>Delivered on or before the specified deadline</li>
                    <li>Formatted according to your requirements</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">6. Intellectual Property</h2>
                  <p>
                    Upon full payment, you receive full rights to the completed work. However, we retain the right to
                    use anonymized versions for quality improvement and training purposes.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">7. Privacy and Confidentiality</h2>
                  <p>
                    We are committed to protecting your privacy. All personal information and assignment details are
                    kept strictly confidential and are never shared with third parties.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">8. Limitation of Liability</h2>
                  <p>
                    Submitly's liability is limited to the amount paid for the specific service. We are not responsible
                    for any indirect, incidental, or consequential damages.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">9. Modifications</h2>
                  <p>
                    We reserve the right to modify these terms at any time. Users will be notified of significant
                    changes via email or through our website.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">10. Contact Information</h2>
                  <p>For questions about these Terms of Service, please contact us at:</p>
                  <div className="bg-slate-700/30 rounded-xl p-4 mt-4">
                    <p>
                      <strong>Email:</strong> support@submitly.com
                    </p>
                    <p>
                      <strong>Phone:</strong> +1 (555) 123-4567
                    </p>
                  </div>
                </section>
              </div>
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
                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
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
