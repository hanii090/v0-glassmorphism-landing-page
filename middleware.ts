import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Security headers
const securityHeaders = {
  "Content-Security-Policy": `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' data: https: blob:;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.resend.com;
    media-src 'self' blob:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `
    .replace(/\s+/g, " ")
    .trim(),
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-XSS-Protection": "1; mode=block",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
}

// Rate limiting function
function rateLimit(ip: string, limit = 3, windowMs = 1000): boolean {
  const now = Date.now()
  const key = ip
  const record = rateLimitStore.get(key)

  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (record.count >= limit) {
    return false
  }

  record.count++
  return true
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Add security headers to all responses
  Object.entries(securityHeaders).forEach(([key, value]) => {
    res.headers.set(key, value)
  })

  // HTTPS enforcement (in production)
  if (process.env.NODE_ENV === "production" && req.headers.get("x-forwarded-proto") !== "https") {
    return NextResponse.redirect(`https://${req.headers.get("host")}${req.nextUrl.pathname}${req.nextUrl.search}`)
  }

  // Rate limiting for API routes
  if (req.nextUrl.pathname.startsWith("/api/")) {
    const ip = req.ip || req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown"

    if (!rateLimit(ip, 3, 1000)) {
      return new NextResponse(JSON.stringify({ error: "Too many requests. Please try again later." }), {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": "1",
          ...Object.fromEntries(Object.entries(securityHeaders)),
        },
      })
    }
  }

  // Admin route protection
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const supabase = createMiddlewareClient({ req, res })

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        return NextResponse.redirect(new URL("/auth/login?redirect=/admin", req.url))
      }

      // Check admin role
      const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

      if (!profile || profile.role !== "admin") {
        return NextResponse.redirect(new URL("/auth/unauthorized", req.url))
      }
    } catch (error) {
      console.error("Auth middleware error:", error)
      return NextResponse.redirect(new URL("/auth/login?redirect=/admin", req.url))
    }
  }

  return res
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*", "/((?!_next/static|_next/image|favicon.ico).*)"],
}
