"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FilterSidebarProps {
  categories: string[]
}

export function FilterSidebar({ categories }: FilterSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 1000])

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setPriceRange([0, 1000])
  }

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button onClick={() => setIsOpen(!isOpen)} variant="outline" className="w-full justify-between">
          <span className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </Button>
      </div>

      {/* Filter Sidebar */}
      <div className={`${isOpen ? "block" : "hidden"} lg:block`}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Filters</span>
              <Button
                onClick={clearFilters}
                variant="ghost"
                size="sm"
                className="text-orange-500 hover:text-orange-600"
              >
                Clear All
              </Button>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Categories */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                      className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="text-sm text-gray-700 capitalize">{category.replace("'", "'")}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
              <div className="space-y-3">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                  className="w-full accent-orange-500"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Minimum Rating</h3>
              <div className="space-y-2">
                {[4, 3, 2, 1].map((rating) => (
                  <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      value={rating}
                      className="text-orange-500 focus:ring-orange-500"
                    />
                    <span className="text-sm text-gray-700">{rating}+ Stars</span>
                  </label>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
