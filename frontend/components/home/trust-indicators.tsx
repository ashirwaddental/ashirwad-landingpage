import { Users, Award, Heart, Sparkles } from "lucide-react"

const indicators = [
  {
    icon: Users,
    title: "Experienced Professionals",
    description: "Team of skilled dental specialists with years of expertise",
  },
  {
    icon: Sparkles,
    title: "Advanced Technology",
    description: "State-of-the-art equipment for precise treatments",
  },
  {
    icon: Heart,
    title: "Patient-Centered Care",
    description: "Personalized treatment plans for every patient",
  },
  {
    icon: Award,
    title: "Thousands Happy Patients",
    description: "Building smiles and trust for over a decade",
  },
]

export function TrustIndicators() {
  return (
    <section className="border-y border-border bg-card py-10 md:py-16">
      <div className="container mx-auto px-4">
        {/* 1-col on mobile, 2-col on sm, 4-col on lg */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {indicators.map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground md:text-base">{item.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground md:text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}