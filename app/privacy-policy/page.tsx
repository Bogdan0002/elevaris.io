import { PageLayout } from "@/components/site/PageLayout"
import { Container } from "@/components/site/Container"
import { GlowCard } from "@/components/brand/GlowCard"

export default function PrivacyPolicyPage() {
  return (
    <PageLayout title="Privacy Policy" subtitle="How we protect your information">
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <GlowCard>
              <div className="prose prose-invert max-w-none space-y-4">
                <h2 className="text-2xl font-semibold">Privacy Policy</h2>
                <p className="text-foreground-secondary">
                  This privacy policy describes how Elevaris Web Solutions
                  collects, uses, and protects your personal information when
                  you use our services.
                </p>
                <h3 className="text-xl font-semibold">Information We Collect</h3>
                <p className="text-foreground-secondary">
                  We collect information that you provide directly to us,
                  including your name, email address, phone number, and any
                  other information you choose to provide.
                </p>
                <h3 className="text-xl font-semibold">How We Use Your Information</h3>
                <p className="text-foreground-secondary">
                  We use the information we collect to provide, maintain, and
                  improve our services, communicate with you, and comply with
                  legal obligations.
                </p>
                <h3 className="text-xl font-semibold">Contact Us</h3>
                <p className="text-foreground-secondary">
                  If you have questions about this privacy policy, please
                  contact us at info@elevaris.app
                </p>
              </div>
            </GlowCard>
          </div>
        </Container>
      </section>
    </PageLayout>
  )
}

