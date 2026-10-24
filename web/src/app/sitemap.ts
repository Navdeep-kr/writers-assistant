import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://writingassistant.app';
  const currentDate = new Date().toISOString();

  const routes = [
    { path: '', changeFrequency: 'daily' as const, priority: 1.0 },
    { path: '/dashboard', changeFrequency: 'daily' as const, priority: 0.95 },
    { path: '/pricing', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/about', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/academic', changeFrequency: 'weekly' as const, priority: 0.85 },
    { path: '/professional', changeFrequency: 'weekly' as const, priority: 0.85 },
    { path: '/creators', changeFrequency: 'weekly' as const, priority: 0.85 },
    { path: '/personal', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/apps', changeFrequency: 'monthly' as const, priority: 0.75 },
    { path: '/help', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/contact', changeFrequency: 'monthly' as const, priority: 0.75 },
    { path: '/responsible-ai', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/terms', changeFrequency: 'yearly' as const, priority: 0.5 },
    { path: '/privacy', changeFrequency: 'yearly' as const, priority: 0.5 },
    { path: '/login', changeFrequency: 'monthly' as const, priority: 0.6 },
    { path: '/signup', changeFrequency: 'monthly' as const, priority: 0.7 },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: currentDate,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
