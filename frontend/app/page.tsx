import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { HeroSection } from "@/components/home/hero-section"
import { TrustIndicators } from "@/components/home/trust-indicators"
import { ServicesSection } from "@/components/home/services-section"
import { WhyChooseUs } from "@/components/home/why-choose-us"
import { SmileGallery } from "@/components/home/smile-gallery"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { CTASection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <TrustIndicators />
        <ServicesSection />
        <WhyChooseUs />
        <SmileGallery />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
