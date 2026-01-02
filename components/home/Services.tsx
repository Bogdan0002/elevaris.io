"use client"

import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { Container } from "@/components/site/Container"
import { SectionHeading } from "@/components/site/SectionHeading"
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid"
import * as Icons from "lucide-react"

interface Service {
  icon: string
  title: string
  text: string
  bullets: string[]
  cta?: string
  href?: string
  className?: string
  isMain?: boolean
}

interface ServicesProps {
  services: Service[]
}

// Animated code visualization for Web Development card
function CodeVisualization() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,106,85,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,106,85,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
      </div>
      
      {/* Floating code blocks */}
      <div className="relative w-full max-w-[280px] space-y-3 p-4">
        {/* Code block 1 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-lg bg-zinc-900/80 backdrop-blur border border-white/10 p-3"
        >
          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-2 h-2 rounded-full bg-red-500/80" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
            <div className="w-2 h-2 rounded-full bg-green-500/80" />
          </div>
          <div className="space-y-1.5">
            <motion.div 
              className="h-2 rounded bg-primary/40 w-3/4"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div 
              className="h-2 rounded bg-[#7b63ff]/40 w-1/2 ml-4"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            />
            <motion.div 
              className="h-2 rounded bg-primary/40 w-2/3 ml-4"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
            />
            <motion.div 
              className="h-2 rounded bg-[#7b63ff]/40 w-1/3"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.9 }}
            />
          </div>
        </motion.div>

        {/* Floating metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex gap-2"
        >
          <div className="flex-1 rounded-lg bg-primary/10 border border-primary/20 p-2 text-center">
            <motion.p 
              className="text-lg font-bold text-primary"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              100
            </motion.p>
            <p className="text-[8px] text-white/50">Performance</p>
          </div>
          <div className="flex-1 rounded-lg bg-green-500/10 border border-green-500/20 p-2 text-center">
            <motion.p 
              className="text-lg font-bold text-green-400"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              A+
            </motion.p>
            <p className="text-[8px] text-white/50">Security</p>
          </div>
          <div className="flex-1 rounded-lg bg-[#7b63ff]/10 border border-[#7b63ff]/20 p-2 text-center">
            <motion.p 
              className="text-lg font-bold text-[#7b63ff]"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              99%
            </motion.p>
            <p className="text-[8px] text-white/50">Uptime</p>
          </div>
        </motion.div>

        {/* Deploy button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="rounded-lg bg-gradient-to-r from-primary to-[#7b63ff] p-[1px]"
        >
          <div className="rounded-lg bg-zinc-900/90 p-2 flex items-center justify-center gap-2">
            <motion.div
              className="w-2 h-2 rounded-full bg-green-500"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-xs font-medium text-white">Deployed</span>
          </div>
        </motion.div>
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/40"
          style={{
            left: `${20 + i * 15}%`,
            top: `${10 + (i % 3) * 30}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 2 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  )
}

export function Services({ services }: ServicesProps) {
  const getIcon = (iconName: string): LucideIcon => {
    const IconComponent = (Icons as any)[iconName] as LucideIcon
    return IconComponent || Icons.Code2
  }

  // Create background gradients for each card
  const backgrounds = [
    <div key="bg1" className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-[#ff6a55]/20 to-[#7b63ff]/10 blur-3xl" />,
    <div key="bg2" className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-[#7b63ff]/20 to-[#3d52d5]/10 blur-3xl" />,
    <div key="bg3" className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-[#ff6a55]/20 to-[#ff7a59]/10 blur-3xl" />,
    <div key="bg4" className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-[#7b63ff]/20 to-[#ff6a55]/10 blur-3xl" />,
    <div key="bg5" className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-[#3d52d5]/20 to-[#7b63ff]/10 blur-3xl" />,
  ]

  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          overline="SERVICES"
          title="Digital Services for Business Growth"
          highlightWord="Services"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <BentoGrid className="lg:grid-rows-3">
            {services.map((service, index) => {
              const Icon = getIcon(service.icon)
              const isMain = service.isMain || false
              
              // Lightweight animated visualization for Web Development (main card)
              const visualElement = isMain ? <CodeVisualization /> : undefined

              return (
                <BentoCard
                  key={service.title}
                  name={service.title}
                  description={service.text}
                  Icon={Icon}
                  href={service.href || "#"}
                  cta={service.cta || "Learn More"}
                  background={backgrounds[index % backgrounds.length]}
                  className={service.className || ""}
                  splineScene={visualElement}
                  isMain={isMain}
                />
              )
            })}
          </BentoGrid>
        </motion.div>
      </Container>
    </section>
  )
}