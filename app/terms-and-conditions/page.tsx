"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/site/Container"
import { Footer } from "@/components/site/Footer"
import { FileText, Sparkles } from "lucide-react"

const footerData = {
  aboutText:
    "Elevaris Web Solutions helps small businesses grow online with modern, personalized websites. Our team combines design, technology, and strategy to create user-friendly solutions backed by ongoing support.",
  quickLinks: [
    { label: "Home", href: "/home" },
    { label: "UX/UI Design", href: "/ux-ui-design" },
    { label: "Web Development", href: "/web-development" },
    { label: "SEO Strategies", href: "/seo-strategies" },
    { label: "Advertising", href: "/advertising" },
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

export default function TermsAndConditionsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,106,85,0.08),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(123,99,255,0.08),transparent_50%)] pointer-events-none" />
        
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
            >
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground-secondary">Legal Terms</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              Terms &{" "}
              <span className="bg-gradient-to-r from-primary via-[#ff7a59] to-[#7b63ff] bg-clip-text text-transparent">
                Conditions
              </span>
            </motion.h1>
          </div>
        </Container>
      </section>

      {/* Content Section */}
      <section className="pb-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="rounded-2xl border border-white/10 bg-[linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] p-8 sm:p-12">
              <div className="prose prose-invert prose-lg max-w-none">
                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-foreground mb-4">INTRODUCTION</h2>
                  <p className="text-foreground-secondary leading-relaxed">
                    Elevaris.app (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) provides an SMS messaging service designed to keep you informed about your web design projects, scheduled appointments, and special promotional offers. By subscribing to receive SMS messages from us, you acknowledge and agree to the terms and conditions described below.
                  </p>
                  <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-foreground-secondary text-sm leading-relaxed">
                      <strong className="text-foreground">Official Registered Company:</strong> Distribution and Management Services (CVR No. 42267236)<br />
                      <strong className="text-foreground">Business Name:</strong> Elevaris Web Solutions<br />
                      <strong className="text-foreground">Address:</strong> Kollegievænget 5, st. sal. b115, Horsens, Denmark<br />
                      <strong className="text-foreground">Website:</strong> https://elevaris.app<br />
                      <strong className="text-foreground">Industry:</strong> Software Company<br />
                      <strong className="text-foreground">Message Types:</strong> Appointment reminders, project updates, and occasional promotional communications.
                    </p>
                  </div>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-foreground mb-4">1. PROGRAM DESCRIPTION</h2>
                  <p className="text-foreground-secondary leading-relaxed mb-4">
                    Our SMS messaging program is designed to keep you informed and connected. Messages may include:
                  </p>
                  <ul className="space-y-2 text-foreground-secondary">
                    <li>Appointment confirmations and reminders;</li>
                    <li>Project updates;</li>
                    <li>Promotional offers or service announcements.</li>
                  </ul>
                  <p className="text-foreground-secondary leading-relaxed mt-4">
                    You will only receive SMS messages if you have explicitly opted in—either through a form on our website or by providing consent during direct communication with us.
                  </p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-foreground mb-4">2. MESSAGE FREQUENCY</h2>
                  <p className="text-foreground-secondary leading-relaxed">
                    Messages will be sent only when necessary—typically during active project phases or for occasional promotional updates. The frequency of messages may vary depending on your ongoing activity and engagement with our services.
                  </p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-foreground mb-4">3. OPT-IN CONSENT</h2>
                  <p className="text-foreground-secondary leading-relaxed mb-4">
                    By checking the consent box on our website or replying &ldquo;YES&rdquo; during communication, you provide explicit permission to receive SMS messages from Elevaris Web Solutions at the phone number you have provided.
                  </p>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-foreground-secondary text-sm">
                      <strong className="text-foreground">Sample Consent Language:</strong><br />
                      By checking this box, you consent to receive SMS notifications and promotional messages from Elevaris Web Solutions.
                    </p>
                  </div>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-foreground mb-4">4. OPT-OUT AND HELP INSTRUCTIONS</h2>
                  <p className="text-foreground-secondary leading-relaxed mb-4">
                    You may unsubscribe from our SMS service at any time by replying &ldquo;STOP&rdquo; to our shortcode. Once your request is received, you will receive a confirmation message, and no further SMS messages will be sent to your number.
                  </p>
                  <p className="text-foreground-secondary leading-relaxed">
                    If you need assistance or have any questions, reply &ldquo;HELP&rdquo; for support or contact us directly at: <a href="mailto:info@elevaris.app" className="text-primary hover:underline">info@elevaris.app</a>
                  </p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-foreground mb-4">5. MESSAGE AND DATA RATES</h2>
                  <p className="text-foreground-secondary leading-relaxed">
                    Standard message and data rates may apply according to your mobile carrier and service plan. Please check with your provider for any applicable fees.
                  </p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-foreground mb-4">6. CARRIER DISCLAIMER</h2>
                  <p className="text-foreground-secondary leading-relaxed">
                    Mobile carriers are not liable for delayed or undelivered messages.
                  </p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-foreground mb-4">7. PRIVACY</h2>
                  <p className="text-foreground-secondary leading-relaxed">
                    Your personal information is handled according to our Privacy Policy: <a href="/privacy-policy" className="text-primary hover:underline">https://www.elevaris.app/privacy-policy</a>
                  </p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-foreground mb-4">8. MESSAGE SAMPLES</h2>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-foreground-secondary text-sm">
                        <strong className="text-foreground">Sample Message #1:</strong><br />
                        Hello David, this is Kate from Elevaris Web Solutions. Your design consultation is confirmed for Thursday at 4:00 PM. Reply STOP to unsubscribe.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-foreground-secondary text-sm">
                        <strong className="text-foreground">Sample Message #2:</strong><br />
                        Hi! This is Elevaris Web Solutions. This is a reminder about your meeting today. Still available? Reply STOP to opt out.
                      </p>
                    </div>
                  </div>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-foreground mb-4">9. BUSINESS INFO</h2>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-foreground-secondary text-sm leading-relaxed">
                      <strong className="text-foreground">Official Registered Company:</strong> Distribution and Management Services (CVR No. 42267236)<br />
                      <strong className="text-foreground">Business Name:</strong> Elevaris Web Solutions<br />
                      <strong className="text-foreground">Address:</strong> Kollegievænget 5, st. sal. b115, Horsens, Denmark<br />
                      <strong className="text-foreground">Website:</strong> https://elevaris.app<br />
                      <strong className="text-foreground">Industry:</strong> Software Company<br />
                      <strong className="text-foreground">Message Types:</strong> Appointment reminders, project updates, and occasional promotional communications.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">10. RESUBSCRIBE</h2>
                  <p className="text-foreground-secondary leading-relaxed">
                    You can rejoin the SMS messaging program at any time by texting START or by opting in again through our website.
                  </p>
                </section>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      <Footer {...footerData} />
    </>
  )
}
