import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import '../styles/globals.css';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import SkipNav from '@/components/layout/SkipNav';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import { GlobalDock } from '@/components/layout/GlobalDock';
import { ClickSparkOverlay } from '@/components/reactbits/click-spark-overlay';
import {
  ArrowRight,
  BookOpen,
  Compass,
  Home,
  MessagesSquare,
  Sparkles,
} from '@/components/ui/lucide-safe';
import { ScrollReset } from '@/components/layout/ScrollReset';
import { HashScrollManager } from '@/components/layout/HashScrollManager';
import { siteConfig } from '@/lib/site-config';

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
});

const ogImageUrl = `${siteConfig.website}/og-image.png`;

export const metadata: Metadata = {
  title: 'ANBU Solutions - Innovative Digital Solutions',
  description:
    'ANBU Solutions delivers cutting-edge digital transformation, custom software development, and enterprise solutions for the modern era.',
  keywords:
    'ANBU, digital solutions, software development, web development, cloud services, enterprise solutions',
  authors: [{ name: 'Francisco' }],
  openGraph: {
    title: 'ANBU Solutions - Innovative Digital Solutions',
    description: 'Elevating businesses through cutting-edge technology',
    url: siteConfig.website,
    siteName: 'ANBU Solutions',
    type: 'website',
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: 'ANBU Solutions - Innovative Digital Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ANBU Solutions - Innovative Digital Solutions',
    description: 'Elevating businesses through cutting-edge technology',
    images: [ogImageUrl],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#FFD700',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} bg-black font-sans text-anbu-marble antialiased`}>
        <ScrollReset />
        <HashScrollManager />
        <SkipNav />
        <ScrollProgress />
        <ClickSparkOverlay />
        <Navigation />
        {children}
        <GlobalDock
          items={[
            {
              title: 'Discover',
              icon: <Home className="h-full w-full" />,
              href: '/#home',
            },
            {
              title: 'Solutions',
              icon: <Compass className="h-full w-full" />,
              href: '/solutions',
            },
            {
              title: 'Docs Hub',
              icon: <BookOpen className="h-full w-full" />,
              href: '/docs-hub',
            },
            {
              title: 'Marketing',
              icon: <Sparkles className="h-full w-full" />,
              href: '/solutions/marketing-studio',
            },
            {
              title: 'Engage',
              icon: <MessagesSquare className="h-full w-full" />,
              href: '/contact',
            },
            {
              title: 'Command',
              icon: <ArrowRight className="h-full w-full" />,
              href: '/solutions/command-console',
            },
          ]}
        />
        <Footer />
      </body>
    </html>
  );
}
