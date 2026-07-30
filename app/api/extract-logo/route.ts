import { NextRequest, NextResponse } from 'next/server';

function isMarketplaceImage(url: string): boolean {
  const lowercase = url.toLowerCase();
  return (
    lowercase.includes('warriorplus') ||
    lowercase.includes('wplus') ||
    lowercase.includes('jvzoo') ||
    lowercase.includes('jvz1') ||
    lowercase.includes('jvz4') ||
    lowercase.includes('jvz5') ||
    lowercase.includes('jvz7') ||
    lowercase.includes('launchpadjv') ||
    lowercase.includes('clickbank') ||
    lowercase.includes('paykickstart') ||
    lowercase.includes('favicon.ico')
  );
}

function generateNameBadge(name: string): string {
  const cleanName = name || 'AI Tool';
  const words = cleanName.replace(/[^a-zA-Z0-9 ]/g, '').split(' ').filter(Boolean);
  const initials = words.length >= 2
    ? (words[0][0] + words[1][0]).toUpperCase()
    : cleanName.substring(0, 2).toUpperCase();

  const colors = ['6366F1', 'EC4899', '8B5CF6', '10B981', 'F59E0B', '06B6D4', '3B82F6', 'EF4444', '84CC16', 'A855F7'];
  const charCodeSum = cleanName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const bgColor = colors[charCodeSum % colors.length];

  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=${bgColor}&color=fff&size=256&bold=true&font-size=0.45&rounded=true`;
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
    // Fetch target webpage following HTTP 301/302 redirects
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

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

    const candidates: string[] = [];

    if (type === 'image') {
      // 1. Look for og:image or twitter:image
      const ogMatch =
        html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i) ||
        html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i);
      const twitterMatch =
        html.match(/<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["']/i) ||
        html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']twitter:image["']/i);

      if (ogMatch?.[1]) candidates.push(ogMatch[1]);
      if (twitterMatch?.[1]) candidates.push(twitterMatch[1]);
    } else {
      // 2. Look for product logo, header image, or apple-touch-icon
      const appleTouch = html.match(
        /<link[^>]*rel=["'](?:apple-touch-icon|apple-touch-icon-precomposed)["'][^>]*href=["']([^"']+)["']/i
      );
      const logoImg = html.match(
        /<img[^>]*src=["']([^"']*(?:logo|brand|product|header)[^"']*)["']/i
      );
      const mainImg = html.match(
        /<img[^>]*src=["']([^"']+\.(?:png|jpg|jpeg|svg|webp))["']/i
      );
      const ogMatch = html.match(
        /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i
      );

      if (logoImg?.[1]) candidates.push(logoImg[1]);
      if (appleTouch?.[1]) candidates.push(appleTouch[1]);
      if (mainImg?.[1]) candidates.push(mainImg[1]);
      if (ogMatch?.[1]) candidates.push(ogMatch[1]);
    }

    // Filter out marketplace domain platform logos (WarriorPlus, JVZoo, etc.)
    for (const rawUrl of candidates) {
      if (!rawUrl) continue;
      const fullUrl = new URL(rawUrl, finalUrl).href;

      if (!isMarketplaceImage(fullUrl)) {
        return NextResponse.redirect(fullUrl, { status: 302 });
      }
    }

    // If final domain is NOT a marketplace platform, try Google favicon of final domain
    if (!isMarketplaceImage(finalUrl)) {
      const faviconUrl = `https://www.google.com/s2/favicons?domain=${finalDomain}&sz=128`;
      return NextResponse.redirect(faviconUrl, { status: 302 });
    }

    // If it is a marketplace page and no product logo exists, return matching product name badge
    const badgeUrl = generateNameBadge(productName);
    return NextResponse.redirect(badgeUrl, { status: 302 });

  } catch {
    // Abort or network failure fallback
    const badgeUrl = generateNameBadge(productName);
    return NextResponse.redirect(badgeUrl, { status: 302 });
  }
}
