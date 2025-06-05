"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Clock, AlertTriangle, ArrowRight } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/sections/footer"
import { Button } from "@/components/ui/button"

export default function StudentMistakesBlogPost() {
  const mistakes = [
    {
      title: "Waiting Until the Last Minute",
      description:
        "Procrastination is the biggest enemy of quality work. Students often underestimate the time required for research, writing, and revision.",
      solution: "Start early and break your assignment into smaller, manageable tasks with deadlines.",
      icon: "⏰",
    },
    {
      title: "Not Reading Instructions Carefully",
      description:
        "Skipping or skimming assignment instructions leads to work that doesn't meet requirements, regardless of quality.",
      solution: "Read instructions multiple times and highlight key requirements before starting.",
      icon: "📋",
    },
    {
      title: "Poor Research and Source Selection",
      description:
        "Using unreliable sources or insufficient research undermines the credibility and depth of academic work.",
      solution: "Use academic databases and peer-reviewed sources. Verify credibility before citing.",
      icon: "🔍",
    },
    {
      title: "Ignoring Formatting Guidelines",
      description:
        "Incorrect citation styles, margins, fonts, or spacing can result in point deductions even for excellent content.",
      solution: "Use style guides (APA, MLA, Chicago) and formatting tools to ensure compliance.",
      icon: "📝",
    },
    {
      title: "Skipping the Revision Process",
      description:
        "Submitting first drafts without proofreading leads to grammar errors, unclear arguments, and missed opportunities for improvement.",
      solution: "Always allow time for multiple revisions and consider peer review or professional editing.",
      icon: "✏️",
    },
  ]

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
              <span className="px-4 py-2 bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/30 rounded-full text-yellow-400 font-medium">
                Tips & Guides
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent leading-tight">
              Top 5 Mistakes Students Make When Submitting Assignments
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-slate-400">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                <span>Emma Davis</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>January 10, 2024</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span>6 min read</span>
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
                  Academic success isn't just about intelligence—it's about avoiding common pitfalls that can
                  significantly impact your grades. Here are the five most critical mistakes students make and how to
                  avoid them.
                </p>

                {/* Mistakes List */}
                <div className="space-y-8 mt-12">
                  {mistakes.map((mistake, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                      className="bg-gradient-to-r from-red-500/10 to-orange-500/10 backdrop-blur-sm border border-red-500/30 rounded-2xl p-8"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="text-4xl">{mistake.icon}</div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                            <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm font-medium mr-4">
                              #{index + 1}
                            </span>
                            {mistake.title}
                          </h3>
                          <p className="text-slate-300 mb-4">{mistake.description}</p>
                          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                            <h4 className="text-green-400 font-semibold mb-2 flex items-center">
                              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                              Solution:
                            </h4>
                            <p className="text-green-300">{mistake.solution}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-8 mt-12">
                  <h3 className="text-2xl font-bold text-blue-300 mb-4 flex items-center">
                    <AlertTriangle className="w-6 h-6 mr-3" />
                    Pro Tip: The Submitly Advantage
                  </h3>
                  <p className="text-slate-300">
                    When you work with Submitly, our expert team helps you avoid all these common mistakes. We ensure
                    proper research, formatting, timely delivery, and thorough revision—giving you a perfect example of
                    how assignments should be completed.
                  </p>
                </div>

                <h2 className="text-3xl font-bold text-white mt-12 mb-6">Building Better Study Habits</h2>
                <p>
                  Avoiding these mistakes isn't just about individual assignments—it's about developing sustainable
                  academic habits that will serve you throughout your educational journey. Consider these additional
                  strategies:
                </p>

                <ul className="list-disc list-inside space-y-3 ml-4">
                  <li>Create a dedicated study schedule with built-in buffer time</li>
                  <li>Use project management tools to track assignment progress</li>
                  <li>Form study groups for peer review and feedback</li>
                  <li>Maintain a resource library of reliable academic sources</li>
                  <li>Regularly review and update your writing and research skills</li>
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
              <h3 className="text-3xl font-bold text-white mb-4">Need Help Avoiding These Mistakes?</h3>
              <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
                Let our expert team handle your assignments with professional quality and attention to detail.
              </p>
              <Link href="/submit">
                <Button
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight />}
                  className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white border-orange-400/30"
                >
                  Get Expert Help Now
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
