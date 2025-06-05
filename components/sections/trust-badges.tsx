"use client"

import { motion } from "framer-motion"
import { Shield, Clock, CreditCard, Mail } from "lucide-react"

const badges = [
  {
    icon: Shield,
    title: "100% Plagiarism-Free",
    description: "Every assignment is checked with premium tools",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Clock,
    title: "24-Hour Refund Promise",
    description: "Not satisfied? Get your money back",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: CreditCard,
    title: "Secure Manual Payment",
    description: "Bank transfer with screenshot verification",
    gradient: "from-orange-500 to-yellow-500",
  },
  {
    icon: Mail,
    title: "University Email Verification",
    description: "We verify all student accounts",
    gradient: "from-purple-500 to-pink-500",
  },
]

export default function TrustBadges() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group relative"
            >
              <div className="bg-slate-800/30 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-6 h-full hover:bg-slate-800/50 transition-all duration-500 overflow-hidden">
                {/* Glowing background effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${badge.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                <div className="flex flex-col items-center text-center">
                  <div
                    className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br ${badge.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <badge.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>

                  <h3 className="text-sm md:text-lg font-semibold text-white mb-1 md:mb-2">{badge.title}</h3>
                  <p className="text-xs md:text-sm text-slate-400">{badge.description}</p>
                </div>

                {/* Hover glow effect */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${badge.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl -z-10`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
