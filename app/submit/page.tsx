'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  Globe, 
  Mail, 
  Tag, 
  Calendar, 
  DollarSign, 
  FileText, 
  Layers, 
  Image as ImageIcon,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Award,
  Zap,
  Info
} from 'lucide-react';
import { Interactive3DSeoHealth } from '@/components/submit/Interactive3DSeoHealth';

export default function SubmitProductPage() {
  const [formData, setFormData] = useState({
    name: '',
    website_url: '',
    tagline: '',
    category: 'ai-tools',
    pricing_type: 'freemium',
    launch_date: new Date().toISOString().split('T')[0],
    contact_email: '',
    description: '',
    logo_url: '',
    target_keywords: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // SEO & Ranking Engine Analysis
  const seoAnalysis = useMemo(() => {
    let score = 0;
    const checks: { label: string; passed: boolean; tip: string; points: number }[] = [];

    // Check 1: Product Name length
    const nameLen = formData.name.trim().length;
    const namePassed = nameLen >= 3 && nameLen <= 60;
    checks.push({
      label: 'Brand Title & Name',
      passed: namePassed,
      tip: namePassed ? 'Optimal title length' : 'Title should be between 3 and 60 characters',
      points: 15,
    });
    if (namePassed) score += 15;

    // Check 2: Valid HTTPS URL
    const urlValid = formData.website_url.trim().startsWith('https://');
    checks.push({
      label: 'Secure Website URL (HTTPS)',
      passed: urlValid,
      tip: urlValid ? 'Valid secure URL format' : 'Website URL should begin with https://',
      points: 15,
    });
    if (urlValid) score += 15;

    // Check 3: Tagline length & impact
    const tagLen = formData.tagline.trim().length;
    const tagPassed = tagLen >= 15 && tagLen <= 120;
    checks.push({
      label: 'Value Proposition Tagline',
      passed: tagPassed,
      tip: tagPassed ? 'Strong concise tagline' : 'Provide a punchy tagline between 15-120 characters',
      points: 15,
    });
    if (tagPassed) score += 15;

    // Check 4: Description depth
    const descWords = formData.description.trim().split(/\s+/).filter(Boolean).length;
    const descPassed = descWords >= 30;
    checks.push({
      label: 'Editorial Description Depth',
      passed: descPassed,
      tip: descPassed ? `${descWords} words provided (Great depth!)` : `Write at least 30 words (Currently ${descWords} words)`,
      points: 25,
    });
    if (descPassed) score += 25;

    // Check 5: Target Keywords
    const kwCount = formData.target_keywords.split(',').filter((k) => k.trim().length > 0).length;
    const kwPassed = kwCount >= 2;
    checks.push({
      label: 'Target Keywords for SEO',
      passed: kwPassed,
      tip: kwPassed ? `${kwCount} SEO keywords specified` : 'Add at least 2 comma-separated target keywords',
      points: 15,
    });
    if (kwPassed) score += 15;

    // Check 6: Valid Email
    const emailPassed = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact_email.trim());
    checks.push({
      label: 'Verified Contact Email',
      passed: emailPassed,
      tip: emailPassed ? 'Valid email format' : 'Provide a valid founder/vendor contact email',
      points: 15,
    });
    if (emailPassed) score += 15;

    // Determine ranking tier based on score
    let rankingTier = 'Basic Listing Eligible';
    let badgeColor = 'text-amber-500 bg-amber-500/10 border-amber-500/20';
    if (score >= 85) {
      rankingTier = '🔥 Top Pick & Trending Contender (#1 Tier)';
      badgeColor = 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
    } else if (score >= 60) {
      rankingTier = '⚡ Category Featured & Launch Calendar Ready';
      badgeColor = 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20';
    }

    return { score, checks, rankingTier, badgeColor };
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          seo_score: seoAnalysis.score,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Submission failed');
      }

      setSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 pt-5 pb-12 sm:pt-6 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Hero Banner */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles size={14} /> Product Launch & Ranking Engine
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            Submit Your AI Tool & Check Live SEO Ranking
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed">
            Get your SaaS or AI product featured on DailySoftwareAI. Submitting allows our editorial team to review your tool, list it in our category rankings, and track your launch.
          </p>
        </div>

        {submitted ? (
          /* Confirmation View */
          <div className="max-w-2xl mx-auto bg-white dark:bg-zinc-900 border border-emerald-500/30 rounded-3xl p-8 sm:p-12 text-center shadow-xl">
            <div className="h-16 w-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={36} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Product Submitted Successfully!</h2>
            <p className="text-sm text-slate-600 dark:text-zinc-400 mb-6 leading-relaxed">
              Thank you for submitting <strong className="text-indigo-600 dark:text-indigo-400">{formData.name}</strong>. Your product has been queued for editorial review with an initial SEO Health Score of <span className="font-bold text-emerald-600 dark:text-emerald-400">{seoAnalysis.score}/100</span>.
            </p>

            <div className="bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 text-left text-xs space-y-2 mb-8">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-zinc-400">Submission Status:</span>
                <span className="font-bold text-amber-500 uppercase tracking-wider">Pending Editorial Review</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-zinc-400">Category:</span>
                <span className="font-semibold capitalize text-slate-800 dark:text-zinc-200">{formData.category.replace('-', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-zinc-400">Estimated Tier:</span>
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">{seoAnalysis.rankingTier}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: '',
                    website_url: '',
                    tagline: '',
                    category: 'ai-tools',
                    pricing_type: 'freemium',
                    launch_date: new Date().toISOString().split('T')[0],
                    contact_email: '',
                    description: '',
                    logo_url: '',
                    target_keywords: '',
                  });
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-xs transition-all hover:opacity-90"
              >
                Submit Another Product
              </button>
              <Link
                href="/products"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 font-semibold text-xs hover:bg-slate-100 dark:hover:bg-zinc-900 transition-all text-center"
              >
                Explore Directory
              </Link>
            </div>
          </div>
        ) : (
          /* Submission Form + Live SEO & Ranking Analyzer Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Interactive Form (7 cols) */}
            <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <FileText size={20} className="text-indigo-600 dark:text-indigo-400" />
                Product Details & Metadata
              </h2>

              {errorMessage && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle size={16} /> {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Product Name & Website */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                      Product Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Jasper AI"
                        className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                      Website URL (HTTPS) *
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        name="website_url"
                        required
                        value={formData.website_url}
                        onChange={handleChange}
                        placeholder="https://example.com"
                        className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Tagline */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                    Tagline / One-Line Pitch *
                  </label>
                  <input
                    type="text"
                    name="tagline"
                    required
                    value={formData.tagline}
                    onChange={handleChange}
                    placeholder="e.g. AI copywriter for enterprise marketing teams"
                    className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                {/* Category & Pricing Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
                    >
                      <option value="ai-tools">AI Tools</option>
                      <option value="automation">Automation</option>
                      <option value="seo">SEO</option>
                      <option value="email-marketing">Email Marketing</option>
                      <option value="crm">CRM</option>
                      <option value="lead-generation">Lead Generation</option>
                      <option value="social-media">Social Media</option>
                      <option value="productivity">Productivity</option>
                      <option value="creator-tools">Creator Tools</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                      Pricing Model *
                    </label>
                    <select
                      name="pricing_type"
                      value={formData.pricing_type}
                      onChange={handleChange}
                      className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
                    >
                      <option value="freemium">Freemium</option>
                      <option value="free">Free</option>
                      <option value="paid">Paid Subscription</option>
                      <option value="lifetime">Lifetime Deal</option>
                    </select>
                  </div>
                </div>

                {/* Launch Date & Founder Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                      Launch Date
                    </label>
                    <input
                      type="date"
                      name="launch_date"
                      value={formData.launch_date}
                      onChange={handleChange}
                      className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                      Founder / Contact Email *
                    </label>
                    <input
                      type="email"
                      name="contact_email"
                      required
                      value={formData.contact_email}
                      onChange={handleChange}
                      placeholder="founder@example.com"
                      className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Target Keywords & Logo URL */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                      Target SEO Keywords (Comma Separated)
                    </label>
                    <input
                      type="text"
                      name="target_keywords"
                      value={formData.target_keywords}
                      onChange={handleChange}
                      placeholder="ai writer, content generator, copywriting"
                      className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                      Logo / Thumbnail Image URL
                    </label>
                    <input
                      type="url"
                      name="logo_url"
                      value={formData.logo_url}
                      onChange={handleChange}
                      placeholder="https://example.com/logo.png"
                      className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                    Product Description & Key Features *
                  </label>
                  <textarea
                    name="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe what your product does, who it's for, and its core features..."
                    className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl p-3 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-bold text-xs shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    'Submitting...'
                  ) : (
                    <>
                      <Sparkles size={16} /> Submit Product for Review & Ranking
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right Column: Interactive 3D SEO & Ranking Analyzer + Preview (5 cols) */}
            <div className="lg:col-span-5">
              <Interactive3DSeoHealth seoAnalysis={seoAnalysis} formData={formData} />
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
