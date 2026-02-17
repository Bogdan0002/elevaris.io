export interface NavLink {
  label: string
  href?: string
  children?: NavLink[]
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/home" },
  {
    label: "Services",
    children: [
      { label: "UX/UI Design", href: "/ux-ui-design" },
      { label: "Web Development", href: "/web-development" },
      { label: "SEO Strategies", href: "/seo-strategies" },
      { label: "Ongoing Support", href: "/ongoing-support" },
      { label: "Advertising", href: "/advertising" },
    ],
  },
  {
    label: "Industries",
    children: [
      { label: "Car Detailing", href: "/car-detailing" },
      { label: "Cleaning Services", href: "/cleaning" },
      { label: "Construction", href: "/construction" },
      { label: "HVAC Services", href: "/hvac" },
      { label: "Landscaping", href: "/landscaping" },
      { label: "PMU Artists", href: "/pmu-artists" },
      { label: "Pool Cleaning", href: "/pool-cleaning" },
      { label: "Roofing", href: "/roofing" },
    ],
  },
  { label: "Contact Us", href: "/contact-us" },
]

export const ctaButton = {
  label: "Schedule a Call",
  href: "/schedule-a-call",
}


