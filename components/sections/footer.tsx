"use client"

import Link from "next/link"
import { Github, Linkedin, Mail, Phone, MapPin, ArrowUp, Twitter } from "lucide-react"
import { motion } from "framer-motion"
import Logo from "@/components/ui/logo"
import { Button } from "@/components/ui/button"

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "How It Works", href: "/info" },
  { name: "Submit Assignment", href: "/submit" },
  { name: "Blog", href: "/blog" },
]

const legalLinks = [
  { name: "Terms of Service", href: "/terms" },
  { name: "Refund Policy", href: "/refund-policy" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Contact", href: "/contact" },
]

const services = [
  "Essay Writing",
  "Research Papers",
  "Programming Help",
  "Math Solutions",
  "Business Cases",
  "Lab Reports",
]

const socialLinks = [
  { icon: Linkedin, href: "#", gradient: "from-orange-500 to-yellow-500", label: "LinkedIn" },
  { icon: Github, href: "#", gradient: "from-slate-500 to-slate-600", label: "GitHub" },
  { icon: Twitter, href: "#", gradient: "from-blue-400 to-blue-600", label: "Twitter" },
  { icon: Mail, href: "mailto:support@submitly.com", gradient: "from-orange-400 to-yellow-400", label: "Email" },
]

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative bg-slate-900/80 backdrop-blur-md border-t border-white/10 overflow-hidden">
      {/* Animated background lines */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-orange-400/30 to-transparent animate-pulse" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-yellow-400/30 to-transparent animate-pulse delay-1000" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-orange-400/30 to-transparent animate-pulse delay-2000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="col-span-2"
          >
            {/* Logo - larger size for footer */}
            <div className="mb-6">
              <Link href="/">
                <Logo size="lg" />
              </Link>
            </div>

            <p className="text-slate-400 max-w-md mb-8 leading-relaxed">
              Your trusted partner for high-quality, plagiarism-free assignment solutions. Expert help when you need it
              most, with guaranteed originality and timely delivery.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <div className="flex items-center text-slate-400 hover:text-orange-400 transition-colors group">
                <Mail className="w-5 h-5 mr-3 group-hover:text-orange-400" />
                <a href="mailto:support@submitly.com">support@submitly.com</a>
              </div>
              <div className="flex items-center text-slate-400 hover:text-orange-400 transition-colors group">
                <Phone className="w-5 h-5 mr-3 group-hover:text-orange-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-slate-400 hover:text-orange-400 transition-colors group">
                <MapPin className="w-5 h-5 mr-3 group-hover:text-orange-400" />
                <span>Available Worldwide</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-slate-400 hover:text-white transition-all duration-300 group relative"
                >
                  <span className="relative">
                    {link.name}
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-yellow-400 group-hover:w-full transition-all duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-yellow-500/5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-semibold text-lg mb-6">Legal & Support</h3>
            <div className="space-y-3">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-slate-400 hover:text-orange-400 transition-colors cursor-pointer group relative"
                >
                  <span className="relative">
                    {link.name}
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-yellow-400 group-hover:w-full transition-all duration-300" />
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Social links and bottom section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-white/10 mt-16 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-6 mb-6 md:mb-0">
              <h4 className="text-white font-semibold">Follow Us:</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-12 h-12 bg-gradient-to-br ${social.gradient} rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-orange-500/25 group`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Scroll to top button */}
            <Button
              onClick={scrollToTop}
              variant="ghost"
              size="sm"
              icon={<ArrowUp />}
              iconPosition="center"
              className="hover:bg-orange-500/10 hover:text-orange-400 border-orange-400/20"
            />
          </div>

          <div className="text-center mt-8 pt-8 border-t border-white/5">
            <p className="text-slate-400">
              © 2024 Submitly. All rights reserved. |
              <Link href="/terms" className="hover:text-orange-400 transition-colors ml-1">
                Terms of Service
              </Link>{" "}
              |
              <Link href="/refund-policy" className="hover:text-orange-400 transition-colors ml-1">
                Refund Policy
              </Link>{" "}
              |
              <Link href="/privacy" className="hover:text-orange-400 transition-colors ml-1">
                Privacy Policy
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
