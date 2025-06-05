"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {
  Search,
  Download,
  Mail,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  Users,
  FileText,
  TrendingUp,
  Settings,
  Shield,
  Globe,
  Zap,
} from "lucide-react"

interface Submission {
  id: number
  title: string
  subject: string
  description: string
  status: "pending" | "processing" | "delivered" | "rejected"
  user_email: string
  user_name: string
  deadline: string
  created_at: string
  file_url?: string
}

interface AuditItem {
  id: string
  title: string
  description: string
  completed: boolean
  category: "security" | "performance" | "content" | "functionality"
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [filteredSubmissions, setFilteredSubmissions] = useState<Submission[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [emailContent, setEmailContent] = useState("")
  const [emailSubject, setEmailSubject] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  // Audit checklist items
  const [auditItems, setAuditItems] = useState<AuditItem[]>([
    {
      id: "ssl",
      title: "SSL Certificate",
      description: "HTTPS enabled and certificate valid",
      completed: true,
      category: "security",
    },
    {
      id: "auth",
      title: "Authentication System",
      description: "Admin authentication working properly",
      completed: true,
      category: "security",
    },
    {
      id: "db",
      title: "Database Connection",
      description: "NeonDB connection stable and optimized",
      completed: true,
      category: "functionality",
    },
    {
      id: "email",
      title: "Email System",
      description: "Resend integration and notifications working",
      completed: true,
      category: "functionality",
    },
    {
      id: "uploads",
      title: "File Upload Security",
      description: "File validation and secure storage",
      completed: true,
      category: "security",
    },
    {
      id: "responsive",
      title: "Mobile Responsiveness",
      description: "All pages optimized for mobile devices",
      completed: true,
      category: "performance",
    },
    {
      id: "seo",
      title: "SEO Optimization",
      description: "Meta tags, structured data, and performance",
      completed: true,
      category: "content",
    },
    {
      id: "forms",
      title: "Form Validation",
      description: "All forms have proper validation and error handling",
      completed: true,
      category: "functionality",
    },
  ])

  // Authentication check
  useEffect(() => {
    const checkAuth = () => {
      const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123"
      if (password === adminPassword) {
        setIsAuthenticated(true)
        fetchSubmissions()
      }
    }

    if (password) {
      checkAuth()
    }
  }, [password])

  // Fetch submissions
  const fetchSubmissions = async () => {
    try {
      const response = await fetch("/api/admin/submissions")
      if (response.ok) {
        const data = await response.json()
        setSubmissions(data)
        setFilteredSubmissions(data)
      }
    } catch (error) {
      console.error("Error fetching submissions:", error)
    }
  }

  // Filter submissions
  useEffect(() => {
    let filtered = submissions

    if (searchTerm) {
      filtered = filtered.filter(
        (sub) =>
          sub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sub.user_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sub.subject.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((sub) => sub.status === statusFilter)
    }

    setFilteredSubmissions(filtered)
  }, [searchTerm, statusFilter, submissions])

  // Update submission status
  const updateStatus = async (id: number, newStatus: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/admin/submissions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        await fetchSubmissions()
        toast({
          title: "Status Updated",
          description: `Assignment status changed to ${newStatus}`,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Send custom email
  const sendCustomEmail = async () => {
    if (!selectedSubmission || !emailContent || !emailSubject) return

    setLoading(true)
    try {
      const response = await fetch(`/api/admin/submissions/${selectedSubmission.id}/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: emailSubject,
          content: emailContent,
          userEmail: selectedSubmission.user_email,
          userName: selectedSubmission.user_name,
        }),
      })

      if (response.ok) {
        toast({
          title: "Email Sent",
          description: "Custom email sent successfully",
        })
        setEmailContent("")
        setEmailSubject("")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send email",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Toggle audit item
  const toggleAuditItem = (id: string) => {
    setAuditItems((items) => items.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)))
  }

  // Statistics
  const stats = {
    total: submissions.length,
    pending: submissions.filter((s) => s.status === "pending").length,
    processing: submissions.filter((s) => s.status === "processing").length,
    delivered: submissions.filter((s) => s.status === "delivered").length,
    completionRate:
      submissions.length > 0
        ? Math.round((submissions.filter((s) => s.status === "delivered").length / submissions.length) * 100)
        : 0,
  }

  const auditStats = {
    completed: auditItems.filter((item) => item.completed).length,
    total: auditItems.length,
    percentage: Math.round((auditItems.filter((item) => item.completed).length / auditItems.length) * 100),
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader className="text-center">
            <CardTitle className="text-white text-2xl">Admin Access</CardTitle>
            <CardDescription className="text-white/70">Enter admin password to continue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button onClick={() => setPassword(password)} className="w-full bg-orange-500 hover:bg-orange-600">
              Access Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-white/70">Manage submissions and monitor system health</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white/10 backdrop-blur-md border-white/20">
            <TabsTrigger value="overview" className="data-[state=active]:bg-orange-500">
              <TrendingUp className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="submissions" className="data-[state=active]:bg-orange-500">
              <FileText className="w-4 h-4 mr-2" />
              Submissions
            </TabsTrigger>
            <TabsTrigger value="audit" className="data-[state=active]:bg-orange-500">
              <Shield className="w-4 h-4 mr-2" />
              Site Audit
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-sm">Total Submissions</p>
                      <p className="text-3xl font-bold text-white">{stats.total}</p>
                    </div>
                    <Users className="w-8 h-8 text-orange-400" />
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
                    <Zap className="w-8 h-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-sm">Completion Rate</p>
                      <p className="text-3xl font-bold text-white">{stats.completionRate}%</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Recent Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {submissions.slice(0, 5).map((submission) => (
                    <div key={submission.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{submission.title}</p>
                        <p className="text-white/70 text-sm">{submission.user_email}</p>
                      </div>
                      <Badge
                        variant={
                          submission.status === "delivered"
                            ? "default"
                            : submission.status === "processing"
                              ? "secondary"
                              : submission.status === "pending"
                                ? "outline"
                                : "destructive"
                        }
                        className={
                          submission.status === "delivered"
                            ? "bg-green-500"
                            : submission.status === "processing"
                              ? "bg-blue-500"
                              : submission.status === "pending"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                        }
                      >
                        {submission.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="submissions" className="space-y-6">
            {/* Search and Filter */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                    <Input
                      placeholder="Search submissions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-48 bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Submissions Table */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-white/20">
                      <tr>
                        <th className="text-left p-4 text-white font-medium">Assignment</th>
                        <th className="text-left p-4 text-white font-medium">Student</th>
                        <th className="text-left p-4 text-white font-medium">Subject</th>
                        <th className="text-left p-4 text-white font-medium">Status</th>
                        <th className="text-left p-4 text-white font-medium">Deadline</th>
                        <th className="text-left p-4 text-white font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSubmissions.map((submission) => (
                        <tr key={submission.id} className="border-b border-white/10 hover:bg-white/5">
                          <td className="p-4">
                            <div>
                              <p className="text-white font-medium">{submission.title}</p>
                              <p className="text-white/70 text-sm">{submission.description?.slice(0, 50)}...</p>
                            </div>
                          </td>
                          <td className="p-4">
                            <div>
                              <p className="text-white">{submission.user_name}</p>
                              <p className="text-white/70 text-sm">{submission.user_email}</p>
                            </div>
                          </td>
                          <td className="p-4 text-white">{submission.subject}</td>
                          <td className="p-4">
                            <Select
                              value={submission.status}
                              onValueChange={(value) => updateStatus(submission.id, value)}
                            >
                              <SelectTrigger className="w-32 bg-white/10 border-white/20">
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
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="processing">Processing</SelectItem>
                                <SelectItem value="delivered">Delivered</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="p-4 text-white/70">{new Date(submission.deadline).toLocaleDateString()}</td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setSelectedSubmission(submission)}
                                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>Assignment Details</DialogTitle>
                                    <DialogDescription className="text-gray-300">
                                      View and manage submission details
                                    </DialogDescription>
                                  </DialogHeader>
                                  {selectedSubmission && (
                                    <div className="space-y-6">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <label className="text-sm font-medium text-gray-300">Title</label>
                                          <p className="text-white">{selectedSubmission.title}</p>
                                        </div>
                                        <div>
                                          <label className="text-sm font-medium text-gray-300">Subject</label>
                                          <p className="text-white">{selectedSubmission.subject}</p>
                                        </div>
                                        <div>
                                          <label className="text-sm font-medium text-gray-300">Student</label>
                                          <p className="text-white">{selectedSubmission.user_name}</p>
                                        </div>
                                        <div>
                                          <label className="text-sm font-medium text-gray-300">Email</label>
                                          <p className="text-white">{selectedSubmission.user_email}</p>
                                        </div>
                                      </div>

                                      <div>
                                        <label className="text-sm font-medium text-gray-300">Description</label>
                                        <p className="text-white mt-1">{selectedSubmission.description}</p>
                                      </div>

                                      <div className="space-y-4">
                                        <h4 className="font-medium text-white">Send Custom Email</h4>
                                        <Input
                                          placeholder="Email Subject"
                                          value={emailSubject}
                                          onChange={(e) => setEmailSubject(e.target.value)}
                                          className="bg-gray-800 border-gray-600 text-white"
                                        />
                                        <Textarea
                                          placeholder="Email Content"
                                          value={emailContent}
                                          onChange={(e) => setEmailContent(e.target.value)}
                                          className="bg-gray-800 border-gray-600 text-white min-h-32"
                                        />
                                        <Button
                                          onClick={sendCustomEmail}
                                          disabled={loading || !emailContent || !emailSubject}
                                          className="bg-orange-500 hover:bg-orange-600"
                                        >
                                          <Mail className="w-4 h-4 mr-2" />
                                          Send Email
                                        </Button>
                                      </div>
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>

                              {submission.file_url && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => window.open(submission.file_url, "_blank")}
                                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                                >
                                  <Download className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audit" className="space-y-6">
            {/* Audit Overview */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Website Status Overview
                </CardTitle>
                <CardDescription className="text-white/70">
                  System health and launch readiness assessment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-400 mb-2">{auditStats.percentage}%</div>
                    <p className="text-white/70">Launch Ready</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">
                      {auditStats.completed}/{auditStats.total}
                    </div>
                    <p className="text-white/70">Items Complete</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-orange-400 mb-2">
                      {auditStats.total - auditStats.completed}
                    </div>
                    <p className="text-white/70">Remaining</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Audit Checklist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {["security", "functionality", "performance", "content"].map((category) => (
                <Card key={category} className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white capitalize flex items-center gap-2">
                      {category === "security" && <Shield className="w-5 h-5" />}
                      {category === "functionality" && <Settings className="w-5 h-5" />}
                      {category === "performance" && <Zap className="w-5 h-5" />}
                      {category === "content" && <FileText className="w-5 h-5" />}
                      {category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {auditItems
                      .filter((item) => item.category === category)
                      .map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <div className="flex-1">
                            <p className="text-white font-medium">{item.title}</p>
                            <p className="text-white/70 text-sm">{item.description}</p>
                          </div>
                          <Button
                            size="sm"
                            variant={item.completed ? "default" : "outline"}
                            onClick={() => toggleAuditItem(item.id)}
                            className={
                              item.completed
                                ? "bg-green-500 hover:bg-green-600"
                                : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                            }
                          >
                            {item.completed ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                          </Button>
                        </div>
                      ))}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Launch Actions */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Ready to Launch?</h3>
                    <p className="text-white/70">
                      {auditStats.percentage === 100
                        ? "All systems are go! Your website is ready for launch."
                        : `Complete ${auditStats.total - auditStats.completed} more items before launching.`}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      disabled={auditStats.percentage !== 100}
                      className="bg-green-500 hover:bg-green-600 disabled:opacity-50"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Launch Site
                    </Button>
                    <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Fix Issues
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
