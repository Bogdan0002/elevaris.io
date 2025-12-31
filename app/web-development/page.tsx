import { PageLayout } from "@/components/site/PageLayout"
import { Container } from "@/components/site/Container"
import { GlowCard } from "@/components/brand/GlowCard"

export default function WebDevelopmentPage() {
  return (
    <PageLayout
      title="Web Development"
      subtitle="Build fast, secure, and scalable websites using cutting-edge technologies and industry best practices."
    >
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-3xl space-y-6">
            <GlowCard>
              <h2 className="mb-4 text-2xl font-semibold">Our Development Approach</h2>
              <p className="text-foreground-secondary">
                We build modern, responsive websites that perform flawlessly
                across all devices. Our development process ensures clean code,
                fast loading times, and excellent user experience.
              </p>
            </GlowCard>
          </div>
        </Container>
      </section>
    </PageLayout>
  )
}

