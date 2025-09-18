import type { Metadata, Viewport } from "next";
import localFont from 'next/font/local'
import "../styles/globals.css";
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { Dock, DockIcon } from '@/components/ui/dock'
import { ClickSparkOverlay } from '@/components/reactbits/click-spark-overlay'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import Link from 'next/link'
import { ArrowRight, Compass, Home, MessagesSquare, Sparkles } from 'lucide-react'

// I'm loading the Nerd Font locally for optimal performance
const jetbrainsMono = localFont({
  src: [
    {
      path: '../assets/fonts/JetBrainsMonoNerdFont-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/JetBrainsMonoNerdFont-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "ANBU Solutions - Innovative Digital Solutions",
  description: "ANBU Solutions delivers cutting-edge digital transformation, custom software development, and enterprise solutions for the modern era.",
  keywords: "ANBU, digital solutions, software development, web development, cloud services, enterprise solutions",
  authors: [{ name: "Francisco" }],
  openGraph: {
    title: "ANBU Solutions - Innovative Digital Solutions",
    description: "Elevating businesses through cutting-edge technology",
    url: "https://anbu.ai",
    siteName: "ANBU Solutions",
    type: "website",
    images: [
      {
        url: "https://anbu.ai/og-image.png",
        width: 1200,
        height: 630,
        alt: "ANBU Solutions - Innovative Digital Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ANBU Solutions - Innovative Digital Solutions",
    description: "Elevating businesses through cutting-edge technology",
    images: ["https://anbu.ai/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FFD700",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetbrainsMono.variable} font-sans antialiased bg-black text-anbu-marble`}
      >
        <ScrollProgress />
        <ClickSparkOverlay />
        <Navigation />
        {children}
        <div className="pointer-events-none fixed bottom-6 left-1/2 z-40 -translate-x-1/2">
          <Dock className="pointer-events-auto border-white/10 bg-black/70" iconMagnification={64}>
            <DockIcon>
              <Link href="/#home" className="flex h-full w-full items-center justify-center text-white/80">
                <Home className="h-5 w-5" />
              </Link>
            </DockIcon>
            <DockIcon>
              <Link href="/#services" className="flex h-full w-full items-center justify-center text-white/80">
                <Compass className="h-5 w-5" />
              </Link>
            </DockIcon>
            <DockIcon>
              <Link href="/social-hub" className="flex h-full w-full items-center justify-center text-white/80">
                <Sparkles className="h-5 w-5" />
              </Link>
            </DockIcon>
            <DockIcon>
              <Link href="/#about" className="flex h-full w-full items-center justify-center text-white/80">
                <AnimatedGradientText className="text-xs uppercase" colorFrom="#FFD700" colorTo="#FF8A3C">
                  Insight
                </AnimatedGradientText>
              </Link>
            </DockIcon>
            <DockIcon>
              <Link href="/#contact" className="flex h-full w-full items-center justify-center text-white/80">
                <MessagesSquare className="h-5 w-5" />
              </Link>
            </DockIcon>
            <DockIcon>
              <Link href="/solutions-portal" className="flex h-full w-full items-center justify-center text-white/80">
                <ArrowRight className="h-5 w-5" />
              </Link>
            </DockIcon>
          </Dock>
        </div>
        <Footer />
      </body>
    </html>
  );
}
