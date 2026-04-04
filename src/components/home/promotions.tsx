'use client'

import { motion } from 'framer-motion'
import { Gift, Percent, Truck, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'

const promotions = [
  {
    icon: Percent,
    title: '10% Off First Order',
    description: 'New customers get 10% off their first bulk order',
    code: 'WELCOME10',
    color: 'bg-accent',
  },
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Free shipping on orders over €500 within EU',
    color: 'bg-green-600',
  },
  {
    icon: Clock,
    title: 'Rush Orders',
    description: 'Priority production for urgent deadlines',
    color: 'bg-blue-600',
  },
  {
    icon: Gift,
    title: 'Free Samples',
    description: 'Request free samples before bulk order',
    color: 'bg-purple-600',
  },
]

export function Promotions() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary/90">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Special Offers & Promotions
          </h2>
          <p className="text-gray-200 max-w-2xl mx-auto">
            Take advantage of our exclusive deals and save on your next corporate order
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {promotions.map((promo, index) => (
            <motion.div
              key={promo.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 ${promo.color} rounded-full mb-4`}>
                <promo.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-primary mb-2">{promo.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{promo.description}</p>
              {promo.code && (
                <div className="bg-gray-100 rounded-lg p-3 text-center">
                  <span className="text-xs text-gray-500">Use code:</span>
                  <p className="font-mono font-bold text-primary">{promo.code}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button className="bg-white text-primary hover:bg-gray-100">
            View All Promotions
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
