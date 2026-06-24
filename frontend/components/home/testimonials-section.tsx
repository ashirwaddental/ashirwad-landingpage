"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/animations/reveal"
import { TextReveal } from "@/components/animations/text-reveal"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"

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
    image: "/images/patient-1.jpg",
    rating: 5,
    text: "I should Thank Dr.Sanjay for taking great care of my teeth. He always makes sure I am comfortable during each visit and explains everything in a way that I can understand. I'm grateful for the way he helped me in my Root canal treatment. I never felt uneasiness during the treatment. Very clean environment.",
  },
]

export function TestimonialsSection() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  useEffect(() => {
    if (!api || isHovered) return

    const intervalId = setInterval(() => {
      api.scrollNext()
    }, 5000)

    return () => clearInterval(intervalId)
  }, [api, isHovered])

  return (
    <section className="bg-primary py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Reveal as="p" className="text-sm font-medium uppercase tracking-wider text-secondary">Testimonials</Reveal>
          <TextReveal
            as="h2"
            className="mt-2 font-serif text-3xl font-bold text-primary-foreground md:text-4xl"
            text="What Our Patients Say"
          />
        </div>

        <Reveal direction="up" scale duration={800} className="w-full">
          <div 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="w-full"
          >
            <Carousel
              setApi={setApi}
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4 md:-ml-6 flex items-stretch">
                {testimonials.map((testimonial) => (
                  <CarouselItem key={testimonial.id} className="pl-4 md:pl-6 basis-full md:basis-1/2 lg:basis-1/3 flex">
                    <div className="flex flex-col justify-between w-full bg-card rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative border border-border/50">
                      <div>
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex gap-1">
                            {Array.from({ length: testimonial.rating }).map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                            ))}
                          </div>
                          <Quote className="h-8 w-8 text-primary/10" />
                        </div>
                        <blockquote className="mb-6 text-base md:text-[17px] leading-relaxed text-muted-foreground italic">
                          {`"${testimonial.text}"`}
                        </blockquote>
                      </div>
                      
                      <div className="flex items-center gap-4 pt-4 border-t border-border/50 mt-auto">
                        <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-primary/20 shrink-0">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground text-sm md:text-base">{testimonial.name}</p>
                          <p className="text-xs md:text-sm text-muted-foreground">{testimonial.location}</p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            <div className="mt-10 flex items-center justify-center gap-6">
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all duration-300 cursor-pointer flex items-center justify-center shrink-0"
                onClick={() => api?.scrollPrev()}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              
              <div className="flex gap-2 items-center">
                {Array.from({ length: count }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      index === current
                        ? "bg-primary-foreground w-8"
                        : "bg-primary-foreground/30 w-2.5 hover:bg-primary-foreground/60"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all duration-300 cursor-pointer flex items-center justify-center shrink-0"
                onClick={() => api?.scrollNext()}
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

