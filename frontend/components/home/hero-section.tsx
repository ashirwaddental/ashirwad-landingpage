import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MessageCircle, Calendar } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-muted">
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">

          <div className="space-y-6 md:space-y-8">
            <div className="space-y-4">
              <p className="text-sm font-bold text-primary/70 tracking-wide uppercase">
                Welcome to Ashirwad Dental Clinic
              </p>
              <h1 className="font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
                <span className="text-balance">Modern Dental Care for a</span>{" "}
                <span className="text-primary">Confident Smile</span>
              </h1>
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg md:max-w-lg">
                Experience exceptional dental care with our team of experienced professionals. 
                We combine advanced technology with personalized treatment to give you the smile you deserve.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" asChild className="gap-2 w-full sm:w-auto">
                <Link href="/contact">
                  <Calendar className="h-5 w-5" />
                  Book Appointment
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="gap-2 w-full sm:w-auto">
                <a
                  href="https://wa.me/919480514054?text=Hello!%20I%20would%20like%20to%20book%20a%20dental%20consultation."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp Consultation
                </a>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/images/hero-dental.jpg"
                alt="Modern dental clinic with state-of-the-art equipment"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-xl bg-card p-4 shadow-lg md:p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                  <span className="text-xl font-bold">30+</span>
                </div>
                <div>
                  <p className="text-sm md:text-base font-semibold text-foreground">Years of Excellence</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Trusted Dental Care</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
