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
  { label: "Cleaning Growth", href: "/cleaning" },
  { label: "Contact Us", href: "/contact-us" },
]

export const ctaButton = {
  label: "Schedule a Call",
  href: "/schedule-a-call",
}

