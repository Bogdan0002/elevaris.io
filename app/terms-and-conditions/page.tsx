import { PageLayout } from "@/components/site/PageLayout"
import { Container } from "@/components/site/Container"
import { GlowCard } from "@/components/brand/GlowCard"

export default function TermsAndConditionsPage() {
  return (
    <PageLayout
      title="Terms and Conditions"
      subtitle="Terms of service for Elevaris Web Solutions"
    >
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <GlowCard>
              <div className="prose prose-invert max-w-none space-y-4">
                <h2 className="text-2xl font-semibold">Terms and Conditions</h2>
                <p className="text-foreground-secondary">
                  By using Elevaris Web Solutions services, you agree to be
                  bound by these terms and conditions.
                </p>
                <h3 className="text-xl font-semibold">Service Agreement</h3>
                <p className="text-foreground-secondary">
                  Our services are provided on a subscription basis. You agree
                  to pay the monthly subscription fee as outlined in your
                  service agreement.
                </p>
                <h3 className="text-xl font-semibold">Intellectual Property</h3>
                <p className="text-foreground-secondary">
                  All content, designs, and materials created by Elevaris remain
                  the property of Elevaris until full payment is received.
                </p>
                <h3 className="text-xl font-semibold">Contact Us</h3>
                <p className="text-foreground-secondary">
                  If you have questions about these terms, please contact us at
                  info@elevaris.app
                </p>
              </div>
            </GlowCard>
          </div>
        </Container>
      </section>
    </PageLayout>
  )
}

