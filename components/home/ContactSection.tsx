"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import Link from "next/link"
import { Container } from "@/components/site/Container"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { SparklesCore } from "@/components/ui/sparkles"
import { GlowButton } from "@/components/brand/GlowButton"
import { leadSchema, type LeadFormData } from "@/lib/validation/leadSchema"

interface ContactSectionProps {
  title: string
  highlight: string
  text: string
  submit: string
}

export function ContactSection({
  title,
  highlight,
  text,
  submit,
}: ContactSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
  })

  const onSubmit = async (data: LeadFormData) => {
    if (data.honeypot && data.honeypot.length > 0) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus("success")
        reset()
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const titleParts = title.split(new RegExp(`(${highlight})`, "gi"))

  return (
    <section className="py-20">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-start">
          {/* Left: Heading */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {titleParts.map((part, index) =>
                part.toLowerCase() === highlight.toLowerCase() ? (
                  <span key={index} className="text-primary">
                    {part}
                  </span>
                ) : (
                  <span key={index}>{part}</span>
                )
              )}
            </h2>
            <p className="text-base text-foreground-secondary leading-relaxed sm:text-lg">
              {text}
            </p>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Subtle Sparkles Background */}
            <div className="absolute inset-0 -z-10 overflow-hidden rounded-lg opacity-30">
              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={0.8}
                particleDensity={80}
                className="w-full h-full"
                particleColor="#FF6A55"
                speed={0.5}
              />
            </div>
            
            <div className="relative rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(255,106,85,0.12),transparent_38%),radial-gradient(circle_at_80%_0%,rgba(123,99,255,0.12),transparent_40%),linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] p-8 backdrop-blur-sm shadow-[0_12px_30px_rgba(0,0,0,0.3)]">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Honeypot */}
                <input
                  type="text"
                  {...register("honeypot")}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Full Name */}
                <div>
                  <Label
                    htmlFor="fullName"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Full Name <span className="text-primary">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    {...register("fullName")}
                    className="h-12 border-border bg-background text-foreground placeholder:text-foreground-muted focus:border-primary/50"
                    placeholder="John Doe"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-primary">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <Label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register("phone")}
                    className="h-12 border-border bg-background text-foreground placeholder:text-foreground-muted focus:border-primary/50"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                {/* Email */}
                <div>
                  <Label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Email <span className="text-primary">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    className="h-12 border-border bg-background text-foreground placeholder:text-foreground-muted focus:border-primary/50"
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-primary">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Additional Information */}
                <div>
                  <Label
                    htmlFor="additionalInfo"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Additional Information
                  </Label>
                  <Textarea
                    id="additionalInfo"
                    {...register("additionalInfo")}
                    className="min-h-[120px] border-border bg-background text-foreground placeholder:text-foreground-muted focus:border-primary/50"
                    placeholder="Tell us about your project..."
                    rows={4}
                  />
                </div>

                {/* SMS Consent */}
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="smsConsent"
                    {...register("smsConsent")}
                    className="mt-1"
                  />
                  <Label
                    htmlFor="smsConsent"
                    className="text-xs text-foreground-secondary leading-relaxed cursor-pointer"
                  >
                    I consent to receive SMS messages from Elevaris. You can
                    opt-out at any time. By submitting this form, you agree to
                    our{" "}
                    <Link
                      href="/privacy-policy"
                      className="text-primary hover:underline"
                    >
                      Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/terms-and-conditions"
                      className="text-primary hover:underline"
                    >
                      Terms and Conditions
                    </Link>
                    .
                  </Label>
                </div>

                {/* Submit Button */}
                <GlowButton
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? "Submitting..." : submit}
                </GlowButton>

                {/* Status Messages */}
                {submitStatus === "success" && (
                  <p className="text-sm text-primary">
                    Thank you! We&apos;ll be in touch soon.
                  </p>
                )}
                {submitStatus === "error" && (
                  <p className="text-sm text-primary">
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
