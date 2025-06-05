"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  CheckCircle,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Home,
  Send,
  Settings,
  BookOpen,
  LayoutGrid,
  Palette,
  FormInput,
  Database,
  Mail,
  FileText,
  Shield,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Logo from "@/components/ui/logo"

// Status overview data
const statusItems = [
  { name: "Pages Created", status: "complete", details: "Landing, Submit, Blog, Admin" },
  { name: "NeonDB Integrated", status: "complete", details: "Database connected and tables created" },
  { name: "Resend Email Connected", status: "complete", details: "Email templates configured" },
  { name: "Logo and Colors Consistent", status: "complete", details: "Brand guidelines followed" },
  { name: "Mobile Responsive", status: "warning", details: "Minor issues on small devices" },
]

// Audit checklist data
const auditSections = [
  {
    title: "Navigation & Routing",
    icon: LayoutGrid,
    color: "#3ABEFF",
    items: [
      { text: "All navigation links working", status: "complete" },
      { text: "404 page implemented", status: "complete" },
      { text: "Breadcrumbs on inner pages", status: "incomplete" },
      { text: "Active states for current page", status: "complete" },
      { text: "Mobile menu tested", status: "warning", note: "Animation delay on iPhone" },
    ],
  },
  {
    title: "UI Consistency & Design",
    icon: Palette,
    color: "#7B61FF",
    items: [
      { text: "Typography consistent across pages", status: "complete" },
      { text: "Color scheme matches brand guidelines", status: "complete" },
      { text: "Spacing and layout consistent", status: "complete" },
      { text: "Animations and transitions smooth", status: "complete" },
      { text: "Dark mode implemented", status: "complete" },
    ],
  },
  {
    title: "Form Submission",
    icon: FormInput,
    color: "#FFA500",
    items: [
      { text: "Form validation working", status: "complete" },
      { text: "Error messages clear and helpful", status: "complete" },
      { text: "File upload size limits enforced", status: "complete" },
      { text: "Success messages displayed", status: "complete" },
      { text: "Form accessibility (ARIA labels)", status: "warning", note: "Missing some aria-describedby" },
    ],
  },
  {
    title: "Backend (NeonDB, File Uploads)",
    icon: Database,
    color: "#3ABEFF",
    items: [
      { text: "Database tables created and indexed", status: "complete" },
      { text: "File upload storage configured", status: "complete" },
      { text: "API endpoints secured", status: "complete" },
      { text: "Error handling implemented", status: "complete" },
      { text: "Database backups configured", status: "incomplete" },
    ],
  },
  {
    title: "Emails (Resend)",
    icon: Mail,
    color: "#7B61FF",
    items: [
      { text: "Student confirmation emails", status: "complete" },
      { text: "Admin notification emails", status: "complete" },
      { text: "Email templates responsive", status: "complete" },
      { text: "Email delivery tracking", status: "incomplete" },
      { text: "Spam score optimization", status: "warning", note: "Subject lines need review" },
    ],
  },
  {
    title: "Blog & Content",
    icon: FileText,
    color: "#FFA500",
    items: [
      { text: "Blog posts formatted correctly", status: "complete" },
      { text: "Images optimized", status: "complete" },
      { text: "Content spelling and grammar", status: "complete" },
      { text: "Related posts functionality", status: "incomplete" },
      { text: "Social sharing buttons", status: "complete" },
    ],
  },
  {
    title: "Admin Panel Security",
    icon: Shield,
    color: "#3ABEFF",
    items: [
      { text: "Admin authentication", status: "complete" },
      { text: "Role-based permissions", status: "complete" },
      { text: "Session timeout", status: "complete" },
      { text: "Activity logging", status: "warning", note: "Partial implementation" },
      { text: "Two-factor authentication", status: "incomplete" },
    ],
  },
  {
    title: "Footer, Meta Tags, SEO",
    icon: ExternalLink,
    color: "#7B61FF",
    items: [
      { text: "Footer links verified", status: "complete" },
      { text: "Meta tags implemented", status: "complete" },
      { text: "Open Graph tags for social", status: "complete" },
      { text: "Sitemap generated", status: "incomplete" },
      { text: "robots.txt configured", status: "complete" },
    ],
  },
]

export default function AuditDashboard() {
  const [openSections, setOpenSections] = useState<number[]>([0]) // Start with first section open
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})

  const toggleSection = (index: number) => {
    if (openSections.includes(index)) {
      setOpenSections(openSections.filter((i) => i !== index))
    } else {
      setOpenSections([...openSections, index])
    }
  }

  const toggleItem = (sectionIndex: number, itemIndex: number) => {
    const key = `${sectionIndex}-${itemIndex}`
    setCheckedItems({
      ...checkedItems,
      [key]: !checkedItems[key],
    })
  }

  // Count issues
  const issueCount = auditSections.reduce(
    (count, section) => {
      section.items.forEach((item) => {
        if (item.status === "warning") count.warnings++
        if (item.status === "incomplete") count.incomplete++
      })
      return count
    },
    { warnings: 0, incomplete: 0 },
  )

  return (
    <div className="min-h-screen bg-[#0F172A] text-white relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900/50 to-slate-900 pointer-events-none" />

      {/* Floating orbs */}
      <div className="fixed top-20 left-10 w-32 h-32 bg-[#3ABEFF]/10 rounded-full blur-xl animate-float" />
      <div className="fixed top-40 right-20 w-24 h-24 bg-[#7B61FF]/10 rounded-full blur-xl animate-float-delayed" />
      <div className="fixed bottom-20 left-1/4 w-40 h-40 bg-[#FFA500]/10 rounded-full blur-xl animate-float-slow" />

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/10 backdrop-blur-md bg-slate-900/30 fixed top-0 left-0 right-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Logo size="md" />
                <h1 className="ml-6 text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  Final Audit Dashboard
                </h1>
              </div>

              <nav className="hidden md:flex space-x-8">
                <Link
                  href="/"
                  className="flex items-center text-slate-300 hover:text-white transition-colors duration-200"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Link>
                <Link
                  href="/submit"
                  className="flex items-center text-slate-300 hover:text-white transition-colors duration-200"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit
                </Link>
                <Link
                  href="/admin"
                  className="flex items-center text-slate-300 hover:text-white transition-colors duration-200"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Admin
                </Link>
                <Link
                  href="/blog"
                  className="flex items-center text-slate-300 hover:text-white transition-colors duration-200"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Blog
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Website Status Overview */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#3ABEFF] to-[#7B61FF] bg-clip-text text-transparent">
                Website Status Overview
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {statusItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-slate-800/30 backdrop-blur-md border border-white/10 rounded-xl p-4 hover:bg-slate-800/50 transition-all duration-300 group"
                  >
                    <div className="flex items-start justify-between">
                      <h3 className="font-medium text-white mb-2">{item.name}</h3>
                      {item.status === "complete" ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-yellow-400" />
                      )}
                    </div>
                    <p className="text-sm text-slate-400">{item.details}</p>

                    {/* Status indicator */}
                    <div className="mt-4 h-1 w-full bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: item.status === "complete" ? "100%" : "80%" }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        className={`h-full ${
                          item.status === "complete"
                            ? "bg-gradient-to-r from-green-400 to-emerald-500"
                            : "bg-gradient-to-r from-yellow-400 to-orange-500"
                        }`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Issues Summary */}
            <section className="mb-12">
              <div className="bg-slate-800/30 backdrop-blur-md border border-white/10 rounded-xl p-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="flex items-center mb-4 md:mb-0">
                    <div className="text-4xl font-bold bg-gradient-to-r from-[#3ABEFF] to-[#7B61FF] bg-clip-text text-transparent mr-4">
                      {issueCount.warnings + issueCount.incomplete}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Issues Remaining</h3>
                      <p className="text-slate-400 text-sm">
                        {issueCount.warnings} warnings, {issueCount.incomplete} incomplete
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                      <span className="text-slate-300 text-sm">Warnings</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                      <span className="text-slate-300 text-sm">Incomplete</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                      <span className="text-slate-300 text-sm">Complete</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Detailed Audit Checklist */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#7B61FF] to-[#FFA500] bg-clip-text text-transparent">
                Detailed Audit Checklist
              </h2>

              <div className="space-y-4">
                {auditSections.map((section, sectionIndex) => (
                  <motion.div
                    key={sectionIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: sectionIndex * 0.1 }}
                    className="bg-slate-800/30 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all duration-300"
                  >
                    {/* Section Header */}
                    <button
                      onClick={() => toggleSection(sectionIndex)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-800/50 transition-colors duration-300"
                    >
                      <div className="flex items-center">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center mr-4"
                          style={{ backgroundColor: `${section.color}20` }}
                        >
                          <section.icon className="w-5 h-5" style={{ color: section.color }} />
                        </div>
                        <h3 className="font-semibold text-white">{section.title}</h3>
                      </div>

                      {/* Status indicators */}
                      <div className="flex items-center">
                        <div className="flex space-x-2 mr-4">
                          {section.items.filter((item) => item.status === "complete").length > 0 && (
                            <div className="flex items-center">
                              <div className="w-2 h-2 rounded-full bg-green-400 mr-1"></div>
                              <span className="text-green-400 text-xs">
                                {section.items.filter((item) => item.status === "complete").length}
                              </span>
                            </div>
                          )}
                          {section.items.filter((item) => item.status === "warning").length > 0 && (
                            <div className="flex items-center">
                              <div className="w-2 h-2 rounded-full bg-yellow-400 mr-1"></div>
                              <span className="text-yellow-400 text-xs">
                                {section.items.filter((item) => item.status === "warning").length}
                              </span>
                            </div>
                          )}
                          {section.items.filter((item) => item.status === "incomplete").length > 0 && (
                            <div className="flex items-center">
                              <div className="w-2 h-2 rounded-full bg-red-400 mr-1"></div>
                              <span className="text-red-400 text-xs">
                                {section.items.filter((item) => item.status === "incomplete").length}
                              </span>
                            </div>
                          )}
                        </div>
                        {openSections.includes(sectionIndex) ? (
                          <ChevronUp className="w-5 h-5 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                    </button>

                    {/* Section Content */}
                    {openSections.includes(sectionIndex) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-4"
                      >
                        <div className="border-t border-white/5 pt-4 mt-2">
                          <ul className="space-y-3">
                            {section.items.map((item, itemIndex) => (
                              <li key={itemIndex} className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                  <button
                                    onClick={() => toggleItem(sectionIndex, itemIndex)}
                                    className={`w-5 h-5 rounded border flex items-center justify-center ${
                                      checkedItems[`${sectionIndex}-${itemIndex}`]
                                        ? "bg-green-500 border-green-500"
                                        : item.status === "complete"
                                          ? "border-green-400"
                                          : item.status === "warning"
                                            ? "border-yellow-400"
                                            : "border-red-400"
                                    }`}
                                  >
                                    {checkedItems[`${sectionIndex}-${itemIndex}`] && (
                                      <CheckCircle className="w-4 h-4 text-white" />
                                    )}
                                  </button>
                                </div>
                                <div className="ml-3">
                                  <p
                                    className={`${
                                      checkedItems[`${sectionIndex}-${itemIndex}`]
                                        ? "text-slate-500 line-through"
                                        : "text-white"
                                    }`}
                                  >
                                    {item.text}
                                  </p>
                                  {item.note && <p className="text-xs text-yellow-400 mt-1">Note: {item.note}</p>}
                                </div>
                                <div className="ml-auto flex-shrink-0">
                                  {item.status === "complete" && !checkedItems[`${sectionIndex}-${itemIndex}`] && (
                                    <CheckCircle className="w-5 h-5 text-green-400" />
                                  )}
                                  {item.status === "warning" && !checkedItems[`${sectionIndex}-${itemIndex}`] && (
                                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                                  )}
                                  {item.status === "incomplete" && !checkedItems[`${sectionIndex}-${itemIndex}`] && (
                                    <div className="w-5 h-5 rounded-full border-2 border-red-400"></div>
                                  )}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Call-to-Action */}
            <section>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-md border border-white/10 rounded-xl p-8 text-center relative overflow-hidden"
              >
                {/* Glowing background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#3ABEFF]/5 to-[#7B61FF]/5 opacity-50" />

                <div className="relative z-10">
                  <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                    Ready to Launch?
                  </h2>
                  <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
                    {issueCount.warnings + issueCount.incomplete === 0
                      ? "All checks have passed! Your site is ready to go live."
                      : `There are still ${issueCount.warnings + issueCount.incomplete} issues to resolve before launch.`}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      variant="primary"
                      size="lg"
                      disabled={issueCount.warnings + issueCount.incomplete > 0}
                      className={
                        issueCount.warnings + issueCount.incomplete === 0
                          ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-green-400/30 shadow-lg shadow-green-500/20"
                          : "bg-slate-700/50 text-slate-400 cursor-not-allowed"
                      }
                    >
                      Launch Site
                    </Button>
                    {issueCount.warnings + issueCount.incomplete > 0 && (
                      <Button
                        variant="secondary"
                        size="lg"
                        className="border-[#7B61FF]/30 text-[#7B61FF] hover:bg-[#7B61FF]/10"
                      >
                        Fix Issues
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            </section>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-slate-900/30 backdrop-blur-md py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <Logo size="sm" />
              </div>

              <div className="flex space-x-6">
                <Link href="#" className="text-slate-400 hover:text-white transition-colors duration-200">
                  Terms
                </Link>
                <Link href="#" className="text-slate-400 hover:text-white transition-colors duration-200">
                  Refund Policy
                </Link>
                <Link href="#" className="text-slate-400 hover:text-white transition-colors duration-200">
                  Privacy
                </Link>
              </div>

              <div className="flex space-x-4 mt-4 md:mt-0">
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-slate-800/50 flex items-center justify-center hover:bg-slate-700/50 transition-colors duration-200"
                >
                  <Github className="w-4 h-4 text-slate-400" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-slate-800/50 flex items-center justify-center hover:bg-slate-700/50 transition-colors duration-200"
                >
                  <Linkedin className="w-4 h-4 text-slate-400" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-slate-800/50 flex items-center justify-center hover:bg-slate-700/50 transition-colors duration-200"
                >
                  <Twitter className="w-4 h-4 text-slate-400" />
                </a>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/5 text-center">
              <p className="text-slate-500 text-sm">© 2024 Submitly. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
