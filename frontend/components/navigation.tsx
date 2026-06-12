"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact" },
  
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastYRef = useRef(0)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 12)

      // Hide the bar when scrolling down (past a small threshold),
      // reveal it again as soon as the user scrolls up.
      if (y > lastYRef.current && y > 120) {
        setHidden(true)
      } else if (y < lastYRef.current) {
        setHidden(false)
      }
      lastYRef.current = y
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Never hide the bar while the mobile menu is open.
  const isHidden = hidden && !isOpen

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b backdrop-blur transition-all duration-300 supports-[backdrop-filter]:bg-background/60",
        scrolled
          ? "border-border/60 bg-background/95 shadow-sm"
          : "border-border/40 bg-background/95",
        isHidden ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <div
        className={cn(
          "container mx-auto flex items-center justify-between px-4 transition-all duration-300",
          scrolled ? "h-14 md:h-16" : "h-16 md:h-20",
        )}
      >
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="Ashirwad Dental Clinic Logo"
            width={160}
            height={80}
            className={cn(
              "w-auto object-contain transition-all duration-300",
              scrolled ? "h-9 md:h-11" : "h-10 md:h-14",
            )}
            priority
          />
          
        </Link>

        {/* Desktop Navigation — pill-shaped */}
        <nav className="hidden items-center gap-1 rounded-full border border-border/60 bg-background/70 p-1 shadow-sm backdrop-blur md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-primary/10 hover:text-primary",
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Right Section */}
        <div className="hidden items-center gap-4 md:flex">
          <a
            href="tel:+91 94805 14054"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
          >
            <Phone className="h-4 w-4" />
            <span>+91 94805 14054</span>
          </a>
          <Button asChild>
            <Link href="/contact">Book Appointment</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="container mx-auto flex flex-col gap-4 px-4 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <hr className="border-border" />

            <a
              href="tel:+919876543210"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
            >
              <Phone className="h-4 w-4" />
              <span>+91 94805 14054</span>
            </a>

            <Button asChild className="w-full">
              <Link href="/contact">Book Appointment</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}