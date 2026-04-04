import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary/10">404</h1>
        <h2 className="text-3xl font-bold mb-4 -mt-12">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button size="lg">
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Button>
          </Link>
          <Link href="/catalog">
            <Button size="lg" variant="outline">
              <Search className="w-5 h-5 mr-2" />
              Browse Catalog
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
