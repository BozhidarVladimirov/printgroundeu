'use client'

import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
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

      <div className="container mx-auto px-4 py-12">
        <Card>
          <CardContent className="prose max-w-none pt-8 space-y-6">
            <h2>Introduction</h2>
            <p>
              This Privacy Policy explains how Print Ground EU ("we", "us", or "our") collects, uses, 
              and protects your personal data in accordance with the General Data Protection Regulation (GDPR).
            </p>

            <h2>What is GDPR?</h2>
            <p>
              The General Data Protection Regulation (GDPR) came into effect on May 25, 2018 and imposes 
              new requirements for the processing of personal data. This policy outlines how we handle 
              your data and your rights regarding your personal information.
            </p>

            <h2>Why Do We Need Cookies and/or Personal Data?</h2>
            <p>The functionality of our website depends on how well we can use the information you provide. Depending on whether you consent to the processing of your personal data, different features will be available to you:</p>
            <ul>
              <li><strong>Essential Cookies:</strong> Required for storing payment steps, login, preferences, and site settings. Without them, the website would not function properly.</li>
              <li><strong>Account Data:</strong> Name, phone, and email are necessary to place orders, generate purchase records, and provide ongoing support.</li>
              <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements, business promotion content, and notifications about new products/services.</li>
            </ul>

            <h2>Your Rights</h2>
            <p>Under GDPR, almost all statistical data that can identify a user is considered personal information:</p>
            <ul>
              <li>You must explicitly consent to your data being processed for each specific purpose</li>
              <li>You can edit, delete, and export your personal data</li>
              <li>You must be notified when your data security is compromised</li>
              <li>You have the right to know how your data is stored, what security measures are in place, and who has access</li>
            </ul>

            <h2>What Personal Data Do We Process?</h2>
            <p>By clicking "I Agree" on our cookie notice, you consent to us using pseudonymous data for global traffic statistics, including:</p>
            <ul>
              <li>IP address</li>
              <li>Referrer URL</li>
              <li>Browser/OS information</li>
            </ul>
            <p>If you consent, this data will be used solely for website traffic analytics and remarketing through Google and/or Facebook platforms.</p>
            <p>If you do not consent, your data will not be stored, shared with third parties, or processed.</p>

            <h2>How to Exercise Your Rights</h2>
            <p>
              To edit your profile, click on your username/profile icon. To unsubscribe from marketing communications, 
              delete your account, or request all data related to your account, please contact us via email. 
              Response time is within one month.
            </p>

            <h2>Data Storage and Security</h2>
            <p>
              Data sent to our website is transmitted via HTTPS—the most secure method currently available 
              for encrypting data sent from user to server. Passwords and sensitive information in our 
              database are additionally hashed/encrypted. Server facilities are accessible only to 
              administrators with special access and comply with EU regulations.
            </p>

            <h2>Data Retention</h2>
            <ul>
              <li><strong>Anonymous data:</strong> Stored for statistical purposes as long as necessary for the requested functionality</li>
              <li><strong>Registration data:</strong> Stored lawfully for statistical, technical, and reference purposes</li>
            </ul>

            <h2>Data Recipients</h2>
            <p>Data received directly from your browser is sent to traffic analysis systems to improve our service. Third-party tools we use:</p>
            <ul>
              <li><a href="https://privacy.google.com/businesses/compliance/" target="_blank" rel="noopener">Google Analytics</a></li>
              <li><a href="https://www.facebook.com/business/gdpr" target="_blank" rel="noopener">Facebook</a></li>
            </ul>
            <p>Payment method data (PayPal, ePay, etc.) is subject to their own terms and is not our responsibility. We do not store your payment information.</p>

            <h2>Cookies</h2>
            <p>To make this website work properly, we sometimes store small data files called cookies on your device.</p>
            <p><strong>What are cookies?</strong> Cookies are small text files stored on your computer or mobile device when you visit a website. They allow the website to remember your actions and preferences (such as login, language, font size, order contents, and other display settings) for a certain period of time.</p>
            <p><strong>How do you control cookies?</strong> You can control and/or delete cookies as you wish. For more information, visit <a href="https://www.aboutcookies.org" target="_blank" rel="noopener">aboutcookies.org</a>.</p>

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