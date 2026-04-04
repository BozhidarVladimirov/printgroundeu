'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Headphones, Palette, Package, RefreshCw, Leaf } from 'lucide-react'

const benefits = [
  {
    icon: CheckCircle,
    title: 'Premium Quality',
    description: 'Only the highest quality materials and printing techniques',
    color: 'from-green-400 to-emerald-500',
  },
  {
    icon: Headphones,
    title: 'Dedicated Support',
    description: 'Personal account manager for every client',
    color: 'from-blue-400 to-indigo-500',
  },
  {
    icon: Palette,
    title: 'Full Customization',
    description: '21+ printing techniques for any design',
    color: 'from-purple-400 to-pink-500',
  },
  {
    icon: Package,
    title: 'Bulk Discounts',
    description: 'Better prices for larger orders',
    color: 'from-orange-400 to-red-500',
  },
  {
    icon: RefreshCw,
    title: 'Easy Reorders',
    description: 'Save and repeat your favorite products',
    color: 'from-cyan-400 to-teal-500',
  },
  {
    icon: Leaf,
    title: 'Eco Options',
    description: 'Sustainable and recycled material choices',
    color: 'from-green-400 to-emerald-600',
  },
]

export function Benefits() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
              Our Advantages
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Why Choose EU PrintGround?
            </h2>
            <p className="text-gray-500 mb-8 text-lg">
              With over 10 years of experience serving businesses across Europe, we understand 
              what corporate clients need. Quality, reliability, and competitive pricing.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${benefit.color} flex items-center justify-center flex-shrink-0`}>
                    <benefit.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1 text-sm">{benefit.title}</h3>
                    <p className="text-xs text-gray-500">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-primary via-blue-600 to-accent rounded-3xl p-8 text-white shadow-2xl">
              <div className="text-center mb-8">
                <p className="text-7xl font-bold text-white mb-2">10+</p>
                <p className="text-xl text-white/90">Years of Excellence</p>
              </div>
              <div className="grid grid-cols-2 gap-6 text-center">
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-3xl font-bold text-accent">1000+</p>
                  <p className="text-sm text-white/80">Happy Clients</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-3xl font-bold text-accent">27</p>
                  <p className="text-sm text-white/80">EU Countries</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-3xl font-bold text-accent">1500+</p>
                  <p className="text-sm text-white/80">Products</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-3xl font-bold text-accent">21+</p>
                  <p className="text-sm text-white/80">Techniques</p>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/30 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/30 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
