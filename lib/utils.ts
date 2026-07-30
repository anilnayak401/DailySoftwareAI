import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString?: string | null): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function formatTime(timeString?: string | null): string {
  if (!timeString) return '';
  const [hours, minutes] = timeString.split(':');
  const date = new Date();
  date.setHours(parseInt(hours, 10));
  date.setMinutes(parseInt(minutes, 10));
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date);
}

/**
 * Gets a clean, high-resolution logo URL for a product.
 * Filters out generic unsplash placeholders and pulls real website favicons/logos.
 */
export function getProductLogoUrl(logoUrl?: string | null, websiteUrl?: string | null, productName?: string, slug?: string): string {
  // 1. If explicit custom logoUrl exists AND is not an unsplash placeholder, use it!
  if (logoUrl && !logoUrl.includes('images.unsplash.com')) {
    return logoUrl;
  }

  // 2. Route through /api/extract-logo to follow redirects and pull real destination webpage favicon/logo
  if (websiteUrl) {
    return `/api/extract-logo?url=${encodeURIComponent(websiteUrl)}&type=logo&name=${encodeURIComponent(productName || '')}`;
  }

  // 3. Fallback: derive domain from product slug for favicon lookup
  const cleanDomain = slug || (productName || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  if (cleanDomain) {
    return `https://www.google.com/s2/favicons?domain=${cleanDomain}.com&sz=128`;
  }

  return '/file.svg';
}






/**
 * Gets a screenshot or featured image URL for a product.
 * Returns custom featured_image_url if set, otherwise automatically extracts actual banner/screenshot from official webpage URL.
 */
export function getProductScreenshotUrl(featuredImageUrl?: string | null, websiteUrl?: string | null): string {
  if (featuredImageUrl && !featuredImageUrl.includes('images.unsplash.com')) {
    return featuredImageUrl;
  }

  if (websiteUrl) {
    return `/api/extract-logo?url=${encodeURIComponent(websiteUrl)}&type=image`;
  }

  return featuredImageUrl || '';
}


