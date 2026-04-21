'use client'

import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold">Cookie Policy</h1>
          <p className="text-white/80 mt-2">Last updated: March 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <Card>
          <CardContent className="prose max-w-none pt-8">
            <h2>What Are Cookies?</h2>
            <p>
              Cookies are small text files stored on your device when you visit a website. They help 
              websites remember your preferences and improve your browsing experience.
            </p>

            <h2>How We Use Cookies</h2>
            <p>We use cookies for the following purposes:</p>
            <ul>
              <li><strong>Essential Cookies:</strong> Required for the website to function properly (shopping cart, checkout)</li>
              <li><strong>Analytics:</strong> Help us understand how visitors use our website (Google Analytics)</li>
              <li><strong>Marketing:</strong> Used to deliver relevant advertisements (Facebook Pixel)</li>
            </ul>

            <h2>Types of Cookies We Use</h2>
            <table>
              <thead>
                <tr>
                  <th>Cookie Type</th>
                  <th>Purpose</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Session Cookies</td>
                  <td>Remember your cart and preferences</td>
                  <td>Session</td>
                </tr>
                <tr>
                  <td>Analytics</td>
                  <td>Website traffic analysis</td>
                  <td>2 years</td>
                </tr>
                <tr>
                  <td>Marketing</td>
                  <td>Ad personalization</td>
                  <td>90 days</td>
                </tr>
              </tbody>
            </table>

            <h2>Managing Your Preferences</h2>
            <p>
              You can control cookies through your browser settings. Disabling cookies may affect 
              website functionality.
            </p>
            <ul>
              <li><a href="https://www.aboutcookies.org" target="_blank" rel="noopener">AboutCookies.org</a> - General cookie information</li>
              <li><a href="https://www.youronlinechoices.com" target="_blank" rel="noopener">Your Online Choices</a> - EU-based ad preferences</li>
            </ul>

            <h2>Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy periodically. Check back for the latest information.
            </p>

            <h2>Contact</h2>
            <p>
              Print Ground Ltd.<br />
              Business Park Flavia, Plovdiv, Bulgaria<br />
              Email: info@printground.net
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
