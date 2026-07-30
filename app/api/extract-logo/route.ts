import { NextRequest, NextResponse } from 'next/server';

function isPlatformDomain(domain: string): boolean {
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

  if (!targetUrl) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
  }

  let domain = '';
  try {
    domain = new URL(targetUrl).hostname.replace(/^www\./, '');
  } catch {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  }

  // 1. If it's a direct product site (not a platform/affiliate domain), use real domain favicon FIRST
  if (type === 'logo' && !isPlatformDomain(domain)) {
    const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    return NextResponse.redirect(faviconUrl, { status: 302 });
  }

  // 2. If it is a platform domain (JVZoo/WarriorPlus) or favicon is missing, crawl page HTML for logo/og:image or screenshot crop
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

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

    const finalUrl = response.url;
    const html = await response.text();
    const finalDomain = new URL(finalUrl).hostname.replace(/^www\./, '');

    // If final domain redirected to a non-platform domain, return its real favicon!
    if (type === 'logo' && !isPlatformDomain(finalDomain)) {
      const faviconUrl = `https://www.google.com/s2/favicons?domain=${finalDomain}&sz=128`;
      return NextResponse.redirect(faviconUrl, { status: 302 });
    }

    // Try extracting logo <img>, apple-touch-icon, or og:image from the page HTML
    const logoImg = html.match(
      /<img[^>]*src=["']([^"']*(?:logo|brand|header|product)[^"']*)["']/i
    );
    const appleTouch = html.match(
      /<link[^>]*rel=["'](?:apple-touch-icon|apple-touch-icon-precomposed)["'][^>]*href=["']([^"']+)["']/i
    );
    const ogMatch =
      html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i);

    const extractedImage = logoImg?.[1] || appleTouch?.[1] || ogMatch?.[1];

    if (extractedImage && !isPlatformDomain(extractedImage)) {
      const fullImageUrl = new URL(extractedImage, finalUrl).href;
      return NextResponse.redirect(fullImageUrl, { status: 302 });
    }

    // Fallback: Take a screenshot crop of their website page (NO platform logos!)
    const websiteCropUrl = `https://image.thum.io/get/width/300/crop/300/${finalUrl}`;
    return NextResponse.redirect(websiteCropUrl, { status: 302 });

  } catch {
    // Fallback website screenshot crop
    const websiteCropUrl = `https://image.thum.io/get/width/300/crop/300/${targetUrl}`;
    return NextResponse.redirect(websiteCropUrl, { status: 302 });
  }
}
