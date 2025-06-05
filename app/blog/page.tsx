"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Calendar, User, ArrowRight, Clock } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/sections/footer"
import { Button } from "@/components/ui/button"

const blogPosts = [
  {
    id: "why-students-trust-submitly",
    title: "Why Students Trust Submitly for Assignment Help",
    excerpt:
      "Discover the key factors that make Submitly the go-to platform for students seeking reliable, high-quality assignment assistance.",
    author: "Sarah Johnson",
    date: "2024-01-15",
    readTime: "5 min read",
    image: "/placeholder.svg?height=200&width=400",
    category: "Trust & Safety",
  },
  {
    id: "manual-payments-student-safety",
    title: "Manual Payments: Ensuring Student Safety and Security",
    excerpt: "Learn how our manual payment system protects students and provides transparency in every transaction.",
    author: "Michael Chen",
    date: "2024-01-12",
    readTime: "4 min read",
    image: "/placeholder.svg?height=200&width=400",
    category: "Security",
  },
  {
    id: "top-5-student-mistakes",
    title: "Top 5 Mistakes Students Make When Submitting Assignments",
    excerpt: "Avoid these common pitfalls that can impact your grades and learn how to submit assignments like a pro.",
    author: "Emma Davis",
    date: "2024-01-10",
    readTime: "6 min read",
    image: "/placeholder.svg?height=200&width=400",
    category: "Tips & Guides",
  },
  {
    id: "submitly-for-urgent-deadlines",
    title: "How Submitly Handles Urgent Deadlines Without Compromise",
    excerpt: "Discover our proven strategies for delivering high-quality work even under the tightest deadlines.",
    author: "David Wilson",
    date: "2024-01-08",
    readTime: "7 min read",
    image: "/placeholder.svg?height=200&width=400",
    category: "Process",
  },
]

export default function BlogPage() {
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
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Insights, Tips & Updates
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Stay informed with the latest insights, expert tips, and updates from the Submitly team to help you
              succeed in your academic journey.
            </p>
          </motion.div>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-slate-800/30 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:bg-slate-800/50 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10">
                  {/* Featured Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-orange-500/20 backdrop-blur-sm border border-orange-500/30 rounded-full text-orange-400 text-sm font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    {/* Meta Info */}
                    <div className="flex items-center space-x-4 mb-4 text-sm text-slate-400">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-slate-400 leading-relaxed mb-6 line-clamp-2">{post.excerpt}</p>

                    {/* Read More Link */}
                    <Link href={`/blog/${post.id}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<ArrowRight />}
                        className="group-hover:text-blue-400 group-hover:border-blue-400/30"
                      >
                        Read More
                      </Button>
                    </Link>
                  </div>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
                </div>
              </motion.article>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-20"
          >
            <div className="bg-slate-800/30 backdrop-blur-md border border-white/10 rounded-3xl p-12">
              <h3 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h3>
              <p className="text-xl text-slate-400 mb-8">
                Join thousands of students who trust Submitly for their academic success.
              </p>
              <Link href="/submit">
                <Button
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight />}
                  className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white border-orange-400/30"
                >
                  Submit Your Assignment
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
