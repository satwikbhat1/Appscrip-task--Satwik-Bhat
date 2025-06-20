"use client"

import { useState, useMemo } from "react"
import { ProductCard } from "./product-card"
import { LoadingSpinner } from "./loading-spinner"

interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  const [sortBy, setSortBy] = useState("default")
  const [filterCategory, setFilterCategory] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [isLoading, setIsLoading] = useState(false)

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const categoryMatch = filterCategory === "all" || product.category === filterCategory
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1]
      return categoryMatch && priceMatch
    })

    switch (sortBy) {
      case "price-low":
        return filtered.sort((a, b) => a.price - b.price)
      case "price-high":
        return filtered.sort((a, b) => b.price - a.price)
      case "rating":
        return filtered.sort((a, b) => b.rating.rate - a.rating.rate)
      case "name":
        return filtered.sort((a, b) => a.title.localeCompare(b.title))
      default:
        return filtered
    }
  }, [products, sortBy, filterCategory, priceRange])

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <section aria-label="Product grid">
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex flex-wrap gap-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            aria-label="Sort products"
          >
            <option value="default">Sort by: Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="name">Name: A to Z</option>
          </select>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            aria-label="Filter by category"
          >
            <option value="all">All Categories</option>
            <option value="men's clothing">{"Men's Clothing"}</option>
            <option value="women's clothing">{"Women's Clothing"}</option>
            <option value="jewelery">Jewelry</option>
            <option value="electronics">Electronics</option>
          </select>
        </div>

        <p className="text-sm text-gray-600">
          Showing {filteredAndSortedProducts.length} of {products.length} products
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAndSortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredAndSortedProducts.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600">Try adjusting your filters to see more results.</p>
        </div>
      )}
    </section>
  )
}
