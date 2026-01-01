import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/site/Navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Elevaris Web Solutions - Smart Digital Solutions for Growing Brands",
  description:
    "We help businesses grow online through powerful websites and smart advertising. Whether you're starting from scratch or need a refresh, we handle it all.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={inter.className + " overflow-x-hidden"}>
        <Navbar />
        <main className="overflow-x-hidden">{children}</main>
      </body>
    </html>
  )
}

