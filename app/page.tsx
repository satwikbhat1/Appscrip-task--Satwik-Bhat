import type { Metadata } from "next"
import { ProductGrid } from "@/components/product-grid"
import { FilterSidebar } from "@/components/filter-sidebar"
import { ProductHeader } from "@/components/product-header"
import { Breadcrumb } from "@/components/breadcrumb"

export const metadata: Metadata = {
  title: "Premium Fashion Collection | Appscrip Store - Shop Latest Trends",
  description:
    "Discover our curated collection of premium fashion items, electronics, and jewelry. Shop the latest trends with fast shipping and easy returns.",
  keywords: "fashion, clothing, electronics, jewelry, online shopping, premium brands",
  openGraph: {
    title: "Premium Fashion Collection | Appscrip Store",
    description: "Discover our curated collection of premium fashion items, electronics, and jewelry.",
    type: "website",
    url: "https://appscrip-store.vercel.app",
    images: [
      {
        url: "/images/og-product-listing.jpg",
        width: 1200,
        height: 630,
        alt: "Appscrip Store Product Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Fashion Collection | Appscrip Store",
    description: "Discover our curated collection of premium fashion items, electronics, and jewelry.",
    images: ["/images/og-product-listing.jpg"],
  },
}

// Server-side data fetching
async function getProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products", {
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!response.ok) {
      throw new Error("Failed to fetch products")
    }

    return response.json()
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

async function getCategories() {
  try {
    const response = await fetch("https://fakestoreapi.com/products/categories", {
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch categories")
    }

    return response.json()
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

export default async function ProductListingPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()])

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Premium Fashion Collection",
    description: "Discover our curated collection of premium fashion items, electronics, and jewelry.",
    url: "https://appscrip-store.vercel.app",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.map((product: any, index: number) => ({
        "@type": "Product",
        position: index + 1,
        name: product.title,
        description: product.description,
        image: product.image,
        offers: {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
      })),
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumb />

          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Discover Our Products</h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Explore our curated collection of premium fashion, electronics, and jewelry. Find the perfect items that
              match your style and needs.
            </p>
          </header>

          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-1/4">
              <FilterSidebar categories={categories} />
            </aside>

            <main className="lg:w-3/4">
              <ProductHeader totalProducts={products.length} />
              <ProductGrid products={products} />
            </main>
          </div>
        </div>
      </div>
    </>
  )
}
