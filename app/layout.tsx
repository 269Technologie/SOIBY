import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

// <CHANGE> Updated font to Inter for modern tech look
const _inter = Inter({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SOIBY Web Agency | AI & Tech Solutions",
  description:
    "SOIBY Web Agency - We master technology so you can experience it without stress. AI, Blockchain, Fintech, and Web Development experts.",
  icons: {
    icon: [
      {
        url: "/soiby.jpeg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/soiby.jpeg",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/soiby.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/soiby.jpg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
