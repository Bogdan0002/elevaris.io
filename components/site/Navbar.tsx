"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { GlowButton } from "@/components/brand/GlowButton"
import { navLinks, ctaButton } from "@/lib/constants/nav"
import { cn } from "@/lib/utils"
import { SparklesCore } from "@/components/ui/sparkles"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    // Check initial scroll position
    handleScroll()
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-400 ease-out pointer-events-none",
        isScrolled ? "" : ""
      )}
    >
      <div
        className={cn(
          "relative z-10 mx-auto flex items-center justify-between transition-all duration-400 pointer-events-auto",
          "px-5 sm:px-7 lg:px-9",
          isScrolled
            ? "max-w-[calc(100%-2rem)] md:max-w-[1100px] py-3 mt-3 rounded-2xl bg-background/88 backdrop-blur-lg shadow-[0_10px_30px_rgba(0,0,0,0.28)]"
            : "max-w-full md:max-w-[1200px] py-5"
        )}
      >
        {/* Sparkles on top of the glass */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-2xl">
          <SparklesCore
            id="navbar-glow-sparkles"
            background="transparent"
            minSize={0.4}
            maxSize={1.2}
            particleDensity={80}
            className="w-full h-full"
            particleColor="#FF6A55"
            speed={0.8}
          />
        </div>

        <div className="flex w-full items-center justify-between">
          {/* Logo */}
          <Link href="/home" className="flex items-center">
            <Image
              src="https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/vcgPZLa7MnNoipCvFFDA/media/48482e69-0d38-4a97-97f8-10e512f222a3.png"
              alt="Elevaris Web Solutions Logo"
              width={180}
              height={48}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {navLinks.map((link) => {
              if (link.children) {
                return (
                  <div key={link.label} className="relative group">
                    <button className="text-sm font-medium text-foreground-secondary hover:text-foreground transition-colors">
                      {link.label}
                    </button>
                    <div className="absolute left-0 top-full mt-2 w-48 rounded-lg border border-border bg-background-soft p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all shadow-card">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href || "#"}
                          className="block px-4 py-2 text-sm text-foreground-secondary hover:text-foreground hover:bg-primary/10 rounded-md transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              }
              return (
                <Link
                  key={link.label}
                  href={link.href || "#"}
                  className="text-sm font-medium text-foreground-secondary hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              )
            })}
            <GlowButton 
              variant="primary" 
              size="sm"
              href={ctaButton.href}
            >
              {ctaButton.label}
            </GlowButton>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <button
                className="text-foreground"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-background-soft border-l border-border">
              <div className="mt-8 flex flex-col gap-4">
                {navLinks.map((link) => {
                  if (link.children) {
                    return (
                      <Accordion key={link.label} type="single" collapsible>
                        <AccordionItem value={link.label} className="border-none">
                          <AccordionTrigger className="text-foreground py-2 !font-normal">
                            {link.label}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="flex flex-col gap-2 pl-4">
                              {link.children.map((child) => (
                                <Link
                                  key={child.label}
                                  href={child.href || "#"}
                                  className="text-sm text-foreground-secondary hover:text-foreground transition-colors py-1"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    )
                  }
                  return (
                    <Link
                      key={link.label}
                      href={link.href || "#"}
                      className="text-foreground-secondary hover:text-foreground transition-colors py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )
                })}
                <div className="pt-4">
                  <Link
                    href={ctaButton.href}
                    onClick={() => setIsOpen(false)}
                    className="w-full inline-flex items-center justify-center h-12 px-7 bg-gradient-to-r from-primary via-[#ff7a59] to-[#7b63ff] text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-[0_0_30px_rgba(255,106,85,0.5)] active:scale-[0.98]"
                  >
                    {ctaButton.label}
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}

