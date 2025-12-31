"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Container } from "@/components/site/Container"
import { SectionHeading } from "@/components/site/SectionHeading"
import { GlowCard } from "@/components/brand/GlowCard"

interface Testimonial {
  quote: string
  name: string
  role: string
}

interface TestimonialsProps {
  testimonials: Testimonial[]
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [slidesToShow, setSlidesToShow] = useState(3)
  const [cardWidth, setCardWidth] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const GAP_PX = 24 // Fixed gap between cards

  useEffect(() => {
    const updateSizes = () => {
      setSlidesToShow(3)
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth
        const calculatedWidth = (containerWidth - (slidesToShow - 1) * GAP_PX) / slidesToShow
        setCardWidth(calculatedWidth)
      }
    }

    updateSizes()
    window.addEventListener("resize", updateSizes)
    return () => window.removeEventListener("resize", updateSizes)
  }, [slidesToShow])

  const maxIndex = Math.max(0, testimonials.length - slidesToShow)

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }, [maxIndex])

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }, [maxIndex])

  useEffect(() => {
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [next])

  // Calculate number of dots based on slides
  const totalDots = Math.ceil(testimonials.length / slidesToShow)

  // Calculate offset in pixels
  const offsetPx = cardWidth !== null ? -(currentIndex * (cardWidth + GAP_PX)) : 0

  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          title="What Our Clients Say About Us"
          highlightWord="Clients"
        />

        <div className="relative">
          {/* Carousel */}
          <div className="overflow-hidden w-full" ref={containerRef}>
            <motion.div
              className="flex"
              style={{ gap: `${GAP_PX}px` }}
              animate={{ x: cardWidth !== null ? `${offsetPx}px` : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-shrink-0"
                  style={{ width: cardWidth !== null ? `${cardWidth}px` : '33.333%' }}
                >
                  <GlowCard
                    hover={false}
                    className="h-full min-h-[240px] flex flex-col rounded-2xl border border-white/8 bg-[radial-gradient(circle_at_20%_20%,rgba(255,106,85,0.12),transparent_36%),radial-gradient(circle_at_80%_0%,rgba(123,99,255,0.12),transparent_40%),linear-gradient(160deg,#151016_0%,#0d0a0d_100%)] shadow-[0_14px_32px_rgba(0,0,0,0.28)]"
                  >
                    <div className="h-0.5 w-full rounded-full bg-gradient-to-r from-primary via-purple-400/60 to-primary/70 opacity-70" />
                    <div className="mb-4 mt-3 flex-grow">
                      <p className="mb-3 text-sm text-foreground-secondary leading-relaxed">
                        "{testimonial.quote}"
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-1">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full overflow-hidden bg-primary/30 flex-shrink-0 border border-white/10">
                          <img
                            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&w=120&h=120&q=80"
                            alt={testimonial.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {testimonial.name}
                          </p>
                          <p className="text-xs text-foreground-muted">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className="h-4 w-4 fill-primary text-primary"
                            />
                          ))}
                        </div>
                        <p className="text-xs text-foreground-muted whitespace-nowrap">
                          5-star rating
                        </p>
                      </div>
                    </div>
                  </GlowCard>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/30 bg-background-soft text-primary transition-all hover:border-primary/50 hover:bg-primary/10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2 items-center">
              {Array.from({ length: totalDots }).map((_, index) => {
                const isActive = Math.floor(currentIndex / slidesToShow) === index
                return (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index * slidesToShow)}
                    className={`h-2 rounded-full transition-all ${
                      isActive
                        ? "w-8 bg-primary"
                        : "w-2 bg-primary/30"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                )
              })}
            </div>

            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/30 bg-background-soft text-primary transition-all hover:border-primary/50 hover:bg-primary/10"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}
