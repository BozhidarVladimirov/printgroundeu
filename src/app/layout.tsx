import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export const metadata: Metadata = {
  title: 'PrintGround | Premium Corporate Merchandise & Branded Products EU',
  description: 'Order branded corporate merchandise with 21+ printing techniques. Fast delivery to 27 EU countries. 1500+ products — T-shirts, bags, drinkware, tech & more.',
  keywords: 'corporate merchandise, branded products, promotional items, EU delivery, screen printing, embroidery',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
