"use client"

import type React from "react"

import { forwardRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "success" | "danger" | "ghost"
  size?: "sm" | "md" | "lg"
  icon?: React.ReactNode
  iconPosition?: "left" | "right" | "center"
  loading?: boolean
  children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      icon,
      iconPosition = "left",
      loading = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const baseClasses = `
      relative inline-flex items-center justify-center
      font-medium tracking-wide transition-all duration-300 ease-in-out
      backdrop-blur-md border border-white/10
      focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-slate-900
      disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
      overflow-hidden group
    `

    const variants = {
      primary: `
        bg-slate-800/30 text-slate-300 
        hover:bg-slate-700/50 hover:text-white hover:border-blue-400/30
        shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20
      `,
      secondary: `
        bg-slate-700/30 text-slate-400 
        hover:bg-slate-600/50 hover:text-white hover:border-white/20
        shadow-lg shadow-slate-500/10 hover:shadow-slate-500/20
      `,
      success: `
        bg-green-500/20 text-green-400 border-green-500/30
        hover:bg-green-500/30 hover:text-white hover:border-green-400/50
        shadow-lg shadow-green-500/10 hover:shadow-green-500/20
      `,
      danger: `
        bg-red-500/20 text-red-400 border-red-500/30
        hover:bg-red-500/30 hover:text-white hover:border-red-400/50
        shadow-lg shadow-red-500/10 hover:shadow-red-500/20
      `,
      ghost: `
        bg-transparent text-slate-400 border-transparent
        hover:bg-slate-800/30 hover:text-white hover:border-white/10
      `,
    }

    const sizes = {
      sm: "min-w-[120px] h-10 px-4 py-2 text-sm rounded-full",
      md: "min-w-[160px] h-12 px-6 py-3 text-base rounded-full",
      lg: "min-w-[200px] h-14 px-8 py-4 text-lg rounded-full",
    }

    const iconSizes = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10" />

        {/* Content */}
        <div className="relative flex items-center justify-center space-x-2">
          {loading && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className={cn("border-2 border-current border-t-transparent rounded-full", iconSizes[size])}
            />
          )}

          {!loading && icon && (iconPosition === "left" || iconPosition === "center") && (
            <span className={cn("flex-shrink-0", iconSizes[size])}>{icon}</span>
          )}

          {iconPosition !== "center" && <span className="whitespace-nowrap">{children}</span>}

          {!loading && icon && iconPosition === "right" && (
            <span className={cn("flex-shrink-0", iconSizes[size])}>{icon}</span>
          )}
        </div>
      </motion.button>
    )
  },
)

Button.displayName = "Button"

export { Button }
