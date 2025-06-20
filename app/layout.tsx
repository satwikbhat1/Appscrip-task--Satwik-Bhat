import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Appscrip Store - Premium Fashion & Electronics",
    template: "%s | Appscrip Store",
  },
  description:
    "Discover premium fashion, electronics, and jewelry at Appscrip Store. Shop the latest trends with fast shipping and easy returns.",
  keywords: "fashion, clothing, electronics, jewelry, online shopping, premium brands, appscrip",
  authors: [{ name: "Appscrip Team" }],
  creator: "Appscrip",
  publisher: "Appscrip Store",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://appscrip-store.vercel.app",
    siteName: "Appscrip Store",
    title: "Appscrip Store - Premium Fashion & Electronics",
    description: "Discover premium fashion, electronics, and jewelry at Appscrip Store.",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Appscrip Store",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Appscrip Store - Premium Fashion & Electronics",
    description: "Discover premium fashion, electronics, and jewelry at Appscrip Store.",
    creator: "@appscrip",
    images: ["/images/og-default.jpg"],
  },
  verification: {
    google: "your-google-verification-code",
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-white">{children}</div>
      </body>
    </html>
  )
}
