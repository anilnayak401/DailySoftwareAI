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
    return `/api/extract-logo?url=${encodeURIComponent(websiteUrl)}&type=logo`;
  }

  // Generate crisp brand logo badge based on product name if no website URL
  const name = productName || 'AI Tool';
  const words = name.replace(/[^a-zA-Z0-9 ]/g, '').split(' ').filter(Boolean);
  const initials = words.length >= 2
    ? (words[0][0] + words[1][0]).toUpperCase()
    : name.substring(0, 2).toUpperCase();

  const colors = ['6366F1', 'EC4899', '8B5CF6', '10B981', 'F59E0B', '06B6D4', '3B82F6', 'EF4444'];
  const charCodeSum = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const bgColor = colors[charCodeSum % colors.length];

  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=${bgColor}&color=fff&size=256&bold=true&font-size=0.45&rounded=true`;
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


