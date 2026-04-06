export type { Product, BrandingZone, Category, Technique, Testimonial, Promotion, TrustStat } from './products-imported'

import {
  categories,
  techniques,
  products,
  testimonials,
  trustStats,
  promotions,
} from './products-imported'

export {
  categories,
  techniques,
  products,
  testimonials,
  trustStats,
  promotions,
}

export const featuredProducts = products.filter(p => p.featured).slice(0, 8)

export function getProductsByCategory(categorySlug: string) {
  return products.filter(p => p.category.toLowerCase().replace(/[^a-z0-9]+/g, '-') === categorySlug)
}

export function getProductById(id: string) {
  return products.find(p => p.id === id)
}

export function searchProducts(query: string) {
  const q = query.toLowerCase()
  return products.filter(p => 
    p.name.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.sku.toLowerCase().includes(q)
  )
}

export const productList = products
