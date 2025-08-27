import type { Metadata } from "next";
import localFont from 'next/font/local'
import "../styles/globals.css";
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'

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
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  themeColor: "#FFD700",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetbrainsMono.variable} font-mono antialiased`}
      >
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
