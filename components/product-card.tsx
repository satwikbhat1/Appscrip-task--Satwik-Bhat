"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

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

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  const handleAddToCart = () => {
    // Add to cart functionality
    console.log("Added to cart:", product.id)
  }

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={`${product.title} - Premium ${product.category}`}
            fill
            className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
              imageLoading ? "blur-sm" : "blur-0"
            }`}
            onLoad={() => setImageLoading(false)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          <button
            onClick={handleWishlist}
            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
          </button>

          <div className="absolute bottom-3 left-3 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 text-sm">{product.title}</h3>

          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating.rate) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600">({product.rating.count})</span>
          </div>

          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
          </div>

          <Button onClick={handleAddToCart} className="w-full bg-orange-500 hover:bg-orange-600 text-white" size="sm">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
