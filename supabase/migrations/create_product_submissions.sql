-- Supabase Migration: Create Product Submissions Table

CREATE TABLE IF NOT EXISTS public.product_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    website_url TEXT NOT NULL,
    tagline TEXT NOT NULL,
    category TEXT NOT NULL,
    pricing_type TEXT DEFAULT 'freemium',
    launch_date DATE,
    contact_email TEXT NOT NULL,
    description TEXT NOT NULL,
    logo_url TEXT,
    target_keywords TEXT,
    seo_score INTEGER DEFAULT 0,
    status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.product_submissions ENABLE ROW LEVEL SECURITY;

-- Allow public insertion (visitors can submit products)
CREATE POLICY "Allow public submissions" ON public.product_submissions
    FOR INSERT WITH CHECK (true);

-- Allow admins to view all submissions
CREATE POLICY "Allow authenticated read" ON public.product_submissions
    FOR SELECT USING (auth.role() = 'authenticated');
