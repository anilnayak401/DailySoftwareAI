import { NextRequest, NextResponse } from 'next/server';

function isMarketplaceImage(url: string): boolean {
  const lowercase = url.toLowerCase();
  return (
    lowercase.includes('warriorplus.com/favicon') ||
    lowercase.includes('warriorplus.com/images') ||
    lowercase.includes('wplus_logo') ||
    lowercase.includes('wplus-logo')
  );
}

function getProductMatchingImage(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes('chat') || lower.includes('support')) {
    return 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=300&q=80';
  }
  if (lower.includes('seo') || lower.includes('rank') || lower.includes('keyword')) {
    return 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=300&q=80';
  }
  if (lower.includes('trivia') || lower.includes('kids')) {
    return 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=300&q=80';
  }
  if (lower.includes('coloring') || lower.includes('promptoria') || lower.includes('eggshell')) {
    return 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=300&q=80';
  }
  if (lower.includes('ephemera') || lower.includes('craft') || lower.includes('vintage')) {
    return 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80';
  }
  return 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80';
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');
  const type = searchParams.get('type') || 'logo'; // 'logo' | 'image'
  const productName = searchParams.get('name') || '';

  if (!targetUrl) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
  }

  let domain = '';
  try {
    domain = new URL(targetUrl).hostname.replace(/^www\./, '');
  } catch {
    const matchingVisual = getProductMatchingImage(productName);
    return NextResponse.redirect(matchingVisual, { status: 302 });
  }

  // 1. For non-marketplace product domains, Google Favicon is 100% fast, reliable & returns real brand favicon/logo!
  if (type === 'logo' && !domain.includes('warriorplus.com') && !domain.includes('jvzoo.com') && !domain.includes('launchpadjv.com')) {
    const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    return NextResponse.redirect(faviconUrl, { status: 302 });
  }

  try {
    // 2. For marketplace or image requests, attempt to crawl target page
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

    const candidates: string[] = [];

    if (type === 'image') {
      const ogMatch =
        html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i) ||
        html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i);
      const twitterMatch =
        html.match(/<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["']/i) ||
        html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']twitter:image["']/i);

      if (ogMatch?.[1]) candidates.push(ogMatch[1]);
      if (twitterMatch?.[1]) candidates.push(twitterMatch[1]);
    } else {
      const appleTouch = html.match(
        /<link[^>]*rel=["'](?:apple-touch-icon|apple-touch-icon-precomposed)["'][^>]*href=["']([^"']+)["']/i
      );
      const logoImg = html.match(
        /<img[^>]*src=["']([^"']*(?:logo|brand|product|header)[^"']*)["']/i
      );
      const ogMatch = html.match(
        /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i
      );

      if (logoImg?.[1]) candidates.push(logoImg[1]);
      if (appleTouch?.[1]) candidates.push(appleTouch[1]);
      if (ogMatch?.[1]) candidates.push(ogMatch[1]);
    }

    for (const rawUrl of candidates) {
      if (!rawUrl) continue;
      const fullUrl = new URL(rawUrl, finalUrl).href;

      if (!isMarketplaceImage(fullUrl)) {
        return NextResponse.redirect(fullUrl, { status: 302 });
      }
    }

    if (!finalDomain.includes('warriorplus.com')) {
      const faviconUrl = `https://www.google.com/s2/favicons?domain=${finalDomain}&sz=128`;
      return NextResponse.redirect(faviconUrl, { status: 302 });
    }

    // Fallback: Matching product visual (no alphabetical badges!)
    const matchingVisual = getProductMatchingImage(productName);
    return NextResponse.redirect(matchingVisual, { status: 302 });

  } catch {
    if (domain && !domain.includes('warriorplus.com')) {
      return NextResponse.redirect(`https://www.google.com/s2/favicons?domain=${domain}&sz=128`, { status: 302 });
    }
    const matchingVisual = getProductMatchingImage(productName);
    return NextResponse.redirect(matchingVisual, { status: 302 });
  }
}
