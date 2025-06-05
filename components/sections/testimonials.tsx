"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"

interface Review {
  student_name: string
  rating: number
  review: string
  subject: string
  created_at: string
}

const fallbackTestimonials = [
  {
    student_name: "Sarah Johnson",
    subject: "Computer Science",
    rating: 5,
    review:
      "Absolutely amazing service! Got my programming assignment done perfectly with detailed explanations. The quality exceeded my expectations and it was delivered right on time.",
    created_at: "2024-01-15",
  },
  {
    student_name: "Michael Chen",
    subject: "Business Administration",
    rating: 5,
    review:
      "Professional work, delivered on time, and completely original. The business case study was thoroughly researched and well-structured. Highly recommend this service!",
    created_at: "2024-01-10",
  },
  {
    student_name: "Emma Davis",
    subject: "Mathematics",
    rating: 5,
    review:
      "Complex calculus problems solved with clear step-by-step solutions. The explanations helped me understand the concepts better. Will definitely use again!",
    created_at: "2024-01-05",
  },
]

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Review[]>(fallbackTestimonials)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    fetchTopReviews()
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, testimonials.length])

  const fetchTopReviews = async () => {
    try {
      const response = await fetch("/api/reviews/top")
      if (response.ok) {
        const reviews = await response.json()
        if (reviews.length > 0) {
          setTestimonials(reviews)
        }
      }
    } catch (error) {
      console.error("Error fetching reviews:", error)
      // Keep fallback testimonials
    }
  }

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getGradient = (index: number) => {
    const gradients = [
      "from-blue-500 to-cyan-500",
      "from-purple-500 to-pink-500",
      "from-green-500 to-emerald-500",
      "from-orange-500 to-red-500",
      "from-indigo-500 to-purple-500",
    ]
    return gradients[index % gradients.length]
  }

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            What Students Say
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Real feedback from satisfied students who achieved academic success with our help
          </p>
        </motion.div>

        <div className="relative">
          {/* Main testimonial display */}
          <div className="relative h-96 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <div className="bg-slate-800/40 backdrop-blur-md border border-white/10 rounded-3xl p-12 h-full relative overflow-hidden">
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(currentIndex)} opacity-5`} />

                  {/* Quote icon */}
                  <div className="absolute top-8 right-8 opacity-20">
                    <Quote className="w-16 h-16 text-white" />
                  </div>

                  <div className="relative z-10 flex flex-col md:flex-row items-center h-full">
                    {/* Avatar */}
                    <div className="flex-shrink-0 mb-8 md:mb-0 md:mr-12">
                      <div
                        className={`w-24 h-24 bg-gradient-to-br ${getGradient(currentIndex)} rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg relative`}
                      >
                        {getInitials(testimonials[currentIndex].student_name)}

                        {/* 3D effect */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${getGradient(currentIndex)} rounded-2xl transform translate-x-1 translate-y-1 opacity-60 -z-10`}
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center md:text-left">
                      {/* Stars */}
                      <div className="flex justify-center md:justify-start mb-6">
                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.1 }}
                          >
                            <Star className="w-6 h-6 text-yellow-400 fill-current mr-1" />
                          </motion.div>
                        ))}
                      </div>

                      {/* Testimonial text */}
                      <blockquote className="text-xl text-slate-300 mb-6 leading-relaxed italic">
                        "{testimonials[currentIndex].review}"
                      </blockquote>

                      {/* Author info */}
                      <div>
                        <h4 className="text-white font-semibold text-lg">{testimonials[currentIndex].student_name}</h4>
                        <p className="text-slate-400">{testimonials[currentIndex].subject}</p>
                        <p className="text-slate-500 text-sm">
                          {new Date(testimonials[currentIndex].created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center hover:bg-slate-700/50 transition-all duration-300 group"
            >
              <ChevronLeft className="w-6 h-6 text-slate-400 group-hover:text-white" />
            </button>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center hover:bg-slate-700/50 transition-all duration-300 group"
            >
              <ChevronRight className="w-6 h-6 text-slate-400 group-hover:text-white" />
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index)
                  setIsAutoPlaying(false)
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 scale-125"
                    : "bg-slate-600 hover:bg-slate-500"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
