"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const reviews = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "AJ",
    university: "Stanford University",
    assignmentType: "Research Paper",
    rating: 5,
    review:
      "The quality of work I received was exceptional. My research paper was thoroughly researched, well-structured, and delivered ahead of schedule. The writer clearly understood the requirements and exceeded my expectations.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    name: "Sophia Chen",
    avatar: "SC",
    university: "MIT",
    assignmentType: "Programming Assignment",
    rating: 5,
    review:
      "I was struggling with a complex programming assignment and the deadline was approaching fast. Submitly delivered a perfectly documented solution with clear explanations that helped me understand the concepts better.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    name: "Marcus Williams",
    avatar: "MW",
    university: "Oxford University",
    assignmentType: "Literature Review",
    rating: 5,
    review:
      "The literature review I received was comprehensive and insightful. The writer analyzed over 30 sources and synthesized the information perfectly. My professor was impressed with the depth of analysis.",
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: 4,
    name: "Emma Rodriguez",
    avatar: "ER",
    university: "Columbia University",
    assignmentType: "Case Study",
    rating: 5,
    review:
      "My business case study required detailed financial analysis and strategic recommendations. The solution provided was professional, well-researched, and included excellent visualizations. Definitely worth every penny!",
    gradient: "from-green-500 to-emerald-500",
  },
]

export default function StudentReviews() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const visibleReviews = 3 // Number of reviews visible at once on desktop

  const nextReview = () => {
    setDirection(1)
    setActiveIndex((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setDirection(-1)
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  // Get the reviews to display based on activeIndex
  const getVisibleReviews = () => {
    const result = []
    for (let i = 0; i < visibleReviews; i++) {
      const index = (activeIndex + i) % reviews.length
      result.push(reviews[index])
    }
    return result
  }

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            What Students Are Saying
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Real feedback from students who achieved academic success with our expert assignment solutions
          </p>
        </motion.div>

        {/* Reviews Carousel - Desktop */}
        <div className="hidden md:block relative">
          <div className="flex space-x-6 overflow-hidden">
            {getVisibleReviews().map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                transition={{ duration: 0.5 }}
                className="w-full md:w-1/3 flex-shrink-0"
              >
                <div className="h-full bg-slate-800/30 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-slate-800/50 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 relative overflow-hidden group">
                  {/* Glowing background effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${review.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />

                  {/* Avatar and Rating */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center">
                      <div
                        className={`w-14 h-14 bg-gradient-to-br ${review.gradient} rounded-2xl flex items-center justify-center text-white text-xl font-bold mr-4 shadow-lg`}
                      >
                        {review.avatar}
                      </div>
                      <div className="text-left">
                        <h4 className="text-lg font-semibold text-white">{review.name}</h4>
                        <p className="text-sm text-slate-400">{review.university}</p>
                      </div>
                    </div>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>

                  {/* Assignment Type */}
                  <div className="mb-4">
                    <span
                      className={`inline-block px-3 py-1 bg-gradient-to-r ${review.gradient} bg-opacity-20 rounded-full text-sm font-medium text-white border border-white/10`}
                    >
                      {review.assignmentType}
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="text-slate-300 leading-relaxed mb-6 line-clamp-6">{review.review}</p>

                  {/* Hover glow effect */}
                  <div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${review.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl -z-10`}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center mt-10 space-x-4">
            <button
              onClick={prevReview}
              className="w-12 h-12 bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center hover:bg-slate-700/50 transition-all duration-300 group hover:shadow-lg hover:shadow-blue-500/20"
            >
              <ChevronLeft className="w-6 h-6 text-slate-400 group-hover:text-white" />
            </button>
            <button
              onClick={nextReview}
              className="w-12 h-12 bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center hover:bg-slate-700/50 transition-all duration-300 group hover:shadow-lg hover:shadow-blue-500/20"
            >
              <ChevronRight className="w-6 h-6 text-slate-400 group-hover:text-white" />
            </button>
          </div>
        </div>

        {/* Reviews - Mobile (Single Column) */}
        <div className="md:hidden space-y-6">
          {reviews.slice(0, 2).map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-slate-800/30 backdrop-blur-md border border-white/10 rounded-3xl p-6 hover:bg-slate-800/50 transition-all duration-500 relative overflow-hidden">
                {/* Glowing background effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${review.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                {/* Avatar and Rating */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${review.gradient} rounded-xl flex items-center justify-center text-white text-lg font-bold mr-3 shadow-lg`}
                    >
                      {review.avatar}
                    </div>
                    <div className="text-left">
                      <h4 className="text-base font-semibold text-white">{review.name}</h4>
                      <p className="text-xs text-slate-400">{review.university}</p>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Assignment Type */}
                <div className="mb-3">
                  <span
                    className={`inline-block px-2 py-1 bg-gradient-to-r ${review.gradient} bg-opacity-20 rounded-full text-xs font-medium text-white border border-white/10`}
                  >
                    {review.assignmentType}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-slate-300 text-sm leading-relaxed line-clamp-4">{review.review}</p>

                {/* Hover glow effect */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${review.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl -z-10`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/reviews">
            <Button
              variant="primary"
              size="lg"
              icon={<ArrowRight />}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-blue-400/30 shadow-lg shadow-blue-500/20"
            >
              See All Reviews
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
