import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Phone } from "lucide-react"

export function CTASection() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Reduced padding on mobile: p-6 → md:p-12 */}
        <div className="mx-auto max-w-3xl rounded-2xl bg-muted p-6 text-center sm:p-8 md:p-12">
          <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
            Book Your Dental Consultation Today
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground md:mt-4 md:text-base">
            Take the first step towards a healthier, more confident smile.
            Schedule your appointment with our experienced dental team.
          </p>
          {/* Full width buttons on mobile, auto-width side by side on sm+ */}
          <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center md:mt-8">
            <Button size="lg" asChild className="gap-2 w-full sm:w-auto">
              <Link href="/contact">
                <Calendar className="h-5 w-5" />
                Schedule Appointment
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="gap-2 w-full sm:w-auto">
              <a href="tel:+91 94805 14054">
                <Phone className="h-5 w-5" />
                Call Now
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
