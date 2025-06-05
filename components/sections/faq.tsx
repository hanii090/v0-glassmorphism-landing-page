"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "How do I pay manually?",
    answer:
      "After submitting your assignment, you'll receive bank transfer details. Complete the payment and upload a screenshot as proof. We'll verify and start working on your assignment immediately.",
  },
  {
    question: "Can I trust the quality?",
    answer:
      "All our solutions are written by human experts, thoroughly checked for plagiarism, and come with a 100% refund guarantee if they don't meet quality standards.",
  },
  {
    question: "What if I miss my deadline?",
    answer:
      "We prioritize deadlines and have never missed one. However, if we do, you'll receive a full refund plus a bonus for the inconvenience.",
  },
  {
    question: "How do I know my work is original?",
    answer:
      "Every solution comes with a plagiarism report from premium tools. We guarantee 0% AI content and complete originality in all our work.",
  },
  {
    question: "What subjects do you cover?",
    answer:
      "We cover all academic subjects including Computer Science, Mathematics, Engineering, Business, Literature, and more. Our expert team handles assignments at all academic levels.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-400">Everything you need to know about our service</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
            >
              <button
                className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-slate-800/50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-semibold text-white">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform ${openIndex === index ? "rotate-180" : ""}`}
                />
              </button>

              {openIndex === index && (
                <div className="px-8 pb-6">
                  <p className="text-slate-400 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
