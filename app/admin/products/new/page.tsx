'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AddProductPage() {
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Form State
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [tagline, setTagline] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [featuredImageUrl, setFeaturedImageUrl] = useState('');
  const [officialWebsiteUrl, setOfficialWebsiteUrl] = useState('');
  const [pricingType, setPricingType] = useState('freemium');
  const [priceText, setPriceText] = useState('');
  const [rating, setRating] = useState('4.8');
  const [editorScore, setEditorScore] = useState('9.5');
  const [currentRank, setCurrentRank] = useState('1');
  const [affiliateNetwork, setAffiliateNetwork] = useState('direct');
  const [affiliateUrl, setAffiliateUrl] = useState('');
  const [launchDate, setLaunchDate] = useState('');
  const [launchTime, setLaunchTime] = useState('09:00');
  const [launchTimezone, setLaunchTimezone] = useState('UTC');
  const [isFeatured, setIsFeatured] = useState(true);
  const [isTrending, setIsTrending] = useState(false);
  const [isTopPick, setIsTopPick] = useState(false);
  const [productStatus, setProductStatus] = useState('published');

  const handleNameChange = (val: string) => {
    setName(val);
    if (!slug) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '')
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      // Insert Product into Supabase
      const { data: product, error: productError } = await supabase
        .from('products')
        .insert([
          {
            name,
            slug,
            tagline,
            short_description: shortDescription,
            full_description: fullDescription,
            logo_url: logoUrl || null,
            featured_image_url: featuredImageUrl || null,
            official_website_url: officialWebsiteUrl || null,
            pricing_type: pricingType,
            price_text: priceText,
            rating: parseFloat(rating),
            editor_score: parseFloat(editorScore),
            current_rank: parseInt(currentRank, 10),
            affiliate_network: affiliateNetwork,
            launch_date: launchDate || null,
            launch_time: launchTime || null,
            launch_timezone: launchTimezone,
            is_featured: isFeatured,
            is_trending: isTrending,
            is_top_pick: isTopPick,
            status: productStatus,
            published_at: productStatus === 'published' ? new Date().toISOString() : null,
          },
        ])
        .select()
        .single();

      if (productError) throw productError;

      // Insert Affiliate Link if URL provided
      if (product && affiliateUrl) {
        await supabase.from('affiliate_links').insert([
          {
            product_id: product.id,
            network: affiliateNetwork,
            url: affiliateUrl,
            status: 'active',
            is_primary: true,
          },
        ]);
      }

      setStatus('success');
      setTimeout(() => {
        router.push('/admin/products');
      }, 1200);
    } catch (err: unknown) {
      setStatus('error');
      const msg = err instanceof Error ? err.message : 'Failed to save product. Check Supabase connection.';
      setErrorMessage(msg);
    }
  };

  return (
    <div className="py-6 max-w-4xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Products</span>
        </Link>
        <h1 className="text-xl font-bold text-white">Add New Product</h1>
      </div>

      {/* Main Create Form */}
      <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-6 sm:p-8 space-y-6 border-indigo-500/30">
        {/* Core Identity Section */}
        <div className="space-y-4 pb-6 border-b border-gray-800">
          <h2 className="text-base font-bold text-indigo-400 flex items-center gap-2">
            <Sparkles size={16} />
            Product Identity
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Product Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. ChatPulse AI"
                required
                className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2 px-3 text-xs text-white placeholder-gray-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">URL Slug *</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="chatpulse-ai"
                required
                className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2 px-3 text-xs text-white placeholder-gray-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Tagline (One-Liner)</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="Autonomous AI Support Agents for Next-Gen Customer Success"
              className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2 px-3 text-xs text-white placeholder-gray-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Short Description (Card summary)</label>
            <textarea
              rows={2}
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Deploy intelligent AI support agents that handle 80%+ of customer tickets in seconds..."
              className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2 px-3 text-xs text-white placeholder-gray-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Full Description (Editorial Body)</label>
            <textarea
              rows={5}
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
              placeholder="Write complete review overview..."
              className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2 px-3 text-xs text-white placeholder-gray-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Media & Links Section */}
        <div className="space-y-4 pb-6 border-b border-gray-800">
          <h2 className="text-base font-bold text-cyan-400">Media & Links</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Logo Image URL</label>
              <input
                type="url"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2 px-3 text-xs text-white placeholder-gray-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Featured Hero Image URL</label>
              <input
                type="url"
                value={featuredImageUrl}
                onChange={(e) => setFeaturedImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2 px-3 text-xs text-white placeholder-gray-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Official Website URL</label>
              <input
                type="url"
                value={officialWebsiteUrl}
                onChange={(e) => setOfficialWebsiteUrl(e.target.value)}
                placeholder="https://chatpulse.ai"
                className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2 px-3 text-xs text-white placeholder-gray-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Primary Affiliate Link URL *</label>
              <input
                type="url"
                value={affiliateUrl}
                onChange={(e) => setAffiliateUrl(e.target.value)}
                placeholder="https://jvzoo.com/c/12345/chatpulse"
                required
                className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2 px-3 text-xs text-white placeholder-gray-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Pricing, Rating & Ranking Controls */}
        <div className="space-y-4 pb-6 border-b border-gray-800">
          <h2 className="text-base font-bold text-amber-400">Pricing & Ranking Controls</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Pricing Model</label>
              <select
                value={pricingType}
                onChange={(e) => setPricingType(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2 px-3 text-xs text-white"
              >
                <option value="free">Free</option>
                <option value="freemium">Freemium</option>
                <option value="paid">Paid</option>
                <option value="lifetime">Lifetime Deal</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Price Text</label>
              <input
                type="text"
                value={priceText}
                onChange={(e) => setPriceText(e.target.value)}
                placeholder="From $29/mo (Free trial)"
                className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2 px-3 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Affiliate Network</label>
              <select
                value={affiliateNetwork}
                onChange={(e) => setAffiliateNetwork(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2 px-3 text-xs text-white"
              >
                <option value="direct">Direct SaaS</option>
                <option value="jvzoo">JVZoo</option>
                <option value="warriorplus">WarriorPlus</option>
                <option value="other">Other Marketplaces</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">User Rating (0 - 5)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2 px-3 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Editor Score (0 - 10)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={editorScore}
                onChange={(e) => setEditorScore(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2 px-3 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Manual Rank (#1, #2, ...)</label>
              <input
                type="number"
                min="1"
                value={currentRank}
                onChange={(e) => setCurrentRank(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2 px-3 text-xs text-white"
              />
            </div>
          </div>

          {/* Feature Flags */}
          <div className="flex flex-wrap items-center gap-6 pt-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={isTopPick}
                onChange={(e) => setIsTopPick(e.target.checked)}
                className="rounded border-gray-800 bg-gray-950 text-indigo-600 focus:ring-0"
              />
              <span className="text-amber-400">#1 Pick of the Day (is_top_pick)</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-semibold text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={isTrending}
                onChange={(e) => setIsTrending(e.target.checked)}
                className="rounded border-gray-800 bg-gray-950 text-indigo-600 focus:ring-0"
              />
              <span className="text-emerald-400">Trending Today (is_trending)</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-semibold text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="rounded border-gray-800 bg-gray-950 text-indigo-600 focus:ring-0"
              />
              <span>Featured Flag</span>
            </label>
          </div>
        </div>

        {/* Launch Info & Lifecycle Status */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-purple-400">Launch Date & Lifecycle</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Launch Date</label>
              <input
                type="date"
                value={launchDate}
                onChange={(e) => setLaunchDate(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2 px-3 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Launch Time</label>
              <input
                type="time"
                value={launchTime}
                onChange={(e) => setLaunchTime(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2 px-3 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Timezone</label>
              <input
                type="text"
                value={launchTimezone}
                onChange={(e) => setLaunchTimezone(e.target.value)}
                placeholder="America/New_York"
                className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2 px-3 text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Publication Status</label>
            <select
              value={productStatus}
              onChange={(e) => setProductStatus(e.target.value)}
              className="w-full sm:w-48 bg-gray-950 border border-gray-800 rounded-xl py-2 px-3 text-xs text-white"
            >
              <option value="published">Published (Live)</option>
              <option value="draft">Draft (Hidden)</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        {status === 'error' && (
          <p className="text-xs font-semibold text-rose-400 bg-rose-950/30 p-3 rounded-xl border border-rose-500/30">
            {errorMessage}
          </p>
        )}

        {status === 'success' && (
          <p className="text-xs font-semibold text-emerald-400 bg-emerald-950/30 p-3 rounded-xl border border-emerald-500/30 flex items-center gap-2">
            <CheckCircle2 size={16} />
            <span>Product created successfully! Redirecting...</span>
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="glow-button w-full py-3.5 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {status === 'loading' ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <>
              <Save size={18} />
              <span>Save & Publish Product</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
