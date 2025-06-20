import { Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProductHeaderProps {
  totalProducts: number
}

export function ProductHeader({ totalProducts }: ProductHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">All Products</h2>
        <p className="text-sm text-gray-600 mt-1">{totalProducts} items available</p>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 mr-2">View:</span>
        <Button variant="outline" size="sm" className="p-2">
          <Grid className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="p-2">
          <List className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
