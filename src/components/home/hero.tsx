'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Truck, Shield, Clock, Sparkles, Zap, Package, Users, Award, Globe, CheckCircle, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-primary text-white">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute top-20 right-20 w-4 h-4 bg-accent rounded-full animate-pulse" />
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-white rounded-full animate-pulse" />
      </div>

      <div className="container mx-auto px-4 py-16 lg:py-24 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">Trusted by 1000+ Happy Clients</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Premium Corporate
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400">
                Merchandise
              </span>
              <br />
              for Your Brand
            </h1>

            <p className="text-lg text-gray-300 mb-8 max-w-xl">
              From idea to delivery - everything in one place. High-quality branded products 
              with fast delivery across all 27 EU countries.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/catalog">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white w-full sm:w-auto text-base px-8">
                  Browse Catalog
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/quote">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-slate-900 w-full sm:w-auto">
                  Get Free Quote
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm">Free Design Support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm">21+ Printing Techniques</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm">1500+ Products</span>
              </div>
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Package, label: '1500+ Products', color: 'from-blue-500 to-blue-600' },
                  { icon: Truck, label: 'EU Delivery', color: 'from-green-500 to-green-600' },
                  { icon: Award, label: 'Premium Quality', color: 'from-purple-500 to-purple-600' },
                  { icon: Clock, label: 'Fast Turnaround', color: 'from-orange-500 to-orange-600' },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                    className={`bg-gradient-to-br ${item.color} rounded-2xl p-5 text-center`}
                  >
                    <item.icon className="w-8 h-8 text-white mx-auto mb-2" />
                    <p className="text-sm font-semibold text-white">{item.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -right-4 top-1/4 bg-accent text-white rounded-2xl shadow-2xl p-5"
            >
              <p className="text-3xl font-bold">10%</p>
              <p className="text-sm">OFF First Order</p>
              <p className="text-xs opacity-80 mt-1">Code: WELCOME10</p>
            </motion.div>

            {/* Mini Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="absolute -left-4 bottom-1/4 bg-white text-primary rounded-xl shadow-xl p-3"
            >
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span className="font-bold">1000+</span>
              </div>
              <p className="text-xs text-gray-500">Happy Clients</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export function PromotionsBanner() {
  const promotions = [
    { 
      title: '10% OFF First Order', 
      subtitle: 'Use code WELCOME10',
      badge: 'New Customers',
      gradient: 'from-accent to-orange-500'
    },
    { 
      title: 'Free Setup', 
      subtitle: 'Orders over €500',
      badge: 'Limited Time',
      gradient: 'from-green-500 to-emerald-600'
    },
    { 
      title: 'Express Delivery', 
      subtitle: '24-48 hours',
      badge: 'Popular',
      gradient: 'from-blue-500 to-indigo-600'
    },
    { 
      title: 'Bulk Discounts', 
      subtitle: 'Up to 25% off',
      badge: 'Best Value',
      gradient: 'from-purple-500 to-pink-600'
    },
  ]

  return (
    <section className="bg-gradient-to-r from-gray-50 via-white to-gray-50 py-8 border-y border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {promotions.map((promo, i) => (
            <motion.div
              key={promo.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-lg hover:border-transparent transition-all group"
            >
              <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${promo.gradient} text-white mb-2 shadow-sm`}>
                {promo.badge}
              </div>
              <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors">{promo.title}</h3>
              <p className="text-sm text-gray-500">{promo.subtitle}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
