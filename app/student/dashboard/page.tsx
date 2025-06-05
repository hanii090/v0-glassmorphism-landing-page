"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Search, Download, Star, Clock, CheckCircle, AlertCircle, FileText, Calendar, User } from "lucide-react"

interface Submission {
  id: number
  title: string
  subject: string
  description: string
  status: "pending" | "processing" | "delivered" | "rejected"
  deadline: string
  created_at: string
  file_url?: string
  completed_file_url?: string
}

interface Review {
  id: number
  submission_id: number
  rating: number
  comment: string
  created_at: string
}

export default function StudentDashboard() {
  const [email, setEmail] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)
  const [rating, setRating] = useState(0)
  const [reviewComment, setReviewComment] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  // Authentication
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsAuthenticated(true)
      await fetchSubmissions()
    }
  }

  // Fetch submissions for the authenticated email
  const fetchSubmissions = async () => {
    try {
      const response = await fetch(`/api/student/submissions?email=${encodeURIComponent(email)}`)
      if (response.ok) {
        const data = await response.json()
        setSubmissions(data)
      }
    } catch (error) {
      console.error("Error fetching submissions:", error)
    }
  }

  // Submit review
  const submitReview = async () => {
    if (!selectedSubmission || rating === 0) return

    setLoading(true)
    try {
      const response = await fetch("/api/student/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submission_id: selectedSubmission.id,
          rating,
          comment: reviewComment,
          user_email: email,
        }),
      })

      if (response.ok) {
        toast({
          title: "Review Submitted",
          description: "Thank you for your feedback!",
        })
        setRating(0)
        setReviewComment("")
        setSelectedSubmission(null)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit review",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Filter submissions
  const filteredSubmissions = submissions.filter(
    (sub) =>
      sub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.subject.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Statistics
  const stats = {
    total: submissions.length,
    pending: submissions.filter((s) => s.status === "pending").length,
    processing: submissions.filter((s) => s.status === "processing").length,
    delivered: submissions.filter((s) => s.status === "delivered").length,
    rejected: submissions.filter((s) => s.status === "rejected").length,
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader className="text-center">
            <CardTitle className="text-white text-2xl flex items-center justify-center gap-2">
              <User className="w-6 h-6" />
              Student Dashboard
            </CardTitle>
            <CardDescription className="text-white/70">Enter your email to view your submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
                Access Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">My Assignments</h1>
          <p className="text-white/70">Welcome back, {email}</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Total Assignments</p>
                  <p className="text-3xl font-bold text-white">{stats.total}</p>
                </div>
                <FileText className="w-8 h-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Pending Review</p>
                  <p className="text-3xl font-bold text-white">{stats.pending}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">In Progress</p>
                  <p className="text-3xl font-bold text-white">{stats.processing}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Completed</p>
                  <p className="text-3xl font-bold text-white">{stats.delivered}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-6">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
              <Input
                placeholder="Search your assignments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
          </CardContent>
        </Card>

        {/* Submissions List */}
        <div className="space-y-4">
          {filteredSubmissions.length === 0 ? (
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-12 text-center">
                <FileText className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No assignments found</h3>
                <p className="text-white/70 mb-6">
                  {searchTerm ? "No assignments match your search." : "You haven't submitted any assignments yet."}
                </p>
                <Button className="bg-orange-500 hover:bg-orange-600">Submit Your First Assignment</Button>
              </CardContent>
            </Card>
          ) : (
            filteredSubmissions.map((submission) => (
              <Card key={submission.id} className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-white">{submission.title}</h3>
                        <Badge
                          variant="outline"
                          className={
                            submission.status === "delivered"
                              ? "bg-green-500/20 text-green-300 border-green-500"
                              : submission.status === "processing"
                                ? "bg-blue-500/20 text-blue-300 border-blue-500"
                                : submission.status === "pending"
                                  ? "bg-yellow-500/20 text-yellow-300 border-yellow-500"
                                  : "bg-red-500/20 text-red-300 border-red-500"
                          }
                        >
                          {submission.status}
                        </Badge>
                      </div>
                      <p className="text-white/70 mb-2">{submission.subject}</p>
                      <p className="text-white/60 text-sm mb-3">{submission.description}</p>
                      <div className="flex items-center gap-4 text-sm text-white/60">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Deadline: {new Date(submission.deadline).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Submitted: {new Date(submission.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {submission.completed_file_url && (
                        <Button
                          size="sm"
                          onClick={() => window.open(submission.completed_file_url, "_blank")}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      )}

                      {submission.status === "delivered" && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedSubmission(submission)}
                              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                            >
                              <Star className="w-4 h-4 mr-2" />
                              Review
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-gray-900 border-gray-700 text-white">
                            <DialogHeader>
                              <DialogTitle>Rate Your Experience</DialogTitle>
                              <DialogDescription className="text-gray-300">
                                How satisfied are you with this assignment?
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-6">
                              <div>
                                <label className="text-sm font-medium text-gray-300 mb-3 block">Rating</label>
                                <div className="flex gap-2">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Button
                                      key={star}
                                      size="sm"
                                      variant={rating >= star ? "default" : "outline"}
                                      onClick={() => setRating(star)}
                                      className={
                                        rating >= star
                                          ? "bg-yellow-500 hover:bg-yellow-600"
                                          : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                                      }
                                    >
                                      <Star className="w-4 h-4" />
                                    </Button>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <label className="text-sm font-medium text-gray-300 mb-3 block">
                                  Comment (Optional)
                                </label>
                                <Textarea
                                  placeholder="Share your experience..."
                                  value={reviewComment}
                                  onChange={(e) => setReviewComment(e.target.value)}
                                  className="bg-gray-800 border-gray-600 text-white"
                                />
                              </div>

                              <Button
                                onClick={submitReview}
                                disabled={loading || rating === 0}
                                className="w-full bg-orange-500 hover:bg-orange-600"
                              >
                                Submit Review
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
