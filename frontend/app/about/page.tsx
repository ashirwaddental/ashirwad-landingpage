import { Metadata } from "next"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Award, Heart, Users, Sparkles, GraduationCap, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us | Ashirwad Dental Clinic",
  description: "Learn about Ashirwad Dental Clinic, our experienced dental team, and our commitment to providing exceptional dental care.",
}

const values = [
  {
    icon: Heart,
    title: "Patient-First Approach",
    description: "Every decision we make prioritizes your comfort, health, and satisfaction.",
  },
  {
    icon: Award,
    title: "Excellence in Care",
    description: "We maintain the highest standards in dental treatments and procedures.",
  },
  {
    icon: Users,
    title: "Compassionate Team",
    description: "Our friendly staff ensures a warm and welcoming experience every visit.",
  },
  {
    icon: Sparkles,
    title: "Modern Technology",
    description: "We invest in advanced equipment for precise and comfortable treatments.",
  },
]

// ONLY content updated (doctors array + minor text refinement)

const doctors = [
  {
    name: "Dr. Sanjay Mohanchandra",
    role: "Lead Dentist & Founder",
    image: "/images/dr-sanjay.jpeg",
    experience: "30+ Years Experience",
    specialization: "Implantology, Maxillofacial Surgery",
    description:
      "Dr. Sanjay Mohanchandra is a highly experienced dental professional with over three decades of expertise in oral and maxillofacial surgery, implantology, and advanced dental treatments. He has successfully placed more than 2000 dental implants and is known for his precision, patient care, and use of modern dental technologies. His calm approach and clinical excellence have helped thousands of patients restore their smiles with confidence.",
    education: [
      "BDS – Govt. Dental College, Bangalore",
      "MDS (Oral & Maxillofacial Surgery) – Govt. Dental College, Punjab",
    ],
  },
  {
    name: "Dr. Hemalatha Sanjay",
    role: "Senior Dental Surgeon",
    image: "/images/dr-hemalatha.jpeg",
    experience: "20+ Years Experience",
    specialization: "Cosmetic Dentistry, Orthodontics",
    description:
      "Dr. Hemalatha Sanjay is an experienced orthodontist and cosmetic dentist with over 20 years of practice. She specializes in modern orthodontic treatments including Invisalign, lingual braces, and aesthetic smile design procedures. With a strong focus on patient comfort and attention to detail, she has transformed countless smiles and continues to deliver exceptional results with every treatment.",
    education: [
      "BDS – Dayananda Sagar College of Dental Sciences, Bangalore University",
      "MDS (Orthodontics)",
      "Certified in Advanced Cosmetic Dentistry",
    ],
  },
]

const facilities = [
  { src: "/images/facility-1.jpeg", alt: "Modern treatment room" },
  { src: "/images/facility-2.jpeg", alt: "Advanced dental equipment" },
  { src: "/images/facility-3.jpeg", alt: "Comfortable waiting area" },
  { src: "/images/facility-4.jpg", alt: "Advanced sterilizing unit" },
]

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="bg-muted py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold text-primary/70 tracking-wide uppercase">
                About Us
              </p>
              <h1 className="mt-2 font-serif text-4xl font-bold text-foreground md:text-5xl">
                Your Trusted Partner in Dental Health
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                At Ashirwad Dental Clinic, we are committed to providing exceptional dental care 
                using modern technology and a patient-focused approach. Our mission is to help 
                every patient achieve optimal oral health and a confident, beautiful smile.
              </p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="bg-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="relative">
                <div className="aspect-[1/1] overflow-hidden rounded-2xl shadow-xl">
                  <Image
                    src="/images/clinic-exterior.jpeg"
                    alt="Ashirwad Dental Clinic exterior"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-6">
                <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                  About Ashirwad Dental Clinic
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Founded with a vision to provide world-class dental care, Ashirwad Dental Clinic 
                    has been serving patients with excellence for over a decade. Our state-of-the-art 
                    facility is equipped with the latest dental technology, ensuring precise diagnosis 
                    and comfortable treatments.
                  </p>
                  <p>
                    We believe that everyone deserves access to quality dental care. Our team of 
                    experienced dentists and friendly staff work together to create a welcoming 
                    environment where patients feel comfortable and well-cared for throughout their 
                    dental journey.
                  </p>
                  <p>
                    From routine check-ups to complex dental procedures, we offer comprehensive 
                    dental services tailored to meet the unique needs of each patient. Our commitment 
                    to continuous learning and adoption of advanced techniques ensures that you receive 
                    the best possible care.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-muted py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                Our Core Values
              </h2>
              <p className="mt-4 text-muted-foreground">
                These principles guide everything we do at Ashirwad Dental Clinic.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <div key={index} className="rounded-xl bg-card p-6 shadow-md">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <value.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-foreground">{value.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Meet Our Dentists */}
        <section className="bg-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="text-sm font-medium uppercase tracking-wider text-secondary">Our Team</p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-foreground md:text-4xl">
                Meet Our Dentists
              </h2>
              <p className="mt-4 text-muted-foreground">
                Our experienced dental professionals are dedicated to your oral health.
              </p>
            </div>

            <div className="space-y-20">
              {doctors.map((doctor, index) => (
  <div
    key={index}
    className="grid items-center gap-20 lg:grid-cols-2">
    <div className={`${index % 2 === 1 ? "lg:order-2 lg:pl-16" : "lg:pr-10"}`}>
      <div className="relative aspect-[1/1] max-w-md overflow-hidden rounded-2xl shadow-xl">
        <Image
          src={doctor.image}
          alt={doctor.name}
          fill
          className="object-cover"
        />
      </div>
    </div>

    <div className={`space-y-6 ${index % 2 === 1 ? "lg:order-1 lg:pr-16" : "lg:pl-10"}`}>
      <div>
        <h3 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
          {doctor.name}
        </h3>
        <p className="mt-1 text-secondary font-medium">{doctor.role}</p>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm">
          <Clock className="h-4 w-4 text-primary" />
          <span>{doctor.experience}</span>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm">
          <Award className="h-4 w-4 text-primary" />
          <span>{doctor.specialization}</span>
        </div>
      </div>

      <p className="text-muted-foreground leading-relaxed">{doctor.description}</p>

      <div>
        <h4 className="flex items-center gap-2 font-semibold text-foreground">
          <GraduationCap className="h-5 w-5 text-primary" />
          Education
        </h4>
        <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
          {doctor.education.map((edu, eduIndex) => (
            <li key={eduIndex}>• {edu}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
))}
            </div>
          </div>
        </section>

        {/* Facilities Section */}
        <section className="bg-muted py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="text-sm font-medium uppercase tracking-wider text-secondary">Our Facilities</p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-foreground md:text-4xl">
                State-of-the-Art Clinic
              </h2>
              <p className="mt-4 text-muted-foreground">
                Experience dental care in a modern, comfortable environment equipped with 
                the latest technology.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {facilities.map((facility, index) => (
                <div
                  key={index}
                  className="group relative aspect-square overflow-hidden rounded-xl shadow-md"
                >
                  <Image
                    src={facility.src}
                    alt={facility.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <p className="absolute bottom-4 left-4 font-medium text-background opacity-0 transition-opacity group-hover:opacity-100">
                    {facility.alt}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
