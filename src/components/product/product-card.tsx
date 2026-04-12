'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Eye, FileText } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { formatPrice, sanitizeProductName } from '@/lib/utils'
import type { Product } from '@/data/products'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group bg-white rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.new && <Badge variant="success">New</Badge>}
          {product.onSale && <Badge variant="warning">Sale</Badge>}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <Link
            href={`/product/${product.id}`}
            className="bg-white text-primary rounded-full p-3 hover:bg-primary hover:text-white transition-colors"
          >
            <Eye className="w-5 h-5" />
          </Link>
          <Link
            href={`/quote?product=${product.id}`}
            className="bg-accent text-white rounded-full p-3 hover:bg-accent/90 transition-colors"
          >
            <FileText className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-gray-400 font-mono mb-1">{product.sku}</p>
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-primary mb-2 line-clamp-2 hover:text-accent transition-colors cursor-pointer">
            {sanitizeProductName(product.name)}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Colors */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-gray-500">Colors:</span>
          <div className="flex gap-1">
            {product.colors.slice(0, 4).map((color, i) => (
              <div
                key={i}
                className="w-4 h-4 rounded-full border border-border"
                style={{ 
                  backgroundColor: color === 'White' ? '#fff' : 
                                   color === 'Black' ? '#000' :
                                   color === 'Navy' ? '#1e3a5f' :
                                   color === 'Gray' ? '#64748b' :
                                   color === 'Red' ? '#dc2626' :
                                   color === 'Blue' ? '#2563eb' :
                                   color === 'Green' ? '#16a34a' :
                                   color === 'Silver' ? '#c0c0c0' :
                                   color === 'Gold' ? '#fbbf24' :
                                   '#888'
                }}
                title={color}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-xs text-gray-400">+{product.colors.length - 4}</span>
            )}
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            {product.onSale ? (
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-accent">
                  {formatPrice(product.salePrice ?? (product.basePrice !== null ? (product.basePrice as number) * 0.8 : null))}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(product.basePrice)}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-primary">
                from {formatPrice(product.basePrice)}
              </span>
            )}
            <p className="text-xs text-gray-400">Min. {product.minOrderQuantity ?? 1} pcs</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
