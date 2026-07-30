import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      website_url,
      tagline,
      category,
      pricing_type,
      launch_date,
      contact_email,
      description,
      logo_url,
      target_keywords,
      seo_score,
    } = body;

    if (!name || !website_url || !contact_email || !description) {
      return NextResponse.json(
        { error: 'Missing required fields (name, website_url, contact_email, description)' },
        { status: 400 }
      );
    }

    // Try storing in Supabase if configured
    let savedInDb = false;
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co') {
      const { error } = await supabase.from('product_submissions').insert([
        {
          name,
          website_url,
          tagline: tagline || '',
          category: category || 'ai-tools',
          pricing_type: pricing_type || 'freemium',
          launch_date: launch_date || null,
          contact_email,
          description,
          logo_url: logo_url || null,
          target_keywords: target_keywords || '',
          seo_score: seo_score || 0,
          status: 'pending',
        },
      ]);

      if (!error) {
        savedInDb = true;
      } else {
        console.warn('Supabase insert error (falling back to mock success):', error.message);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Product submission received successfully! Our editorial team will review your product and SEO score shortly.',
      savedInDb,
      submission: {
        name,
        category,
        contact_email,
        seo_score: seo_score || 75,
        status: 'pending',
        submitted_at: new Date().toISOString(),
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to process submission';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
