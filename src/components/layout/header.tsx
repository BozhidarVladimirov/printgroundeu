'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ShoppingCart, Globe, Phone, Mail, ChevronDown, User, Heart, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const categories = [
  { name: 'Technology', slug: 'technology', icon: '💻' },
  { name: 'Bags', slug: 'bags', icon: '🎒' },
  { name: 'Drinkware', slug: 'drinkware', icon: '☕' },
  { name: 'Textile', slug: 'textile', icon: '👕' },
  { name: 'Office', slug: 'office', icon: '📎' },
  { name: 'Sports & Outdoor', slug: 'sports-outdoor', icon: '⚽' },
  { name: 'Personal & Travel', slug: 'personal-travel', icon: '✈️' },
  { name: 'Kids & Xmas', slug: 'kids-xmas', icon: '🎁' },
  { name: 'Keychains & Tools', slug: 'keychains-tools', icon: '🔑' },
  { name: 'Write', slug: 'write', icon: '✏️' },
]

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/catalog' },
  { label: 'Printing', href: '/printing' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Get Quote', href: '/quote', isButton: true },
]

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Top bar */}
      <div className="bg-primary text-white text-sm">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="hidden md:flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              (+359) 896 718 110
            </span>
            <span className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              sales@printground.net
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span>Mon - Fri / 9:00 AM - 17:00 PM</span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline">EU Delivery to 27 Countries</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 lg:h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="PrintGround" className="h-12 lg:h-14 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.filter(item => item.label !== 'Get Quote').map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
            
            {/* Categories Grid Button */}
            <Link href="/catalog">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                All Categories
              </Button>
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 lg:gap-4">
            <Button variant="ghost" size="icon" className="hidden lg:flex">
              <Heart className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                0
              </span>
            </Button>
            <Link href="/quote">
              <Button className="hidden lg:flex bg-accent hover:bg-accent/90">
                Get Quote
              </Button>
            </Link>
            <button
              className="lg:hidden p-2 text-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg transition-all duration-300 max-h-[80vh] overflow-y-auto',
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        )}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-base font-medium text-gray-700 hover:text-primary py-2 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            <div className="pt-2">
              <p className="font-semibold text-primary mb-2">Categories</p>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/catalog?category=${encodeURIComponent(cat.name)}`}
                    className="text-sm text-gray-600 hover:text-primary py-1 flex items-center gap-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>{cat.icon}</span> {cat.name}
                  </Link>
                ))}
              </div>
            </div>
            
            <Link href="/quote" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full mt-4 bg-accent hover:bg-accent/90">Get a Quote</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
