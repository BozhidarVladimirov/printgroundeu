'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn, Grid3X3 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [showLightbox, setShowLightbox] = useState(false)

  const goToPrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center">
        <p className="text-gray-400">No image available</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden group">
        <Image
          src={images[selectedIndex]}
          alt={`${productName} - Image ${selectedIndex + 1}`}
          fill
          className="object-cover cursor-pointer"
          priority
          onClick={() => setShowLightbox(true)}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        
        {/* Zoom indicator */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
          <div className="bg-white/90 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn className="w-6 h-6 text-primary" />
          </div>
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-sm px-3 py-1 rounded-full flex items-center gap-2">
          <span>{selectedIndex + 1} / {images.length}</span>
          <button 
            onClick={() => setShowLightbox(true)}
            className="p-1 hover:bg-white/20 rounded"
            aria-label="View all images"
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedIndex(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all',
                selectedIndex === index 
                  ? 'border-accent ring-2 ring-accent/20' 
                  : 'border-gray-200 hover:border-gray-300'
              )}
            >
              <Image
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </motion.button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {showLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setShowLightbox(false)}
          >
            {/* Close button */}
            <button
              onClick={() => setShowLightbox(false)}
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 rounded-full p-2 z-10"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); goToPrevious() }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-3 z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-8 h-8 text-white" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); goToNext() }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-3 z-10"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-8 h-8 text-white" />
                </button>
              </>
            )}

            {/* Main image */}
            <motion.div
              key={selectedIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full h-full max-w-4xl max-h-[80vh] m-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[selectedIndex]}
                alt={`${productName} - Image ${selectedIndex + 1}`}
                fill
                className="object-contain"
              />
            </motion.div>

            {/* Thumbnail strip */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-4 bg-black/50 rounded-xl max-w-[90vw] overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={(e) => { e.stopPropagation(); setSelectedIndex(index) }}
                  className={cn(
                    'relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all',
                    selectedIndex === index 
                      ? 'border-white ring-2 ring-white/50' 
                      : 'border-transparent opacity-60 hover:opacity-100'
                  )}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full">
              {selectedIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
