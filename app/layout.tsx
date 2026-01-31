import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://learn-code-easy.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Programming Blog - Complete Guides and Tutorials",
    template: "%s | Programming Blog",
  },
  description:
    "Learn about programming languages and technologies with comprehensive guides and tutorials. Master React, Go, Python, JavaScript, TypeScript and more with detailed examples and best practices. Free coding tutorials for beginners and advanced developers.",
  keywords: [
    "programming",
    "programming blog",
    "react",
    "reactjs",
    "javascript",
    "typescript",
    "go lang",
    "golang",
    "python",
    "web development",
    "tutorials",
    "coding tutorials",
    "software development",
    "frontend development",
    "backend development",
    "programming guides",
    "learn programming",
    "coding examples",
    "react tutorial",
    "javascript tutorial",
    "python tutorial",
    "golang tutorial",
  ],
  authors: [{ name: "Programming Blog Team" }],
  creator: "Programming Blog",
  publisher: "Programming Blog",
  applicationName: "Programming Blog",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Programming Blog",
    title: "Programming Blog - Complete Guides and Tutorials",
    description:
      "Learn about programming languages and technologies with comprehensive guides and tutorials. Master React, Go, Python, JavaScript and more with detailed examples and best practices.",
    images: [
      {
        url: `${siteUrl}/assets/images/react.jpg`,
        width: 1200,
        height: 630,
        alt: "Programming Blog - Learn Programming Languages and Technologies",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Programming Blog - Complete Guides and Tutorials",
    description:
      "Learn about programming languages and technologies with comprehensive guides and tutorials.",
    images: [`${siteUrl}/assets/images/react.jpg`],
    creator: "@programmingblog",
    site: "@programmingblog",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    // Add your verification codes here
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "technology",
  classification: "Technology & Programming",
  other: {
    "og:locale:alternate": "en_US",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#3b82f6" },
    { media: "(prefers-color-scheme: dark)", color: "#1e40af" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://learn-code-easy.vercel.app";

  // Structured Data for SEO
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Programming Blog",
    url: siteUrl,
    logo: `${siteUrl}/assets/images/react.jpg`,
    description:
      "Learn about programming languages and technologies with comprehensive guides and tutorials.",
    sameAs: [
      // Add your social media URLs here when available
      // "https://twitter.com/programmingblog",
      // "https://github.com/yourusername",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      availableLanguage: "English",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Programming Blog",
    url: siteUrl,
    description:
      "Learn about programming languages and technologies with comprehensive guides and tutorials. Master React, Go, Python, JavaScript and more.",
    publisher: {
      "@type": "Organization",
      name: "Programming Blog",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-KCTMQSQ8RL"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-KCTMQSQ8RL');
            `,
          }}
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2036622719481563"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <ThemeProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
