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
 * Returns custom logo_url if set, otherwise automatically extracts actual product logo from its official webpage URL.
 */
export function getProductLogoUrl(logoUrl?: string | null, websiteUrl?: string | null, productName?: string): string {
  if (logoUrl && !logoUrl.includes('images.unsplash.com') && !logoUrl.includes('ui-avatars.com')) {
    return logoUrl;
  }

  if (websiteUrl) {
    return `/api/extract-logo?url=${encodeURIComponent(websiteUrl)}&type=logo&name=${encodeURIComponent(productName || '')}`;
  }

  return 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80';
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


