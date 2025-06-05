"use client"

import React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import {
  Upload,
  FileText,
  Clock,
  CreditCard,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Mail,
  Shield,
  Zap,
} from "lucide-react"

interface FormData {
  name: string
  email: string
  phone: string
  title: string
  subject: string
  description: string
  deadline: string
  category: string
  file: File | null
  paymentProof: File | null
}

export default function SubmitPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    title: "",
    subject: "",
    description: "",
    deadline: "",
    category: "",
    file: null,
    paymentProof: null,
  })
  const [loading, setLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState(180) // 3 minutes
  const [timerActive, setTimerActive] = useState(false)
  const { toast } = useToast()

  const subjects = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "Engineering",
    "Business",
    "Economics",
    "Psychology",
    "Literature",
    "History",
    "Philosophy",
    "Law",
    "Medicine",
    "Other",
  ]

  const categories = [
    { value: "essay", label: "Essay Writing", price: "$15-25" },
    { value: "research", label: "Research Paper", price: "$20-35" },
    { value: "assignment", label: "Assignment", price: "$10-20" },
    { value: "thesis", label: "Thesis/Dissertation", price: "$50-100" },
    { value: "presentation", label: "Presentation", price: "$15-30" },
    { value: "lab-report", label: "Lab Report", price: "$12-25" },
    { value: "case-study", label: "Case Study", price: "$18-35" },
    { value: "programming", label: "Programming Project", price: "$25-50" },
    { value: "other", label: "Other", price: "Custom Quote" },
  ]

  // Timer effect
  React.useEffect(() => {
    let interval: NodeJS.Timeout
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      toast({
        title: "Time Expired",
        description: "Please restart the submission process",
        variant: "destructive",
      })
      setCurrentStep(1)
      setTimerActive(false)
      setTimeLeft(180)
    }
    return () => clearInterval(interval)
  }, [timerActive, timeLeft, toast])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleInputChange = (field: keyof FormData, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (field: "file" | "paymentProof", file: File | null) => {
    if (file) {
      // Validate file size (25MB max)
      if (file.size > 25 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please upload a file smaller than 25MB",
          variant: "destructive",
        })
        return
      }

      // Validate file type
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/zip",
        "image/jpeg",
        "image/png",
      ]
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Please upload PDF, DOC, DOCX, ZIP, JPG, or PNG files only",
          variant: "destructive",
        })
        return
      }
    }

    handleInputChange(field, file)
  }

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          formData.name &&
          formData.email &&
          formData.phone &&
          formData.title &&
          formData.subject &&
          formData.description &&
          formData.deadline &&
          formData.category
        )
      case 2:
        return formData.file !== null
      case 3:
        return true // Payment step
      case 4:
        return formData.paymentProof !== null
      default:
        return false
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 2) {
        setTimerActive(true)
      }
      setCurrentStep((prev) => Math.min(prev + 1, 4))
    } else {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(4)) {
      toast({
        title: "Incomplete Submission",
        description: "Please upload payment proof",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const submitData = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          submitData.append(key, value)
        }
      })

      const response = await fetch("/api/submit", {
        method: "POST",
        body: submitData,
      })

      if (response.ok) {
        const result = await response.json()
        toast({
          title: "Submission Successful!",
          description: "Your assignment has been submitted. Check your email for confirmation.",
        })

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          title: "",
          subject: "",
          description: "",
          deadline: "",
          category: "",
          file: null,
          paymentProof: null,
        })
        setCurrentStep(1)
        setTimerActive(false)
        setTimeLeft(180)
      } else {
        throw new Error("Submission failed")
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact support",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const progress = (currentStep / 4) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Submit Your Assignment</h1>
          <p className="text-white/70 text-lg">Get expert help with your academic work</p>
        </div>

        {/* Progress Bar */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-white font-medium">Step {currentStep} of 4</span>
              {timerActive && (
                <div className="flex items-center gap-2 text-orange-400">
                  <Clock className="w-4 h-4" />
                  <span className="font-mono">{formatTime(timeLeft)}</span>
                </div>
              )}
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between mt-4 text-sm text-white/70">
              <span>Details</span>
              <span>Upload</span>
              <span>Payment</span>
              <span>Proof</span>
            </div>
          </CardContent>
        </Card>

        {/* Step 1: Assignment Details */}
        {currentStep === 1 && (
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Assignment Details
              </CardTitle>
              <CardDescription className="text-white/70">Tell us about your assignment requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    placeholder="Your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white">
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title" className="text-white">
                  Assignment Title *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  placeholder="Brief title of your assignment"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-white">
                    Subject *
                  </Label>
                  <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject} className="text-white hover:bg-gray-800">
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline" className="text-white">
                    Deadline *
                  </Label>
                  <Input
                    id="deadline"
                    type="datetime-local"
                    value={formData.deadline}
                    onChange={(e) => handleInputChange("deadline", e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Assignment Category *</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {categories.map((category) => (
                    <div
                      key={category.value}
                      onClick={() => handleInputChange("category", category.value)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        formData.category === category.value
                          ? "bg-orange-500/20 border-orange-500 text-white"
                          : "bg-white/5 border-white/20 text-white/70 hover:bg-white/10"
                      }`}
                    >
                      <div className="font-medium text-sm">{category.label}</div>
                      <div className="text-xs opacity-70">{category.price}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-white">
                  Assignment Description *
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-32"
                  placeholder="Provide detailed instructions, requirements, and any specific guidelines..."
                />
              </div>

              <div className="flex justify-end">
                <Button onClick={nextStep} className="bg-orange-500 hover:bg-orange-600">
                  Next Step
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: File Upload */}
        {currentStep === 2 && (
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload Assignment Files
              </CardTitle>
              <CardDescription className="text-white/70">
                Upload your assignment files (PDF, DOC, DOCX, ZIP - Max 25MB)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-white/50 mx-auto mb-4" />
                <div className="space-y-2">
                  <p className="text-white font-medium">
                    {formData.file ? formData.file.name : "Drop your files here or click to browse"}
                  </p>
                  <p className="text-white/70 text-sm">Supported formats: PDF, DOC, DOCX, ZIP (Max 25MB)</p>
                </div>
                <input
                  type="file"
                  onChange={(e) => handleFileUpload("file", e.target.files?.[0] || null)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept=".pdf,.doc,.docx,.zip"
                />
              </div>

              {formData.file && (
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-orange-400" />
                    <div>
                      <p className="text-white font-medium">{formData.file.name}</p>
                      <p className="text-white/70 text-sm">{(formData.file.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between">
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                <Button onClick={nextStep} className="bg-orange-500 hover:bg-orange-600">
                  Continue to Payment
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Payment Information */}
        {currentStep === 3 && (
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Information
              </CardTitle>
              <CardDescription className="text-white/70">
                Complete your payment to proceed with the assignment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-orange-400" />
                  <div>
                    <h3 className="text-white font-semibold">Time Remaining</h3>
                    <p className="text-orange-400 font-mono text-2xl">{formatTime(timeLeft)}</p>
                  </div>
                </div>
                <p className="text-white/70 text-sm">
                  You have 3 minutes to complete the payment process. After this time, you'll need to restart your
                  submission.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-white font-semibold">Payment Methods</h3>
                  <div className="space-y-3">
                    <div className="bg-white/5 border border-white/20 rounded-lg p-4">
                      <h4 className="text-white font-medium mb-2">Bank Transfer</h4>
                      <div className="text-white/70 text-sm space-y-1">
                        <p>
                          <strong>Account:</strong> Submitly Services
                        </p>
                        <p>
                          <strong>Bank:</strong> Chase Bank
                        </p>
                        <p>
                          <strong>Account #:</strong> 1234567890
                        </p>
                        <p>
                          <strong>Routing #:</strong> 021000021
                        </p>
                      </div>
                    </div>
                    <div className="bg-white/5 border border-white/20 rounded-lg p-4">
                      <h4 className="text-white font-medium mb-2">Digital Wallets</h4>
                      <div className="text-white/70 text-sm space-y-1">
                        <p>
                          <strong>PayPal:</strong> payments@submitly.com
                        </p>
                        <p>
                          <strong>Venmo:</strong> @submitly-services
                        </p>
                        <p>
                          <strong>CashApp:</strong> $SubmitlyServices
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-white font-semibold">Order Summary</h3>
                  <div className="bg-white/5 border border-white/20 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/70">Assignment Type:</span>
                      <span className="text-white">{categories.find((c) => c.value === formData.category)?.label}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Subject:</span>
                      <span className="text-white">{formData.subject}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Deadline:</span>
                      <span className="text-white">{new Date(formData.deadline).toLocaleDateString()}</span>
                    </div>
                    <div className="border-t border-white/20 pt-3">
                      <div className="flex justify-between font-semibold">
                        <span className="text-white">Estimated Price:</span>
                        <span className="text-orange-400">
                          {categories.find((c) => c.value === formData.category)?.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium mb-1">Secure Payment Process</h4>
                    <p className="text-white/70 text-sm">
                      After making your payment, upload the receipt or screenshot in the next step. Our team will verify
                      your payment and begin working on your assignment immediately.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                <Button onClick={nextStep} className="bg-orange-500 hover:bg-orange-600">
                  Payment Complete
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Payment Proof */}
        {currentStep === 4 && (
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Upload Payment Proof
              </CardTitle>
              <CardDescription className="text-white/70">
                Upload your payment receipt or screenshot to complete the submission
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-red-400" />
                  <div>
                    <h4 className="text-white font-medium">Time Sensitive</h4>
                    <p className="text-white/70 text-sm">
                      Upload your payment proof within the time limit: {formatTime(timeLeft)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center relative">
                <Upload className="w-12 h-12 text-white/50 mx-auto mb-4" />
                <div className="space-y-2">
                  <p className="text-white font-medium">
                    {formData.paymentProof ? formData.paymentProof.name : "Upload payment receipt or screenshot"}
                  </p>
                  <p className="text-white/70 text-sm">Supported formats: JPG, PNG, PDF (Max 10MB)</p>
                </div>
                <input
                  type="file"
                  onChange={(e) => handleFileUpload("paymentProof", e.target.files?.[0] || null)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept=".jpg,.jpeg,.png,.pdf"
                />
              </div>

              {formData.paymentProof && (
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-green-400" />
                    <div>
                      <p className="text-white font-medium">{formData.paymentProof.name}</p>
                      <p className="text-white/70 text-sm">
                        {(formData.paymentProof.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-green-400 mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium mb-1">What Happens Next?</h4>
                    <ul className="text-white/70 text-sm space-y-1">
                      <li>• Instant email confirmation of your submission</li>
                      <li>• Payment verification within 30 minutes</li>
                      <li>• Assignment work begins immediately after verification</li>
                      <li>• Regular email updates on progress</li>
                      <li>• Completed work delivered before deadline</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={loading || !formData.paymentProof}
                  className="bg-green-500 hover:bg-green-600"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Complete Submission
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Features Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/5 backdrop-blur-md border-white/10">
            <CardContent className="p-6 text-center">
              <Mail className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Email Updates</h3>
              <p className="text-white/70 text-sm">Receive instant confirmation and progress updates via email</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-md border-white/10">
            <CardContent className="p-6 text-center">
              <Shield className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Secure Process</h3>
              <p className="text-white/70 text-sm">
                Your data and payments are protected with enterprise-grade security
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-md border-white/10">
            <CardContent className="p-6 text-center">
              <Zap className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Fast Delivery</h3>
              <p className="text-white/70 text-sm">Get your completed assignment delivered before the deadline</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
