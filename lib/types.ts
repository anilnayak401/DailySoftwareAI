export type PricingType = 'free' | 'freemium' | 'paid' | 'lifetime';
export type ProductStatus = 'draft' | 'published' | 'archived';
export type AffiliateNetwork = 'jvzoo' | 'warriorplus' | 'direct' | string;

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string | null;
  short_description: string | null;
  full_description: string | null;
  logo_url: string | null;
  featured_image_url: string | null;
  official_website_url: string | null;
  launch_date: string | null;
  launch_time: string | null;
  launch_timezone: string | null;
  pricing_type: PricingType | null;
  price_text: string | null;
  rating: number | null;
  editor_score: number | null;
  current_rank: number | null;
  affiliate_network: AffiliateNetwork | null;
  is_featured: boolean;
  is_trending: boolean;
  is_top_pick: boolean;
  status: ProductStatus;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  // Joined fields
  categories?: Category[];
  affiliate_links?: AffiliateLink[];
  product_images?: ProductImage[];
}

export interface ProductCategory {
  product_id: string;
  category_id: string;
}

export interface AffiliateLink {
  id: string;
  product_id: string;
  network: AffiliateNetwork;
  url: string;
  status: 'active' | 'disabled';
  is_primary: boolean;
  created_at: string;
}

export interface ClickEvent {
  id: string;
  product_id: string;
  affiliate_link_id: string | null;
  clicked_at: string;
  referrer: string | null;
  utm: Record<string, unknown> | null;
  user_agent: string | null;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  created_at: string;
  confirmed: boolean;
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  alt: string | null;
  sort_order: number;
}

export interface ProductAlternative {
  product_id: string;
  alternative_id: string;
  alternative_product?: Product;
}
