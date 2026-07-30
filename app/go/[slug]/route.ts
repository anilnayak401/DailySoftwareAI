import { NextRequest, NextResponse } from 'next/server';
import { supabase, createAdminClient } from '@/lib/supabase';
import { MOCK_PRODUCTS } from '@/lib/data';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const userAgent = request.headers.get('user-agent') || '';
  const referrer = request.headers.get('referer') || '';

  // Extract UTM query parameters from current request URL if present
  const searchParams = request.nextUrl.searchParams;
  const utm: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    if (key.startsWith('utm_')) {
      utm[key] = value;
    }
  });

  let targetUrl: string | null = null;
  let productId: string | null = null;
  let affiliateLinkId: string | null = null;

  try {
    // 1. Fetch product and active affiliate link from Supabase
    const { data: product } = await supabase
      .from('products')
      .select('id, official_website_url, affiliate_links(*)')
      .eq('slug', slug)
      .single();

    if (product) {
      productId = product.id;
      const activeLink = product.affiliate_links?.find(
        (link: { status: string; is_primary: boolean; url: string; id: string }) =>
          link.status === 'active' && link.is_primary
      ) || product.affiliate_links?.find((link: { status: string }) => link.status === 'active');

      if (activeLink?.url) {
        targetUrl = activeLink.url;
        affiliateLinkId = activeLink.id;
      } else if (product.official_website_url) {
        targetUrl = product.official_website_url;
      }
    }
  } catch {
    // fallback
  }

  // Fallback to mock product data if database not connected yet
  if (!targetUrl) {
    const mock = MOCK_PRODUCTS.find((p) => p.slug === slug);
    if (mock) {
      productId = mock.id;
      targetUrl = mock.official_website_url || `https://chatpulse.ai/?ref=dailysoftwareai`;
    }
  }

  // 2. If valid target URL found, log click event and redirect
  if (targetUrl) {
    // Attempt async click logging in background (using admin client if available)
    try {
      if (productId) {
        const adminClient = createAdminClient();
        await adminClient.from('click_events').insert([
          {
            product_id: productId,
            affiliate_link_id: affiliateLinkId,
            referrer,
            user_agent: userAgent,
            utm: Object.keys(utm).length > 0 ? utm : null,
          },
        ]);
      }
    } catch {
      // Ignore click log failure to never block user redirect
    }

    // Open-redirect safety validation: ensure destination is absolute http/https URL
    try {
      const parsedUrl = new URL(targetUrl);
      if (parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:') {
        return NextResponse.redirect(targetUrl, 302);
      }
    } catch {
      // Invalid URL format
    }
  }

  // 3. Fallback: if deal is unavailable or disabled, render friendly notice
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dailysoftwareai.com';
  return NextResponse.redirect(`${siteUrl}/products/${slug}?deal=unavailable`, 302);
}
