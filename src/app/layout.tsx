// src/app/layout.tsx

import type { Metadata, Viewport } from "next";

import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

// ২. SEO-ফ্রেন্ডলি মেটাডেটা: বিস্তারিত এবং ডায়নামিক টাইটেল টেমপ্লেট
export const metadata: Metadata = {
  title: {
    default: "DeenCommerce - Your Modern Islamic Lifestyle Store",
    template: "%s | DeenCommerce",
  },
  description:
    "Discover a curated collection of Islamic lifestyle products. Shop for modern modest fashion, books, prayer essentials, and more. Quality products for a mindful life.",

  keywords: [
    "islamic lifestyle",
    "modest fashion",
    "prayer mats",
    "islamic books",
    "deen commerce",
  ],
  authors: [{ name: "DeenCommerce Team", url: "https://deencommerce.com" }],
  creator: "Tizfai Technologies AB",
  publisher: "DeenCommerce",
  // Open Graph (OG ) মেটাডেটা - সোশ্যাল মিডিয়া শেয়ারিংয়ের জন্য
  openGraph: {
    title: "DeenCommerce - Your Modern Islamic Lifestyle Store",
    description: "Discover a curated collection of Islamic lifestyle products.",
    url: "https://deencommerce.com", // আপনার আসল ডোমেইন
    siteName: "DeenCommerce",
    images: [
      {
        url: "/og-image.png", // public ফোল্ডারে একটি আকর্ষণীয় ছবি রাখুন (1200x630px )
        width: 1200,
        height: 630,
        alt: "DeenCommerce Store",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  // Twitter কার্ড
  twitter: {
    card: "summary_large_image",
    title: "DeenCommerce - Your Modern Islamic Lifestyle Store",
    description:
      "Shop for modern modest fashion, books, prayer essentials, and more.",
    images: ["/twitter-image.png"],
  },
  // অন্যান্য ট্যাগ
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

// ৩. ভিউপোর্ট কনফিগারেশন: মোবাইল ডিভাইসের জন্য
export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

// ৪. JSON-LD স্কিমা (স্ট্রাকচার্ড ডেটা): SEO-এর জন্য অত্যন্ত গুরুত্বপূর্ণ
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization", // অথবা 'Store' ব্যবহার করতে পারেন
  name: "DeenCommerce",
  url: "https://deencommerce.com", // আপনার আসল ডোমেইন
  logo: "https://deencommerce.com/logo.png", // আপনার লোগোর URL
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+880-XXX-XXXXXX", // আপনার কন্টাক্ট নম্বর
    contactType: "Customer Service",
  },
  sameAs: [
    "https://www.facebook.com/yourpage",
    "https://www.instagram.com/yourpage",
    "https://www.twitter.com/yourpage",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-roboto antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileBottomNav />
      </body>
    </html>
  );
}
