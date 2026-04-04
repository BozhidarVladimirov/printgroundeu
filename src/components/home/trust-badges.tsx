'use client'

import { motion } from 'framer-motion'
import { trustStats } from '@/data/products'
import { Award, Users, Package, Globe, Truck, Clock } from 'lucide-react'

const icons = [Award, Users, Package, Globe, Truck, Clock]
const colors = [
  'from-yellow-400 to-orange-500',
  'from-green-400 to-emerald-500',
  'from-purple-400 to-pink-500',
  'from-blue-400 to-indigo-500',
]

export function TrustBadges() {
  return (
    <section className="py-16 bg-gradient-to-r from-gray-50 via-white to-gray-50 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {trustStats.map((stat, index) => {
            const Icon = icons[index]
            const colorClass = colors[index % colors.length]
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center min-w-[150px] bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${colorClass} rounded-full mb-3 shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <p className="text-3xl font-bold text-primary mb-1">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
