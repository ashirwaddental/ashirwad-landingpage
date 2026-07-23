import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MessageCircle, Calendar } from "lucide-react"
import { Reveal } from "@/components/animations/reveal"
import { TextReveal } from "@/components/animations/text-reveal"
import { Parallax } from "@/components/animations/parallax"
import { CountUp } from "@/components/animations/count-up"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-muted">
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">

          <div className="space-y-6 md:space-y-8">
            <div className="space-y-4">
              <Reveal as="p" direction="up" className="text-sm font-bold text-primary/70 tracking-wide uppercase">
                Welcome to Ashirwad Dental Clinic
              </Reveal>
              <h1 className="font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
                <TextReveal as="span" className="text-balance" text="Modern Dental Care for a" />{" "}
                <TextReveal as="span" className="text-primary" text="Confident Smile" delay={360} />
              </h1>
              <Reveal
                as="p"
                direction="up"
                delay={500}
                className="text-base leading-relaxed text-muted-foreground md:text-lg md:max-w-lg"
              >
                Experience exceptional dental care with our team of experienced professionals.
                We combine advanced technology with personalized treatment to give you the smile you deserve.
              </Reveal>
            </div>

            <Reveal direction="up" delay={650} className="flex flex-col gap-4 sm:flex-row">
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
            </Reveal>
          </div>
          <Reveal direction="left" duration={900} scale className="relative">
            <Parallax speed={0.12} className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/images/dental-team.jpg"
                alt="Modern dental clinic with state-of-the-art equipment"
                fill
                className="object-cover"
                priority
              />
            </Parallax>
            <div className="absolute -bottom-6 -left-6 rounded-xl bg-card p-4 shadow-lg md:p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                  <CountUp as="span" end={30} suffix="+" separator={false} className="text-xl font-bold" />
                </div>
                <div>
                  <p className="text-sm md:text-base font-semibold text-foreground">Years of Excellence</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Trusted Dental Care</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
