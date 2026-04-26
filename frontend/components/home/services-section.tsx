import Link from "next/link"
import { ArrowRight, Sparkles, Stethoscope, CircleDot, Crown, AlignVerticalSpaceAround, Activity, Smile, Scissors } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const services = [
  {
    icon: Sparkles,
    title: "Cosmetic Dentistry",
    description: "Transform your smile with teeth whitening, veneers, and aesthetic treatments.",
    href: "/services/cosmetic-dentistry",
  },
  {
    icon: AlignVerticalSpaceAround,
    title: "Orthodontics",
    description: "Straighten your teeth with braces and modern alignment solutions.",
    href: "/services/orthodontics",
  },
  {
    icon: CircleDot,
    title: "Dental Implants",
    description: "Permanent tooth replacement solutions for a natural-looking smile.",
    href: "/services/dental-implants",
  },
  {
    icon: Crown,
    title: "Crowns & Bridges",
    description: "Restore damaged teeth with custom-fitted crowns and bridges.",
    href: "/services/crowns-bridges",
  },
  {
    icon: Smile,
    title: "Invisalign Clear Braces",
    description: "Achieve straighter teeth with virtually invisible aligners.",
    href: "/services/invisalign",
  },
  {
    icon: Activity,
    title: "Gum Disease Treatment",
    description: "Comprehensive periodontal care for healthy gums and teeth.",
    href: "/services/gum-treatment",
  },
  {
    icon: Stethoscope,
    title: "Dentures & Removables",
    description: "Custom dentures and removable prosthetics for complete smiles.",
    href: "/services/dentures",
  },
  {
    icon: Scissors,
    title: "Oral Surgery",
    description: "Safe and precise surgical procedures including extractions.",
    href: "/services/oral-surgery",
  },
]

export function ServicesSection() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
          <p className="text-sm font-bold text-primary/70 tracking-wide uppercase">Our Services</p>
          <h2 className="mt-2 font-serif text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
            Comprehensive Dental Care
          </h2>
          <p className="mt-3 text-sm text-muted-foreground md:mt-4 md:text-base">
            From routine check-ups to advanced treatments, we offer a full range of dental services
            to meet all your oral health needs.
          </p>
        </div>

        {/* 1-col mobile → 2-col sm → 4-col lg */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Card key={index} className="group transition-shadow hover:shadow-lg">
              <CardHeader className="pb-2">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <service.icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-base md:text-lg">{service.title}</CardTitle>
                <CardDescription className="text-xs md:text-sm">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center md:mt-12">
          {/* Full width on mobile, auto on sm+ */}
          <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}