import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import {
  Sparkles,
  Tag,
  CheckCircle2,
  Calendar,
  Clock,
  Globe,
  ShieldCheck,
  Zap,
} from 'lucide-react';

import { supabase } from '@/lib/supabase';
import { Product } from '@/lib/types';
import { MOCK_PRODUCTS } from '@/lib/data';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { RatingBadge } from '@/components/ui/RatingBadge';
import { RankBadge } from '@/components/ui/RankBadge';
import { AffiliateCTA } from '@/components/ui/AffiliateCTA';
import { ProsCons } from '@/components/ui/ProsCons';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { ImageGallery } from '@/components/ui/ImageGallery';
import { ProductCard } from '@/components/ui/ProductCard';
import { formatDate, formatTime, getProductLogoUrl, getProductScreenshotUrl } from '@/lib/utils';


export const revalidate = 3600;

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories (*),
        affiliate_links (*),
        product_images (*)
      `)
      .eq('slug', slug)
      .single();

    if (error || !data) {
      const mock = MOCK_PRODUCTS.find((p) => p.slug === slug);
      return mock || null;
    }
    return data as Product;
  } catch {
    const mock = MOCK_PRODUCTS.find((p) => p.slug === slug);
    return mock || null;
  }
}

export async function generateStaticParams() {
  try {
    const { data } = await supabase
      .from('products')
      .select('slug')
      .eq('status', 'published');

    if (data && data.length > 0) {
      return data.map((p) => ({ slug: p.slug }));
    }
  } catch {
    // fallback
  }

  return MOCK_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  const categoryName = product.categories?.[0]?.name || 'Software';
  const title = product.seo_title || `${product.name} Review 2026: Pricing, Features & Deals`;
  const description =
    product.seo_description ||
    `In-depth editorial review of ${product.name} (${categoryName}). Check features, pros & cons, rating, pricing, and active lifetime deals.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: product.featured_image_url ? [{ url: product.featured_image_url }] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const primaryCategory = product.categories?.[0] || { name: 'AI Tools', slug: 'ai-tools' };
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dailysoftwareai.com';
  const logoSrc = getProductLogoUrl(product.logo_url, product.official_website_url);
  const screenshotSrc = getProductScreenshotUrl(product.featured_image_url, product.official_website_url);


  const defaultPros = [
    'Intuitive, modern user interface requiring zero learning curve',
    'Robust API integration capabilities with native webhook support',
    'Real-time automated performance insights and analytics dashboard',
    'Generous pricing model with verified discount deals',
  ];

  const defaultCons = [
    'Advanced workflow customizations require paid plan subscription',
    'Initial configuration may take 15–20 minutes for legacy systems',
  ];

  const defaultFaqs = [
    {
      question: `What is ${product.name} and who is it designed for?`,
      answer: `${product.name} is a top-tier ${primaryCategory.name} platform designed for creators, digital marketers, early-stage founders, and automation teams looking to boost productivity.`,
    },
    {
      question: `Is there a free trial or money-back guarantee available for ${product.name}?`,
      answer: `Yes! ${product.name} offers a ${product.price_text || 'free trial or special deal pricing'} accessible via our verified deal partner link.`,
    },
    {
      question: `How does ${product.name} compare to alternative software tools?`,
      answer: `${product.name} stands out due to its high editor rating (${product.editor_score || '9.5'}/10), intuitive design, and transparent pricing structure.`,
    },
  ];

  const relatedProducts = MOCK_PRODUCTS.filter((p) => p.slug !== product.slug);

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.short_description || product.full_description,
    image: product.featured_image_url || product.logo_url,
    brand: {
      '@type': 'Brand',
      name: product.name,
    },
    review: {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: product.rating || 4.8,
        bestRating: 5,
      },
      author: {
        '@type': 'Person',
        name: 'Naresh',
        url: `${siteUrl}/about`,
      },
      publisher: {
        '@type': 'Organization',
        name: 'DailySoftwareAI',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating || 4.8,
      reviewCount: 42,
    },
  };

  return (
    <div className="pb-16 space-y-8">
      {/* Schema Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      {/* 1. Breadcrumbs */}
      <Breadcrumbs
        items={[
          { name: 'Categories', url: '/categories' },
          { name: primaryCategory.name, url: `/categories/${primaryCategory.slug}` },
          { name: product.name, url: `/products/${product.slug}` },
        ]}
      />

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Main Content Area */}
        <div className="lg:col-span-8 space-y-8">
          {/* 2. Product Hero */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-indigo-500/30 relative">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <RankBadge
                  rank={product.current_rank}
                  isTopPick={product.is_top_pick}
                  isTrending={product.is_trending}
                />
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30">
                  {primaryCategory.name}
                </span>
              </div>
              <RatingBadge rating={product.rating} editorScore={product.editor_score} size="lg" />
            </div>

            <div className="flex items-start gap-4 mb-4">
              {logoSrc && (
                <div className="relative w-16 h-16 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 overflow-hidden flex-shrink-0 p-1 flex items-center justify-center">
                  <Image
                    src={logoSrc}
                    alt={`${product.name} logo`}
                    fill
                    className="object-contain p-1"
                    unoptimized={logoSrc.includes('favicons') || logoSrc.includes('iconify')}
                  />
                </div>
              )}
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {product.name}
                </h1>
                <p className="text-base text-slate-600 dark:text-zinc-300 font-medium mt-1">
                  {product.tagline}
                </p>
              </div>
            </div>

            {/* 3. Short Affiliate Disclosure */}
            <p className="text-[11px] text-slate-500 dark:text-zinc-400 bg-slate-100 dark:bg-zinc-900/80 p-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 mb-6 flex items-center gap-2">
              <ShieldCheck size={14} className="text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
              <span>
                Independent Editorial Review: We may earn a commission if you purchase through our link below at no extra cost to you.
              </span>
            </p>

            <AffiliateCTA slug={product.slug} label={`Visit ${product.name} Deal`} size="lg" fullWidth />
          </div>

          {/* 4. Featured Hero Image */}
          {screenshotSrc && (
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-slate-200 dark:border-zinc-800 bg-zinc-900 shadow-xl">
              <Image
                src={screenshotSrc}
                alt={`${product.name} dashboard preview`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="object-cover"
                unoptimized={screenshotSrc.includes('thum.io') || screenshotSrc.includes('favicons')}
              />
            </div>
          )}


          {/* 5. Full Description */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Overview & Executive Summary
            </h2>
            <p className="text-slate-700 dark:text-zinc-300 leading-relaxed text-sm sm:text-base">
              {product.full_description || product.short_description}
            </p>
          </div>

          {/* 6. Key Features */}
          <div className="glass-card rounded-3xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Zap size={20} className="text-indigo-600 dark:text-indigo-400" />
              Key Features & Capabilities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700 dark:text-zinc-300">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-100/70 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800">
                <CheckCircle2 size={16} className="text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                <span>Autonomous Ticket & Support Automation</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-100/70 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800">
                <CheckCircle2 size={16} className="text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                <span>Multi-channel API & Webhook Integration</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-100/70 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800">
                <CheckCircle2 size={16} className="text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                <span>Deep Natural Language & Sentiment Analysis</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-100/70 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800">
                <CheckCircle2 size={16} className="text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                <span>Custom Knowledge Base & PDF Indexing</span>
              </div>
            </div>
          </div>

          {/* 7. Best For */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-indigo-500/5 to-purple-500/5">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Who Should Use {product.name}?</h2>
            <p className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
              Ideal for SaaS founders, digital marketers, solopreneurs, e-commerce managers, and agencies looking for a reliable {primaryCategory.name} solution to scale operations efficiently.
            </p>
          </div>

          {/* 8. Pros & Cons */}
          <ProsCons pros={defaultPros} cons={defaultCons} />

          {/* 9. Pricing & Deal Info */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border-indigo-500/30">
            <div className="flex items-center gap-2 mb-4">
              <Tag size={20} className="text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Pricing & Lifetime Deal Details</h2>
            </div>
            <div className="bg-slate-100 dark:bg-zinc-950 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-bold text-slate-500 dark:text-zinc-400 tracking-wider">Pricing Model</span>
                <p className="text-lg font-extrabold text-slate-900 dark:text-white capitalize">{product.pricing_type || 'Paid'}</p>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1 font-semibold">{product.price_text}</p>
              </div>
              <AffiliateCTA slug={product.slug} label="Claim Exclusive Deal" size="md" />
            </div>
          </div>

          {/* 10. Screenshots Gallery */}
          <ImageGallery images={product.product_images} />

          {/* 11. Launch Info */}
          {product.launch_date && (
            <div className="glass-card rounded-3xl p-6 border-cyan-500/30">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <Calendar size={18} className="text-cyan-500 dark:text-cyan-400" />
                Launch Tracking Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600 dark:text-zinc-300">
                <div>
                  <span className="text-slate-400 dark:text-zinc-500 block">Launch Date</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{formatDate(product.launch_date)}</span>
                </div>
                <div>
                  <span className="text-slate-400 dark:text-zinc-500 block">Launch Time</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {product.launch_time ? formatTime(product.launch_time) : '09:00 AM'} ({product.launch_timezone})
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 dark:text-zinc-500 block">Marketplace</span>
                  <span className="font-semibold text-slate-900 dark:text-white uppercase">{product.affiliate_network || 'Direct'}</span>
                </div>
              </div>
            </div>
          )}

          {/* 12. FAQ */}
          <FAQAccordion faqs={defaultFaqs} title={`Frequently Asked Questions about ${product.name}`} />

          {/* 13. Alternatives */}
          <div className="my-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Popular Alternatives</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedProducts.slice(0, 2).map((alt) => (
                <ProductCard key={alt.id} product={alt} />
              ))}
            </div>
          </div>

          {/* 15. Author Credit & Last Updated */}
          <div className="glass-card rounded-2xl p-6 flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400 border-slate-200 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white text-sm">
                N
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white text-sm">Reviewed by Naresh</p>
                <p className="text-slate-500 dark:text-zinc-400">AI Automation Engineer & Editor</p>
              </div>
            </div>
            <div className="text-right">
              <span>Last Updated: {formatDate(product.updated_at || product.created_at)}</span>
            </div>
          </div>
        </div>

        {/* Right Sticky Side Rail */}
        <div className="lg:col-span-4 sticky top-20 space-y-6">
          <div className="glass-card rounded-3xl p-6 border-indigo-500/30 space-y-6 shadow-xl">
            <div className="text-center pb-4 border-b border-slate-200 dark:border-zinc-800">
              <RatingBadge rating={product.rating} editorScore={product.editor_score} size="lg" className="justify-center mb-2" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{product.name}</h3>
              <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mt-0.5">{product.price_text}</p>
            </div>

            <div className="space-y-3 text-xs text-slate-600 dark:text-zinc-300">
              <div className="flex justify-between py-1.5 border-b border-slate-200 dark:border-zinc-800">
                <span className="text-slate-400 dark:text-zinc-500">Pricing Model</span>
                <span className="font-semibold text-slate-900 dark:text-white capitalize">{product.pricing_type}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-200 dark:border-zinc-800">
                <span className="text-slate-400 dark:text-zinc-500">Editor Score</span>
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">{product.editor_score}/10</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-200 dark:border-zinc-800">
                <span className="text-slate-400 dark:text-zinc-500">Current Rank</span>
                <span className="font-semibold text-amber-600 dark:text-amber-400">#{product.current_rank || 1}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400 dark:text-zinc-500">Official Site</span>
                {product.official_website_url ? (
                  <a href={product.official_website_url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
                    <Globe size={12} />
                    <span>Visit Site</span>
                  </a>
                ) : (
                  <span className="text-slate-400 dark:text-zinc-500">N/A</span>
                )}
              </div>
            </div>

            <AffiliateCTA slug={product.slug} label="Visit Deal Now" size="lg" fullWidth />

            <div className="text-[11px] text-slate-400 dark:text-zinc-500 text-center flex items-center justify-center gap-1">
              <ShieldCheck size={13} className="text-emerald-500 dark:text-emerald-400" />
              <span>Safe 302 Redirect & Price Match Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
