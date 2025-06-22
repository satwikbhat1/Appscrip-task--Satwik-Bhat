"use client"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md mx-auto text-center px-4">
            <h1 className="text-6xl font-bold text-gray-900 mb-4">Error</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-8">A critical error occurred. Please refresh the page or try again later.</p>
            <button onClick={reset} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg">
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
