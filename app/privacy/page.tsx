"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Shield, Lock, Eye, Database } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/sections/footer"
import { Button } from "@/components/ui/button"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900/50 to-slate-900 pointer-events-none" />

      <div className="fixed top-20 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-float" />
      <div className="fixed top-40 right-20 w-24 h-24 bg-blue-500/10 rounded-full blur-xl animate-float-delayed" />

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
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-xl text-slate-400">How we protect and handle your personal information</p>
            <p className="text-sm text-slate-500 mt-2">Last updated: January 2024</p>
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
                  <Shield className="w-6 h-6 mr-3 text-blue-400" />
                  Information We Collect
                </h2>
                <p className="mb-4">We collect information you provide directly to us when using our services:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Personal Information:</strong> Name, email address, phone number
                  </li>
                  <li>
                    <strong>Academic Information:</strong> Assignment details, subject, deadline requirements
                  </li>
                  <li>
                    <strong>Payment Information:</strong> Bank transfer details and payment proof screenshots
                  </li>
                  <li>
                    <strong>Files:</strong> Assignment documents and related materials you upload
                  </li>
                  <li>
                    <strong>Communication:</strong> Messages and correspondence with our support team
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <Eye className="w-6 h-6 mr-3 text-purple-400" />
                  How We Use Your Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-slate-700/30 rounded-xl p-6">
                    <h3 className="font-semibold text-white mb-3">Service Delivery</h3>
                    <ul className="text-sm space-y-1">
                      <li>• Process and complete your assignments</li>
                      <li>• Communicate about your orders</li>
                      <li>• Provide customer support</li>
                      <li>• Send delivery notifications</li>
                    </ul>
                  </div>
                  <div className="bg-slate-700/30 rounded-xl p-6">
                    <h3 className="font-semibold text-white mb-3">Business Operations</h3>
                    <ul className="text-sm space-y-1">
                      <li>• Process payments securely</li>
                      <li>• Improve our services</li>
                      <li>• Prevent fraud and abuse</li>
                      <li>• Comply with legal requirements</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <Lock className="w-6 h-6 mr-3 text-green-400" />
                  Data Protection & Security
                </h2>
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                  <h3 className="text-green-400 font-semibold mb-3">Security Measures:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                      Bank-level encryption for all data transmission
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                      Secure servers with regular security updates
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                      Limited access to personal information
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                      Regular security audits and monitoring
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <Database className="w-6 h-6 mr-3 text-orange-400" />
                  Information Sharing
                </h2>
                <p className="mb-4">
                  We do not sell, trade, or otherwise transfer your personal information to third parties. We may share
                  information only in the following limited circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Service Providers:</strong> Trusted partners who help us operate our services (payment
                    processors, hosting providers)
                  </li>
                  <li>
                    <strong>Legal Requirements:</strong> When required by law or to protect our rights and safety
                  </li>
                  <li>
                    <strong>Business Transfer:</strong> In the event of a merger or acquisition (with prior notice)
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Data Retention</h2>
                <div className="bg-slate-700/30 rounded-xl p-6">
                  <ul className="space-y-3">
                    <li>
                      <strong>Assignment Files:</strong> Deleted 30 days after completion
                    </li>
                    <li>
                      <strong>Personal Information:</strong> Retained for 2 years for customer service
                    </li>
                    <li>
                      <strong>Payment Records:</strong> Kept for 7 years for legal compliance
                    </li>
                    <li>
                      <strong>Communication Logs:</strong> Deleted after 1 year
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
                <p className="mb-4">You have the right to:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                    <ul className="space-y-2 text-sm">
                      <li>• Access your personal data</li>
                      <li>• Correct inaccurate information</li>
                      <li>• Request data deletion</li>
                      <li>• Withdraw consent</li>
                    </ul>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
                    <ul className="space-y-2 text-sm">
                      <li>• Data portability</li>
                      <li>• Object to processing</li>
                      <li>• Lodge complaints</li>
                      <li>• Opt-out of marketing</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Cookies and Tracking</h2>
                <p className="mb-4">
                  We use cookies and similar technologies to improve your experience on our website:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Essential Cookies:</strong> Required for basic website functionality
                  </li>
                  <li>
                    <strong>Analytics Cookies:</strong> Help us understand how you use our site
                  </li>
                  <li>
                    <strong>Preference Cookies:</strong> Remember your settings and preferences
                  </li>
                </ul>
                <p className="mt-4 text-sm text-slate-400">
                  You can control cookies through your browser settings. Disabling certain cookies may affect website
                  functionality.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">International Transfers</h2>
                <p>
                  Your information may be transferred to and processed in countries other than your own. We ensure
                  appropriate safeguards are in place to protect your data in accordance with this privacy policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Changes to This Policy</h2>
                <p>
                  We may update this privacy policy from time to time. We will notify you of any changes by posting the
                  new policy on this page and updating the "Last updated" date. Continued use of our services after
                  changes constitutes acceptance of the updated policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                  <p className="mb-4">If you have questions about this privacy policy or our data practices:</p>
                  <div className="space-y-2">
                    <p>
                      <strong>Email:</strong> privacy@submitly.com
                    </p>
                    <p>
                      <strong>Support:</strong> support@submitly.com
                    </p>
                    <p>
                      <strong>Phone:</strong> +1 (555) 123-4567
                    </p>
                    <p>
                      <strong>Response Time:</strong> Within 48 hours
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
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
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
