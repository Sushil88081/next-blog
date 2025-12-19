import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'React.js हिंदी में - पूरी गाइड और ट्यूटोरियल',
  description: 'React.js के बारे में हिंदी में सीखें। State, Hooks, Components और बहुत कुछ के बारे में विस्तृत गाइड।',
  keywords: ['React', 'React.js', 'हिंदी', 'ट्यूटोरियल', 'गाइड', 'JavaScript'],
  authors: [{ name: 'React Blog Hindi' }],
  openGraph: {
    title: 'React.js हिंदी में - पूरी गाइड',
    description: 'React.js के बारे में हिंदी में सीखें',
    type: 'website',
    locale: 'hi_IN',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hi" suppressHydrationWarning>
      <body className={inter.className}>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
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

