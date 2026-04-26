"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Tejas Nagraj",
    location: "Bengaluru",
    image: "/images/patient-4.jpg",
    rating: 5,
    text: "Dr. Sanjay has been our family dentist for years, and we couldn’t be more grateful for their exceptional care. Their expertise, patience, and gentle approach make every visit comfortable and stress-free. The clinic is well-maintained, and the staff is always welcoming and professional. Whether it’s a routine check-up or a more complex procedure, we trust Dr. Sanjay completely. Highly recommended for anyone looking for quality dental care!",
  },
  {
    id: 2,
    name: "Harish Mundre",
    location: "Bengaluru",
    image: "/images/patient-2.jpg",
    rating: 5,
    text: "Dr. Sanjay Mohanchandra is a highly skilled and compassionate professional. From the moment I arrived, the friendly staff and comfortable office made me feel at ease. After my tooth extraction, I had an immediate implant placement followed by a crown a few months later. Dr. Sanjay explained each step of the process thoroughly, and I am very happy with the results. I would definitely recommend him to anyone looking for excellent dental care.",
  },
  {
    id: 3,
    name: "Anita Desai",
    location: "Bengaluru",
    image: "/images/patient-3.jpg",
    rating: 5,
    text: "I have been visiting this clinic for over 15 years, and the experience has been nothing short of exceptional! Both Dr. Hemalatha and Dr. Sanjay are incredibly professional, with an amazing eye for detail and perfection. As a dancer, my smile is very important, and Dr. Hemalatha takes a personal interest in perfecting it, which I deeply appreciate.What sets them apart is their commitment to staying updated with the latest advancements in technology and treatments, ensuring that I always receive the best possible care. The clinic itself is state-of-the-art, with a modern, welcoming ambiance that puts you at ease.I highly recommend this clinic to anyone looking for top-notch dental care. Dr. Hemalatha and Dr. Sanjay truly redefine excellence in dentistry!",
  },
  {
    id: 4, 
    name: "Suprith G",
    location: "Bengaluru",
    image: "/images/patient-4.jpg",
    rating: 5,
    text: "I should Thank Dr.Sanjay for taking great care of my teeth. He always makes sure I am comfortable during each visit and explains everything in a way that I can understand. I'm grateful for the way he helped me in my Root canal treatment. I never felt uneasiness during the treatment. Very clean environment.",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="bg-primary py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-secondary">Testimonials</p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-primary-foreground md:text-4xl">
            What Our Patients Say
          </h2>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="relative rounded-2xl bg-card p-8 shadow-xl md:p-12">
            <Quote className="absolute left-6 top-6 h-12 w-12 text-primary/20 md:left-8 md:top-8" />
            
            <div className="relative z-10">
              <div className="mb-6 flex justify-center gap-1">
                {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <blockquote className="mb-8 text-center text-lg leading-relaxed text-muted-foreground md:text-xl">
                {`"${currentTestimonial.text}"`}
              </blockquote>

              <div className="flex flex-col items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-full border-4 border-primary/20">
                  <Image
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-foreground">{currentTestimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{currentTestimonial.location}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={prev}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      index === currentIndex ? "bg-primary" : "bg-border"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={next}
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
