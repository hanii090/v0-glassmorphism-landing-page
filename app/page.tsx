import Hero from "@/components/sections/hero"
import HowItWorks from "@/components/sections/how-it-works"
import Features from "@/components/sections/features"
import RefundPolicy from "@/components/sections/refund-policy"
import MultiStepForm from "@/components/sections/multi-step-form"
import Testimonials from "@/components/sections/testimonials"
import FinalCTA from "@/components/sections/final-cta"
import Footer from "@/components/sections/footer"
import Navbar from "@/components/navbar"
import AnimatedCursor from "@/components/ui/animated-cursor"
import TrustBadges from "@/components/sections/trust-badges"
import StudentReviews from "@/components/sections/student-reviews"
import PriceEstimator from "@/components/sections/price-estimator"
import PlagiarismChecker from "@/components/sections/plagiarism-checker"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900/50 to-slate-900 pointer-events-none" />

      {/* Floating glowing orbs */}
      <div className="fixed top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-float" />
      <div className="fixed top-40 right-20 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-float-delayed" />
      <div className="fixed bottom-20 left-1/4 w-40 h-40 bg-cyan-500/10 rounded-full blur-xl animate-float-slow" />

      <AnimatedCursor />
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <TrustBadges />
        <HowItWorks />
        <PriceEstimator />
        <Features />
        <StudentReviews />
        <RefundPolicy />
        <PlagiarismChecker />
        <MultiStepForm />
        <Testimonials />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  )
}
