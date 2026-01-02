import { Hero } from "@/components/home/Hero"
import { Services } from "@/components/home/Services"
import { Work } from "@/components/home/Work"
import { ProcessTimeline } from "@/components/home/ProcessTimeline"
import { About } from "@/components/home/About"
import { Testimonials } from "@/components/home/Testimonials"
import { ContactSection } from "@/components/home/ContactSection"
import { FAQ } from "@/components/home/FAQ"
import { SectionMotion } from "@/components/home/SectionMotion"
import { Footer } from "@/components/site/Footer"

// Data from the project specification
const heroData = {
  title: "Smart Digital Solutions for Growing Brands",
  highlight: "Digital Solutions",
  subtitle:
    "We help businesses grow online through powerful websites and smart advertising. Whether you're starting from scratch or need a refresh, we handle it all.",
  button: "Get Started →",
  floatingCards: [
    {
      title: "Stop Losing Leads",
      text: "Missed calls, slow replies, and forgotten follow-ups cost businesses money every day. Our system fixes that.",
    },
    {
      title: "One System. Everything Connected.",
      text: "Website, messages, reviews, and leads — centralized so nothing slips through the cracks.",
    },
    {
      title: "Grow Without Chaos",
      text: "More clients shouldn't mean more stress. Automation handles the busy work while you focus on delivery.",
    },
  ],
  badge: "100+ Satisfied Clients",
}

const servicesData = [
  {
    icon: "Code2",
    title: "Web Development",
    text: "Build fast, secure, and scalable websites using cutting-edge technologies and industry best practices. From modern frameworks to seamless optimization, we create digital experiences that perform.",
    bullets: [
      "Modern framework implementation",
      "Lightning-fast performance",
      "Secure & accessible coding",
      "Seamless device optimization",
    ],
    cta: "Learn More",
    href: "/web-development",
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
    isMain: true,
  },
  {
    icon: "PencilRuler",
    title: "UX/UI Design",
    text: "Transform your ideas into beautiful, user-centered interfaces that convert visitors into customers.",
    bullets: [
      "Intuitive user experience design",
      "Modern, responsive interfaces",
      "Brand-focused visual design",
      "Cross-device compatibility",
    ],
    cta: "Learn More",
    href: "/ux-ui-design",
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    icon: "Search",
    title: "SEO Strategies",
    text: "Boost your online visibility and drive organic traffic with data-driven SEO strategies that deliver results.",
    bullets: [
      "Comprehensive keyword research",
      "Technical SEO optimization",
      "Content strategy development",
      "Performance tracking & reporting",
    ],
    cta: "Learn More",
    href: "/seo-strategies",
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    icon: "Megaphone",
    title: "Paid Advertising",
    text: "Drive leads with conversion-focused campaigns across Meta, TikTok, and Google—built to amplify your growth.",
    bullets: [
      "Offer funnels & landing pages",
      "Conversion tracking setup",
      "Meta • TikTok • Google Ads ready",
      "Continuous testing & insights",
    ],
    cta: "Explore Ads",
    href: "/advertising",
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    icon: "LifeBuoy",
    title: "Ongoing Support",
    text: "Get continuous maintenance, updates, and expert support to keep your website running smoothly and growing with your business.",
    bullets: [
      "Regular updates & maintenance",
      "24/7 technical support",
      "Performance monitoring",
      "Security updates & backups",
    ],
    cta: "Learn More",
    href: "/ongoing-support",
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
]

const workData: Array<{
  title: string
  description?: string
  url?: string
  imageUrl?: string
  tags?: string[]
  layout?: "horizontal" | "vertical"
}> = [
  { 
    title: "In The Details Auto Spa",
    description: "Premium auto detailing website with service booking, gallery showcase, and modern design that reflects the brand's attention to detail.",
    url: "https://inthedetailsautospa.com",
    imageUrl: "/projects/inthedetailsautospa.jpg",
    tags: ["Web Design", "Local Business"],
    layout: "horizontal"
  },
  { 
    title: "Cann and Abel Renovations",
    description: "Professional website for a local construction company showcasing their renovation services, solar energy solutions, and project portfolio.",
    url: "https://cannandabelrenovation.com",
    imageUrl: "/projects/cannandabelrenovations.jpg",
    tags: ["Construction", "Local Business"],
    layout: "horizontal"
  },
  { 
    title: "Fit Apply",
    description: "AI-powered SaaS platform for creating ATS-optimized resumes and cover letters with professional templates and real-time scoring.",
    url: "https://fit-apply-ai.vercel.app",
    imageUrl: "/projects/fitapply-mobile.jpg",
    tags: ["SaaS", "AI", "Web App"],
    layout: "vertical"
  },
]

const processData = [
  {
    num: 1,
    title: "Discovery & Planning",
    text: "We analyze your goals, target audience, and structure the user journey for an effective website experience.",
    bullets: [
      "Consultation & project kickoff",
      "Business goals & target audience research",
      "Competitor & market analysis",
      "Site architecture & wireframing",
    ],
  },
  {
    num: 2,
    title: "Design & Prototyping",
    text: "We create stunning designs and prototypes that reflect your brand and engage users.",
    bullets: [
      "Visual concept development",
      "High-fidelity mockups",
      "Brand integration & style guide",
      "Feedback & iterations",
    ],
  },
  {
    num: 3,
    title: "Development & Testing",
    text: "We build a responsive, SEO-optimized website and test it across devices and browsers.",
    bullets: [
      "Clean, semantic coding",
      "Responsive implementation",
      "Cross-browser/device testing",
      "Performance optimization",
    ],
  },
  {
    num: 4,
    title: "Launch & Support",
    text: "We ensure a smooth launch and provide ongoing support to keep your website performing at its best.",
    bullets: [
      "Final QA & deployment",
      "Client training & documentation",
      "Analytics & monitoring setup",
      "Regular updates & maintenance",
    ],
  },
]

const aboutData = {
  title: "We're More Than a Team – We're Your Digital Allies",
  highlight: "Digital Allies",
  text: "We don't just deliver websites — we build meaningful, results-driven experiences tailored to your business. With a collaborative approach and a deep understanding of design and technology, we work as an extension of your team to bring your vision to life.",
  email: "info@elevaris.app",
  phone: "+1 855-532-7511",
}

const testimonialsData = [
  {
    quote:
      "We went from manually tracking everything in spreadsheets to having all our leads, messages, and follow-ups in one place. Game changer for our team. The automated responses alone save us 10+ hours a week.",
    name: "Michael Rodriguez",
    role: "Owner, Elite Detailing Co.",
  },
  {
    quote:
      "Best decision we made this year. The website looks professional, but what really impressed us was how easy it is to manage everything. We're booking more jobs and spending less time on admin work.",
    name: "Sarah Thompson",
    role: "Thompson Construction",
  },
  {
    quote:
      "Finally, a website that actually works for us. Clients can book consultations online, we get instant notifications, and nothing falls through the cracks anymore. Worth every penny.",
    name: "James Chen",
    role: "Chen & Associates",
  },
  {
    quote:
      "We were skeptical at first, but the results speak for themselves. More leads, faster follow-ups, and way better organization. The team made the whole process painless.",
    name: "Amanda Foster",
    role: "Foster Medical Group",
  },
  {
    quote:
      "The automated follow-up system is brilliant. We used to lose deals because we'd forget to follow up. Now it's all handled automatically, and we're closing more business as a result.",
    name: "Robert Martinez",
    role: "Martinez Real Estate",
  },
  {
    quote:
      "Simple, effective, and affordable. Our old website was just sitting there doing nothing. Now we're getting quality leads every week and the CRM makes it easy to convert them into customers.",
    name: "Emily Parker",
    role: "Parker's Home Services",
  },
]

const contactData = {
  title: "We're Here to Turn Your Ideas into Digital Reality",
  highlight: "Digital Reality",
  text: "We'll listen to your goals, understand your needs, and craft a digital solution tailored to your business. Fill out the form or schedule a call, and let's start building a website that truly represents your brand.",
  submit: "SUBMIT",
}

const faqData = [
  {
    q: "What makes Elevaris different from traditional web design agencies?",
    a: "Most agencies build websites.\n\nElevaris builds complete growth systems — where your website, lead capture, follow-ups, reviews, and client management all work together. The goal isn't just design, it's helping businesses capture more opportunities and manage them efficiently.",
  },
  {
    q: "How long does it take to launch my system?",
    a: "Most systems go live within 3–7 business days.\n\nWe use proven structures and workflows that are customized to your business, allowing us to launch quickly without starting from scratch.",
  },
  {
    q: "I already have a website. Can you still help?",
    a: "Yes.\n\nIf your current website isn't connected to a proper follow-up or client management system, we can:\n\n• replace it, or\n• integrate it into our system\n\nWe'll recommend the best option during onboarding.",
  },
  {
    q: "Is this just a website or something more?",
    a: "It's much more than a website.\n\nYour website is only one part of a larger system designed to:\n\n• capture leads\n• respond automatically\n• centralize conversations\n• improve reviews and visibility\n• keep clients organized",
  },
  {
    q: "Do I need technical skills to use the system?",
    a: "No.\n\nEverything is set up for you and can be managed from your phone or computer. Most users only interact with messages, notifications, and basic lead management — we handle the technical side.",
  },
  {
    q: "Can I upgrade or change my plan later?",
    a: "Yes.\n\nYou can upgrade, downgrade, or cancel anytime. There are no long-term contracts. As your business grows, you can unlock additional features when it makes sense.",
  },
  {
    q: "Do you customize the system for different businesses?",
    a: "Yes.\n\nWhile the core system remains the same, we customize:\n\n• messaging\n• workflows\n• lead flows\n• and automation logic\n\nto fit how your business operates.",
  },
  {
    q: "Do you offer marketing or advertising services as well?",
    a: "Advertising and advanced marketing services are available optionally, but they are not required to start.\n\nWe focus first on building a strong system foundation. Once that's in place, advertising becomes significantly more effective.",
  },
  {
    q: "What happens if I cancel?",
    a: "You can cancel anytime.\n\nIf you cancel:\n\n• hosting and automations are paused\n• your website files and client data can be exported upon request\n\nWe don't lock you into long-term contracts.",
  },
  {
    q: "Who is this system best suited for?",
    a: "This system works best for:\n\n• service-based businesses\n• local businesses\n• and companies that rely on inquiries, follow-ups, and reputation\n\nIt scales as your business grows.",
  },
  {
    q: "What's the next step to get started?",
    a: "Choose a plan below or book a quick call.\n\nWe'll confirm your business details, customize your system, and get everything live quickly.",
  },
]

const footerData = {
  aboutText:
    "Elevaris Web Solutions helps small businesses grow online with modern, personalized websites. Our team combines design, technology, and strategy to create user-friendly solutions backed by ongoing support.",
  quickLinks: [
    { label: "Home", href: "/home" },
    { label: "Contact Us", href: "/contact-us" },
    { label: "Schedule a Call", href: "/schedule-a-call" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms and Conditions", href: "/terms-and-conditions" },
  ],
  services: [
    { label: "UX/UI Design", href: "/ux-ui-design" },
    { label: "Web Development", href: "/web-development" },
    { label: "SEO Strategies", href: "/seo-strategies" },
    { label: "Advertising", href: "/advertising" },
    { label: "Ongoing Support", href: "/ongoing-support" },
    { label: "Cleaning Growth", href: "/cleaning" },
  ],
  contactTitle: "Contact US",
  email: "info@elevaris.app",
  phone: "+1 855-532-7511",
  copyright: "Copyright, Elevaris Web Solutions, 2025. All rights reserved.",
  credit: "Developed by ELEVARIS",
}

export default function HomePage() {
  return (
    <>
      <Hero {...heroData} />

      <SectionMotion direction="up">
        <Services services={servicesData} />
      </SectionMotion>

      <SectionMotion direction="right" delay={0.08}>
        <Work work={workData} />
      </SectionMotion>

      <SectionMotion direction="left" delay={0.08}>
        <ProcessTimeline process={processData} />
      </SectionMotion>

      <SectionMotion direction="up" delay={0.0}>
        <About {...aboutData} />
      </SectionMotion>

      <SectionMotion direction="right" delay={0.05}>
        <Testimonials testimonials={testimonialsData} />
      </SectionMotion>

      <SectionMotion direction="left">
        <ContactSection {...contactData} />
      </SectionMotion>

      <SectionMotion direction="up">
        <FAQ faq={faqData} />
      </SectionMotion>

      <Footer {...footerData} />
    </>
  )
}

