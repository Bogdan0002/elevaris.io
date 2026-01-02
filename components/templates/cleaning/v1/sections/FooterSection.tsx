'use client'

import { Container } from '@/components/site/Container'

interface FooterSectionProps {
  config: {
    business: { name: string; city: string; phone: string }
  }
}

export function FooterSection({ config }: FooterSectionProps) {
  return (
    <footer className="py-12 border-t border-white/10">
      <Container>
        <div className="text-center space-y-4">
          <p className="text-lg font-semibold text-foreground">
            {config.business.name}
          </p>
          <p className="text-foreground-secondary">
            Serving {config.business.city} and surrounding areas
          </p>
          <a
            href={`tel:${config.business.phone.replace(/\s/g, '')}`}
            className="text-primary hover:underline"
          >
            {config.business.phone}
          </a>
        </div>
      </Container>
    </footer>
  )
}

