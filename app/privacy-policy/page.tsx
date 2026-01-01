"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/site/Container"
import { Footer } from "@/components/site/Footer"
import { Shield, Sparkles } from "lucide-react"

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

export default function PrivacyPolicyPage() {
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
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground-secondary">Your Privacy Matters</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              Privacy{" "}
              <span className="bg-gradient-to-r from-primary via-[#ff7a59] to-[#7b63ff] bg-clip-text text-transparent">
                Policy
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
                  <h2 className="text-2xl font-bold text-foreground mb-4">1. INTRODUCTION</h2>
                  <p className="text-foreground-secondary leading-relaxed">
                    At Elevaris Web Solutions (Elevaris.app) (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;), your privacy is important to us. This Privacy Policy outlines how we collect, use, disclose, and protect your personal information in accordance with applicable U.S. privacy laws and A2P messaging regulations.
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
                  <h2 className="text-2xl font-bold text-foreground mb-4">2. INFORMATION WE COLLECT</h2>
                  <p className="text-foreground-secondary leading-relaxed mb-4">
                    We collect different types of information to provide and improve our services, ensure secure communication, and comply with applicable regulations. This may include:
                  </p>
                  <ul className="space-y-3 text-foreground-secondary">
                    <li><strong className="text-foreground">Account Information:</strong> Your name, email address, phone number, mailing address, and any other details you provide when contacting us, requesting a quote, or becoming a client.</li>
                    <li><strong className="text-foreground">Usage Data:</strong> Information about how you access and use our website or services, such as IP address, browser type, device type, operating system, login data, and session duration.</li>
                    <li><strong className="text-foreground">Communications Data:</strong> Content of messages, call details, and related timestamps collected through A2P messaging services (including SMS and voice) for purposes such as appointment reminders, project updates, and promotional messages.</li>
                    <li><strong className="text-foreground">Billing Information:</strong> Payment details necessary to process transactions, such as credit card information, billing address, and payment history.</li>
                    <li><strong className="text-foreground">Automatically Collected Data:</strong> Data gathered through cookies and similar technologies, including website analytics, traffic patterns, and user preferences, which help us improve functionality and user experience.</li>
                  </ul>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-foreground mb-4">3. HOW WE USE YOUR INFORMATION</h2>
                  <p className="text-foreground-secondary leading-relaxed mb-4">
                    We use the information we collect for the following purposes:
                  </p>
                  <ul className="space-y-3 text-foreground-secondary">
                    <li><strong className="text-foreground">To provide and improve our services</strong> – ensuring smooth delivery of web design, development, and related support.</li>
                    <li><strong className="text-foreground">To communicate with you</strong> – including appointment reminders, project updates, and other transactional A2P SMS/voice communications.</li>
                    <li><strong className="text-foreground">For marketing and promotions</strong> – to share newsletters, offers, or service updates, but only where you have provided consent or as otherwise permitted by law.</li>
                    <li><strong className="text-foreground">For security and fraud prevention</strong> – to verify identity, detect suspicious activity, and maintain the safety of our systems.</li>
                    <li><strong className="text-foreground">For analytics and performance tracking</strong> – to understand how our services are used and to improve user experience.</li>
                    <li><strong className="text-foreground">For legal and compliance purposes</strong> – to meet regulatory obligations, enforce agreements, and resolve disputes.</li>
                  </ul>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-foreground mb-4">4. A2P MESSAGING COMPLIANCE</h2>
                  <p className="text-foreground-secondary leading-relaxed mb-4">
                    We comply with all applicable FCC, CTIA, and carrier requirements for Application-to-Person (A2P) messaging. Our practices include:
                  </p>
                  <ul className="space-y-3 text-foreground-secondary">
                    <li><strong className="text-foreground">Message Identification</strong> – All SMS or voice messages are clearly identified as originating from Elevaris.app.</li>
                    <li><strong className="text-foreground">Opt-In for Promotional Messages</strong> – We only send promotional or marketing-related A2P messages to users who have expressly opted in.</li>
                    <li><strong className="text-foreground">Opt-Out Mechanism</strong> – Every promotional or informational message includes a clear and simple way to unsubscribe or stop receiving future communications.</li>
                    <li><strong className="text-foreground">Spam and DND Compliance</strong> – We adhere to industry best practices and regulations designed to prevent spam, respect &ldquo;Do Not Disturb&rdquo; (DND) lists, and honor user preferences.</li>
                    <li><strong className="text-foreground">Age Restrictions</strong> – Messaging is not directed to individuals under the legal minimum age for consent in their jurisdiction.</li>
                  </ul>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-foreground mb-4">5. SHARING AND DISCLOSURE</h2>
                  <p className="text-foreground-secondary leading-relaxed mb-4">
                    We do not sell or rent your personal information. However, we may share your data in the following circumstances:
                  </p>
                  <ul className="space-y-3 text-foreground-secondary">
                    <li><strong className="text-foreground">Service Providers</strong> – With trusted vendors and partners who assist us in delivering our services, such as SMS gateway operators, hosting providers, or payment processors.</li>
                    <li><strong className="text-foreground">Affiliates and Business Partners</strong> – With affiliates or selected third parties who provide billing, analytics, or related business support services.</li>
                    <li><strong className="text-foreground">Legal Requirements</strong> – When required to comply with applicable laws, regulations, legal processes, or enforceable governmental requests.</li>
                    <li><strong className="text-foreground">Business Transfers</strong> – In connection with a merger, acquisition, restructuring, or sale of assets, where your information may be transferred as part of the business assets.</li>
                  </ul>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-foreground mb-4">6. YOUR RIGHTS</h2>
                  <p className="text-foreground-secondary leading-relaxed mb-4">
                    Depending on your location and applicable laws, you may have the following rights regarding your personal information:
                  </p>
                  <ul className="space-y-3 text-foreground-secondary">
                    <li><strong className="text-foreground">Access and Correction</strong> – You may request access to the personal information we hold about you and ask us to correct any inaccuracies.</li>
                    <li><strong className="text-foreground">Deletion</strong> – You may request that we delete your personal data, subject to certain legal or contractual obligations.</li>
                    <li><strong className="text-foreground">Portability</strong> – Where applicable, you may request a copy of your information in a structured, commonly used, and machine-readable format.</li>
                    <li><strong className="text-foreground">Choice and Opt-Out</strong> – You may opt out of receiving non-essential marketing or promotional communications at any time by using the unsubscribe link in our messages or by contacting us directly.</li>
                    <li><strong className="text-foreground">Do-Not-Track (DNT) Signals</strong> – Our website does not currently respond to browser &ldquo;Do-Not-Track&rdquo; signals.</li>
                    <li><strong className="text-foreground">Children&apos;s Privacy</strong> – Our services are not directed to children under the age of 13. We do not knowingly collect personal data from children. If we become aware that such information has been collected, we will take steps to delete it. Parents or guardians may contact us to request deletion.</li>
                  </ul>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-foreground mb-4">7. DATA SECURITY AND RETENTION</h2>
                  <p className="text-foreground-secondary leading-relaxed mb-4">
                    We take the protection of your personal information seriously and implement appropriate technical and organizational measures to safeguard it, including:
                  </p>
                  <ul className="space-y-3 text-foreground-secondary">
                    <li><strong className="text-foreground">Security Measures</strong> – Industry-standard safeguards such as encryption, secure servers, and access controls to protect against unauthorized access, disclosure, alteration, or destruction of data.</li>
                    <li><strong className="text-foreground">Data Retention</strong> – We retain your personal information only as long as necessary to provide our services, fulfill contractual obligations, or comply with legal requirements.</li>
                    <li><strong className="text-foreground">Retention Examples</strong> – For instance, transactional SMS or voice message logs may be retained for up to three (3) years to ensure accurate service delivery and compliance with A2P messaging regulations.</li>
                  </ul>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-foreground mb-4">8. INTERNATIONAL TRANSFERS</h2>
                  <p className="text-foreground-secondary leading-relaxed">
                    Your personal information may be processed, stored, or transferred to countries outside the United States. In such cases, we take appropriate measures to ensure that your data receives an adequate level of protection in accordance with applicable privacy laws.
                  </p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-foreground mb-4">9. CHANGES TO THE PRIVACY POLICY</h2>
                  <p className="text-foreground-secondary leading-relaxed">
                    We may update this Privacy Policy from time to time to reflect changes in our practices, services, or legal requirements. If we make any material changes, we will notify you by email (if we have your contact information) or by posting a prominent notice on our website. We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">10. CONTACT US</h2>
                  <p className="text-foreground-secondary leading-relaxed mb-4">
                    If you have any questions, concerns, or requests regarding this Privacy Policy or the way we handle your personal information, please contact us:
                  </p>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-foreground-secondary">
                      <strong className="text-foreground">Email:</strong> <a href="mailto:info@elevaris.app" className="text-primary hover:underline">info@elevaris.app</a><br />
                      <strong className="text-foreground">Phone:</strong> <a href="tel:+18555327511" className="text-primary hover:underline">+1 855-532-7511</a>
                    </p>
                  </div>
                  <p className="text-foreground-secondary leading-relaxed mt-4">
                    We will make every effort to respond to your inquiry promptly and address your concerns.
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
