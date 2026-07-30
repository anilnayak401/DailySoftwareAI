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
 * Gets a clean logo URL for a product.
 * Returns custom logo_url if set, otherwise extracts brand icon from official website URL.
 */
export function getProductLogoUrl(logoUrl?: string | null, websiteUrl?: string | null): string {
  if (logoUrl && !logoUrl.includes('images.unsplash.com')) {
    return logoUrl;
  }

  if (websiteUrl) {
    try {
      const parsed = new URL(websiteUrl);
      const domain = parsed.hostname.replace(/^www\./, '');
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    } catch {
      // fallback
    }
  }

  return logoUrl || '/file.svg';
}

/**
 * Gets a screenshot or featured image URL for a product.
 * Returns custom featured_image_url if set, otherwise generates live website screenshot from official website URL.
 */
export function getProductScreenshotUrl(featuredImageUrl?: string | null, websiteUrl?: string | null): string {
  if (featuredImageUrl && !featuredImageUrl.includes('images.unsplash.com')) {
    return featuredImageUrl;
  }

  if (websiteUrl) {
    return `https://image.thum.io/get/width/1200/crop/800/${websiteUrl}`;
  }

  return featuredImageUrl || '';
}

