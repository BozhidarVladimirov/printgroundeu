'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold">Terms of Service</h1>
          <p className="text-white/80 mt-2">Last updated: March 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <Card>
          <CardContent className="prose max-w-none pt-8">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using the PrintGround EU website, you accept and agree to be bound 
              by the terms and conditions of this agreement.
            </p>

            <h2>2. Products and Services</h2>
            <p>
              All products displayed on our website are subject to availability. We reserve the right 
              to limit quantities and to correct pricing errors.
            </p>

            <h2>3. Pricing</h2>
            <p>
              All prices are in Euros (€) and include VAT. Prices are subject to change without notice. 
              Final pricing will be confirmed in your quote.
            </p>

            <h2>4. Orders and Payment</h2>
            <p>
              Orders are confirmed upon receipt of payment or written acceptance of quote. We accept 
              bank transfer and major credit cards.
            </p>

            <h2>5. Shipping and Delivery</h2>
            <p>
              Delivery times are estimates and may vary. Shipping costs are calculated based on weight, 
              dimensions, and destination. EU delivery available to all 27 member states.
            </p>

            <h2>6. Branding and Customization</h2>
            <p>
              Custom products are non-returnable. We require final approval of artwork proofs before 
              production begins.
            </p>

            <h2>7. Returns and Refunds</h2>
            <p>
              Standard products may be returned within 14 days in original condition. Custom branded 
              products are non-returnable. See our return policy for details.
            </p>

            <h2>8. Intellectual Property</h2>
            <p>
              All designs, logos, and artwork provided by customers must not infringe on third-party 
              intellectual property rights.
            </p>

            <h2>9. Limitation of Liability</h2>
            <p>
              PrintGround EU shall not be liable for any indirect, incidental, or consequential damages.
            </p>

            <h2>10. Contact</h2>
            <p>
              Print Ground Ltd.<br />
              Business Park Flavia, Plovdiv, Bulgaria<br />
              Email: info@printground.net<br />
              Phone: (+359) 896 718 110
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
