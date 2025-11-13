import Link from 'next/link';
import { ShimmerButton } from '@/components/ui/shimmer-button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="w-full max-w-2xl text-center">
        <div className="mb-8">
          <h1 className="mb-4 text-8xl font-bold text-anbu-gold sm:text-9xl">404</h1>
          <h2 className="mb-4 text-3xl font-semibold text-white sm:text-4xl">Page Not Found</h2>
          <p className="mb-8 text-lg text-white/70">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <ShimmerButton
            className="px-8 py-4 text-base font-bold uppercase tracking-wide text-anbu-ink"
            background="linear-gradient(110deg, #FFD700 0%, #FFED4E 45%, #FFD700 100%)"
            borderRadius="0.75rem"
            asChild
            textColor="var(--anbu-ink, #0B0500)"
          >
            <Link href="/">
              <span>Go Home</span>
            </Link>
          </ShimmerButton>

          <ShimmerButton
            className="px-8 py-4 text-base font-bold uppercase tracking-wide text-anbu-gold"
            background="linear-gradient(110deg, #2C2C2C 0%, #1A1A1A 45%, #2C2C2C 100%)"
            borderRadius="0.75rem"
            shimmerColor="#FFD700"
            asChild
          >
            <Link href="/contact">
              <span>Contact Us</span>
            </Link>
          </ShimmerButton>
        </div>

        <div className="mt-12">
          <p className="text-sm text-white/50">Lost? I'm here to help you find your way.</p>
        </div>
      </div>
    </div>
  );
}
