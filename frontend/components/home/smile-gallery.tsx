import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const transformations = [
  { id: 1, before: "/images/smile-before-1.jpg", after: "/images/smile-after-1.jpg", treatment: "Teeth Whitening" },
  { id: 2, before: "/images/smile-before-2.jpg", after: "/images/smile-after-2.jpg", treatment: "Dental Veneers" },
  { id: 3, before: "/images/smile-before-3.jpg", after: "/images/smile-after-3.jpg", treatment: "Invisalign" },
]

export function SmileGallery() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
          <p className="text-sm font-medium uppercase tracking-wider text-secondary">Smile Gallery</p>
          <h2 className="mt-2 font-serif text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
            Smile Transformations
          </h2>
          <p className="mt-3 text-sm text-muted-foreground md:mt-4 md:text-base">
            See the incredible results our patients have achieved with our dental treatments.
          </p>
        </div>

        {/* 1-col on mobile, 3-col on md+ */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {transformations.map((item) => (
            <div key={item.id} className="group overflow-hidden rounded-xl bg-card shadow-md">
              <div className="grid grid-cols-2">
                <div className="relative aspect-square">
                  <Image
                    src={item.before}
                    alt={`Before ${item.treatment}`}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute bottom-2 left-2 rounded bg-foreground/80 px-2 py-1 text-xs font-medium text-background">
                    Before
                  </span>
                </div>
                <div className="relative aspect-square">
                  <Image
                    src={item.after}
                    alt={`After ${item.treatment}`}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute bottom-2 right-2 rounded bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
                    After
                  </span>
                </div>
              </div>
              <div className="p-4 text-center">
                <p className="text-sm font-semibold text-foreground md:text-base">{item.treatment}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center md:mt-12">
          <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
            <Link href="/gallery">View Full Gallery</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}