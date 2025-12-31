import { PageLayout } from "@/components/site/PageLayout"
import { Container } from "@/components/site/Container"
import { GlowCard } from "@/components/brand/GlowCard"

export default function OngoingSupportPage() {
  return (
    <PageLayout
      title="Ongoing Support"
      subtitle="Keep your website running smoothly with proactive maintenance, security monitoring, and technical support."
    >
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-3xl space-y-6">
            <GlowCard>
              <h2 className="mb-4 text-2xl font-semibold">Support Services</h2>
              <p className="text-foreground-secondary">
                We provide comprehensive support to ensure your website remains
                secure, up-to-date, and performing at its best. Our team is
                always available to help with updates, troubleshooting, and
                improvements.
              </p>
            </GlowCard>
          </div>
        </Container>
      </section>
    </PageLayout>
  )
}

