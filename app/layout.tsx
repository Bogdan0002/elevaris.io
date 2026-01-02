import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ConditionalNavbar } from "@/components/site/ConditionalNavbar"

const inter = Inter({ subsets: ["latin"] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#18181b',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://elevaris.app'),
  title: {
    default: "Elevaris - Premium Web Development & Digital Marketing Solutions",
    template: "%s | Elevaris"
  },
  description:
    "Transform your business with Elevaris' premium web development, SEO optimization, UI/UX design, and digital advertising services. We build fast, modern websites that convert visitors into customers.",
  keywords: [
    "web development",
    "digital marketing",
    "SEO optimization",
    "UI/UX design",
    "website design",
    "custom websites",
    "digital advertising",
    "CRM integration",
    "GoHighLevel",
    "business automation",
    "lead generation",
    "responsive web design"
  ],
  authors: [{ name: "Elevaris" }],
  creator: "Elevaris",
  publisher: "Elevaris",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "https://msgsndr-private.storage.googleapis.com/companyPhotos/de2495b0-3133-4819-a427-ed492c324e10.png",
    shortcut: "https://msgsndr-private.storage.googleapis.com/companyPhotos/de2495b0-3133-4819-a427-ed492c324e10.png",
    apple: "https://msgsndr-private.storage.googleapis.com/companyPhotos/de2495b0-3133-4819-a427-ed492c324e10.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://elevaris.app",
    title: "Elevaris - Premium Web Development & Digital Marketing",
    description: "Transform your business with premium web solutions. Fast, modern websites that drive real results.",
    siteName: "Elevaris",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elevaris - Premium Web Development & Digital Marketing",
    description: "Transform your business with premium web solutions. Fast, modern websites that drive real results.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "google-site-verification-code", // User should replace with actual code
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={`${inter.className} overflow-x-hidden`}>
        <ConditionalNavbar />
        <main className="overflow-x-hidden">{children}</main>
      </body>
    </html>
  )
}

