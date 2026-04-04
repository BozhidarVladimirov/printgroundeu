'use client'

import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Clock, Send } from 'lucide-react'

const footerLinks = {
  products: [
    { label: 'Technology', href: '/catalog?category=technology' },
    { label: 'Bags & Backpacks', href: '/catalog?category=bags' },
    { label: 'Drinkware', href: '/catalog?category=drinkware' },
    { label: 'Textile & Apparel', href: '/catalog?category=textile' },
    { label: 'Office Supplies', href: '/catalog?category=office' },
    { label: 'Sports & Outdoor', href: '/catalog?category=sports-outdoor' },
    { label: 'Writing Instruments', href: '/catalog?category=write' },
    { label: 'Keychains & Tools', href: '/catalog?category=keychains-tools' },
  ],
  services: [
    { label: 'Printing Services', href: '/printing' },
    { label: 'Get a Quote', href: '/quote' },
    { label: 'Design Support', href: '/contact' },
    { label: 'Sample Requests', href: '/contact' },
    { label: 'Bulk Orders', href: '/contact' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Careers', href: '/contact' },
  ],
  support: [
    { label: 'FAQ', href: '/contact' },
    { label: 'Shipping Info', href: '/contact' },
    { label: 'Track Order', href: '/contact' },
    { label: 'Returns', href: '/contact' },
    { label: 'File Upload', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/contact' },
    { label: 'Terms of Service', href: '/contact' },
    { label: 'Cookie Policy', href: '/contact' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-primary to-accent rounded-lg p-2">
                <span className="text-white font-bold text-xl">PG</span>
              </div>
              <div>
                <span className="font-bold text-xl">PrintGround</span>
                <p className="text-xs text-gray-400">Corporate Merchandise</p>
              </div>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm">
              Your trusted partner for premium corporate merchandise and branded products across Europe. 
              Serving 500+ businesses since 2015.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm text-gray-400 mb-6">
              <p className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
                Business Park Flavia, Plovdiv, Bulgaria
              </p>
              <p className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                (+359) 896 718 110
              </p>
              <p className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                sales@printground.net
              </p>
              <p className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-accent flex-shrink-0" />
                Mon - Fri / 9:00 - 17:00
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-accent rounded-full flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-accent rounded-full flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-accent rounded-full flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-accent rounded-full flex items-center justify-center transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Products</h3>
            <ul className="space-y-3 text-sm">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Services</h3>
            <ul className="space-y-3 text-sm">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-3 text-sm">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            <h3 className="font-semibold mb-4 mt-8 text-white">Support</h3>
            <ul className="space-y-3 text-sm">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Newsletter</h3>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe for exclusive offers and new products
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-accent text-sm"
              />
              <button className="px-4 py-2 bg-accent hover:bg-accent/90 rounded-lg transition-colors">
                <Send className="w-5 h-5" />
              </button>
            </form>
            
            {/* Trust Badges */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-2xl font-bold text-accent">27</p>
                  <p className="text-xs text-gray-400">EU Countries</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-2xl font-bold text-accent">21+</p>
                  <p className="text-xs text-gray-400">Techniques</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} PrintGround Ltd. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              {footerLinks.legal.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
