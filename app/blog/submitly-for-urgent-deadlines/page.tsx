"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Clock, Zap, ArrowRight, CheckCircle } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/sections/footer"
import { Button } from "@/components/ui/button"

export default function UrgentDeadlinesBlogPost() {
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
              <span className="px-4 py-2 bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full text-purple-400 font-medium">
                Process
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent leading-tight">
              How Submitly Handles Urgent Deadlines Without Compromise
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-slate-400">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                <span>David Wilson</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>January 8, 2024</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span>7 min read</span>
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
                  Tight deadlines don't have to mean compromised quality. At Submitly, we've perfected a system that
                  delivers exceptional work even under the most pressing time constraints.
                </p>

                <h2 className="text-3xl font-bold text-white mt-12 mb-6">Our Rapid Response System</h2>
                <p>
                  When students face urgent deadlines, every minute counts. Our rapid response system is designed to
                  mobilize resources quickly while maintaining our high standards:
                </p>

                {/* Process Timeline */}
                <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 backdrop-blur-sm border border-orange-500/30 rounded-2xl p-8 my-8">
                  <h3 className="text-2xl font-bold text-orange-300 mb-6 flex items-center">
                    <Zap className="w-6 h-6 mr-3" />
                    24-Hour Rush Process
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">
                        1
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">Immediate Assignment (0-30 minutes)</h4>
                        <p className="text-slate-300 text-sm">
                          Expert matching and project initiation within 30 minutes of payment confirmation
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">
                        2
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">Accelerated Research (1-6 hours)</h4>
                        <p className="text-slate-300 text-sm">
                          Intensive research phase using our premium academic databases and resources
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">
                        3
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">Focused Writing (6-18 hours)</h4>
                        <p className="text-slate-300 text-sm">
                          Dedicated writing phase with real-time quality monitoring and progress updates
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">
                        4
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">Rapid Review & Delivery (18-24 hours)</h4>
                        <p className="text-slate-300 text-sm">
                          Expedited quality assurance and formatting before final delivery
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-white mt-12 mb-6">Quality Assurance Under Pressure</h2>
                <p>
                  Maintaining quality under tight deadlines requires specialized processes and experienced
                  professionals. Here's how we ensure excellence even in rush situations:
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="bg-slate-700/30 rounded-2xl p-6">
                    <h4 className="text-xl font-semibold text-white mb-3 flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                      Expert Allocation
                    </h4>
                    <p className="text-slate-300">
                      We assign our most experienced writers who specialize in rapid, high-quality content creation.
                    </p>
                  </div>
                  <div className="bg-slate-700/30 rounded-2xl p-6">
                    <h4 className="text-xl font-semibold text-white mb-3 flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                      Parallel Processing
                    </h4>
                    <p className="text-slate-300">
                      Research, writing, and editing phases overlap strategically to maximize efficiency.
                    </p>
                  </div>
                  <div className="bg-slate-700/30 rounded-2xl p-6">
                    <h4 className="text-xl font-semibold text-white mb-3 flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                      Real-time Monitoring
                    </h4>
                    <p className="text-slate-300">
                      Project managers track progress hourly to ensure deadlines are met without quality compromise.
                    </p>
                  </div>
                  <div className="bg-slate-700/30 rounded-2xl p-6">
                    <h4 className="text-xl font-semibold text-white mb-3 flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                      Priority Resources
                    </h4>
                    <p className="text-slate-300">
                      Urgent projects get priority access to premium research tools and editing software.
                    </p>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-white mt-12 mb-6">Success Stories: Beating the Clock</h2>
                <p>
                  Our track record speaks for itself. Here are some examples of how we've helped students succeed under
                  extreme time pressure:
                </p>

                <div className="space-y-6 my-8">
                  <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-6">
                    <h4 className="text-green-300 font-semibold mb-2">12-Hour MBA Case Study</h4>
                    <p className="text-slate-300">
                      Delivered a comprehensive 15-page MBA case study analysis with financial modeling in just 12
                      hours, earning the student an A- grade.
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-6">
                    <h4 className="text-blue-300 font-semibold mb-2">8-Hour Computer Science Project</h4>
                    <p className="text-slate-300">
                      Completed a complex algorithm implementation with documentation and testing in 8 hours for a
                      graduate-level course.
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-6">
                    <h4 className="text-purple-300 font-semibold mb-2">6-Hour Literature Review</h4>
                    <p className="text-slate-300">
                      Produced a 20-page literature review with 50+ academic sources in just 6 hours for a PhD student.
                    </p>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-white mt-12 mb-6">When to Choose Rush Service</h2>
                <p>
                  While we excel at urgent deadlines, it's important to understand when rush service is the right
                  choice:
                </p>

                <ul className="list-disc list-inside space-y-3 ml-4">
                  <li>Unexpected assignment announcements with short deadlines</li>
                  <li>Personal emergencies that prevent normal assignment completion</li>
                  <li>Technical difficulties that consume valuable time</li>
                  <li>Multiple assignments due simultaneously</li>
                  <li>Complex topics requiring expert knowledge under time pressure</li>
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
              <h3 className="text-3xl font-bold text-white mb-4">Facing an Urgent Deadline?</h3>
              <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
                Don't panic. Our expert team is ready to deliver high-quality work even under the tightest deadlines.
              </p>
              <Link href="/submit">
                <Button
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight />}
                  className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white border-orange-400/30"
                >
                  Submit Urgent Assignment
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
