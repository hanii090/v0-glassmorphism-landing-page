"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Clock,
  FileText,
  Calendar,
  Mail,
  User,
  BookOpen,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Shield,
  AlertTriangle,
} from "lucide-react"

import Navbar from "@/components/navbar"
import Footer from "@/components/sections/footer"
import { Button } from "@/components/ui/button"
import FileUpload from "@/components/ui/file-upload"
import { useToast } from "@/hooks/use-toast"

interface FormData {
  name: string
  email: string
  title: string
  subject: string
  description: string
  deadline: string
  category: string
  file: File | null
  paymentProof: File | null
}

export default function SubmitPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
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
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

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
  useEffect(() => {
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

    // Clear error when field is updated
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const validateEmail = (email: string) => {
    // Allow only Gmail or .edu emails
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|.*\.edu)$/i
    return emailRegex.test(email)
  }

  const validateStep = (step: number) => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}
    let isValid = true

    switch (step) {
      case 1:
        // Validate name
        if (!formData.name.trim()) {
          newErrors.name = "Name is required"
          isValid = false
        }

        // Validate email
        if (!formData.email.trim()) {
          newErrors.email = "Email is required"
          isValid = false
        } else if (!validateEmail(formData.email)) {
          newErrors.email = "Please use a Gmail or .edu email address"
          isValid = false
        }

        // Validate title
        if (!formData.title.trim()) {
          newErrors.title = "Assignment title is required"
          isValid = false
        }

        // Validate subject
        if (!formData.subject) {
          newErrors.subject = "Subject is required"
          isValid = false
        }

        // Validate description
        if (!formData.description.trim()) {
          newErrors.description = "Description is required"
          isValid = false
        } else if (formData.description.length < 20) {
          newErrors.description = "Please provide a more detailed description (at least 20 characters)"
          isValid = false
        }

        // Validate deadline
        if (!formData.deadline) {
          newErrors.deadline = "Deadline is required"
          isValid = false
        } else {
          const deadlineDate = new Date(formData.deadline)
          const now = new Date()
          if (deadlineDate <= now) {
            newErrors.deadline = "Deadline must be in the future"
            isValid = false
          }
        }

        // Validate category
        if (!formData.category) {
          newErrors.category = "Please select a category"
          isValid = false
        }
        break

      case 2:
        // Validate file
        if (!formData.file) {
          newErrors.file = "Please upload your assignment file"
          isValid = false
        }
        break

      case 4:
        // Validate payment proof
        if (!formData.paymentProof) {
          newErrors.paymentProof = "Please upload payment proof"
          isValid = false
        }
        break
    }

    setErrors(newErrors)
    return isValid
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 2) {
        setTimerActive(true)
      }
      setCurrentStep((prev) => Math.min(prev + 1, 4))

      // Scroll to top of form when changing steps
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))

    // Scroll to top of form when changing steps
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSubmit = async () => {
    if (!validateStep(4)) {
      return
    }

    setLoading(true)
    try {
      const submitData = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          submitData.append(key, value instanceof File ? value : String(value))
        }
      })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Show success toast
      toast({
        title: "Submission Successful!",
        description: "Your assignment has been submitted. Check your email for confirmation.",
        variant: "default",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
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

      // Redirect to success page or dashboard
      // router.push('/submission-success')
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
    <>
      <Navbar />
      <main className="min-h-screen pt-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full filter blur-3xl animate-float" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full filter blur-3xl animate-float-delayed" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="gradient-text">Submit Your Assignment</span>
              </h1>
              <p className="text-slate-300 text-lg md:text-xl mb-8">
                Get expert help with your academic work. Our team of professionals is ready to assist you.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-12 pb-32">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Progress Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <div className="glass-card p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-white font-medium text-lg">Step {currentStep} of 4</span>
                    <span className="ml-3 text-slate-400">•</span>
                    <span className="ml-3 text-slate-300 font-medium">
                      {currentStep === 1 && "Assignment Details"}
                      {currentStep === 2 && "Upload Files"}
                      {currentStep === 3 && "Payment Information"}
                      {currentStep === 4 && "Payment Confirmation"}
                    </span>
                  </div>
                  {timerActive && (
                    <div className="flex items-center gap-2 text-orange-400 bg-orange-500/10 px-4 py-2 rounded-full">
                      <Clock className="w-4 h-4" />
                      <span className="font-mono font-medium">{formatTime(timeLeft)}</span>
                    </div>
                  )}
                </div>

                {/* Progress bar */}
                <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-orange-500 to-yellow-500"
                    initial={{ width: `${((currentStep - 1) / 4) * 100}%` }}
                    animate={{ width: `${(currentStep / 4) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                <div className="flex justify-between mt-4 text-sm">
                  <div
                    className={`flex flex-col items-center ${currentStep >= 1 ? "text-orange-400" : "text-slate-500"}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                        currentStep >= 1 ? "bg-orange-500/20 text-orange-400" : "bg-slate-800 text-slate-500"
                      }`}
                    >
                      1
                    </div>
                    <span className="hidden sm:block">Details</span>
                  </div>
                  <div
                    className={`flex flex-col items-center ${currentStep >= 2 ? "text-orange-400" : "text-slate-500"}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                        currentStep >= 2 ? "bg-orange-500/20 text-orange-400" : "bg-slate-800 text-slate-500"
                      }`}
                    >
                      2
                    </div>
                    <span className="hidden sm:block">Upload</span>
                  </div>
                  <div
                    className={`flex flex-col items-center ${currentStep >= 3 ? "text-orange-400" : "text-slate-500"}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                        currentStep >= 3 ? "bg-orange-500/20 text-orange-400" : "bg-slate-800 text-slate-500"
                      }`}
                    >
                      3
                    </div>
                    <span className="hidden sm:block">Payment</span>
                  </div>
                  <div
                    className={`flex flex-col items-center ${currentStep >= 4 ? "text-orange-400" : "text-slate-500"}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                        currentStep >= 4 ? "bg-orange-500/20 text-orange-400" : "bg-slate-800 text-slate-500"
                      }`}
                    >
                      4
                    </div>
                    <span className="hidden sm:block">Confirm</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Step 1: Assignment Details */}
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="glass-card p-8">
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-2">
                        <FileText className="text-orange-400" />
                        Assignment Details
                      </h2>
                      <p className="text-slate-400">Tell us about your assignment requirements</p>
                    </div>

                    <div className="space-y-8">
                      {/* Student Information Section */}
                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                          <User className="text-orange-400 w-5 h-5" />
                          Student Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Name Field */}
                          <div className="space-y-2">
                            <label htmlFor="name" className="block text-slate-300 font-medium">
                              Full Name <span className="text-orange-400">*</span>
                            </label>
                            <input
                              id="name"
                              type="text"
                              value={formData.name}
                              onChange={(e) => handleInputChange("name", e.target.value)}
                              className={`w-full bg-slate-800/50 border ${
                                errors.name ? "border-red-500" : "border-slate-700"
                              } rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:border-orange-500 transition-colors`}
                              placeholder="Your full name"
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                          </div>

                          {/* Email Field */}
                          <div className="space-y-2">
                            <label htmlFor="email" className="block text-slate-300 font-medium">
                              Email Address <span className="text-orange-400">*</span>
                            </label>
                            <div className="relative">
                              <input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                className={`w-full bg-slate-800/50 border ${
                                  errors.email ? "border-red-500" : "border-slate-700"
                                } rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-slate-500 focus:border-orange-500 transition-colors`}
                                placeholder="your.email@gmail.com"
                              />
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                            </div>
                            {errors.email ? (
                              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            ) : (
                              <p className="text-slate-500 text-sm mt-1">Use Gmail or .edu email address</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Assignment Details Section */}
                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                          <BookOpen className="text-orange-400 w-5 h-5" />
                          Assignment Details
                        </h3>

                        {/* Title Field */}
                        <div className="space-y-2">
                          <label htmlFor="title" className="block text-slate-300 font-medium">
                            Assignment Title <span className="text-orange-400">*</span>
                          </label>
                          <input
                            id="title"
                            type="text"
                            value={formData.title}
                            onChange={(e) => handleInputChange("title", e.target.value)}
                            className={`w-full bg-slate-800/50 border ${
                              errors.title ? "border-red-500" : "border-slate-700"
                            } rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:border-orange-500 transition-colors`}
                            placeholder="Brief title of your assignment"
                          />
                          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Subject Field */}
                          <div className="space-y-2">
                            <label htmlFor="subject" className="block text-slate-300 font-medium">
                              Subject <span className="text-orange-400">*</span>
                            </label>
                            <select
                              id="subject"
                              value={formData.subject}
                              onChange={(e) => handleInputChange("subject", e.target.value)}
                              className={`w-full bg-slate-800/50 border ${
                                errors.subject ? "border-red-500" : "border-slate-700"
                              } rounded-xl px-4 py-3 text-white appearance-none focus:border-orange-500 transition-colors`}
                            >
                              <option value="" className="bg-slate-800">
                                Select subject
                              </option>
                              {subjects.map((subject) => (
                                <option key={subject} value={subject} className="bg-slate-800">
                                  {subject}
                                </option>
                              ))}
                            </select>
                            {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                          </div>

                          {/* Deadline Field */}
                          <div className="space-y-2">
                            <label htmlFor="deadline" className="block text-slate-300 font-medium">
                              Deadline <span className="text-orange-400">*</span>
                            </label>
                            <div className="relative">
                              <input
                                id="deadline"
                                type="datetime-local"
                                value={formData.deadline}
                                onChange={(e) => handleInputChange("deadline", e.target.value)}
                                className={`w-full bg-slate-800/50 border ${
                                  errors.deadline ? "border-red-500" : "border-slate-700"
                                } rounded-xl pl-10 pr-4 py-3 text-white focus:border-orange-500 transition-colors`}
                              />
                              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                            </div>
                            {errors.deadline && <p className="text-red-500 text-sm mt-1">{errors.deadline}</p>}
                          </div>
                        </div>

                        {/* Category Selection */}
                        <div className="space-y-3">
                          <label className="block text-slate-300 font-medium">
                            Assignment Category <span className="text-orange-400">*</span>
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {categories.map((category) => (
                              <div
                                key={category.value}
                                onClick={() => handleInputChange("category", category.value)}
                                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                                  formData.category === category.value
                                    ? "bg-orange-500/20 border-orange-500 text-white"
                                    : "bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700/50"
                                }`}
                              >
                                <div className="font-medium">{category.label}</div>
                                <div className="text-sm opacity-70">{category.price}</div>
                              </div>
                            ))}
                          </div>
                          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                        </div>

                        {/* Description Field */}
                        <div className="space-y-2">
                          <label htmlFor="description" className="block text-slate-300 font-medium">
                            Assignment Description <span className="text-orange-400">*</span>
                          </label>
                          <textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => handleInputChange("description", e.target.value)}
                            className={`w-full bg-slate-800/50 border ${
                              errors.description ? "border-red-500" : "border-slate-700"
                            } rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:border-orange-500 transition-colors min-h-[150px]`}
                            placeholder="Provide detailed instructions, requirements, and any specific guidelines..."
                          />
                          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                        </div>
                      </div>
                    </div>

                    <div className="mt-10 flex justify-end">
                      <Button
                        onClick={nextStep}
                        icon={<ArrowRight />}
                        iconPosition="right"
                        variant="primary"
                        className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white border-orange-400/30"
                      >
                        Next Step
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: File Upload */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="glass-card p-8">
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-2">
                        <FileText className="text-orange-400" />
                        Upload Assignment Files
                      </h2>
                      <p className="text-slate-400">Upload your assignment files (PDF, DOC, DOCX, ZIP - Max 25MB)</p>
                    </div>

                    <div className="space-y-8">
                      <FileUpload
                        onFileSelect={(file) => handleInputChange("file", file)}
                        accept=".pdf,.doc,.docx,.zip"
                        maxSize={25 * 1024 * 1024} // 25MB
                        label="Assignment File"
                        description="Supported formats: PDF, DOC, DOCX, ZIP (Max 25MB)"
                        required={true}
                      />

                      {errors.file && (
                        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-start gap-3">
                          <AlertTriangle className="text-red-400 w-5 h-5 mt-0.5 flex-shrink-0" />
                          <p className="text-red-400 text-sm">{errors.file}</p>
                        </div>
                      )}

                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 flex items-start gap-3">
                        <Shield className="text-blue-400 w-5 h-5 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="text-white font-medium mb-1">File Security</h4>
                          <p className="text-slate-400 text-sm">
                            Your files are encrypted and securely stored. Only our assigned experts will have access to
                            your assignment details.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-10 flex justify-between">
                      <Button onClick={prevStep} icon={<ArrowLeft />} iconPosition="left" variant="secondary">
                        Previous
                      </Button>
                      <Button
                        onClick={nextStep}
                        icon={<ArrowRight />}
                        iconPosition="right"
                        variant="primary"
                        className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white border-orange-400/30"
                      >
                        Continue to Payment
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Payment Information */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="glass-card p-8">
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-2">
                        <FileText className="text-orange-400" />
                        Payment Information
                      </h2>
                      <p className="text-slate-400">Complete your payment to proceed with the assignment</p>
                    </div>

                    <div className="space-y-8">
                      {/* Timer */}
                      <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center">
                            <Clock className="w-8 h-8 text-orange-400" />
                          </div>
                          <div>
                            <h3 className="text-white font-semibold text-xl mb-1">Time Remaining</h3>
                            <p className="text-orange-400 font-mono text-3xl font-bold">{formatTime(timeLeft)}</p>
                          </div>
                        </div>
                        <p className="text-slate-400 text-sm">
                          You have 3 minutes to complete the payment process. After this time, you'll need to restart
                          your submission.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Payment Methods */}
                        <div className="space-y-4">
                          <h3 className="text-xl font-semibold text-white">Payment Methods</h3>
                          <div className="space-y-4">
                            <div className="glass-card p-4 border-white/5">
                              <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                                <span className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 text-xs">
                                  1
                                </span>
                                Bank Transfer
                              </h4>
                              <div className="text-slate-300 space-y-2 pl-8">
                                <p>
                                  <span className="text-slate-400">Account:</span> Submitly Services
                                </p>
                                <p>
                                  <span className="text-slate-400">Bank:</span> Chase Bank
                                </p>
                                <p>
                                  <span className="text-slate-400">Account #:</span> 1234567890
                                </p>
                                <p>
                                  <span className="text-slate-400">Routing #:</span> 021000021
                                </p>
                              </div>
                            </div>
                            <div className="glass-card p-4 border-white/5">
                              <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                                <span className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 text-xs">
                                  2
                                </span>
                                Digital Wallets
                              </h4>
                              <div className="text-slate-300 space-y-2 pl-8">
                                <p>
                                  <span className="text-slate-400">PayPal:</span> payments@submitly.com
                                </p>
                                <p>
                                  <span className="text-slate-400">Venmo:</span> @submitly-services
                                </p>
                                <p>
                                  <span className="text-slate-400">CashApp:</span> $SubmitlyServices
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Order Summary */}
                        <div className="space-y-4">
                          <h3 className="text-xl font-semibold text-white">Order Summary</h3>
                          <div className="glass-card p-6 border-white/5 space-y-4">
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-slate-400">Assignment Type:</span>
                                <span className="text-white font-medium">
                                  {categories.find((c) => c.value === formData.category)?.label}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-400">Subject:</span>
                                <span className="text-white font-medium">{formData.subject}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-400">Deadline:</span>
                                <span className="text-white font-medium">
                                  {new Date(formData.deadline).toLocaleDateString()}{" "}
                                  {new Date(formData.deadline).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                              </div>
                            </div>

                            <div className="border-t border-white/10 pt-4">
                              <div className="flex justify-between items-center">
                                <span className="text-white font-semibold">Estimated Price:</span>
                                <span className="text-lg font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                                  {categories.find((c) => c.value === formData.category)?.price}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                            <div className="flex items-start gap-3">
                              <Shield className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <h4 className="text-white font-medium mb-1">Secure Payment Process</h4>
                                <p className="text-slate-400 text-sm">
                                  After making your payment, upload the receipt or screenshot in the next step. Our team
                                  will verify your payment and begin working on your assignment immediately.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-10 flex justify-between">
                      <Button onClick={prevStep} icon={<ArrowLeft />} iconPosition="left" variant="secondary">
                        Previous
                      </Button>
                      <Button onClick={nextStep} icon={<ArrowRight />} iconPosition="right" variant="success">
                        Payment Complete
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Payment Proof */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="glass-card p-8">
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-2">
                        <CheckCircle className="text-orange-400" />
                        Upload Payment Proof
                      </h2>
                      <p className="text-slate-400">
                        Upload your payment receipt or screenshot to complete the submission
                      </p>
                    </div>

                    <div className="space-y-8">
                      {/* Timer Warning */}
                      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-red-400 flex-shrink-0" />
                          <div>
                            <h4 className="text-white font-medium">Time Sensitive</h4>
                            <p className="text-slate-300 text-sm">
                              Upload your payment proof within the time limit:{" "}
                              <span className="text-red-400 font-mono font-medium">{formatTime(timeLeft)}</span>
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Payment Proof Upload */}
                      <FileUpload
                        onFileSelect={(file) => handleInputChange("paymentProof", file)}
                        accept=".jpg,.jpeg,.png,.pdf"
                        maxSize={10 * 1024 * 1024} // 10MB
                        label="Payment Proof"
                        description="Upload receipt or screenshot (JPG, PNG, PDF - Max 10MB)"
                        required={true}
                      />

                      {errors.paymentProof && (
                        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-start gap-3">
                          <AlertTriangle className="text-red-400 w-5 h-5 mt-0.5 flex-shrink-0" />
                          <p className="text-red-400 text-sm">{errors.paymentProof}</p>
                        </div>
                      )}

                      {/* What Happens Next */}
                      <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                        <h4 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                          <CheckCircle className="text-green-400" />
                          What Happens Next?
                        </h4>
                        <ul className="space-y-3 pl-6">
                          <li className="flex items-start gap-2 text-slate-300">
                            <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-green-400 text-xs">1</span>
                            </div>
                            <span>Instant email confirmation of your submission</span>
                          </li>
                          <li className="flex items-start gap-2 text-slate-300">
                            <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-green-400 text-xs">2</span>
                            </div>
                            <span>Payment verification within 30 minutes</span>
                          </li>
                          <li className="flex items-start gap-2 text-slate-300">
                            <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-green-400 text-xs">3</span>
                            </div>
                            <span>Assignment work begins immediately after verification</span>
                          </li>
                          <li className="flex items-start gap-2 text-slate-300">
                            <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-green-400 text-xs">4</span>
                            </div>
                            <span>Regular email updates on progress</span>
                          </li>
                          <li className="flex items-start gap-2 text-slate-300">
                            <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-green-400 text-xs">5</span>
                            </div>
                            <span>Completed work delivered before deadline</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-10 flex justify-between">
                      <Button onClick={prevStep} icon={<ArrowLeft />} iconPosition="left" variant="secondary">
                        Previous
                      </Button>
                      <Button
                        onClick={handleSubmit}
                        icon={<CheckCircle />}
                        iconPosition="left"
                        variant="success"
                        loading={loading}
                        disabled={loading || !formData.paymentProof}
                      >
                        {loading ? "Submitting..." : "Complete Submission"}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Features Section */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Email Updates</h3>
                <p className="text-slate-400 text-sm">
                  Receive instant confirmation and progress updates via email throughout the process
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="glass-card p-6 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Secure Process</h3>
                <p className="text-slate-400 text-sm">
                  Your data and payments are protected with enterprise-grade security measures
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="glass-card p-6 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/20">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Fast Delivery</h3>
                <p className="text-slate-400 text-sm">
                  Get your completed assignment delivered before your specified deadline
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
