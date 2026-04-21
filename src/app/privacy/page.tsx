'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p className="text-white/80 mt-2">Last updated: March 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <Card>
          <CardContent className="prose max-w-none pt-8">
            <h2>1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you create an account, 
              place an order, subscribe to our newsletter, or contact us for support. This includes:
            </p>
            <ul>
              <li>Contact information (name, email address, phone number, company name)</li>
              <li>Billing and shipping address</li>
              <li>Order details and preferences</li>
              <li>Communication history</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Process and fulfill your orders</li>
              <li>Send order confirmations and updates</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Improve our products and services</li>
            </ul>

            <h2>3. Information Sharing</h2>
            <p>
              We do not sell your personal information. We may share your information with:
            </p>
            <ul>
              <li>Service providers who assist in our operations (payment processors, shipping carriers)</li>
              <li>Legal authorities when required by law</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal data 
              against unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2>5. Your Rights</h2>
            <p>Under GDPR, you have the right to:</p>
            <ul>
              <li>Access your personal data</li>
              <li>Rectify inaccurate data</li>
              <li>Erase your data (&quot;right to be forgotten&quot;)</li>
              <li>Restrict processing</li>
              <li>Data portability</li>
              <li>Object to processing</li>
            </ul>

            <h2>6. Cookies</h2>
            <p>
              Our website uses cookies to enhance your browsing experience. You can control cookie 
              settings through your browser preferences.
            </p>

            <h2>7. Contact Us</h2>
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
