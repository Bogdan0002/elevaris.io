import { PageLayout } from "@/components/site/PageLayout"
import { Container } from "@/components/site/Container"
import { GlowCard } from "@/components/brand/GlowCard"

export default function SEOStrategiesPage() {
  return (
    <PageLayout
      title="SEO Strategies"
      subtitle="Boost your online visibility and drive organic traffic with data-driven SEO strategies that deliver results."
    >
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-3xl space-y-6">
            <GlowCard>
              <h2 className="mb-4 text-2xl font-semibold">Our SEO Services</h2>
              <p className="text-foreground-secondary">
                We help businesses improve their search engine rankings through
                comprehensive keyword research, technical optimization, and
                content strategy development.
              </p>
            </GlowCard>
          </div>
        </Container>
      </section>
    </PageLayout>
  )
}

