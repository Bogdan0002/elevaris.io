import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Car Detailing Business Websites & CRM | Auto Detailing Software",
  description: "Professional car detailing business websites with automated lead capture, booking systems, and client management. Perfect for mobile detailing, ceramic coating, and paint correction businesses. Get more 5-star reviews and grow your auto detailing business on autopilot.",
  keywords: [
    "car detailing website",
    "auto detailing software",
    "car detailing business",
    "mobile detailing",
    "ceramic coating",
    "paint correction",
    "car detailing CRM",
    "auto detailing leads",
    "detailing booking system",
    "car wash website",
    "auto detailing marketing",
    "detailing business automation",
    "car detailing reviews",
    "mobile detailing software",
    "auto detail business",
    "car detailing near me",
    "mobile car wash",
    "auto spa software",
    "detailing management software",
    "car detailing scheduler"
  ],
  openGraph: {
    title: "Grow Your Car Detailing Business | Automated Websites & CRM",
    description: "Complete car detailing business growth system: capture leads, automate follow-ups, collect reviews, and manage clients. Built for auto detailers, ceramic coaters, and mobile detailing services.",
    type: "website",
    url: "https://elevaris.app/car-detailing",
  },
  twitter: {
    card: "summary_large_image",
    title: "Car Detailing Business Websites & Automation",
    description: "Automated websites and CRM for car detailing businesses. Capture leads, manage clients, and grow your auto detailing business.",
  },
  alternates: {
    canonical: "https://elevaris.app/car-detailing",
  },
}

export default function CarDetailingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
