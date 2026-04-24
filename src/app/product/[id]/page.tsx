'use client'

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, Check, Printer, Palette, Scissors, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ProductGallery } from '@/components/product/product-gallery'
import { ProductInfo } from '@/components/product/product-info'
import { ProductCard } from '@/components/product/product-card'
import { getProductById, products, techniques } from '@/data/products'

const techniqueIcons: Record<string, typeof Printer> = {
  'Screen Printing': Printer,
  'Digital Printing': Palette,
  'Embroidery': Scissors,
  'Laser Engraving': Zap,
  'Digital Transfer': Printer,
  'Transfer': Printer,
  'DTG': Palette,
  'Pad Printing': Printer,
  'Sublimation': Palette,
}

const categoryDescriptions: Record<string, string> = {
  'Technology': 'Modern tech accessory with your logo — practical and memorable.',
  'Bags': 'Durable bag with ample storage, perfect for everyday corporate use.',
  'Textile': 'Premium quality apparel for events, workwear and brand promotion.',
  'Office': 'Professional office essential with elegant branding possibilities.',
  'Drinkware': 'Quality drinkware that keeps your brand top-of-mind all day.',
  'Keychains & Tools': 'Compact and practical — a cost-effective branded giveaway.',
  'Write': 'Smooth-writing instrument, ideal for corporate branding and office use.',
  'Sports & Outdoor': 'Performance gear for active lifestyles — your brand on the move.',
  'Personal & Travel': 'Travel companion that represents your brand wherever you go.',
  'Kids & Xmas': 'Fun and festive items perfect for seasonal promotions and events.',
  'Other': 'Unique branded merchandise to make your business stand out.',
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params
  const product = getProductById(id)

  if (!product) {
    notFound()
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 8)

  const getTechniqueIcon = (tech: string) => {
    for (const [key, icon] of Object.entries(techniqueIcons)) {
      if (tech.toLowerCase().includes(key.toLowerCase())) {
        return icon
      }
    }
    return Check
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/catalog" className="hover:text-primary">Catalog</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/catalog?category=${product.category.toLowerCase().replace(/[^a-z]/g, '-')}`} className="hover:text-primary">
              {product.category}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 p-6 lg:p-8">
            {/* Gallery */}
            <ProductGallery images={product.images} productName={product.name} />

            {/* Info */}
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-8">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Tab Headers */}
            <div className="border-b">
              <div className="flex gap-8 px-6">
                <button className="py-4 border-b-2 border-primary text-primary font-medium">
                  Product Details
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {/* Product Details Tab */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Product Information</h3>
                <p className="text-gray-600 mb-6">
                  {product.description?.trim() && !product.description.includes('High-quality promotional product')
                    ? product.description
                    : categoryDescriptions[product.category?.toLowerCase()] || "High-quality branded merchandise for corporate use."}
                </p>
                
                {/* SKU */}
                <div className="mb-4">
                  <span className="font-medium text-gray-700">SKU: </span>
                  <span className="text-gray-600">{product.sku}</span>
                </div>

                {/* Colors */}
                {product.colors.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-700 mb-3">Available Colors</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color: string) => (
                        <Badge key={color} variant="secondary" className="px-3 py-1">
                          {color}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Materials */}
                {product.materials.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-700 mb-3">Materials</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.materials.map((material: string) => (
                        <Badge key={material} variant="outline">
                          {material}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dimensions */}
                {product.dimensions && (
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-700 mb-2">Dimensions</h4>
                    <p className="text-gray-600">{product.dimensions}</p>
                  </div>
                )}
              </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Related Products</h2>
              <Link href={`/catalog?category=${product.category.toLowerCase().replace(/[^a-z]/g, '-')}`}>
                <Button variant="outline">View All</Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-r from-primary to-accent rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Need Help Choosing?</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Our team is ready to help you find the perfect product for your branding needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Contact Us
              </Button>
            </Link>
            <Link href="/quote">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                Get a Quote
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
