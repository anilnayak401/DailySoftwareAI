import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');
  const type = searchParams.get('type') || 'logo'; // 'logo' | 'image'

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

    let extractedImage: string | null = null;

    if (type === 'image') {
      // 1. Look for og:image or twitter:imagemeta tags
      const ogMatch =
        html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i) ||
        html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i);
      const twitterMatch =
        html.match(/<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["']/i) ||
        html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']twitter:image["']/i);

      extractedImage = ogMatch?.[1] || twitterMatch?.[1] || null;
    } else {
      // 2. Look for apple-touch-icon, logo <img>, shortcut icon, or og:image
      const appleTouch = html.match(
        /<link[^>]*rel=["'](?:apple-touch-icon|apple-touch-icon-precomposed)["'][^>]*href=["']([^"']+)["']/i
      );
      const logoImg = html.match(
        /<img[^>]*src=["']([^"']*(?:logo|brand|icon|header)[^"']*)["']/i
      );
      const iconMatch = html.match(
        /<link[^>]*rel=["'](?:shortcut )?icon["'][^>]*href=["']([^"']+)["']/i
      );
      const ogMatch = html.match(
        /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i
      );

      extractedImage = appleTouch?.[1] || logoImg?.[1] || iconMatch?.[1] || ogMatch?.[1] || null;
    }

    if (extractedImage) {
      // Resolve relative URLs against the final redirected URL
      const fullImageUrl = new URL(extractedImage, finalUrl).href;
      return NextResponse.redirect(fullImageUrl, { status: 302 });
    }

    // Fallback if no specific meta tag was found
    if (type === 'image') {
      const screenshotUrl = `https://image.thum.io/get/width/1200/crop/800/${finalUrl}`;
      return NextResponse.redirect(screenshotUrl, { status: 302 });
    } else {
      const faviconUrl = `https://www.google.com/s2/favicons?domain=${finalDomain}&sz=128`;
      return NextResponse.redirect(faviconUrl, { status: 302 });
    }
  } catch {
    // Abort or network failure fallback
    try {
      const domain = new URL(targetUrl).hostname.replace(/^www\./, '');
      if (type === 'image') {
        return NextResponse.redirect(`https://image.thum.io/get/width/1200/crop/800/${targetUrl}`, { status: 302 });
      }
      return NextResponse.redirect(`https://www.google.com/s2/favicons?domain=${domain}&sz=128`, { status: 302 });
    } catch {
      return NextResponse.json({ error: 'Failed to extract media' }, { status: 500 });
    }
  }
}
