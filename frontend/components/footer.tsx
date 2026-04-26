import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from "lucide-react"

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Our Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
   
]

const services = [
  { href: "/services/cosmetic-dentistry", label: "Cosmetic Dentistry" },
  { href: "/services/orthodontics", label: "Orthodontics" },
  { href: "/services/dental-implants", label: "Dental Implants" },
  { href: "/services/invisalign", label: "Invisalign" },
  { href: "/services/crowns-bridges", label: "Crowns & Bridges" },
  { href: "/services/gum-treatment", label: "Gum Treatment" },
]

const socialLinks = [
  { href: "https://facebook.com/ashirwaddental", icon: Facebook, label: "Facebook" },
  { href: "https://www.instagram.com/ashirwad_dental_clinic/", icon: Instagram, label: "Instagram" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="container mx-auto px-4 py-10 md:py-16">
        {/*
          Mobile:  1-col stacked
          md:      2-col (brand+contact | links+services)
          lg:      4-col equal
        */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="space-y-4">
            <Image
              src="/images/logo.png"
              alt="Ashirwad Dental Clinic Logo"
              width={140}
              height={70}
              className="h-12 w-auto object-contain md:h-14"
            />
            <p className="text-sm leading-relaxed text-background/70">
              Providing modern dental care with a patient-focused approach. Your smile is our priority.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((item, i) => {
                const Icon = item.icon
                return (
                  <a
                    key={i}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-background/70 transition-colors hover:text-secondary"
                    aria-label={item.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-background/70 transition-colors hover:text-secondary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link href={service.href} className="text-sm text-background/70 transition-colors hover:text-secondary">
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                <span className="text-sm text-background/70">
                  17th cross, 26th Main Rd,<br />
                  KR Layout, 6TH PHASE, J. P. Nagar,<br />
                  Bengaluru, Karnataka 560078
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-secondary" />
                <a href="tel:+919480514054" className="text-sm text-background/70 transition-colors hover:text-secondary">
                  +91 94805 14054
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-secondary" />
                {/* Break long email on small screens */}
                <a
                  href="mailto:ashirwadclinicjpnagar@gmail.com"
                  className="break-all text-sm text-background/70 transition-colors hover:text-secondary"
                >
                  ashirwadclinicjpnagar@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                <div className="text-sm text-background/70">
                  <p>Mon - Sat: 10:00 AM - 9:00 PM</p>
                  <p>Sunday: 10:00 AM - 1:00 PM (Appointments Only)</p>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-5 text-center text-sm text-background/60">
          <p>&copy; {new Date().getFullYear()} Ashirwad Dental Clinic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}