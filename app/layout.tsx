import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Programming Blog - Complete Guides and Tutorials',
    template: '%s | Programming Blog',
  },
  description: 'Learn about programming languages and technologies with comprehensive guides and tutorials. Master React, Go, Python, JavaScript and more with detailed examples and best practices.',
  keywords: [
    'programming',
    'react',
    'javascript',
    'go lang',
    'golang',
    'python',
    'web development',
    'tutorials',
    'coding',
    'software development',
    'frontend',
    'backend',
    'programming guides',
  ],
  authors: [{ name: 'Programming Blog Team' }],
  creator: 'Programming Blog',
  publisher: 'Programming Blog',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Programming Blog',
    title: 'Programming Blog - Complete Guides and Tutorials',
    description: 'Learn about programming languages and technologies with comprehensive guides and tutorials.',
    images: [
      {
        url: '/assets/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Programming Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Programming Blog - Complete Guides and Tutorials',
    description: 'Learn about programming languages and technologies with comprehensive guides and tutorials.',
    images: ['/assets/images/twitter-image.jpg'],
    creator: '@programmingblog',
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  verification: {
    // Add your verification codes here
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: '/',
  },
  category: 'technology',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#3b82f6' },
    { media: '(prefers-color-scheme: dark)', color: '#1e40af' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
