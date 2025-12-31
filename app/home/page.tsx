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

const workData = [
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
      "Our website traffic doubled within the first month, and the centralized CRM makes managing leads so much easier. This service has been a game-changer for our small business!",
    name: "Jane Doe",
    role: "Marketing Manager",
  },
  {
    quote:
      "The team's expertise in digital marketing helped us reach our target audience more effectively. We've seen a 200% increase in qualified leads since partnering with them.",
    name: "John Smith",
    role: "CEO, Startup",
  },
  {
    quote:
      "Professional, reliable, and results-driven. They transformed our outdated website into a modern, conversion-focused platform that our customers love.",
    name: "Emily Johnson",
    role: "Product Designer",
  },
  {
    quote:
      "Their attention to detail and customer service is exceptional. They didn't just build us a website, they built us a complete digital presence that drives real business results.",
    name: "Michael Brown",
    role: "Restaurant Owner",
  },
  {
    quote:
      "Working with Elevaris was seamless from start to finish. They understood our vision and delivered beyond our expectations. Our new website has significantly improved our online presence and customer engagement.",
    name: "Sarah Williams",
    role: "E-commerce Director",
  },
  {
    quote:
      "The SEO improvements they implemented have been remarkable. We're now ranking on the first page for our key terms, and organic traffic has increased by 150%. Highly recommend their services!",
    name: "David Chen",
    role: "Founder, Tech Startup",
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

      <SectionMotion direction="up" delay={0.05}>
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

