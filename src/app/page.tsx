'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Hero, PromotionsBanner } from '@/components/home/hero'
import { BrandLogos, ClientLogos, Benefits, Categories, FeaturedProducts } from '@/components/home/categories'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <>
      <Hero />
      <PromotionsBanner />
      <BrandLogos />
      <Categories />
      <FeaturedProducts />
      
      {/* CTA Section */}
      <section className="py-16 bg-[#1a1a1a] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Get a free quote for your next corporate merchandise order. Our team is ready to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote">
              <Button size="lg" className="bg-[#e74c3c] hover:bg-[#c0392b] text-white w-full sm:w-auto px-8">
                Get Free Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/catalog">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[#1a1a1a] w-full sm:w-auto">
                Browse Catalog
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Benefits />
      <ClientLogos />
    </>
  )
}
