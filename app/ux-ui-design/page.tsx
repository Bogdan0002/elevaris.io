import { PageLayout } from "@/components/site/PageLayout"
import { Container } from "@/components/site/Container"
import { GlowCard } from "@/components/brand/GlowCard"

export default function UXUIDesignPage() {
  return (
    <PageLayout
      title="UX/UI Design"
      subtitle="Transform your ideas into beautiful, user-centered interfaces that convert visitors into customers."
    >
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-3xl space-y-6">
            <GlowCard>
              <h2 className="mb-4 text-2xl font-semibold">Our Design Process</h2>
              <p className="text-foreground-secondary">
                We create intuitive, modern interfaces that reflect your brand and
                engage users. Our design process focuses on user experience,
                accessibility, and conversion optimization.
              </p>
            </GlowCard>
          </div>
        </Container>
      </section>
    </PageLayout>
  )
}

