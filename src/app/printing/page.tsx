'use client'

import { motion } from 'framer-motion'
import { Check, Printer, Palette, Scissors, Droplet, Layers, Zap, Award, Box, Flame, Star, Circle, FileText, Shield, Gem } from 'lucide-react'

const printingTechniques = [
  {
    id: 'screen',
    name: 'Screen Printing',
    icon: Printer,
    description: 'The most popular method for printing on textiles and promotional items. Perfect for bold, vibrant designs with up to 8 colors.',
    advantages: [
      'Durable and long-lasting prints',
      'Vibrant colors that stand out',
      'Cost-effective for large quantities',
      'Works on most fabric types',
    ],
    bestFor: ['T-Shirts', 'Polo Shirts', 'Bags', 'Caps', 'Workwear'],
    image: 'https://printground.net/wp-content/uploads/2024/01/SCREEN-PRINTING-150x150.png',
    priceRange: 'From €0.20 per color per item',
  },
  {
    id: 'digital',
    name: 'Digital Printing (DTG)',
    icon: Palette,
    description: 'Direct-to-garment printing allows for photographic quality full-color prints with unlimited colors and gradients.',
    advantages: [
      'Unlimited colors included',
      'Photographic quality output',
      'No setup fees',
      'Perfect for complex designs',
    ],
    bestFor: ['T-Shirts', 'Hoodies', 'Detailed Graphics', 'Photographs'],
    image: 'https://printground.net/wp-content/uploads/2024/01/DIRECT-TO-GARMENT-150x150.png',
    priceRange: 'From €3.50 per item',
  },
  {
    id: 'embroidery',
    name: 'Embroidery',
    icon: Scissors,
    description: 'Elegant stitched look that adds a premium feel to caps, bags, and apparel. Extremely durable and professional.',
    advantages: [
      'Premium, professional appearance',
      'Extremely durable and wash-resistant',
      'Adds texture and dimension',
      'Perfect for corporate branding',
    ],
    bestFor: ['Caps', 'Polo Shirts', 'Jackets', 'Bags', 'Workwear'],
    image: 'https://printground.net/wp-content/uploads/2024/01/EMBROIDERY-150x150.jpg',
    priceRange: 'From €0.50 per stitch',
  },
  {
    id: 'laser',
    name: 'Laser Engraving',
    icon: Zap,
    description: 'Permanent marking technique that etches designs into metal, wood, and other materials for a sophisticated look.',
    advantages: [
      'Permanent, fade-proof marking',
      'Elegant matte finish',
      'No ink or consumables needed',
      'Works on metal and wood',
    ],
    bestFor: ['Pens', 'Keychains', 'USB Drives', 'Awards', 'Metal Items'],
    image: 'https://printground.net/wp-content/uploads/2024/01/LASER-150x150.png',
    priceRange: 'From €0.30 per item',
  },
  {
    id: 'transfer',
    name: 'Heat Transfer',
    icon: Layers,
    description: 'Versatile printing method using heat to transfer designs onto various materials. Great for complex designs.',
    advantages: [
      'Full-color printing included',
      'Works on synthetic fabrics',
      'Detailed graphics possible',
      'Quick turnaround',
    ],
    bestFor: ['Sportswear', 'Synthetics', 'Number Printing', 'Team Uniforms'],
    image: 'https://printground.net/wp-content/uploads/2024/01/TRANSFER-150x150.png',
    priceRange: 'From €1.00 per item',
  },
  {
    id: 'sublimation',
    name: 'Sublimation',
    icon: Droplet,
    description: 'All-over printing technique for polyester items. Colors become part of the fabric for vibrant, durable prints.',
    advantages: [
      'All-over print coverage',
      'No color limitations',
      'Comfortable feel',
      'Colors won\'t crack or fade',
    ],
    bestFor: ['Sportswear', 'Drinkware', 'Mouse Pads', 'Flags', 'Polyester Items'],
    image: 'https://printground.net/wp-content/uploads/2024/01/SUBLIMATION-150x150.png',
    priceRange: 'From €5.00 per item',
  },
  {
    id: 'uv',
    name: 'UV Printing',
    icon: Star,
    description: 'High-quality digital UV printing for various materials with vibrant colors and fast drying time.',
    advantages: [
      'Works on multiple materials',
      'Vivid, durable colors',
      'Fast production time',
      'Eco-friendly technology',
    ],
    bestFor: ['Pens', 'Keychains', 'Notebooks', 'Plastic Items'],
    image: 'https://printground.net/wp-content/uploads/2024/01/DIGITAL-UV-150x150.png',
    priceRange: 'From €0.80 per item',
  },
  {
    id: 'pad',
    name: 'Pad Printing',
    icon: Circle,
    description: 'Versatile printing technique for odd-shaped items like pens and small promotional products.',
    advantages: [
      'Works on curved surfaces',
      'Cost-effective for small items',
      'Accurate color reproduction',
      'Great for promotional pens',
    ],
    bestFor: ['Pens', 'USB Flash Drives', 'Keychains', 'Plastic Items'],
    image: 'https://printground.net/wp-content/uploads/2024/01/PAD-PRINTING-150x150.png',
    priceRange: 'From €0.15 per item',
  },
  {
    id: 'hot-stamp',
    name: 'Hot Stamping',
    icon: Flame,
    description: 'Premium finishing technique using heat and metallic foil for an elegant, luxurious look.',
    advantages: [
      'Elegant metallic finish',
      'Perfect for leather items',
      'Adds perceived value',
      'Durable and long-lasting',
    ],
    bestFor: ['Keychains', 'Notebooks', 'Portfolios', 'Leather Items'],
    image: 'https://printground.net/wp-content/uploads/2024/01/HOT-STAMPING-150x150.png',
    priceRange: 'From €0.50 per item',
  },
  {
    id: 'doming',
    name: 'Doming / 3D Sticker',
    icon: Box,
    description: 'Crystal-clear dome applied over printed stickers creating a 3D effect with protective finish.',
    advantages: [
      '3D visual effect',
      'Durable protection layer',
      'Water and UV resistant',
      'Professional appearance',
    ],
    bestFor: ['USB Flash Drives', 'Keychains', 'Promotional Items'],
    image: 'https://printground.net/wp-content/uploads/2024/01/DOMING-150x150.png',
    priceRange: 'From €0.40 per item',
  },
  {
    id: 'embroidery-3d',
    name: '3D Embroidery',
    icon: Scissors,
    description: 'Elevated embroidery technique creating a three-dimensional, raised effect for maximum visual impact.',
    advantages: [
      'Striking 3D visual effect',
      'High quality texture',
      'Premium look and feel',
      'Excellent durability',
    ],
    bestFor: ['Caps', 'Towels', 'Jackets', 'Premium Apparel'],
    image: 'https://printground.net/wp-content/uploads/2024/01/etd_47217433165a11556e66a6-150x150.jpg',
    priceRange: 'From €1.00 per item',
  },
  {
    id: 'textile-print',
    name: 'Textile Printing',
    icon: Layers,
    description: 'Specialized printing technique optimized for textile products with excellent wash resistance.',
    advantages: [
      'Excellent wash resistance',
      'Soft feel on fabric',
      'Vibrant colors',
      'Perfect for aprons and bags',
    ],
    bestFor: ['Aprons', 'Polar Fleece Items', 'Non-Woven Bags'],
    image: 'https://printground.net/wp-content/uploads/2024/01/TEXTILE-PRINTING-150x150.png',
    priceRange: 'From €1.50 per item',
  },
  {
    id: 'digital-transfer',
    name: 'Digital Transfer',
    icon: Layers,
    description: 'Digital printing process optimized for small quantities without color limitations.',
    advantages: [
      'No color restrictions',
      'Ideal for small runs',
      'Photographic quality',
      'Works on various materials',
    ],
    bestFor: ['Folders', 'Bags', 'Non-Woven Items', 'Cork Products'],
    image: 'https://printground.net/wp-content/uploads/2024/01/dt_3196160495a7189cd89eb0-150x150.png',
    priceRange: 'From €1.20 per item',
  },
  {
    id: 'firing',
    name: 'Firing / Ceramic Printing',
    icon: Flame,
    description: 'High-temperature printing technique for ceramic and glass items with exceptional durability.',
    advantages: [
      'Extremely durable finish',
      'Food-safe options available',
      'High temperature resistant',
      'Perfect for drinkware',
    ],
    bestFor: ['Glass', 'Ceramic', 'Porcelain', 'Mugs'],
    image: 'https://printground.net/wp-content/uploads/2024/01/FIRING-150x150.png',
    priceRange: 'From €1.00 per item',
  },
  {
    id: 'hydroglaze',
    name: 'HydroGlaze',
    icon: Droplet,
    description: 'Advanced coating technique for glass and ceramic items with matte or glossy finish options.',
    advantages: [
      'Any Pantone color available',
      'Matte or glossy finish',
      'Smooth, even coverage',
      'Premium quality',
    ],
    bestFor: ['Glass', 'Ceramic', 'Porcelain Items'],
    image: 'https://printground.net/wp-content/uploads/2024/01/HYDROGLAZE-150x150.png',
    priceRange: 'From €1.50 per item',
  },
  {
    id: 'sandblasting',
    name: 'Sandblasting',
    icon: Shield,
    description: 'Etching technique that creates a frosted 3D effect on glass and crystal surfaces.',
    advantages: [
      'Elegant frosted appearance',
      '3D effect with detail',
      'Premium look',
      'Perfect for awards',
    ],
    bestFor: ['Glass', 'Crystal', 'Awards', 'Trophy Items'],
    image: 'https://printground.net/wp-content/uploads/2024/01/SANDBLASTING-150x150.png',
    priceRange: 'From €2.00 per item',
  },
  {
    id: 'stickers',
    name: 'Sticker Printing',
    icon: FileText,
    description: 'High-quality PVC sticker printing with photographic quality and various shapes.',
    advantages: [
      'Photographic quality print',
      'Various sizes and shapes',
      'Waterproof options',
      'Outdoor durable',
    ],
    bestFor: ['Product Labels', 'Promotional Stickers', 'Bumper Stickers'],
    image: 'https://printground.net/wp-content/uploads/2024/01/STICKERS-150x150.png',
    priceRange: 'From €0.10 per sticker',
  },
  {
    id: 'rotary-laser',
    name: 'Rotary Laser (360°)',
    icon: Gem,
    description: '360-degree laser engraving perfect for cylindrical items like pens and drinkware.',
    advantages: [
      'Full 360° coverage',
      'Permanent marking',
      'No setup required',
      'Perfect for cylindrical items',
    ],
    bestFor: ['Pens', 'Drinkware', 'Tumblers', 'Round Items'],
    image: 'https://printground.net/wp-content/uploads/2024/01/ROTARY-LASER-150x150.png',
    priceRange: 'From €0.80 per item',
  },
  {
    id: 'circular-uv',
    name: 'Circular UV (360°)',
    icon: Circle,
    description: 'Full 360-degree UV printing for cylindrical products with vibrant colors.',
    advantages: [
      'Complete 360° print coverage',
      'Vivid full-color printing',
      'Works on curved surfaces',
      'Fast production',
    ],
    bestFor: ['Pens', 'Tumblers', 'Cylindrical Items', 'Drinkware'],
    image: 'https://printground.net/wp-content/uploads/2024/01/CIRCULAR-UV-360-150x150.png',
    priceRange: 'From €1.20 per item',
  },
  {
    id: 'rotary-screen',
    name: 'Rotary Screen Printing',
    icon: Printer,
    description: '360-degree screen printing optimized for pens and cylindrical promotional items.',
    advantages: [
      'Full 360° screen print',
      'Cost-effective for large runs',
      'Vibrant colors',
      'Perfect for pens',
    ],
    bestFor: ['Pens', 'Pencils', 'Cylindrical Items'],
    image: 'https://printground.net/wp-content/uploads/2024/01/ROTARY-SCREEN-PRINTING-150x150.png',
    priceRange: 'From €0.25 per item',
  },
]

const processSteps = [
  {
    step: 1,
    title: 'Send Your Design',
    description: 'Upload your logo or artwork. We accept AI, EPS, PDF, or high-resolution PNG/JPG files.',
  },
  {
    step: 2,
    title: 'Choose Your Products',
    description: 'Select from our extensive catalog of 1500+ products across all categories.',
  },
  {
    step: 3,
    title: 'Select Printing Method',
    description: 'We\'ll recommend the best printing technique based on your product and design.',
  },
  {
    step: 4,
    title: 'Approve Mockup',
    description: 'Receive a free digital mockup showing exactly how your branded products will look.',
  },
  {
    step: 5,
    title: 'Production & Delivery',
    description: 'We produce your order and deliver to 27 EU countries within 2-8 business days.',
  },
]

export default function PrintingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-primary to-primary/90 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional Printing Services
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              With over 21 printing techniques, we bring your brand to life on premium merchandise. 
              From screen printing to embroidery, we have the perfect solution for your corporate needs.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div>
                <p className="text-4xl font-bold text-accent">21+</p>
                <p className="text-sm text-gray-300">Printing Techniques</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-accent">1500+</p>
                <p className="text-sm text-gray-300">Products</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-accent">27</p>
                <p className="text-sm text-gray-300">EU Countries</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-accent">5-10</p>
                <p className="text-sm text-gray-300">Days Delivery</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From concept to delivery, we make the process simple and hassle-free
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-8">
            {processSteps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Techniques */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Our Printing Techniques
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from a wide range of professional printing methods tailored to your needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {printingTechniques.map((technique, index) => (
              <motion.div
                key={technique.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48 bg-gray-100">
                  <img
                    src={technique.image}
                    alt={technique.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-3">
                    <technique.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-2">{technique.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{technique.description}</p>
                  
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Price Range</p>
                    <p className="text-accent font-medium text-sm">{technique.priceRange}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Best For</p>
                    <div className="flex flex-wrap gap-1">
                      {technique.bestFor.map((item) => (
                        <span key={item} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Advantages</p>
                    <ul className="space-y-1">
                      {technique.advantages.map((adv) => (
                        <li key={adv} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">{adv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-accent to-orange-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Award className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Free Design Support Included
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Our expert design team will help optimize your artwork for the best print results. 
              We review every file before production to ensure perfect quality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/catalog"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-accent font-bold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Browse Products
              </a>
              <a
                href="/quote"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
              >
                Get Free Quote
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                q: 'What file formats do you accept?',
                a: 'We accept AI, EPS, PDF, SVG, and high-resolution PNG/JPG files (300 DPI minimum). Our design team can also help convert files.',
              },
              {
                q: 'What is the minimum order quantity?',
                a: 'Most products have a minimum order of 25 pieces. However, some items can be ordered in smaller quantities. Check individual product pages for details.',
              },
              {
                q: 'How long does production take?',
                a: 'Standard production takes 5-7 business days. Express production (24-48 hours) is available for urgent orders for an additional fee.',
              },
              {
                q: 'Do you offer samples?',
                a: 'Yes! We offer pre-production samples so you can verify quality before placing your full order. Contact us for sample pricing.',
              },
              {
                q: 'Can I mix colors and sizes in one order?',
                a: 'Absolutely! We can produce mixed orders with different colors and sizes. Additional setup fees may apply for complex combinations.',
              },
              {
                q: 'What if I don\'t have a design?',
                a: 'Our design team offers free design support. We\'ll help create or optimize your artwork at no extra cost.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <h3 className="font-bold text-primary mb-2">{item.q}</h3>
                <p className="text-gray-600 text-sm">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
