import { z } from "zod"

export const leadSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  phone: z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
  additionalInfo: z.string().optional(),
  smsConsent: z.boolean().optional(),
  honeypot: z.string().max(0, "Bot detected").optional(), // Honeypot field
})

export type LeadFormData = z.infer<typeof leadSchema>

