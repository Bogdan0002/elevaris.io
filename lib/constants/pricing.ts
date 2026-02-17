import { PricingTier } from "@/components/site/PricingTiers"

// Stripe checkout URLs with success redirect to onboarding
// Replace these with your actual Stripe checkout links
export const STRIPE_CHECKOUT_URLS = {
  launch: "https://buy.stripe.com/YOUR_LAUNCH_LINK?success_url=https://onboarding.elevaris.app",
  growth: "https://buy.stripe.com/YOUR_GROWTH_LINK?success_url=https://onboarding.elevaris.app",
  accelerator: "https://buy.stripe.com/YOUR_ACCELERATOR_LINK?success_url=https://onboarding.elevaris.app",
}

// Base pricing tiers (can be customized per industry)
export function getBasePricingTiers(customization?: {
  industryName?: string
  launchServices?: string[]
  growthServices?: string[]
  acceleratorServices?: string[]
}): PricingTier[] {
  const industryName = customization?.industryName || "business"
  
  return [
    {
      name: "Launch",
      tagline: `Professional online presence for your ${industryName}.`,
      setupPrice: "$249",
      monthlyPrice: "$99",
      popular: false,
      included: customization?.launchServices || [
        `Custom ${industryName} website design`,
        "Service-focused landing pages",
        "Quote / contact forms",
        "Lead management CRM system",
        "Email notifications for new inquiries",
        "Service area map integration",
        "SSL certificate & hosting included",
        "Mobile-responsive design",
        "Basic local SEO optimization",
      ],
      notIncluded: [
        "Automated SMS follow-up",
        "Missed-call text-back system",
        "Review automation workflows",
        "Lead pipeline visualization",
      ],
      cta: "Launch My Website",
      stripeUrl: STRIPE_CHECKOUT_URLS.launch,
    },
    {
      name: "Growth",
      tagline: `Convert more leads into paying clients automatically.`,
      setupPrice: "$549",
      monthlyPrice: "$149",
      popular: true,
      included: customization?.growthServices || [
        "Everything in Launch",
        "Automated lead follow-up (SMS + email)",
        "Missed-call instant text-back",
        "Visual lead pipeline tracking",
        "Post-service Google review automation",
        "Unified inbox (SMS, email, web leads)",
        "Mobile app for business management",
        "Client tagging & segmentation",
        "Unlimited website content updates",
        "24/7 system monitoring",
        "Live chat widget for instant inquiries",
        "Automated follow-up sequences",
      ],
      notIncluded: [
        "Custom estimate calculator",
        "Advanced campaign automation",
      ],
      cta: "Choose Growth",
      stripeUrl: STRIPE_CHECKOUT_URLS.growth,
    },
    {
      name: "Accelerator",
      tagline: `Scale your ${industryName} with advanced automation.`,
      setupPrice: "$999",
      monthlyPrice: "$299",
      popular: false,
      included: customization?.acceleratorServices || [
        "Everything in Growth",
        "Automated estimate calculator",
        "Smart follow-up sequences by service type",
        "Advanced campaign automation",
        "Client reactivation workflows",
        "Priority 24/7 support",
        "Monthly performance & ROI reports",
        "Online booking & scheduling portal",
        "Advanced review filtering & responses",
        "Multi-location service management",
      ],
      notIncluded: [],
      cta: "Choose Accelerator",
      stripeUrl: STRIPE_CHECKOUT_URLS.accelerator,
    },
  ]
}
