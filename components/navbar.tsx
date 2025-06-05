"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Send } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Logo from "@/components/ui/logo"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "How It Works", href: "/info" },
  { name: "Blog", href: "/blog" },
  { name: "Submit", href: "/submit" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-slate-900/30 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - properly sized for header */}
          <div className="flex-shrink-0">
            <Link href="/" className="block">
              <Logo size="md" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative transition-all duration-300 group py-2 ${
                  isActive(link.href) ? "text-orange-400" : "text-slate-300 hover:text-white"
                }`}
              >
                <span className="relative z-10">{link.name}</span>

                {/* Orange underline effect */}
                <div
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-orange-400 to-yellow-400 transition-all duration-300 ${
                    isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />

                {/* Orange glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10" />
              </Link>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:block flex-shrink-0">
            <Link href="/submit">
              <Button
                variant="primary"
                icon={<Send />}
                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white border-orange-400/30"
              >
                Submit Assignment
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white hover:text-orange-400 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-slate-900/95 backdrop-blur-md border-t border-white/10"
        >
          <div className="px-4 pt-4 pb-6 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`block px-4 py-3 rounded-lg transition-all duration-300 group ${
                  isActive(link.href)
                    ? "text-orange-400 bg-orange-500/10"
                    : "text-slate-300 hover:text-white hover:bg-orange-500/10"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span className="relative">
                  {link.name}
                  <div
                    className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-orange-400 to-yellow-400 transition-all duration-300 ${
                      isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </span>
              </Link>
            ))}

            <div className="pt-4">
              <Link href="/submit" onClick={() => setIsOpen(false)}>
                <Button
                  variant="primary"
                  icon={<Send />}
                  className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white border-orange-400/30"
                >
                  Submit Assignment
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  )
}
