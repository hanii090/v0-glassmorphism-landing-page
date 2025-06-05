import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Submitly – Get Expert Assignment Solutions Instantly",
  description:
    "Submit your assignment, pay manually, and get plagiarism-free academic solutions delivered to your inbox. Expert help for essays, research papers, programming, and more.",
  keywords:
    "assignment help, homework assistance, academic writing, plagiarism-free, student solutions, essay writing, research papers, university help",
  authors: [{ name: "Submitly Team" }],
  openGraph: {
    title: "Submitly – Get Expert Assignment Solutions Instantly",
    description:
      "Submit your assignment, pay manually, and get plagiarism-free academic solutions delivered to your inbox.",
    type: "website",
    locale: "en_US",
    url: "https://submitly.study",
    siteName: "Submitly",
    images: [
      {
        url: "/images/og-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Submitly - Expert Assignment Help Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Submitly – Get Expert Assignment Solutions Instantly",
    description:
      "Submit your assignment, pay manually, and get plagiarism-free academic solutions delivered to your inbox.",
    images: ["/images/og-preview.jpg"],
    creator: "@submitly",
    site: "@submitly",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://submitly.study",
  },
  other: {
    "og:image:width": "1200",
    "og:image:height": "630",
    "og:image:type": "image/jpeg",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0F172A" />

        {/* Enhanced Open Graph Meta Tags */}
        <meta property="og:title" content="Submitly – Get Expert Assignment Solutions Instantly" />
        <meta
          property="og:description"
          content="Submit your assignment, pay manually, and get plagiarism-free academic solutions delivered to your inbox."
        />
        <meta property="og:image" content="/images/og-preview.jpg" />
        <meta property="og:url" content="https://submitly.study" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Submitly" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Submitly – Get Expert Assignment Solutions Instantly" />
        <meta
          name="twitter:description"
          content="Submit your assignment, pay manually, and get plagiarism-free academic solutions delivered to your inbox."
        />
        <meta name="twitter:image" content="/images/og-preview.jpg" />
        <meta name="twitter:creator" content="@submitly" />
        <meta name="twitter:site" content="@submitly" />

        {/* Additional SEO Meta Tags */}
        <meta name="application-name" content="Submitly" />
        <meta name="apple-mobile-web-app-title" content="Submitly" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#0F172A" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans`}>{children}</body>
    </html>
  )
}
