"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export default function Logo({ size = "md", className = "" }: LogoProps) {
  const sizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
  }

  return (
    <div className={cn("flex items-center group", className)}>
      <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }} className="relative">
        <span
          className={cn(
            "font-bold tracking-wide text-white",
            "transition-all duration-300",
            sizes[size],
            "font-[Satoshi], sans-serif",
          )}
        >
          <span className="text-orange-500">S</span>UBMIT
          <span className="text-orange-500">LY</span>
        </span>

        {/* Optional glow background */}
        <div className="absolute inset-0 bg-orange-500/10 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10" />
      </motion.div>
    </div>
  )
}
