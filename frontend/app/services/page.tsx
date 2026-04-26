import { Metadata } from "next"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Sparkles, Stethoscope, CircleDot, Crown, AlignVerticalSpaceAround, Activity, Smile, Scissors, Calendar } from "lucide-react"

export const metadata: Metadata = {
  title: "Our Services | Ashirwad Dental Clinic",
  description: "Explore our comprehensive dental services including cosmetic dentistry, orthodontics, dental implants, Invisalign, and more at Ashirwad Dental Clinic.",
}

const services = [
  {
    icon: Sparkles,
    title: "Advanced Digital Dentistry (iTero™ Scanner)",
    description: "Experience advanced digital dentistry with our iTero™ intraoral scanner for fast, precise, and mess-free digital impressions, enhancing comfort and accuracy in smile design and full mouth rehabilitation.",
    href: "/services/itero-scanner",
    features: [
      "3D Smile Preview",
      "Digital Impressions",
      "No Mess or Discomfort",
      "High Precision Scanning",
    ],
  },
  {
    icon: Sparkles,
    title: "Cosmetic Dentistry",
    description: "Transform your smile with our range of aesthetic dental treatments including teeth whitening, veneers, and smile makeovers.",
    href: "/services/cosmetic-dentistry",
    features: ["Teeth Whitening", "Dental Veneers", "Smile Makeover", "Tooth Reshaping"],
  },
  {
    icon: AlignVerticalSpaceAround,
    title: "Orthodontics",
    description: "Achieve perfectly aligned teeth with our traditional braces and modern orthodontic solutions for all ages.",
    href: "/services/orthodontics",
    features: ["Metal Braces", "Ceramic Braces", "Retainers", "Early Intervention"],
  },
  {
    icon: CircleDot,
    title: "Dental Implants",
    description: "Replace missing teeth with permanent, natural-looking dental implants that function like real teeth.",
    href: "/services/dental-implants",
    features: ["Single Tooth Implants", "Multiple Implants", "All-on-4", "Implant-Supported Dentures"],
  },
  {
    icon: Crown,
    title: "Crowns & Bridges",
    description: "Restore damaged or missing teeth with custom-crafted crowns and bridges for a complete smile.",
    href: "/services/crowns-bridges",
    features: ["Dental Crowns", "Fixed Bridges", "Porcelain Restorations", "Same-Day Crowns"],
  },
  {
    icon: Smile,
    title: "Invisalign Clear Braces",
    description: "Straighten your teeth discreetly with virtually invisible clear aligners for a confident smile.",
    href: "/services/invisalign",
    features: ["Custom Aligners", "Invisible Treatment", "Removable Trays", "Faster Results"],
  },
  {
    icon: Activity,
    title: "Gum Disease Treatment",
    description: "Comprehensive periodontal care to treat and prevent gum disease for healthier teeth and gums.",
    href: "/services/gum-treatment",
    features: ["Deep Cleaning", "Scaling & Root Planing", "Gum Surgery", "Maintenance Therapy"],
  },
  {
    icon: Stethoscope,
    title: "Dentures & Removables",
    description: "Custom-made dentures and removable prosthetics for comfortable, natural-looking tooth replacement.",
    href: "/services/dentures",
    features: ["Complete Dentures", "Partial Dentures", "Immediate Dentures", "Denture Repairs"],
  },
  {
    icon: Scissors,
    title: "Oral Surgery",
    description: "Safe and precise surgical procedures including extractions, wisdom teeth removal, and more.",
    href: "/services/oral-surgery",
    features: ["Tooth Extractions", "Wisdom Teeth", "Bone Grafting", "Surgical Procedures"],
  },
]

export default function ServicesPage() {
  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="bg-muted py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold text-primary/70 tracking-wide uppercase">
                Our Services
              </p>
              <h1 className="mt-2 font-serif text-4xl font-bold text-foreground md:text-5xl">
                Comprehensive Dental Care
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                From routine check-ups to advanced dental procedures, we offer a complete range of 
                services to meet all your oral health needs using the latest techniques and technology.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="bg-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-2">
              {services.map((service, index) => (
                <Card key={index} className="group overflow-hidden transition-shadow hover:shadow-lg">
                  <CardHeader className="pb-4">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <service.icon className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="mb-6 grid grid-cols-2 gap-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-serif text-3xl font-bold text-primary-foreground md:text-4xl">
                Ready to Transform Your Smile?
              </h2>
              <p className="mt-4 text-primary-foreground/80">
                Schedule a consultation with our expert dental team to discuss your treatment options 
                and create a personalized care plan.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" variant="secondary" asChild className="gap-2">
                  <Link href="/contact">
                    <Calendar className="h-5 w-5" />
                    Book Consultation
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="gap-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  <a href="tel:+919480514054">
                    Call: +91 94805 14054
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}