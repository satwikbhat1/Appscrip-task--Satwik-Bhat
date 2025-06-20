import { ChevronRight, Home } from "lucide-react"

export function Breadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm">
        <li>
          <a href="/" className="flex items-center text-gray-500 hover:text-gray-700 transition-colors">
            <Home className="w-4 h-4 mr-1" />
            Home
          </a>
        </li>
        <li>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </li>
        <li>
          <span className="text-gray-900 font-medium">Products</span>
        </li>
      </ol>
    </nav>
  )
}
