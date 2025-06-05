"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calculator, ArrowRight, FileText, Clock, TextQuote } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// Assignment types with base prices (updated pricing structure)
const assignmentTypes = [
  { id: "essay", name: "Essay", basePrice: 15 },
  { id: "report", name: "Report", basePrice: 18, minPrice: 35 }, // New minimum price for reports
  { id: "case-study", name: "Case Study", basePrice: 20 },
  { id: "research-paper", name: "Research Paper", basePrice: 22 },
  { id: "programming", name: "Programming Assignment", basePrice: 25 },
  { id: "thesis", name: "Thesis", basePrice: 30 },
]

// Deadline options with multipliers (updated for 24-hour max £95)
const deadlineOptions = [
  { days: 14, multiplier: 1.0, label: "14 days" },
  { days: 7, multiplier: 1.2, label: "7 days" },
  { days: 5, multiplier: 1.3, label: "5 days" },
  { days: 3, multiplier: 1.5, label: "3 days" },
  { days: 2, multiplier: 1.8, label: "2 days" },
  { days: 1, multiplier: 2.0, label: "24 hours", maxPrice: 95 }, // New max price for 24-hour deadline
]

export default function PriceEstimator() {
  const [assignmentType, setAssignmentType] = useState(assignmentTypes[0].id)
  const [wordCount, setWordCount] = useState(1000)
  const [deadline, setDeadline] = useState(deadlineOptions[2].days)
  const [estimatedPrice, setEstimatedPrice] = useState(0)
  const [isCalculating, setIsCalculating] = useState(false)

  // Calculate price whenever inputs change
  useEffect(() => {
    calculatePrice()
  }, [assignmentType, wordCount, deadline])

  const calculatePrice = () => {
    setIsCalculating(true)

    // Find the selected assignment type and deadline
    const selectedType = assignmentTypes.find((type) => type.id === assignmentType)
    const selectedDeadline = deadlineOptions.find((option) => option.days === deadline)

    if (selectedType && selectedDeadline) {
      // Base calculation: (base price per 500 words) * (word count / 500) * deadline multiplier
      const basePrice = selectedType.basePrice
      const wordMultiplier = wordCount / 500
      const deadlineMultiplier = selectedDeadline.multiplier

      // Calculate total price
      let price = basePrice * wordMultiplier * deadlineMultiplier

      // Apply minimum price for reports under 2000 words
      if (selectedType.id === "report" && wordCount < 2000 && selectedType.minPrice) {
        price = Math.max(price, selectedType.minPrice)
      }

      // Apply maximum price for 24-hour deadline
      if (selectedDeadline.maxPrice) {
        price = Math.min(price, selectedDeadline.maxPrice)
      }

      // Round to nearest pound
      price = Math.round(price)

      // Simulate calculation delay for visual effect
      setTimeout(() => {
        setEstimatedPrice(price)
        setIsCalculating(false)
      }, 300)
    }
  }

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Estimate Your Price Instantly
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Get a transparent estimate for your assignment based on type, length, and deadline. No hidden fees, no
            surprises.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-slate-800/30 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden"
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-orange-500/5 opacity-30" />

          {/* Floating particles */}
          <div className="absolute top-20 left-20 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-float" />
          <div className="absolute bottom-20 right-20 w-16 h-16 bg-orange-500/10 rounded-full blur-xl animate-float-delayed" />

          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            {/* Form Controls */}
            <div className="space-y-8">
              {/* Assignment Type */}
              <div className="space-y-3">
                <label className="flex items-center text-white text-lg font-semibold">
                  <FileText className="w-5 h-5 mr-2 text-blue-400" />
                  Assignment Type
                </label>
                <div className="relative">
                  <select
                    value={assignmentType}
                    onChange={(e) => setAssignmentType(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700/50 backdrop-blur-sm border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 appearance-none"
                  >
                    {assignmentTypes.map((type) => (
                      <option key={type.id} value={type.id} className="bg-slate-800">
                        {type.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Word Count */}
              <div className="space-y-3">
                <label className="flex items-center justify-between">
                  <span className="flex items-center text-white text-lg font-semibold">
                    <TextQuote className="w-5 h-5 mr-2 text-orange-400" />
                    Word Count
                  </span>
                  <span className="text-orange-400 font-mono text-lg">{wordCount} words</span>
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="100"
                    max="5000"
                    step="100"
                    value={wordCount}
                    onChange={(e) => setWordCount(Number.parseInt(e.target.value))}
                    className="w-full h-3 bg-slate-700 rounded-full appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-2">
                    <span>100</span>
                    <span>2500</span>
                    <span>5000</span>
                  </div>
                </div>
              </div>

              {/* Deadline */}
              <div className="space-y-3">
                <label className="flex items-center text-white text-lg font-semibold">
                  <Clock className="w-5 h-5 mr-2 text-green-400" />
                  Deadline
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {deadlineOptions.map((option) => (
                    <button
                      key={option.days}
                      type="button"
                      onClick={() => setDeadline(option.days)}
                      className={`px-4 py-3 rounded-xl text-center transition-all duration-300 font-medium ${
                        deadline === option.days
                          ? "bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/50 text-blue-400 shadow-lg shadow-blue-500/20"
                          : "bg-slate-700/50 border border-white/10 text-slate-300 hover:bg-slate-700/80 hover:border-white/20"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Price Display */}
            <div className="bg-slate-700/30 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/20">
                  <Calculator className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Price Estimate</h3>
              </div>

              <div className="mb-8">
                <motion.div
                  key={estimatedPrice}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  {isCalculating ? (
                    <div className="flex justify-center items-center h-24">
                      <div className="w-8 h-8 border-4 border-blue-500/50 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    <>
                      <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent mb-2">
                        £{estimatedPrice}
                      </div>
                      <div className="text-slate-400">Estimated total</div>

                      {/* Pricing notes */}
                      <div className="mt-4 space-y-1 text-xs text-slate-500">
                        {assignmentType === "report" && wordCount < 2000 && (
                          <p>* Minimum £35 for reports under 2000 words</p>
                        )}
                        {deadline === 1 && estimatedPrice >= 95 && <p>* Maximum £95 for 24-hour deadline</p>}
                      </div>
                    </>
                  )}
                </motion.div>
              </div>

              <Link href="/submit">
                <Button
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight />}
                  className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white border-orange-400/30 shadow-lg shadow-orange-500/20"
                >
                  Submit Now
                </Button>
              </Link>

              <p className="text-xs text-slate-400 mt-4">
                Final price may vary based on specific requirements and complexity
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
