'use client'

import { useState, useMemo, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ProductCard } from '@/components/product/product-card'
import { products, categories, techniques } from '@/data/products'

function CatalogContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  const searchParam = searchParams.get('search')
  
  const [searchQuery, setSearchQuery] = useState(searchParam || '')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam || null)
  const [selectedTechnique, setSelectedTechnique] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])
  const [sortBy, setSortBy] = useState<string>('featured')
  const [showFilters, setShowFilters] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(decodeURIComponent(categoryParam))
    }
  }, [categoryParam])

  useEffect(() => {
    setLoading(true)
    setError(null)
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [selectedCategory, selectedTechnique, searchQuery])

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(p => {
        const nameLower = p.name.toLowerCase()
        const categoryLower = p.category.toLowerCase()
        const skuLower = p.sku.toLowerCase()
        
        const nameMatch = nameLower.includes(query)
        const categoryMatch = categoryLower.includes(query)
        const skuMatch = skuLower.includes(query)
        
        return nameMatch || categoryMatch || skuMatch
      })
    }

    if (selectedCategory) {
      const catSlug = selectedCategory.toLowerCase()
        .replace(/-/g, ' ')
        .replace(/&/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
      result = result.filter(p => {
        const pCat = p.category.toLowerCase()
          .replace(/&/g, ' ')
          .replace(/\s+/g, ' ')
          .trim()
        return pCat === catSlug || pCat.includes(catSlug) || catSlug.includes(pCat)
      })
    }

    if (selectedTechnique) {
      result = result.filter(p => 
        p.availableTechniques.some((t: string) => t.toLowerCase().includes(selectedTechnique.toLowerCase()))
      )
    }

    result = result.filter(p => {
      const price = p.salePrice ?? p.basePrice
      if (price === null) return true
      return price >= priceRange[0] && price <= priceRange[1]
    })

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => ((a.salePrice ?? a.basePrice) ?? 0) - ((b.salePrice ?? b.basePrice) ?? 0))
        break
      case 'price-high':
        result.sort((a, b) => ((b.salePrice ?? b.basePrice) ?? 0) - ((a.salePrice ?? a.basePrice) ?? 0))
        break
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    return result
  }, [searchQuery, selectedCategory, selectedTechnique, priceRange, sortBy])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory(null)
    setSelectedTechnique(null)
    setPriceRange([0, 500])
    setSortBy('featured')
  }

  const activeFiltersCount = [
    selectedCategory,
    selectedTechnique,
    searchQuery,
  ].filter(Boolean).length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Product Catalog</h1>
          <p className="text-gray-200 text-lg">
            Browse our selection of {products.length}+ premium branded merchandise products
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className={`
            lg:w-64 flex-shrink-0
            ${showFilters ? 'block' : 'hidden lg:block'}
          `}>
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-lg">Filters</h2>
                {activeFiltersCount > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={clearFilters}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Clear all
                  </Button>
                )}
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      !selectedCategory 
                        ? 'bg-primary text-white' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex justify-between items-center ${
                        selectedCategory === cat.name 
                          ? 'bg-primary text-white' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {cat.productCount}
                      </Badge>
                    </button>
                  ))}
                </div>
              </div>

              {/* Techniques */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Printing Technique
                </label>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedTechnique(null)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      !selectedTechnique 
                        ? 'bg-primary text-white' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    All Techniques
                  </button>
                  {techniques.map((tech) => (
                    <button
                      key={tech.id}
                      onClick={() => setSelectedTechnique(tech.name)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedTechnique === tech.name 
                          ? 'bg-primary text-white' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {tech.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range (€)
                </label>
                <div className="flex gap-2 items-center">
                  <Input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-20"
                    min={0}
                  />
                  <span className="text-gray-400">-</span>
                  <Input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-20"
                    min={0}
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge variant="default" className="ml-2 bg-accent">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
                
                <p className="text-gray-600">
                  Showing <span className="font-semibold">{filteredProducts.length}</span> products
                </p>
              </div>

              {/* Active Filters */}
              <div className="flex flex-wrap items-center gap-2">
                {selectedCategory && (
                  <Badge variant="default" className="gap-1 bg-primary">
                    {selectedCategory}
                    <X 
                      className="w-3 h-3 cursor-pointer" 
                      onClick={() => setSelectedCategory(null)}
                    />
                  </Badge>
                )}
                {selectedTechnique && (
                  <Badge variant="default" className="gap-1 bg-primary">
                    {selectedTechnique}
                    <X 
                      className="w-3 h-3 cursor-pointer" 
                      onClick={() => setSelectedTechnique(null)}
                    />
                  </Badge>
                )}
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Loading Skeleton */}
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="h-48 bg-gray-200 animate-pulse rounded-lg mb-4" />
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4 mb-2" />
                    <div className="h-3 bg-gray-200 animate-pulse rounded w-1/2" />
                  </div>
                ))}
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <p className="text-gray-500 mb-4">{error}</p>
                <Button onClick={() => window.location.reload()}>
                  Retry
                </Button>
              </div>
            )}

            {/* Products */}
            {!loading && !error && filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : !loading && !error ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-gray-500">Loading...</div></div>}>
      <CatalogContent />
    </Suspense>
  )
}
