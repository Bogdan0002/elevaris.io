"use client"

import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import Spline from "@splinetool/react-spline/next"
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
              
              // Spline scene for Web Development (main card)
              const splineScene = isMain ? (
                <Spline
                  scene="https://prod.spline.design/Kb3dPnZceTh4mOxG/scene.splinecode"
                  className="w-full h-full"
                />
              ) : undefined

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
                  splineScene={splineScene}
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
