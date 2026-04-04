import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, Check, Truck, Shield, Clock, Printer, Palette, Scissors, Zap } from 'lucide-react'
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
                <button className="py-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium">
                  Branding Options
                </button>
                <button className="py-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium">
                  Shipping & Delivery
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {/* Product Details Tab */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Product Information</h3>
                <p className="text-gray-600 mb-6">{product.description}</p>
                
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
                      {product.colors.map((color) => (
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
                      {product.materials.map((material) => (
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

              {/* Branding Options */}
              <div className="mt-8 pt-8 border-t">
                <h3 className="text-lg font-semibold mb-6">Personalization Options</h3>
                
                {/* Available Techniques */}
                <div className="mb-8">
                  <h4 className="font-medium text-gray-700 mb-4">Available Printing Techniques</h4>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {product.availableTechniques.map((tech, index) => {
                      const IconComponent = getTechniqueIcon(tech)
                      return (
                        <Card key={index} className="hover:border-primary transition-colors">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                <IconComponent className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <h5 className="font-medium text-sm">{tech}</h5>
                                <p className="text-xs text-gray-500 mt-1">
                                  {techniques.find(t => t.name === tech)?.description || 'Professional branding service'}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </div>

                {/* Branding Zones */}
                {product.brandingZones.length > 0 && (
                  <div className="mb-8">
                    <h4 className="font-medium text-gray-700 mb-4">Branding Areas</h4>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {product.brandingZones.map((zone) => (
                        <Card key={zone.id} className="bg-gray-50">
                          <CardContent className="p-4">
                            <h5 className="font-medium text-sm mb-2">{zone.name}</h5>
                            <div className="space-y-1 text-xs text-gray-600">
                              <p><span className="font-medium">Size:</span> {zone.dimensions}</p>
                              <p><span className="font-medium">Max Colors:</span> {zone.maxColors}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Free Design Service */}
                <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Check className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary mb-1">Free Design Support</h4>
                      <p className="text-sm text-gray-600">
                        Our design team will help optimize your artwork for the best print results. 
                        Free visual mockup before production.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Tab */}
              <div className="mt-8 pt-8 border-t">
                <h3 className="text-lg font-semibold mb-6">Shipping & Delivery</h3>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-6 bg-gray-50 rounded-xl">
                    <Truck className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h4 className="font-medium mb-1">EU-Wide Delivery</h4>
                    <p className="text-sm text-gray-600">Delivery to 27 EU countries</p>
                  </div>
                  <div className="text-center p-6 bg-gray-50 rounded-xl">
                    <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h4 className="font-medium mb-1">Fast Production</h4>
                    <p className="text-sm text-gray-600">5-10 business days</p>
                  </div>
                  <div className="text-center p-6 bg-gray-50 rounded-xl">
                    <Shield className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h4 className="font-medium mb-1">Quality Guarantee</h4>
                    <p className="text-sm text-gray-600">Full replacement policy</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-medium mb-3">Order Information</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Minimum order quantity: <strong>{product.minOrderQuantity} units</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Volume discounts available for larger orders</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Mix colors and sizes in one order</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Free visual mockup before production</span>
                    </li>
                  </ul>
                </div>
              </div>
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
