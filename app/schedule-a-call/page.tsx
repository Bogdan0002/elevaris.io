import { PageLayout } from "@/components/site/PageLayout"
import { Container } from "@/components/site/Container"
import { GlowCard } from "@/components/brand/GlowCard"
import { GlowButton } from "@/components/brand/GlowButton"

export default function ScheduleACallPage() {
  return (
    <PageLayout
      title="Schedule a Call"
      subtitle="Let's discuss your project and see how we can help"
    >
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-2xl">
            <GlowCard>
              <div className="space-y-6 text-center">
                <h2 className="text-2xl font-semibold">
                  Book a Consultation
                </h2>
                <p className="text-foreground-secondary">
                  Schedule a call with our team to discuss your project needs
                  and learn how we can help bring your vision to life.
                </p>
                <div className="pt-4">
                  <GlowButton variant="primary" href="/contact-us">
                    Contact Us Instead
                  </GlowButton>
                </div>
              </div>
            </GlowCard>
          </div>
        </Container>
      </section>
    </PageLayout>
  )
}

