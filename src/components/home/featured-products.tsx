'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Laptop, ShoppingBag, Coffee, Shirt, Briefcase, Dumbbell, Gift, Key, Pen } from 'lucide-react'
import { ProductCard } from '@/components/product/product-card'
import { products, categories } from '@/data/products'
import { Button } from '@/components/ui/button'

// Static featured products with proper English names
const getFeaturedProducts = () => {
  const featuredSkus = ['92083', '11078', '11031', '36004', '11061', '13212', '30102', '30106']
  
  return featuredSkus
    .map(sku => products.find(p => p.sku === sku))
    .filter((p): p is NonNullable<typeof p> => p !== undefined)
}

const featuredProducts = getFeaturedProducts()

const categoryIcons: Record<string, typeof Laptop> = {
  'Technology': Laptop,
  'Bags': ShoppingBag,
  'Drinkware': Coffee,
  'Textile': Shirt,
  'Office': Briefcase,
  'Sports & Outdoor': Dumbbell,
  'Personal & Travel': ShoppingBag,
  'Kids & Xmas': Gift,
  'Keychains & Tools': Key,
  'Write': Pen,
}

export function FeaturedProducts() {
  return (
    <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4"
        >
          <div>
            <span className="inline-block px-4 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
              Popular Choices
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">
              Featured Products
            </h2>
            <p className="text-gray-500">
              Our most popular items for corporate branding
            </p>
          </div>
          <Link href="/catalog">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white group">
              View All Products
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
          {featuredProducts.slice(0, 8).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex justify-center"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Categories() {
  const displayCategories = categories.slice(0, 8)
  
  const categoryColors = [
    'from-blue-500 to-blue-600',
    'from-green-500 to-green-600',
    'from-orange-500 to-orange-600',
    'from-purple-500 to-purple-600',
    'from-red-500 to-red-600',
    'from-cyan-500 to-cyan-600',
    'from-pink-500 to-pink-600',
    'from-indigo-500 to-indigo-600',
  ]
  
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
            Our Collection
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our extensive collection of branded merchandise across all categories
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {displayCategories.map((category, index) => {
            const IconComponent = categoryIcons[category.name] || Gift
            const slug = category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
            const colorClass = categoryColors[index % categoryColors.length]
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link href={`/catalog?category=${slug}`}>
                  <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-xl hover:border-transparent border-2 border-transparent transition-all group cursor-pointer h-full relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${colorClass} opacity-0 group-hover:opacity-10 transition-opacity`} />
                    <div className={`relative w-16 h-16 bg-gradient-to-br ${colorClass} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:shadow-lg transition-all`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {category.productCount}+ products
                    </p>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        <div className="text-center mt-10">
          <Link href="/catalog">
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 group">
              Browse All Categories
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
