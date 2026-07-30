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
 * Returns custom logo_url if set, otherwise generates a crisp, high-definition product logo badge.
 */
export function getProductLogoUrl(logoUrl?: string | null, websiteUrl?: string | null, productName?: string): string {
  if (logoUrl && !logoUrl.includes('images.unsplash.com')) {
    return logoUrl;
  }

  // Generate crisp, high-definition brand logo badge based on product name
  const name = productName || 'AI Tool';
  const words = name.replace(/[^a-zA-Z0-9 ]/g, '').split(' ').filter(Boolean);
  const initials = words.length >= 2
    ? (words[0][0] + words[1][0]).toUpperCase()
    : name.substring(0, 2).toUpperCase();

  const colors = [
    '6366F1', // Indigo
    'EC4899', // Pink
    '8B5CF6', // Purple
    '10B981', // Emerald
    'F59E0B', // Amber
    '06B6D4', // Cyan
    '3B82F6', // Blue
    'EF4444', // Red
    '84CC16', // Lime
    'A855F7', // Violet
  ];
  const charCodeSum = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const bgColor = colors[charCodeSum % colors.length];

  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=${bgColor}&color=fff&size=256&bold=true&font-size=0.45&rounded=true`;
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

