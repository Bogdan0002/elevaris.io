"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useState, useRef } from "react"
import Link from "next/link"
import { Container } from "@/components/site/Container"
import { SectionHeading } from "@/components/site/SectionHeading"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { ExternalLink } from "lucide-react"

interface WorkItem {
  title: string
  description?: string
  url?: string
  imageUrl?: string
  tags?: string[]
  layout?: "horizontal" | "vertical"
}

interface WorkProps {
  work: WorkItem[]
}

export function Work({ work }: WorkProps) {
  // Separate horizontal and vertical items
  const horizontalItems = work.filter(item => item.layout !== "vertical")
  const verticalItem = work.find(item => item.layout === "vertical")

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,106,85,0.04),transparent_60%)] pointer-events-none" />
      
      <Container>
        <SectionHeading
          title="A Showcase of Our Projects"
          highlightWord="Projects"
        />

        {/* 2+1 Layout: Two horizontal on left, one vertical on right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Left column - two stacked horizontal cards */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {horizontalItems.map((item, index) => (
              <ProjectCard 
                key={item.title} 
                item={item} 
                index={index}
                variant="horizontal"
              />
            ))}
          </div>

          {/* Right column - one tall vertical card */}
          {verticalItem && (
            <div className="lg:col-span-1">
              <ProjectCard 
                item={verticalItem} 
                index={2}
                variant="vertical"
              />
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}

function ProjectCard({ 
  item, 
  index, 
  variant = "horizontal"
}: { 
  item: WorkItem
  index: number
  variant?: "horizontal" | "vertical"
}) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  
  // Mouse position for 3D tilt effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 150 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }

  const isVertical = variant === "vertical"

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative ${isVertical ? 'h-full' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
      }}
    >
      <motion.div
        className={`relative w-full ${isVertical ? 'h-full min-h-[400px] lg:min-h-full' : ''}`}
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Glowing effect wrapper */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <GlowingEffect
            spread={40}
            glow={true}
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
            borderWidth={2}
            className="rounded-2xl"
          />
        </div>

        {/* Card content */}
        <div className={`group relative w-full overflow-hidden rounded-2xl bg-[linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] ${
          isVertical 
            ? 'h-full min-h-[400px] lg:min-h-0 lg:h-full aspect-auto lg:aspect-auto' 
            : 'aspect-[16/10] sm:aspect-[2/1] lg:aspect-[2.5/1]'
        }`}
        style={isVertical ? { height: '100%' } : undefined}
        >
          {/* Image */}
          {item.imageUrl ? (
            <motion.img
              src={item.imageUrl}
              alt={item.title}
              className={`absolute inset-0 w-full h-full ${isVertical ? 'object-contain sm:object-cover object-top bg-[#0f0b0e]' : 'object-cover object-top'}`}
              animate={{
                scale: isHovered ? 1.02 : 1,
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1318] to-[#0f0b0e] flex items-center justify-center">
              <span className="text-foreground-secondary/50 text-sm">Project Image</span>
            </div>
          )}

          {/* Gradient overlays - darker by default for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 opacity-75 group-hover:opacity-90 transition-opacity duration-500" />
          
          {/* Dark overlay on hover for better text contrast */}
          <motion.div 
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Brand gradient overlay on hover */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-[#ff6a55]/20 via-transparent to-[#7b63ff]/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* Content */}
          <div className={`absolute inset-0 p-5 sm:p-6 flex flex-col ${isVertical ? 'justify-end' : 'justify-end'}`}>
            {/* Tags */}
            {item.tags && item.tags.length > 0 && (
              <motion.div
                className="flex flex-wrap gap-2 mb-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                transition={{ duration: 0.3 }}
              >
                {item.tags.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-white/10 backdrop-blur-md border border-white/20 rounded-md text-white/90"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            )}

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight mb-2">
              {item.title}
            </h3>

            {/* Description - only show on hover */}
            {item.description && (
              <motion.p
                className="text-sm text-white/70 leading-relaxed line-clamp-2 mb-3"
                initial={{ opacity: 0, height: 0 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0,
                  height: isHovered ? "auto" : 0
                }}
                transition={{ duration: 0.3 }}
              >
                {item.description}
              </motion.p>
            )}

            {/* CTA Button */}
            {item.url && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? 0 : 10
                }}
                transition={{ duration: 0.3, delay: 0.05 }}
              >
                <Link
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-white/30 rounded-lg text-xs font-semibold text-white transition-all duration-300 group/btn"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>Visit Site</span>
                  <ExternalLink className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </Link>
              </motion.div>
            )}
          </div>

          {/* Shine sweep effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)",
              transform: "translateX(-100%)",
            }}
            animate={isHovered ? {
              transform: ["translateX(-100%)", "translateX(100%)"],
            } : {}}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
