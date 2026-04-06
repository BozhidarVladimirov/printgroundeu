'use client'

import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getBulkDiscount, formatPrice, sanitizeProductName } from '@/lib/utils'
import type { Product } from '@/data/products'
import { techniques } from '@/data/products'

interface ProductInfoProps {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [quantity, setQuantity] = useState(product.minOrderQuantity ?? 1)
  const [selectedTechnique, setSelectedTechnique] = useState(product.availableTechniques[0])

  const discount = getBulkDiscount(quantity)
  const basePrice = product.basePrice ?? 0
  const salePrice = product.salePrice ?? basePrice * 0.8
  const discountedPrice = product.onSale 
    ? salePrice * (1 - discount / 100)
    : basePrice * (1 - discount / 100)

  const totalPrice = discountedPrice * quantity

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-sm text-gray-500 font-mono mb-2">{product.sku}</p>
        <h1 className="text-3xl font-bold text-primary mb-4">{sanitizeProductName(product.name)}</h1>
        <div className="flex flex-wrap gap-2 mb-4">
          {product.new && <Badge variant="success">New Arrival</Badge>}
          {product.onSale && <Badge variant="warning">On Sale</Badge>}
          <Badge variant="secondary">Min. Order: {product.minOrderQuantity} pcs</Badge>
        </div>
      </div>

      {/* Price */}
      <div className="bg-gray-50 rounded-xl p-6">
        <div className="flex items-baseline gap-3 mb-2">
          <span className="text-3xl font-bold text-primary">
            {formatPrice(product.onSale && product.salePrice ? product.salePrice : product.basePrice)}
          </span>
          <span className="text-lg text-gray-400">per unit</span>
        </div>
        {product.onSale && (
          <p className="text-sm text-gray-500 mb-3">
            <span className="line-through">{formatPrice(product.basePrice)}</span>
            <span className="text-green-600 ml-2">Save 20%</span>
          </p>
        )}
        
        {/* Bulk Pricing */}
        <div className="border-t border-border pt-4 mt-4">
          <p className="text-sm font-medium text-primary mb-3">Bulk Pricing</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">50-99 pcs</span>
              <span className="font-medium">5% off</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">100-249 pcs</span>
              <span className="font-medium">10% off</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">250-499 pcs</span>
              <span className="font-medium">15% off</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">500+ pcs</span>
              <span className="font-medium">20%+ off</span>
            </div>
          </div>
        </div>
      </div>

      {/* Color Selection */}
      <div>
        <label className="text-sm font-medium text-primary mb-3 block">
          Color: <span className="font-normal text-gray-600">{selectedColor}</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {product.colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-10 h-10 rounded-full border-2 transition-all ${
                selectedColor === color
                  ? 'border-accent scale-110'
                  : 'border-transparent hover:border-gray-300'
              }`}
              style={{
                backgroundColor: 
                  color === 'White' ? '#ffffff' :
                  color === 'Black' ? '#1a1a1a' :
                  color === 'Navy' ? '#1e3a5f' :
                  color === 'Gray' ? '#6b7280' :
                  color === 'Red' ? '#dc2626' :
                  color === 'Blue' ? '#2563eb' :
                  color === 'Green' ? '#16a34a' :
                  color === 'Silver' ? '#c0c0c0' :
                  color === 'Gold' ? '#eab308' :
                  color === 'Natural' ? '#f5f5dc' :
                  color === 'Burgundy' ? '#722f37' :
                  color === 'Royal Blue' ? '#4169e1' :
                  color === 'Forest Green' ? '#228b22' :
                  color === 'Teal' ? '#008080' :
                  color === 'Orange' ? '#f97316' :
                  color === 'Purple' ? '#9333ea' :
                  color === 'Pink' ? '#ec4899' :
                  color === 'Yellow' ? '#facc15' :
                  '#888888',
              }}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* Branding Technique */}
      <div>
        <label className="text-sm font-medium text-primary mb-3 block">
          Branding Technique
        </label>
        <div className="space-y-2">
          {product.availableTechniques.map((technique) => (
            <label
              key={technique}
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                selectedTechnique === technique
                  ? 'border-accent bg-accent/5'
                  : 'border-border hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="technique"
                value={technique}
                checked={selectedTechnique === technique}
                onChange={(e) => setSelectedTechnique(e.target.value)}
                className="w-4 h-4 text-accent"
              />
              <span className="flex-1 font-medium">{technique}</span>
              <span className="text-sm text-gray-500">
                {techniques.find((t) => t.name === technique)?.description}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div>
        <label className="text-sm font-medium text-primary mb-3 block">Quantity</label>
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-border rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(product.minOrderQuantity ?? 1, quantity - 10))}
              className="p-3 hover:bg-gray-100 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(product.minOrderQuantity ?? 1, parseInt(e.target.value) || (product.minOrderQuantity ?? 1)))}
              className="w-20 text-center border-x border-border py-2 font-medium"
            />
            <button
              onClick={() => setQuantity(quantity + 10)}
              className="p-3 hover:bg-gray-100 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <span className="text-sm text-gray-500">
            Min. order: {product.minOrderQuantity} units
          </span>
        </div>
      </div>

      {/* Total */}
      <div className="bg-primary/5 rounded-xl p-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Unit Price (with {discount}% bulk discount)</span>
          <span className="font-semibold">{formatPrice(discountedPrice)}</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">Quantity</span>
          <span className="font-semibold">{quantity} units</span>
        </div>
        <div className="border-t border-border pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-primary">Total Estimate</span>
            <span className="text-2xl font-bold text-accent">{formatPrice(totalPrice)}</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">*Final price may vary based on branding requirements</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Button className="flex-1" size="lg">
          Add to Quote
        </Button>
        <Button variant="outline" size="lg">
          Request Sample
        </Button>
      </div>

      {/* Product Details */}
      <div className="border-t border-border pt-6">
        <h3 className="font-semibold text-primary mb-4">Product Details</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Materials</p>
            <p className="font-medium">{product.materials.join(', ')}</p>
          </div>
          <div>
            <p className="text-gray-500">Dimensions</p>
            <p className="font-medium">{product.dimensions}</p>
          </div>
          <div>
            <p className="text-gray-500">Category</p>
            <p className="font-medium">{product.category} / {product.subcategory}</p>
          </div>
          <div>
            <p className="text-gray-500">SKU</p>
            <p className="font-mono">{product.sku}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
