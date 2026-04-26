"use client"
 
import { useState } from "react"
import { Metadata } from "next"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
 
const faqs = [
  {
    question: "What treatments are available at your clinic?",
    answer:
      "We offer a wide range of dental treatments designed to improve oral health and enhance your smile.",
  },
  {
    question: "How do I book an appointment?",
    answer:
      "You can easily book an appointment through our website or by contacting our clinic directly.",
  },
  {
    question: "Are your treatments safe and hygienic?",
    answer:
      "Yes, we follow strict sterilization and hygiene protocols to ensure patient safety at all times.",
  },
  {
    question: "Do you offer painless dental procedures?",
    answer:
      "Our clinic uses advanced technology and modern techniques to ensure maximum comfort during treatments.",
  },
  {
    question: "How long does a typical treatment take?",
    answer:
      "Treatment duration varies depending on the procedure and individual case requirements.",
  },
  {
    question: "Can I get a consultation before treatment?",
    answer:
      "Yes, we recommend scheduling a consultation to discuss your concerns and treatment options.",
  },
  {
    question: "What should I expect during my first visit?",
    answer:
      "Your first visit includes a detailed examination and discussion about your dental needs.",
  },
  {
    question: "Do you use modern dental technology?",
    answer:
      "Yes, our clinic is equipped with advanced tools to ensure precise and efficient treatments.",
  },
]
 
export default function FAQsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
 
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }
 
  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="bg-muted py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold text-primary/70 tracking-wide uppercase">
                FAQs
              </p>
              <h1 className="mt-2 font-serif text-4xl font-bold text-foreground md:text-5xl">
                Frequently Asked Questions
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Find answers to common questions about our services, treatments, and patient care.
              </p>
            </div>
          </div>
        </section>
 
        {/* FAQ Section */}
        <section className="bg-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md cursor-pointer"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex items-center justify-between p-6">
                    <h2 className="text-base font-semibold text-foreground pr-4">
                      {faq.question}
                    </h2>
                    <span className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-xl font-light transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      {openIndex === index ? "−" : "+"}
                    </span>
                  </div>
 
                  {openIndex === index && (
                    <div className="px-6 pb-6">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
 
        {/* CTA Section */}
        <section className="bg-primary py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-serif text-3xl font-bold text-primary-foreground md:text-4xl">
                Still Have Questions?
              </h2>
              <p className="mt-4 text-primary-foreground/80">
                Our team is here to help you. Reach out to us and we'll be happy to assist with
                any questions about your dental care.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" variant="secondary" asChild className="gap-2">
                  <Link href="/contact">
                    <Calendar className="h-5 w-5" />
                    Contact Us
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="gap-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  <a href="tel:+919480514054">Call: +91 94805 14054</a>
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
 
