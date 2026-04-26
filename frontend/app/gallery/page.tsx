"use client"

import { useState } from "react"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

const categories = [
  { id: "clinic", label: "Our Clinic" },
]

const galleryImages = [
  { id: 1, src: "/images/gallery-clinic-1.jpeg", alt: "", category: "clinic" },
  { id: 2, src: "/images/gallery-clinic-2.jpeg", alt: "", category: "clinic" },
  { id: 3, src: "/images/gallery-clinic-3.jpeg", alt: "", category: "clinic" },
  { id: 4, src: "/images/gallery-clinic-4.jpeg", alt: "", category: "clinic" },
  { id: 5, src: "/images/gallery-clinic-5.jpeg", alt: "", category: "clinic" },
  { id: 6, src: "/images/gallery-clinic-6.jpeg", alt: "", category: "clinic" },
  { id: 7, src: "/images/gallery-clinic-7.jpeg", alt: "", category: "clinic" },
  { id: 8, src: "/images/gallery-clinic-8.jpeg", alt: "", category: "clinic" },
  { id: 9, src: "/images/gallery-clinic-9.jpeg", alt: "", category: "clinic" },
  { id: 10, src: "/images/gallery-clinic-10.jpeg", alt: "", category: "clinic" },
]

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null)

  const filteredImages = activeCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory)

  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="bg-muted py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold text-primary/70 tracking-wide uppercase">
                Gallery
              </p>
              <h1 className="mt-2 font-serif text-4xl font-bold text-foreground md:text-5xl">
                See Our Work
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Explore our modern facilities and see the amazing smile transformations 
                we have achieved for our patients.
              </p>
            </div>
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="border-b border-border bg-background py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  onClick={() => setActiveCategory(category.id)}
                  className="rounded-full"
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="bg-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredImages.map((image) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(image)}
                  className="group relative aspect-square overflow-hidden rounded-xl bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-foreground/0 transition-colors group-hover:bg-foreground/40" />

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="rounded-full bg-background/90 px-4 py-2 text-sm font-medium text-foreground">
                      View
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/10 text-background transition-colors hover:bg-background/20"
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>
            <div 
              className="relative max-h-[80vh] max-w-4xl overflow-hidden rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={800}
                height={600}
                className="h-auto w-full object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-4">
                <p className="text-center text-background">{selectedImage.alt}</p>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <section className="bg-muted py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                Ready to Transform Your Smile?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Join our many satisfied patients and start your journey to a beautiful, 
                healthy smile today.
              </p>
              <div className="mt-8">
                <Button size="lg" asChild>
                  <a href="/contact">Book Your Consultation</a>
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
