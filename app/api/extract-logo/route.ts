import { NextRequest, NextResponse } from 'next/server';

function isAffiliateRedirectDomain(domain: string): boolean {
  const lowercase = domain.toLowerCase();
  return (
    lowercase.includes('jvz') ||
    lowercase.includes('jvzoo') ||
    lowercase.includes('warriorplus') ||
    lowercase.includes('launchpadjv') ||
    lowercase.includes('clickbank') ||
    lowercase.includes('paykickstart')
  );
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');
  const type = searchParams.get('type') || 'logo'; // 'logo' | 'image'
  const productName = searchParams.get('name') || '';

  if (!targetUrl) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
  }

  try {
    let finalUrl = targetUrl;
    let finalDomain = '';

    try {
      const initialDomain = new URL(targetUrl).hostname.replace(/^www\./, '');

      // If it's a direct product domain (not an affiliate redirect domain like jvz5 or warriorplus),
      // we can return Google Favicon or IconHorse immediately!
      if (type === 'logo' && !isAffiliateRedirectDomain(initialDomain)) {
        const faviconUrl = `https://www.google.com/s2/favicons?domain=${initialDomain}&sz=128`;
        return NextResponse.redirect(faviconUrl, { status: 302 });
      }
    } catch {
      // ignore
    }

    // Follow redirects to get the real product sales page destination URL
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(targetUrl, {
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      },
    });
    clearTimeout(timeoutId);

    finalUrl = response.url;
    const html = await response.text();
    finalDomain = new URL(finalUrl).hostname.replace(/^www\./, '');

    if (type === 'logo') {
      // 1. Try to extract apple-touch-icon or shortcut icon from target HTML
      const appleTouch = html.match(
        /<link[^>]*rel=["'](?:apple-touch-icon|apple-touch-icon-precomposed)["'][^>]*href=["']([^"']+)["']/i
      );
      const iconMatch = html.match(
        /<link[^>]*rel=["'](?:shortcut )?icon["'][^>]*href=["']([^"']+)["']/i
      );

      const rawIcon = appleTouch?.[1] || iconMatch?.[1];
      if (rawIcon && !rawIcon.toLowerCase().includes('warriorplus')) {
        const fullIconUrl = new URL(rawIcon, finalUrl).href;
        return NextResponse.redirect(fullIconUrl, { status: 302 });
      }

      // 2. Look for webpage og:image or header image if apple-touch-icon not found
      const ogMatch =
        html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i) ||
        html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i);
      if (ogMatch?.[1]) {
        const fullImageUrl = new URL(ogMatch[1], finalUrl).href;
        return NextResponse.redirect(fullImageUrl, { status: 302 });
      }

      // 3. Fallback: Google favicon of final destination domain
      const faviconUrl = `https://www.google.com/s2/favicons?domain=${finalDomain}&sz=128`;
      return NextResponse.redirect(faviconUrl, { status: 302 });
    } else {
      // Image request: extract og:image or twitter:image
      const ogMatch =
        html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i) ||
        html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i);
      const twitterMatch =
        html.match(/<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["']/i) ||
        html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']twitter:image["']/i);

      const rawImage = ogMatch?.[1] || twitterMatch?.[1];
      if (rawImage) {
        const fullImageUrl = new URL(rawImage, finalUrl).href;
        return NextResponse.redirect(fullImageUrl, { status: 302 });
      }

      // Fallback live website screenshot
      const screenshotUrl = `https://image.thum.io/get/width/1200/crop/800/${finalUrl}`;
      return NextResponse.redirect(screenshotUrl, { status: 302 });
    }
  } catch {
    // Network fallback
    try {
      const domain = new URL(targetUrl).hostname.replace(/^www\./, '');
      const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
      return NextResponse.redirect(faviconUrl, { status: 302 });
    } catch {
      return NextResponse.json({ error: 'Failed to extract logo' }, { status: 500 });
    }
  }
}

