"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { FileText, User, Calendar, Download, Eye, Settings, BarChart3, Shield, Lock } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/sections/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Submission {
  id: string
  name: string
  email: string
  deadline: string
  subject: string
  description: string
  assignment_file_url: string
  payment_proof_url?: string
  created_at: string
  status: "pending" | "in-progress" | "completed"
}

export default function AdminPage() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Submission state
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)

  // Check for existing session on mount
  useEffect(() => {
    const authStatus = sessionStorage.getItem("submitlyAdminAuth")
    if (authStatus === "authenticated") {
      setIsAuthenticated(true)
      fetchSubmissions()
    } else {
      setLoading(false)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Get the admin password from env or use fallback
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "sUbm1Tly!@123"

    if (password === adminPassword) {
      // Set authentication state
      setIsAuthenticated(true)
      sessionStorage.setItem("submitlyAdminAuth", "authenticated")
      fetchSubmissions()
    } else {
      setError("Incorrect password")
    }

    setIsLoading(false)
  }

  const fetchSubmissions = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/submissions")
      if (response.ok) {
        const data = await response.json()
        setSubmissions(data)
      }
    } catch (error) {
      console.error("Error fetching submissions:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/admin/submissions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        fetchSubmissions()
      }
    } catch (error) {
      console.error("Error updating status:", error)
    }
  }

  // Login form component
  const LoginForm = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900/50 to-slate-900 pointer-events-none" />
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 py-32">
        <div className="w-full max-w-md">
          <div className="bg-slate-800/30 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-500/20 p-3 rounded-full">
                <Lock className="w-8 h-8 text-blue-400" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Admin Access
            </h2>
            <p className="text-slate-400 text-center mb-6">Enter your password to access the admin dashboard</p>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg mb-6 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter admin password"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <span className="mr-2">Authenticating</span>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  </>
                ) : (
                  "Access Dashboard"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )

  // Loading state
  if (loading && isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <LoginForm />
  }

  // Admin dashboard content
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900/50 to-slate-900 pointer-events-none" />
      <Navbar />

      <div className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-xl text-slate-400">Manage assignment submissions and track progress</p>
            </div>

            <div className="flex space-x-4 mt-6 md:mt-0">
              <Link href="/admin/audit">
                <Button
                  variant="primary"
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Audit Dashboard
                </Button>
              </Link>
              <Link href="/admin/dashboard">
                <Button variant="secondary" className="border-white/20 text-white hover:bg-white/10">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Submissions</p>
                  <p className="text-3xl font-bold text-white">{submissions.length}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-400" />
              </div>
            </div>

            <div className="bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Pending</p>
                  <p className="text-3xl font-bold text-yellow-400">
                    {submissions.filter((s) => s.status === "pending").length}
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-yellow-400" />
              </div>
            </div>

            <div className="bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">In Progress</p>
                  <p className="text-3xl font-bold text-blue-400">
                    {submissions.filter((s) => s.status === "in-progress").length}
                  </p>
                </div>
                <Settings className="w-8 h-8 text-blue-400" />
              </div>
            </div>

            <div className="bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Completed</p>
                  <p className="text-3xl font-bold text-green-400">
                    {submissions.filter((s) => s.status === "completed").length}
                  </p>
                </div>
                <User className="w-8 h-8 text-green-400" />
              </div>
            </div>
          </div>

          {/* Submissions List */}
          <div className="grid gap-6">
            {submissions.length === 0 ? (
              <div className="bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
                <FileText className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No submissions yet</h3>
                <p className="text-slate-400">When students submit assignments, they will appear here.</p>
              </div>
            ) : (
              submissions.map((submission) => (
                <div
                  key={submission.id}
                  className="bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <User className="w-5 h-5 text-blue-400 mr-2" />
                        <h3 className="text-xl font-semibold text-white">{submission.name}</h3>
                        <span
                          className={`ml-4 px-3 py-1 rounded-full text-xs font-semibold ${
                            submission.status === "pending"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : submission.status === "in-progress"
                                ? "bg-blue-500/20 text-blue-400"
                                : "bg-green-500/20 text-green-400"
                          }`}
                        >
                          {submission.status}
                        </span>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center text-slate-300">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>Deadline: {new Date(submission.deadline).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center text-slate-300">
                          <FileText className="w-4 h-4 mr-2" />
                          <span>Subject: {submission.subject}</span>
                        </div>
                      </div>

                      <p className="text-slate-400 mb-4">{submission.description}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button onClick={() => setSelectedSubmission(submission)} variant="primary" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>

                      <select
                        value={submission.status}
                        onChange={(e) => updateStatus(submission.id, e.target.value)}
                        className="px-4 py-2 bg-slate-700/50 border border-white/10 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Submission Details Modal */}
          {selectedSubmission && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-slate-800 border border-white/10 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Submission Details</h2>
                  <Button onClick={() => setSelectedSubmission(null)} variant="ghost" size="sm">
                    ✕
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-slate-400 mb-1">Full Name</label>
                    <p className="text-white">{selectedSubmission.name}</p>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Email</label>
                    <p className="text-white">{selectedSubmission.email}</p>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Subject</label>
                    <p className="text-white">{selectedSubmission.subject}</p>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Deadline</label>
                    <p className="text-white">{new Date(selectedSubmission.deadline).toLocaleString()}</p>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Description</label>
                    <p className="text-white">{selectedSubmission.description}</p>
                  </div>

                  <div className="flex gap-4">
                    {selectedSubmission.assignment_file_url && (
                      <Button
                        as="a"
                        href={selectedSubmission.assignment_file_url}
                        variant="primary"
                        size="sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Assignment
                      </Button>
                    )}

                    {selectedSubmission.payment_proof_url && (
                      <Button
                        as="a"
                        href={selectedSubmission.payment_proof_url}
                        variant="success"
                        size="sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Payment Proof
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
