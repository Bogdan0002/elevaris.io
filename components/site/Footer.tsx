import Link from "next/link"
import Image from "next/image"
import { Container } from "@/components/site/Container"

interface FooterProps {
  aboutText: string
  quickLinks: Array<{ label: string; href: string }>
  services?: Array<{ label: string; href: string }>
  contactTitle: string
  email: string
  phone: string
  copyright: string
  credit: string
}

export function Footer({
  aboutText,
  quickLinks,
  services = [],
  contactTitle,
  email,
  phone,
  copyright,
  credit,
}: FooterProps) {
  return (
    <footer className="border-t border-border bg-background-soft/50">
      <Container className="py-12">
        <div className={`grid grid-cols-1 gap-8 md:grid-cols-2 ${services && services.length > 0 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
          {/* About */}
          <div className="text-center md:text-left">
            <Link href="/home" className="inline-block mb-4">
              <Image
                src="https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/vcgPZLa7MnNoipCvFFDA/media/48482e69-0d38-4a97-97f8-10e512f222a3.png"
                alt="Elevaris Web Solutions Logo"
                width={180}
                height={48}
                className="h-10 w-auto object-contain mx-auto md:mx-0"
              />
            </Link>
            <p className="text-sm text-foreground-secondary leading-relaxed">
              {aboutText}
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2 items-center md:items-start">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground-secondary hover:bg-gradient-to-r hover:from-[#ff6a55] hover:to-[#7b63ff] hover:bg-clip-text hover:text-transparent transition-all"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          {services && services.length > 0 && (
            <div className="text-center md:text-left">
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                Services
              </h3>
              <ul className="flex flex-col gap-2 items-center md:items-start">
                {services.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground-secondary hover:bg-gradient-to-r hover:from-[#ff6a55] hover:to-[#7b63ff] hover:bg-clip-text hover:text-transparent transition-all"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact */}
          <div className="text-center md:text-left">
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              {contactTitle}
            </h3>
            <div className="flex flex-col gap-2 text-sm text-foreground-secondary items-center md:items-start">
              <a
                href={`mailto:${email}`}
                className="hover:bg-gradient-to-r hover:from-[#ff6a55] hover:to-[#7b63ff] hover:bg-clip-text hover:text-transparent transition-all"
              >
                {email}
              </a>
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="hover:bg-gradient-to-r hover:from-[#ff6a55] hover:to-[#7b63ff] hover:bg-clip-text hover:text-transparent transition-all"
              >
                {phone}
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-between">
            <p className="text-xs text-foreground-muted text-center sm:text-left">{copyright}</p>
            <p className="text-xs text-foreground-muted text-center sm:text-right">{credit}</p>
          </div>
        </div>
      </Container>
    </footer>
  )
}

