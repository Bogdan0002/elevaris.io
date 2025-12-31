import { ReactNode } from "react"
import { Container } from "@/components/site/Container"
import { Footer } from "@/components/site/Footer"

interface PageLayoutProps {
  children: ReactNode
  title: string
  subtitle?: string
}

const footerData = {
  aboutText:
    "Elevaris Web Solutions helps small businesses grow online with modern, personalized websites. Our team combines design, technology, and strategy to create user-friendly solutions backed by ongoing support.",
  quickLinks: [
    { label: "Home", href: "/home" },
    { label: "UX/UI Design", href: "/ux-ui-design" },
    { label: "Web Development", href: "/web-development" },
    { label: "SEO Strategies", href: "/seo-strategies" },
    { label: "Ongoing Support", href: "/ongoing-support" },
    { label: "Contact Us", href: "/contact-us" },
    { label: "Schedule a Call", href: "/schedule-a-call" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms and Conditions", href: "/terms-and-conditions" },
  ],
  contactTitle: "Contact US",
  email: "info@elevaris.app",
  phone: "+1 855-532-7511",
  copyright: "Copyright, Elevaris Web Solutions, 2025. All rights reserved.",
  credit: "Developed by ELEVARIS",
}

export function PageLayout({ children, title, subtitle }: PageLayoutProps) {
  return (
    <>
      <section className="pt-32 pb-20">
        <Container>
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mx-auto max-w-2xl text-lg text-foreground-secondary">
                {subtitle}
              </p>
            )}
          </div>
        </Container>
      </section>
      {children}
      <Footer {...footerData} />
    </>
  )
}

