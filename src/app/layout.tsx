import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Navbar } from "@/components/Navbar"
import "@/styles/main.scss"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Timmo - Investissez dans l'immobilier dès 10€",
  description:
    "Timmo simplifie l'investissement immobilier. Investissez dans l'immobilier en petites parts numériques dès 10€.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <head></head>
      <body className={`font-sans antialiased`}>
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
