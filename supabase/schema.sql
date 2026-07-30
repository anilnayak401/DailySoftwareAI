-- DailySoftwareAI.com PostgreSQL Database Schema (Supabase)
-- Full ready-to-execute DDL for MVP setup

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==================================================================
-- 1. TABLES CREATION
-- ==================================================================

-- Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    seo_title TEXT,
    seo_description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    tagline TEXT,
    short_description TEXT,
    full_description TEXT,
    logo_url TEXT,
    featured_image_url TEXT,
    official_website_url TEXT,
    launch_date DATE,
    launch_time TIME,
    launch_timezone TEXT DEFAULT 'UTC',
    pricing_type TEXT CHECK (pricing_type IN ('free', 'freemium', 'paid', 'lifetime')),
    price_text TEXT,
    rating NUMERIC(2,1) CHECK (rating >= 0 AND rating <= 5),
    editor_score NUMERIC(3,1) CHECK (editor_score >= 0 AND editor_score <= 10),
    current_rank INT,
    affiliate_network TEXT,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    is_trending BOOLEAN NOT NULL DEFAULT false,
    is_top_pick BOOLEAN NOT NULL DEFAULT false,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    seo_title TEXT,
    seo_description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    published_at TIMESTAMPTZ
);

-- Product-Categories Join Table (Many-to-Many)
CREATE TABLE IF NOT EXISTS public.product_categories (
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, category_id)
);

-- Affiliate Links Table
CREATE TABLE IF NOT EXISTS public.affiliate_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    network TEXT NOT NULL,
    url TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'disabled')),
    is_primary BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Periodic Rankings Table (Phase 2 ready)
CREATE TABLE IF NOT EXISTS public.rankings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    period TEXT NOT NULL CHECK (period IN ('daily', 'weekly', 'monthly')),
    rank INT NOT NULL,
    period_date DATE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Click Events Table (Affiliate Click Logging)
CREATE TABLE IF NOT EXISTS public.click_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    affiliate_link_id UUID REFERENCES public.affiliate_links(id) ON DELETE SET NULL,
    clicked_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    referrer TEXT,
    utm JSONB,
    user_agent TEXT
);

-- Admins Table
CREATE TABLE IF NOT EXISTS public.admins (
    id UUID PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL DEFAULT 'admin',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Newsletter Subscribers Table
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    confirmed BOOLEAN NOT NULL DEFAULT false
);

-- Product Images / Gallery Table
CREATE TABLE IF NOT EXISTS public.product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    alt TEXT,
    sort_order INT NOT NULL DEFAULT 0
);

-- Product Alternatives Table (Self-referencing)
CREATE TABLE IF NOT EXISTS public.product_alternatives (
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    alternative_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, alternative_id)
);

-- ==================================================================
-- 2. INDEXES
-- ==================================================================

CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_status ON public.products(status);
CREATE INDEX IF NOT EXISTS idx_products_current_rank ON public.products(current_rank);
CREATE INDEX IF NOT EXISTS idx_products_launch_date ON public.products(launch_date);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);
CREATE INDEX IF NOT EXISTS idx_affiliate_links_product_id ON public.affiliate_links(product_id);
CREATE INDEX IF NOT EXISTS idx_click_events_product_id ON public.click_events(product_id);
CREATE INDEX IF NOT EXISTS idx_click_events_clicked_at ON public.click_events(clicked_at);
CREATE INDEX IF NOT EXISTS idx_rankings_period_date ON public.rankings(period_date);
CREATE INDEX IF NOT EXISTS idx_product_images_product_id ON public.product_images(product_id);

-- ==================================================================
-- 3. ROW LEVEL SECURITY (RLS) & POLICIES
-- ==================================================================

-- Enable RLS on all tables
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rankings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.click_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_alternatives ENABLE ROW LEVEL SECURITY;

-- Products Policies
CREATE POLICY "Public products are viewable by everyone" ON public.products
    FOR SELECT USING (status = 'published' OR auth.role() = 'authenticated');

CREATE POLICY "Admin full access on products" ON public.products
    FOR ALL USING (auth.role() = 'authenticated');

-- Categories Policies
CREATE POLICY "Categories are viewable by everyone" ON public.categories
    FOR SELECT USING (true);

CREATE POLICY "Admin full access on categories" ON public.categories
    FOR ALL USING (auth.role() = 'authenticated');

-- Product Categories Policies
CREATE POLICY "Product categories are viewable by everyone" ON public.product_categories
    FOR SELECT USING (true);

CREATE POLICY "Admin full access on product_categories" ON public.product_categories
    FOR ALL USING (auth.role() = 'authenticated');

-- Affiliate Links Policies
CREATE POLICY "Affiliate links viewable by everyone" ON public.affiliate_links
    FOR SELECT USING (status = 'active' OR auth.role() = 'authenticated');

CREATE POLICY "Admin full access on affiliate_links" ON public.affiliate_links
    FOR ALL USING (auth.role() = 'authenticated');

-- Rankings Policies
CREATE POLICY "Rankings viewable by everyone" ON public.rankings
    FOR SELECT USING (true);

CREATE POLICY "Admin full access on rankings" ON public.rankings
    FOR ALL USING (auth.role() = 'authenticated');

-- Product Images Policies
CREATE POLICY "Product images viewable by everyone" ON public.product_images
    FOR SELECT USING (true);

CREATE POLICY "Admin full access on product_images" ON public.product_images
    FOR ALL USING (auth.role() = 'authenticated');

-- Product Alternatives Policies
CREATE POLICY "Product alternatives viewable by everyone" ON public.product_alternatives
    FOR SELECT USING (true);

CREATE POLICY "Admin full access on product_alternatives" ON public.product_alternatives
    FOR ALL USING (auth.role() = 'authenticated');

-- Click Events Policies (Public insert for redirect logging, admin select)
CREATE POLICY "Public can insert click events" ON public.click_events
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin select click events" ON public.click_events
    FOR SELECT USING (auth.role() = 'authenticated');

-- Newsletter Subscribers Policies (Public insert, admin select)
CREATE POLICY "Public can subscribe to newsletter" ON public.newsletter_subscribers
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin select subscribers" ON public.newsletter_subscribers
    FOR SELECT USING (auth.role() = 'authenticated');

-- Admins Table Policies
CREATE POLICY "Admin viewable by self" ON public.admins
    FOR SELECT USING (auth.uid() = id);

-- ==================================================================
-- 4. UPDATED_AT TRIGGER
-- ==================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
