"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Container } from "@/components/site/Container"
import { SectionHeading } from "@/components/site/SectionHeading"
import { GlowButton } from "@/components/brand/GlowButton"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { cn } from "@/lib/utils"

interface ProcessStep {
  num: number
  title: string
  text: string
  bullets: string[]
}

interface ProcessTimelineProps {
  process: ProcessStep[]
}

export function ProcessTimeline({ process }: ProcessTimelineProps) {
  const [activeStep, setActiveStep] = useState(0)

  // Keep a stable ref array for observing
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const timelineFillRef = useRef<HTMLDivElement>(null)
  const lastScrollY = useRef(0)

  // Use refs to avoid stale state inside observer
  const activeStepRef = useRef(0)
  const visibleStepsRef = useRef<Set<number>>(new Set())

  const totalSteps = process.length

  const clampStep = (n: number) => {
    if (totalSteps <= 0) return 0
    return Math.max(0, Math.min(totalSteps - 1, n))
  }

  const setActive = (next: number) => {
    const clamped = clampStep(next)
    activeStepRef.current = clamped
    setActiveStep(clamped)

    const timelineFill = timelineFillRef.current
    if (timelineFill) {
      const raw = totalSteps > 0 ? ((clamped + 1) / totalSteps) * 100 : 0
      const fillPercentage = Math.min(100, raw) // reach full height on last step
      timelineFill.style.height = `${fillPercentage}%`
    }
  }

  useEffect(() => {
    if (!totalSteps) return

    // Initialize
    setActive(0)

    const observerOptions: IntersectionObserverInit = {
      threshold: 0.5,
      rootMargin: "0px 0px -30% 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      const scrollingDown = window.scrollY > lastScrollY.current
      lastScrollY.current = window.scrollY

      // Update visible set based on entries
      const visible = visibleStepsRef.current

      for (const entry of entries) {
        const idxStr = (entry.target as HTMLElement).dataset.index
        const index = idxStr ? parseInt(idxStr, 10) : 0

        if (entry.isIntersecting) {
          visible.add(index)
          ;(entry.target as HTMLElement).classList.add("animate")
        } else {
          visible.delete(index)
        }
      }

      // Determine target active step
      let nextActive = activeStepRef.current
      if (visible.size > 0) {
        const maxVisible = Math.max(...Array.from(visible))
        nextActive = scrollingDown ? Math.max(activeStepRef.current, maxVisible) : maxVisible
      }

      if (nextActive !== activeStepRef.current) {
        setActive(nextActive)
      } else {
        // still update fill in case layout changed (rare)
        const timelineFill = timelineFillRef.current
        if (timelineFill) {
          const fillPercentage = totalSteps > 0 ? ((activeStepRef.current + 1) / totalSteps) * 100 : 0
          timelineFill.style.height = `${Math.min(100, fillPercentage)}%`
        }
      }
    }, observerOptions)

    // Observe all steps
    stepRefs.current.forEach((el) => el && observer.observe(el))

    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalSteps])

  const arrowActive = activeStep >= totalSteps - 1

  return (
    <section className="process-section pt-20 pb-6 lg:pb-10">
      <Container>
        <SectionHeading title="Our Process" highlightWord="Process" />

        <div className="process-container relative mt-10 pb-[180px] lg:pb-[280px]">
          {/* Timeline rail (desktop) */}
          <div className="timeline absolute left-1/2 top-0 hidden -translate-x-1/2 lg:block" style={{ bottom: "420px" }}>
            <div className="timeline-rail absolute left-1/2 top-0 h-full w-[3px] -translate-x-1/2 rounded-full bg-white/12" />
            <div
              ref={timelineFillRef}
              className="timeline-fill absolute left-1/2 top-0 w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#ff6a55] via-[#7b63ff] to-[#3d52d5] transition-[height] duration-700 ease-out shadow-[0_0_12px_rgba(255,106,85,0.6)]"
              style={{ height: "0%" }}
            />
          </div>

          {/* Mobile timeline rail - REMOVED */}

          {/* Steps */}
          <div className="space-y-10 lg:space-y-14">
            {process.map((step, index) => {
              const side: "left" | "right" = index % 2 === 0 ? "left" : "right"
              const isDoneOrActive = index <= activeStep

              return (
                <div
                  key={`${step.num}-${step.title}`}
                  ref={(el) => {
                    stepRefs.current[index] = el
                  }}
                  className={cn(
                    "process-step relative flex items-center opacity-0",
                    "min-h-[140px]"
                  )}
                  data-index={index}
                  data-side={side}
                >
                  {/* Step number */}
                  <div
                    className={cn(
                      "step-number absolute z-20 flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold transition-all duration-500",
                      "left-4 lg:left-1/2 lg:-translate-x-1/2",
                      isDoneOrActive
                        ? "bg-gradient-to-br from-[#ff6a55] to-[#7b63ff] text-white shadow-[0_0_24px_rgba(255,106,85,0.6)]"
                        : "bg-white/10 text-white/60"
                    )}
                  >
                    {step.num}
                  </div>

                  {/* Connector (desktop only) */}
                  <div
                    className={cn(
                      "connector absolute top-1/2 hidden h-[2px] -translate-y-1/2 lg:block",
                      side === "left"
                        ? "left-[50%] -translate-x-[calc(100%+40px)]"
                        : "left-[50%] translate-x-[40px]"
                    )}
                  >
                    <div
                      className={cn(
                        "connector-line relative h-[2px] w-[70px] rounded-full transition-all duration-400",
                        isDoneOrActive ? "bg-gradient-to-r from-[#ff6a55] to-[#7b63ff] shadow-[0_0_12px_rgba(255,106,85,0.5)]" : "bg-white/18"
                      )}
                    >
                      {/* Dot at card side */}
                      <span
                        className={cn(
                          "absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full",
                          side === "left" ? "right-0 translate-x-[4px]" : "left-0 -translate-x-[4px]",
                          isDoneOrActive ? "bg-gradient-to-br from-[#ff6a55] to-[#7b63ff] shadow-[0_0_12px_rgba(255,106,85,0.7)]" : "bg-white/70 shadow-none"
                        )}
                      />
                    </div>
                  </div>

                  {/* Content card */}
                  <div
                    className={cn(
                      "step-content relative ml-[76px] w-full rounded-2xl p-6 backdrop-blur-[18px] transition-all duration-300",
                      "bg-[radial-gradient(circle_at_20%_20%,rgba(255,106,85,0.12),transparent_38%),radial-gradient(circle_at_80%_0%,rgba(123,99,255,0.12),transparent_40%),linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] border border-white/10 shadow-[0_18px_40px_rgba(0,0,0,0.3)]",
                      "lg:ml-0 lg:p-7 lg:w-[min(470px,42vw)]",
                      side === "left"
                        ? "lg:mr-[calc(50%+120px)] lg:ml-auto"
                        : "lg:ml-[calc(50%+120px)]"
                    )}
                  >
                    <GlowingEffect
                      spread={30}
                      glow={true}
                      disabled={false}
                      proximity={50}
                      inactiveZone={0.01}
                      borderWidth={1}
                      className="rounded-2xl"
                    />
                    <h3 className="step-title mb-3 text-xl font-semibold text-white">
                      {step.title}
                    </h3>

                    <p className="step-description mb-4 text-sm leading-relaxed text-white/85">
                      {step.text}
                    </p>

                    <ul className="step-details mt-4 list-none space-y-1.5 text-sm text-white/85">
                      {step.bullets.map((bullet, i) => (
                        <li key={i} className="relative pl-5">
                          <span className="absolute left-0 font-bold text-[#FE6F61]">►</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Final arrow (desktop) */}
          <div className="timeline-end pointer-events-none absolute left-1/2 hidden -translate-x-1/2 lg:block" style={{ bottom: "400px" }}>
            <div
              className={cn(
                "timeline-arrow relative transition-all duration-500",
                arrowActive
                  ? "drop-shadow-[0_0_12px_rgba(255,106,85,0.6)]"
                  : ""
              )}
            >
              {arrowActive ? (
                <div 
                  className="w-[24px] h-[18px]"
                  style={{
                    background: "linear-gradient(180deg, #ff6a55 0%, #7b63ff 100%)",
                    clipPath: "polygon(50% 100%, 0% 0%, 100% 0%)"
                  }}
                />
              ) : (
                <div 
                  className="w-0 h-0"
                  style={{
                    borderLeft: "12px solid transparent",
                    borderRight: "12px solid transparent",
                    borderTop: "18px solid rgba(255,255,255,0.2)"
                  }}
                />
              )}
            </div>
          </div>

          {/* CTA */}
          <div className="process-button-container mt-8 lg:mt-10 flex justify-center">
            <GlowButton
              variant="secondary"
              size="lg"
              href="/contact-us"
            >
              Start a Project →
            </GlowButton>
          </div>
        </div>
      </Container>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .process-step.animate {
          animation: fadeInUp 0.7s ease-out forwards;
        }

        /* stagger for first few (looks premium) */
        .process-step[data-index="0"].animate {
          animation-delay: 0.05s;
        }
        .process-step[data-index="1"].animate {
          animation-delay: 0.12s;
        }
        .process-step[data-index="2"].animate {
          animation-delay: 0.18s;
        }
        .process-step[data-index="3"].animate {
          animation-delay: 0.24s;
        }

        /* Mobile tweaks */
        @media (max-width: 1024px) {
          .timeline-end {
            display: none;
          }
          .process-step {
            padding-left: 0;
          }
        }

        @media (max-width: 768px) {
          .process-step {
            align-items: flex-start;
          }
          .step-number {
            left: 12px !important;
            transform: none !important;
            width: 42px;
            height: 42px;
            font-size: 1.05rem;
          }
          .step-content {
            margin-left: 76px !important;
            width: calc(100% - 76px) !important;
            padding: 22px;
          }
        }
      `}</style>
    </section>
  )
}
