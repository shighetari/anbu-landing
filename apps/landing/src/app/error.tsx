'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ShimmerButton } from '@/components/ui/shimmer-button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // I'm logging the error for debugging
    console.error('Error boundary caught:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-6xl sm:text-8xl font-bold text-anbu-gold mb-4">
            Oops!
          </h1>
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
            Something went wrong
          </h2>
          <p className="text-lg text-white/70 mb-8">
            {error.message || "I encountered an unexpected error. Let's get you back on track."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <ShimmerButton
            onClick={() => reset()}
            className="px-8 py-4 text-base font-bold uppercase tracking-wide text-black"
            background="linear-gradient(110deg, #FFD700 0%, #FFED4E 45%, #FFD700 100%)"
            borderRadius="0.75rem"
          >
            Try Again
          </ShimmerButton>

          <Link href="/">
            <ShimmerButton
              className="px-8 py-4 text-base font-bold uppercase tracking-wide text-anbu-gold"
              background="linear-gradient(110deg, #2C2C2C 0%, #1A1A1A 45%, #2C2C2C 100%)"
              borderRadius="0.75rem"
              shimmerColor="#FFD700"
            >
              Return Home
            </ShimmerButton>
          </Link>
        </div>

        {process.env.NODE_ENV === 'development' && error.digest && (
          <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-sm text-red-400 font-mono">
              Error Digest: {error.digest}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
