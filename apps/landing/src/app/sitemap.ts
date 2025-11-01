import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://anbu.ai'
  const currentDate = new Date()

  // I'm defining all the main routes for my site
  const routes = [
    '',
    '/solutions',
    '/docs-hub',
    '/solutions/command-console',
    '/solutions/marketing-studio',
    '/resources',
    '/contact',
    '/social-hub',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }))
}
