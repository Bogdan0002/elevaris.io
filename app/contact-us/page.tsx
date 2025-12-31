import { PageLayout } from "@/components/site/PageLayout"
import { ContactSection } from "@/components/home/ContactSection"

const contactData = {
  title: "We're Here to Turn Your Ideas into Digital Reality",
  highlight: "Digital Reality",
  text: "We'll listen to your goals, understand your needs, and craft a digital solution tailored to your business. Fill out the form or schedule a call, and let's start building a website that truly represents your brand.",
  submit: "SUBMIT",
}

export default function ContactUsPage() {
  return (
    <PageLayout title="Contact Us" subtitle="Get in touch with our team">
      <ContactSection {...contactData} />
    </PageLayout>
  )
}

