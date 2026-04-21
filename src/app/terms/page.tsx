'use client'

import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold">General Terms and Conditions</h1>
          <p className="text-white/80 mt-2">Last updated: March 2025</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Card>
          <CardContent className="prose max-w-none pt-8 space-y-6">
            <h2>Subject</h2>
            <p>
              These Terms and Conditions govern the purchase agreement between Print Ground EU 
              ("Company") and the customer ("Customer") for products sold through our online store 
              at eu.printground.net.
            </p>

            <h2>Customers</h2>
            <p>To place valid orders, you must:</p>
            <ul>
              <li>Be a legally competent adult (18+) or a registered legal entity</li>
              <li>Complete the online registration form accurately with full and true information</li>
              <li>Accept these Terms and Conditions and agree to abide by them</li>
            </ul>
            <p>The Company reserves the right to suspend any account with incorrect data or violations.</p>

            <h2>Order Procedure</h2>
            <p>To place an order:</p>
            <ol>
              <li>Select product type and quantity, click "Add to Cart"</li>
              <li>Specify customization requirements (engraving, printing, etc.)</li>
              <li>Review pricing including any additional customization costs</li>
              <li>Enter delivery information and preferred delivery time</li>
              <li>Select payment method (cash on delivery)</li>
              <li>Accept Terms and Conditions</li>
              <li>Confirm your order</li>
            </ol>

            <h2>Product Information</h2>
            <p>Information published on eu.printground.net includes:</p>
            <ul>
              <li>Company name and address</li>
              <li>Product descriptions and images</li>
              <li>Unit prices including VAT</li>
              <li>Delivery fees and conditions</li>
              <li>Payment methods and delivery times</li>
              <li>Right of withdrawal conditions</li>
            </ul>

            <h2>Prices and Payment</h2>
            <ul>
              <li>All prices are in Euros (€) including VAT</li>
              <li>Prices are per unit and do not include delivery costs</li>
              <li>Payment is made via cash on delivery (pay the courier directly)</li>
            </ul>

            <h2>Delivery</h2>
            <ul>
              <li>Standard delivery time: up to 7 business days (if in stock)</li>
              <li>All orders are shipped via courier with cash on delivery</li>
              <li>Partial deliveries are allowed</li>
              <li>The Company is not responsible for delays caused by force majeure</li>
            </ul>

            <h2>Right of Withdrawal</h2>
            <p>As a consumer, you have the right to withdraw from your purchase within 7 business days 
            of receiving the goods, provided:</p>
            <ul>
              <li>Goods are unused and in original packaging</li>
              <li>Goods are not custom-made per your specifications</li>
            </ul>
            <p>Return shipping costs are borne by the customer. Refunds are processed within 30 days.</p>

            <h2>Exceptions to Right of Withdrawal</h2>
            <p>You cannot withdraw from orders for:</p>
            <ul>
              <li>Custom products (engraved, printed, or otherwise customized at your request)</li>
              <li>Products clearly personalized for your needs</li>
              <li>Sealed items that cannot be returned for hygiene reasons</li>
            </ul>

            <h2>Company Rights</h2>
            <ul>
              <li>Install cookies on your device to enhance browsing experience</li>
              <li>Place links to third-party websites and advertisements</li>
              <li>Send marketing communications with your consent</li>
            </ul>
            <p>The Company is not responsible for external website content or force majeure events.</p>

            <h2>Customer Obligations</h2>
            <ul>
              <li>Provide accurate contact and delivery information</li>
              <li>Pay the full order price including delivery fees</li>
              <li>Protect your password and account credentials</li>
              <li>Not place false or fraudulent orders</li>
              <li>Comply with applicable laws and regulations</li>
            </ul>

            <h2>Personal Data</h2>
            <p>We collect and use customer information for order processing and service improvement. 
            Your data may be shared with analytics services (Google, Facebook) and courier partners 
            for delivery purposes. See our Privacy Policy for full details.</p>

            <h2>Contact</h2>
            <p>
              Print Ground EU<br />
              Business Park Flavia<br />
              Plovdiv, Bulgaria<br />
              Email: info@printground.net<br />
              Phone: (+359) 896 718 110
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}