'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Hero, PromotionsBanner } from '@/components/home/hero'
import { TrustBadges } from '@/components/home/trust-badges'
import { Categories } from '@/components/home/categories'
import { FeaturedProducts } from '@/components/home/featured-products'
import { Benefits } from '@/components/home/benefits'
import { Button } from '@/components/ui/button'
import { ArrowRight, Truck, Shield, Clock, Award, Star, Zap, Heart } from 'lucide-react'
import { testimonials } from '@/data/products'

const clientLogos = [
  'TechCorp', 'GrowthStart', 'Nordic', 'Milano', 'PolishTrade', 'Amsterdam', 'Paris', 'GermanMfg',
  'Oslo', 'Spanish', 'UKFinance', 'CzechInd'
]

export default function HomePage() {
  return (
    <>
      <Hero />
      <PromotionsBanner />
      
      {/* Client Logos Section */}
      <section className="py-12 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-gray-500 mb-8 font-medium">Trusted by leading European companies</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {clientLogos.map((logo) => (
              <div key={logo} className="text-xl md:text-2xl font-bold text-gray-400 hover:text-primary transition-colors">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <TrustBadges />
      <Categories />
      <FeaturedProducts />
      
      {/* Why Choose Us Section - More Colorful */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary/90 to-accent text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose PrintGround?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              We are the leading corporate merchandise supplier in Europe, serving businesses of all sizes since 2015
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: 'EU-Wide Delivery', desc: 'Delivery to 27 European countries with reliable logistics partners', color: 'from-green-400 to-emerald-500' },
              { icon: Shield, title: 'Quality Guarantee', desc: 'Full replacement or refund if quality does not meet your standards', color: 'from-blue-400 to-indigo-500' },
              { icon: Clock, title: 'Fast Production', desc: '5-10 business days standard, express options available', color: 'from-orange-400 to-red-500' },
              { icon: Award, title: 'Premium Quality', desc: 'Only working with trusted suppliers and premium materials', color: 'from-purple-400 to-pink-500' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-white/80">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-blue-600 to-accent text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get a free quote for your next corporate merchandise order. Our team is ready to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto px-8">
                Get Free Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/catalog">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary w-full sm:w-auto">
                Browse Catalog
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-600">
              Join thousands of satisfied customers across Europe
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.slice(0, 6).map((testimonial) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 text-sm">&ldquo;{testimonial.content}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-accent/20"
                  />
                  <div>
                    <p className="font-semibold text-sm text-primary">{testimonial.name}</p>
                    <p className="text-xs text-gray-500">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Benefits />
    </>
  )
}
