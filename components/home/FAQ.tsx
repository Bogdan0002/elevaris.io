"use client"

import { Container } from "@/components/site/Container"
import { SectionHeading } from "@/components/site/SectionHeading"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { GlowingEffect } from "@/components/ui/glowing-effect"

interface FAQItem {
  q: string
  a: string
}

interface FAQProps {
  faq: FAQItem[]
}

export function FAQ({ faq }: FAQProps) {
  const columns = [
    faq.filter((_, idx) => idx % 2 === 0),
    faq.filter((_, idx) => idx % 2 === 1),
  ]

  return (
    <section className="py-14">
      <Container>
        <SectionHeading
          title="Frequently Asked Questions"
          highlightWord="Questions"
          className="mb-6"
        />

        <div className="mx-auto max-w-6xl grid gap-4 lg:grid-cols-2">
          {columns.map((col, colIdx) => (
            <Accordion key={colIdx} type="single" collapsible className="space-y-3">
              {col.map((item, index) => (
                <AccordionItem
                  key={`${colIdx}-${index}`}
                  value={`item-${colIdx}-${index}`}
                  className="border-none group"
                >
                  <div className="relative rounded-2xl">
                    <GlowingEffect
                      spread={40}
                      glow={true}
                      disabled={false}
                      proximity={64}
                      inactiveZone={0.01}
                      borderWidth={2}
                      className="rounded-2xl"
                    />
                    <div className="relative rounded-2xl border border-white/8 bg-[#0f0d11]/80 backdrop-blur-lg shadow-[0_12px_30px_rgba(0,0,0,0.18)] px-4 py-3 transition duration-300 group-hover:shadow-[0_16px_36px_rgba(0,0,0,0.24)]">
                      <div className="relative z-10">
                        <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-foreground hover:no-underline gap-3">
                          <span className="inline-flex h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_rgba(255,106,85,0.6)] transition duration-300 group-hover:shadow-[0_0_14px_rgba(255,106,85,0.9)]" />
                          <span>{item.q}</span>
                        </AccordionTrigger>
                        <AccordionContent className="pt-2 pl-5 text-sm md:text-base text-foreground-secondary leading-relaxed">
                          <div className="whitespace-pre-line">{item.a}</div>
                        </AccordionContent>
                      </div>
                    </div>
                  </div>
                </AccordionItem>
              ))}
            </Accordion>
          ))}
        </div>

        {/* Optional micro-copy */}
        <div className="mt-10 text-center">
          <p className="text-sm text-foreground-secondary">
            Still have questions?{" "}
            <a
              href="/schedule-a-call"
              className="text-primary hover:text-primary/80 transition-colors underline"
            >
              Book a quick call
            </a>{" "}
            and we&apos;ll walk you through how the system works for your business.
          </p>
        </div>
      </Container>
    </section>
  )
}

