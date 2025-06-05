"use client"

import { Shield, FileText, Clock, Award, Zap, Users } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: FileText,
    title: "Human-Written Solutions",
    description: "Expert-crafted content with detailed explanations, no AI-generated text",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Shield,
    title: "Manual Bank Payment",
    description: "Secure payment process with bank transfer and screenshot verification",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Clock,
    title: "Deadline Guarantee",
    description: "Always delivered on time, no matter how tight your deadline is",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Award,
    title: "Refund if Plagiarism",
    description: "100% money-back guarantee if plagiarism or similarity is detected",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Quick turnaround times without compromising on quality",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Qualified professionals with advanced degrees in various fields",
    gradient: "from-indigo-500 to-purple-500",
  },
]

export default function Features() {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Why Choose Us
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Quality, reliability, and excellence in every assignment with cutting-edge features
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="bg-slate-800/30 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-slate-800/50 transition-all duration-500 transform hover:-translate-y-2 h-full relative overflow-hidden">
                {/* Animated background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                {/* 3D Icon container */}
                <div className="relative mb-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg relative`}
                  >
                    <feature.icon className="w-8 h-8 text-white relative z-10" />

                    {/* 3D effect layers */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl transform translate-x-1 translate-y-1 opacity-50 -z-10`}
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl transform translate-x-2 translate-y-2 opacity-25 -z-20`}
                    />
                  </div>

                  {/* Floating particles */}
                  <div className="absolute top-0 left-0 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping" />
                  <div className="absolute top-2 right-2 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping delay-300" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                  {feature.title}
                </h3>

                <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Hover glow effect */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl -z-10`}
                />

                {/* Border glow */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm -z-10`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
