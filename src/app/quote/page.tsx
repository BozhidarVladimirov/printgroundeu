'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { CheckCircle, Send, Loader2, ArrowLeft, Package, Clock, Shield, Phone, Mail, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface QuoteForm {
  companyName: string
  contactName: string
  email: string
  phone: string
  country: string
  productCategory: string
  productInterest: string
  quantity: string
  brandingTechnique: string
  deadline: string
  budget: string
  additionalInfo: string
}

const productCategories = [
  'Technology & Gadgets',
  'Bags & Backpacks',
  'Drinkware & Bottles',
  'Textile & Apparel',
  'Office Supplies',
  'Sports & Outdoor',
  'Personal & Travel',
  'Keychains & Tools',
  'Writing Instruments',
  'Other / Not Sure',
]

const euCountries = [
  { code: 'AT', name: 'Austria' },
  { code: 'BE', name: 'Belgium' },
  { code: 'BG', name: 'Bulgaria' },
  { code: 'HR', name: 'Croatia' },
  { code: 'CY', name: 'Cyprus' },
  { code: 'CZ', name: 'Czech Republic' },
  { code: 'DK', name: 'Denmark' },
  { code: 'EE', name: 'Estonia' },
  { code: 'FI', name: 'Finland' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'GR', name: 'Greece' },
  { code: 'HU', name: 'Hungary' },
  { code: 'IE', name: 'Ireland' },
  { code: 'IT', name: 'Italy' },
  { code: 'LV', name: 'Latvia' },
  { code: 'LT', name: 'Lithuania' },
  { code: 'LU', name: 'Luxembourg' },
  { code: 'MT', name: 'Malta' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'PL', name: 'Poland' },
  { code: 'PT', name: 'Portugal' },
  { code: 'RO', name: 'Romania' },
  { code: 'SK', name: 'Slovakia' },
  { code: 'SI', name: 'Slovenia' },
  { code: 'ES', name: 'Spain' },
  { code: 'SE', name: 'Sweden' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'OTHER', name: 'Other Country' },
]

export default function QuotePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const productSku = searchParams.get('product') || ''
  const productName = searchParams.get('name') || ''
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [form, setForm] = useState<QuoteForm>({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    country: '',
    productCategory: '',
    productInterest: productName,
    quantity: '',
    brandingTechnique: '',
    deadline: '',
    budget: '',
    additionalInfo: productSku ? `Product SKU: ${productSku}` : '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      
      if (!response.ok) throw new Error('Failed to send')
    } catch (error) {
      console.error('Error sending email:', error)
    }
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary/5 flex items-center justify-center p-4">
        <Card className="max-w-lg w-full text-center">
          <CardContent className="pt-12 pb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Quote Request Sent!</h2>
            <p className="text-gray-600 mb-8">
              Thank you for your interest in PrintGround. Our team will review your request and send you a personalized quote within 24 hours.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="font-semibold mb-2">What happens next?</h3>
              <ol className="text-sm text-gray-600 text-left space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">1</span>
                  Our team reviews your request
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">2</span>
                  We prepare a customized quote with pricing
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">3</span>
                  You receive the quote via email
                </li>
              </ol>
            </div>
            <div className="flex flex-col gap-3">
              <Button onClick={() => router.push('/catalog')} className="w-full bg-accent hover:bg-accent/90">
                Continue Shopping
              </Button>
              <Button variant="outline" onClick={() => router.push('/')}>
                Return Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/90 text-white py-16">
        <div className="container mx-auto px-4">
          <Link href="/catalog" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Catalog
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Request a Quote</h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Get a personalized quote for your bulk order. Our team responds within 24 hours with competitive pricing and production timelines.
          </p>
          <div className="flex flex-wrap gap-6 mt-8">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-accent" />
              <span className="text-sm">24h Response</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-accent" />
              <span className="text-sm">Free Design Support</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-accent" />
              <span className="text-sm">EU-Wide Delivery</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Tell Us About Your Project</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Contact Info */}
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center gap-2 text-primary">
                      <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm">1</span>
                      Contact Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Company Name *
                        </label>
                        <Input
                          required
                          name="companyName"
                          value={form.companyName}
                          onChange={handleChange}
                          placeholder="Your company"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Contact Name *
                        </label>
                        <Input
                          required
                          name="contactName"
                          value={form.contactName}
                          onChange={handleChange}
                          placeholder="Your full name"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address *
                        </label>
                        <Input
                          required
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@company.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <Input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+1 234 567 890"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country / Region *
                      </label>
                      <select
                        required
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                        className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                      >
                        <option value="">Select your country</option>
                        {euCountries.map(country => (
                          <option key={country.code} value={country.code}>{country.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="border-t pt-8">
                    <h3 className="font-semibold mb-4 flex items-center gap-2 text-primary">
                      <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm">2</span>
                      Product Requirements
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Product Category *
                        </label>
                        <select
                          required
                          name="productCategory"
                          value={form.productCategory}
                          onChange={handleChange}
                          className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                        >
                          <option value="">Select a category</option>
                          {productCategories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Specific Product
                        </label>
                        <Input
                          name="productInterest"
                          value={form.productInterest}
                          onChange={handleChange}
                          placeholder="e.g., Wireless Headphones, T-Shirts"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Quantity *
                        </label>
                        <Input
                          required
                          type="number"
                          name="quantity"
                          value={form.quantity}
                          onChange={handleChange}
                          placeholder="e.g., 500"
                          min="1"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Budget Range
                        </label>
                        <select
                          name="budget"
                          value={form.budget}
                          onChange={handleChange}
                          className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                        >
                          <option value="">Select range</option>
                          <option value="<500">Under €500</option>
                          <option value="500-1000">€500 - €1,000</option>
                          <option value="1000-2500">€1,000 - €2,500</option>
                          <option value="2500-5000">€2,500 - €5,000</option>
                          <option value="5000-10000">€5,000 - €10,000</option>
                          <option value=">10000">Over €10,000</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Deadline
                        </label>
                        <Input
                          type="date"
                          name="deadline"
                          value={form.deadline}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Preferred Branding Technique
                      </label>
                      <select
                        name="brandingTechnique"
                        value={form.brandingTechnique}
                        onChange={handleChange}
                        className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                      >
                        <option value="">Select technique (optional)</option>
                        <option value="screen">Screen Printing</option>
                        <option value="digital">Digital Printing / DTG</option>
                        <option value="embroidery">Embroidery</option>
                        <option value="laser">Laser Engraving</option>
                        <option value="heat">Heat Transfer</option>
                        <option value="sublimation">Sublimation</option>
                        <option value="unsure">Not sure - need advice</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Information
                    </label>
                    <textarea
                      name="additionalInfo"
                      value={form.additionalInfo}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="Tell us about your project, logo files, specific colors, special requirements..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-accent hover:bg-accent/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Submit Quote Request
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Why Request a Quote?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { icon: Package, title: 'Volume Discounts', desc: 'Special pricing for bulk orders' },
                  { icon: Shield, title: 'Custom Solutions', desc: 'Tailored recommendations' },
                  { icon: Clock, title: 'Fast Response', desc: 'Quote within 24 hours' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{item.title}</h4>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <a href="tel:+359896718110" className="flex items-center gap-3 text-primary hover:underline">
                  <Phone className="w-5 h-5" />
                  +359 896 718 110
                </a>
                <a href="mailto:sales@printground.net" className="flex items-center gap-3 text-primary hover:underline">
                  <Mail className="w-5 h-5" />
                  sales@printground.net
                </a>
                <div className="flex items-center gap-3 text-gray-600">
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Available
                </div>
                <p className="text-xs text-gray-500 pt-2">
                  Mon - Fri / 9:00 - 17:00
                </p>
              </CardContent>
            </Card>

            {/* Promo */}
            <Card className="bg-gradient-to-br from-accent to-orange-500 text-white border-0">
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-2">10% Off First Order</h3>
                <p className="text-white/90 text-sm mb-3">
                  New customer? Use code WELCOME10 for 10% off your first bulk order.
                </p>
                <div className="bg-white/20 rounded-lg px-4 py-2 text-center font-mono font-bold">
                  WELCOME10
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
