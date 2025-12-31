"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { Container } from "@/components/site/Container"
import { SectionHeading } from "@/components/site/SectionHeading"
import { GlowingEffect } from "@/components/ui/glowing-effect"

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

  const GAP_PX = 24

  useEffect(() => {
    const updateSizes = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1)
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2)
      } else {
        setSlidesToShow(3)
      }
      
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

  const totalDots = Math.ceil(testimonials.length / slidesToShow)
  const offsetPx = cardWidth !== null ? -(currentIndex * (cardWidth + GAP_PX)) : 0

  return (
    <section className="py-20 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(123,99,255,0.04),transparent_60%)] pointer-events-none" />
      
      <Container>
        <SectionHeading
          overline="TESTIMONIALS"
          title="What Our Clients Say"
          highlightWord="Clients"
          subtitle="Real feedback from businesses we've helped grow."
        />

        <div className="relative mt-12">
          {/* Carousel */}
          <div className="overflow-hidden w-full" ref={containerRef}>
            <motion.div
              className="flex"
              style={{ gap: `${GAP_PX}px` }}
              animate={{ x: cardWidth !== null ? `${offsetPx}px` : 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0"
                  style={{ width: cardWidth !== null ? `${cardWidth}px` : '33.333%' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <TestimonialCard testimonial={testimonial} />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Controls */}
          <div className="mt-10 flex items-center justify-center gap-3">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.08] text-foreground-secondary transition-all duration-200 hover:bg-white/[0.06] hover:border-white/[0.15] hover:text-foreground active:scale-95"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Dots */}
            <div className="flex gap-1.5 items-center px-2">
              {Array.from({ length: totalDots }).map((_, index) => {
                const isActive = Math.floor(currentIndex / slidesToShow) === index
                return (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index * slidesToShow)}
                    className={`h-1.5 rounded-full transition-all duration-200 ${
                      isActive
                        ? "w-6 bg-primary"
                        : "w-1.5 bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                )
              })}
            </div>

            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.08] text-foreground-secondary transition-all duration-200 hover:bg-white/[0.06] hover:border-white/[0.15] hover:text-foreground active:scale-95"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="relative h-full group">
      {/* Glowing effect */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <GlowingEffect
          spread={30}
          glow={true}
          disabled={false}
          proximity={50}
          inactiveZone={0.01}
          borderWidth={1}
          className="rounded-2xl"
        />
      </div>
      
      <div className="relative h-full min-h-[280px] flex flex-col rounded-2xl border border-white/10 bg-[linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] p-6 transition-all duration-300 hover:border-white/20">
        {/* Quote icon */}
        <div className="mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-[#7b63ff]/20 flex items-center justify-center">
            <Quote className="w-5 h-5 text-primary" />
          </div>
        </div>
        
        {/* Quote text */}
        <p className="flex-grow text-sm sm:text-base text-foreground-secondary leading-relaxed mb-6">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
        
        {/* Author info */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="h-10 w-10 rounded-full overflow-hidden bg-gradient-to-br from-primary/30 to-[#7b63ff]/30 flex items-center justify-center border border-white/10">
              <span className="text-sm font-semibold text-white">
                {testimonial.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {testimonial.name}
              </p>
              <p className="text-xs text-foreground-secondary">
                {testimonial.role}
              </p>
            </div>
          </div>
          
          {/* Stars */}
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className="h-4 w-4 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
