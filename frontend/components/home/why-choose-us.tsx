import Image from "next/image"
import { Check } from "lucide-react"
import { Reveal } from "@/components/animations/reveal"
import { TextReveal } from "@/components/animations/text-reveal"
import { Parallax } from "@/components/animations/parallax"
import { CountUp } from "@/components/animations/count-up"

const benefits = [
  {
    title: "Experienced Dentists",
    description: "Our team of qualified dental professionals brings years of expertise to every treatment.",
  },
  {
    title: "Modern Equipment",
    description: "We use the latest dental technology for accurate diagnosis and comfortable treatments.",
  },
  {
    title: "Comfortable Environment",
    description: "Our clinic is designed to make you feel relaxed and at ease during your visit.",
  },
  {
    title: "Personalized Care",
    description: "Every treatment plan is customized to your unique dental needs and goals.",
  },
]

export function WhyChooseUs() {
  return (
    <section className="bg-muted py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">

          {/* Image — shows AFTER text on mobile (order-last), first on desktop */}
          <Reveal direction="right" duration={900} scale className="relative order-last lg:order-first">
            <Parallax speed={0.1} className="relative aspect-[1/1] overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/images/dental-team.jpg"
                alt="Ashirwad Dental Clinic team of professionals"
                fill
                className="object-cover"
              />
            </Parallax>
            {/* Badge: hidden on mobile (would clip), visible on md+ with negative offset */}
            <div className="absolute -bottom-6 -right-6 hidden rounded-xl bg-primary p-6 text-primary-foreground shadow-lg md:block">
              <div className="text-center">
                <CountUp as="p" end={5000} suffix="+" className="text-4xl font-bold" />
                <p className="mt-1 text-sm">Happy Patients</p>
              </div>
            </div>
          </Reveal>

          {/* Text Content */}
          <div className="space-y-6 md:space-y-8">
            <div>
              <Reveal as="p" className="text-sm font-medium uppercase tracking-wider text-secondary">Why Choose Us</Reveal>
              <TextReveal
                as="h2"
                className="mt-2 font-serif text-2xl font-bold text-foreground sm:text-3xl md:text-4xl"
                text="Your Trusted Partner in Dental Health"
              />
              <Reveal as="p" delay={150} className="mt-4 text-sm text-muted-foreground md:text-base">
                At Ashirwad Dental Clinic, we combine expertise, technology, and compassion
                to deliver exceptional dental care that exceeds your expectations.
              </Reveal>
            </div>

            <div className="space-y-4 md:space-y-6">
              {benefits.map((benefit, index) => (
                <Reveal key={index} direction="left" delay={index * 120} className="flex gap-3 md:gap-4">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground md:h-8 md:w-8">
                    <Check className="h-4 w-4 md:h-5 md:w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground md:text-base">{benefit.title}</h3>
                    <p className="mt-0.5 text-xs text-muted-foreground md:mt-1 md:text-sm">{benefit.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Inline stat for mobile (since badge is hidden on small screens) */}
            <div className="flex items-center gap-3 rounded-xl bg-primary p-4 text-primary-foreground md:hidden">
              <CountUp as="p" end={5000} suffix="+" className="text-3xl font-bold" />
              <p className="text-sm">Happy Patients</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
