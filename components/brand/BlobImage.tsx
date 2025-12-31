import { cn } from "@/lib/utils"
import Image from "next/image"
import { CSSProperties } from "react"

interface BlobImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  blobStyle?: "oval" | "circle" | "organic"
}

const blobMasks: Record<string, CSSProperties> = {
  oval: {
    clipPath: "ellipse(60% 80% at 50% 50%)",
  },
  circle: {
    clipPath: "circle(50% at 50% 50%)",
  },
  organic: {
    clipPath:
      "path('M 30% 0% Q 0% 20%, 0% 50% Q 0% 80%, 30% 100% Q 60% 100%, 100% 80% Q 100% 50%, 70% 20% Q 50% 0%, 30% 0%')",
  },
}

export function BlobImage({
  src,
  alt,
  width = 600,
  height = 600,
  className,
  blobStyle = "oval",
}: BlobImageProps) {
  const maskStyle = blobMasks[blobStyle]
  
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        className
      )}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        ...maskStyle,
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="h-full w-full object-cover"
      />
      {/* Glow border overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-full border-2 border-primary/45 shadow-glow"
        style={maskStyle}
      />
    </div>
  )
}

