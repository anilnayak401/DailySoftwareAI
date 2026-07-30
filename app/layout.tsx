import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dailysoftwareai.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'DailySoftwareAI — Discover the Best AI Tools, SaaS & Software Deals',
    template: '%s | DailySoftwareAI.com',
  },
  description:
    'Daily rankings, new software launches, expert picks, and exclusive lifetime software deals for creators, marketers, founders, and businesses.',
  keywords: [
    'AI Tools',
    'SaaS Directory',
    'Software Launches',
    'Lifetime Deals',
    'JVZoo Launches',
    'WarriorPlus Deals',
    'Marketing Automation',
    'Best AI Software',
  ],
  authors: [{ name: 'Naresh', url: `${siteUrl}/about` }],
  creator: 'DailySoftwareAI Team',
  publisher: 'DailySoftwareAI.com',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'DailySoftwareAI — Discover the Best AI Tools, SaaS & Software Deals',
    description:
      'Daily rankings, new software launches, expert picks, and exclusive lifetime software deals for creators, marketers, founders, and businesses.',
    siteName: 'DailySoftwareAI',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DailySoftwareAI — Premium Software Directory & Launch Tracker',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DailySoftwareAI — Discover the Best AI Tools, SaaS & Software Deals',
    description:
      'Daily rankings, new software launches, expert picks, and exclusive lifetime software deals.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter.variable} min-h-screen flex flex-col antialiased studio-mesh`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>

          <Header />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
