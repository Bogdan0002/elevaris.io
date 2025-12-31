import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface SectionHeadingProps {
  overline?: string
  title: string
  subtitle?: string
  highlightWord?: string
  className?: string
}

export function SectionHeading({
  overline,
  title,
  subtitle,
  highlightWord,
  className,
}: SectionHeadingProps) {
  const titleParts = highlightWord
    ? title.split(new RegExp(`(${highlightWord})`, "gi"))
    : [title]

  return (
    <div className={cn("mb-12 text-center", className)}>
      {overline && (
        <div className="mb-4 flex items-center justify-center gap-2">
          <div className="h-[1px] w-8 bg-primary" />
          <span className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">
            {overline}
          </span>
          <div className="h-[1px] w-8 bg-primary" />
        </div>
      )}
      <h2 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
        {highlightWord ? (
          <>
            {titleParts.map((part, index) =>
              part.toLowerCase() === highlightWord.toLowerCase() ? (
                <span key={index} className="text-highlight-accent">
                  {part}
                </span>
              ) : (
                <span key={index}>{part}</span>
              )
            )}
          </>
        ) : (
          title
        )}
      </h2>
      {subtitle && (
        <p className="mx-auto max-w-2xl text-base text-foreground-secondary sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  )
}

