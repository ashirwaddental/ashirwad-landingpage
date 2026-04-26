import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair'
});

export const metadata: Metadata = {
  title: 'Ashirwad Dental Clinic | Modern Dental Care for a Confident Smile',
  description: 'Experience premium dental care at Ashirwad Dental Clinic. We offer cosmetic dentistry, orthodontics, dental implants, Invisalign, and more with experienced dental professionals.',
  keywords: 'dental clinic, dentist, cosmetic dentistry, orthodontics, dental implants, Invisalign, teeth whitening',
  icons: {
  icon: '/icon.png',   // or '/favicon.ico'
  apple: '/apple-icon.png',
},
}

export const viewport: Viewport = {
  themeColor: '#1e3a5f',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
