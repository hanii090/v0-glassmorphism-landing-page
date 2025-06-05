"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Clock, Quote, ArrowRight } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/sections/footer"
import { Button } from "@/components/ui/button"

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900/50 to-slate-900 pointer-events-none" />

      {/* Floating glowing orbs */}
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
            {/* Category Badge */}
            <div className="mb-6">
              <span className="px-4 py-2 bg-orange-500/20 backdrop-blur-sm border border-orange-500/30 rounded-full text-orange-400 font-medium">
                Trust & Safety
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent leading-tight">
              Why Students Trust Submitly for Assignment Help
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-slate-400">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                <span>Sarah Johnson</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>January 15, 2024</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span>5 min read</span>
              </div>
            </div>
          </motion.header>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden">
              <img
                src="/placeholder.svg?height=400&width=800"
                alt="Students trusting Submitly"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
            </div>
          </motion.div>

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
                  In today's competitive academic environment, students face unprecedented challenges. From tight
                  deadlines to complex assignments, the pressure to excel can be overwhelming. This is where Submitly
                  steps in as a trusted partner in academic success.
                </p>

                <h2 className="text-3xl font-bold text-white mt-12 mb-6">Transparency in Every Transaction</h2>
                <p>
                  One of the primary reasons students trust Submitly is our commitment to transparency. Unlike other
                  platforms that hide fees or use complex pricing structures, we provide clear, upfront pricing with no
                  hidden costs. Our manual payment system ensures that students know exactly what they're paying for and
                  when.
                </p>

                <p>
                  This transparency extends to our communication process. Students receive regular updates about their
                  assignment progress, and our support team is available 24/7 to address any concerns or questions.
                </p>

                {/* Pull Quote */}
                <div className="my-12 relative">
                  <div className="bg-gradient-to-r from-blue-500/10 to-orange-500/10 backdrop-blur-sm border-l-4 border-orange-500 rounded-2xl p-8">
                    <Quote className="w-8 h-8 text-orange-400 mb-4" />
                    <blockquote className="text-2xl font-medium text-white italic leading-relaxed">
                      "Submitly doesn't just deliver assignments; they deliver peace of mind. Knowing that my work is
                      original, high-quality, and delivered on time allows me to focus on learning rather than
                      stressing."
                    </blockquote>
                    <cite className="text-slate-400 mt-4 block">— Maria Rodriguez, Computer Science Student</cite>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-white mt-12 mb-6">Quality Assurance That Matters</h2>
                <p>
                  Quality is not just a promise at Submitly—it's a guarantee. Every assignment goes through a rigorous
                  quality assurance process that includes:
                </p>

                <ul className="list-disc list-inside space-y-3 ml-4">
                  <li>Expert review by subject matter specialists</li>
                  <li>Comprehensive plagiarism checking using premium tools</li>
                  <li>Grammar and style verification</li>
                  <li>Formatting according to academic standards</li>
                  <li>Final quality review before delivery</li>
                </ul>

                <p>
                  This multi-layered approach ensures that students receive work that not only meets but exceeds
                  academic standards. Our 98% customer satisfaction rate speaks to the effectiveness of this process.
                </p>

                <h2 className="text-3xl font-bold text-white mt-12 mb-6">Security and Privacy Protection</h2>
                <p>
                  Student privacy is paramount at Submitly. We understand that academic integrity and personal
                  information security are critical concerns. Our platform employs bank-level encryption to protect all
                  data, and we maintain strict confidentiality policies.
                </p>

                <p>
                  Additionally, our manual payment system provides an extra layer of security, allowing students to
                  maintain control over their financial information while ensuring secure transactions.
                </p>

                <h2 className="text-3xl font-bold text-white mt-12 mb-6">Building Long-term Relationships</h2>
                <p>
                  Trust isn't built overnight—it's earned through consistent, reliable service. Submitly has helped over
                  10,000 students achieve their academic goals, and many return to us throughout their educational
                  journey. This loyalty is a testament to our commitment to student success.
                </p>

                <p>
                  Our approach goes beyond just completing assignments. We provide educational value through detailed
                  explanations, helping students understand the subject matter and improve their own skills for future
                  assignments.
                </p>
              </div>
            </div>
          </motion.article>

          {/* Testimonial Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12"
          >
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-md border border-green-500/30 rounded-3xl p-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">JD</span>
                </div>
                <div>
                  <p className="text-green-300 italic text-lg leading-relaxed mb-4">
                    "I was skeptical at first, but Submitly exceeded all my expectations. The quality of work, timely
                    delivery, and excellent customer service made me a loyal customer. I've recommended them to all my
                    classmates."
                  </p>
                  <div className="text-green-400 font-semibold">John Davis</div>
                  <div className="text-green-500 text-sm">Business Administration, Harvard University</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="bg-slate-800/30 backdrop-blur-md border border-white/10 rounded-3xl p-12">
              <h3 className="text-3xl font-bold text-white mb-4">Ready to Submit Your Assignment?</h3>
              <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
                Join thousands of students who trust Submitly for high-quality, plagiarism-free assignment solutions.
              </p>
              <Link href="/submit">
                <Button
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight />}
                  className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white border-orange-400/30"
                >
                  Submit Assignment Now
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
