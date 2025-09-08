// src/app/layout.tsx

import type { Metadata, Viewport } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header"; // আমরা হেডার ও ফুটার যোগ করব
// import Footer from '@/components/layout/Footer';

// ১. ফন্ট অপ্টিমাইজেশন: next/font ব্যবহার করে ফন্ট লোড করা
// এটি স্বয়ংক্রিয়ভাবে ফন্ট ফাইল হোস্ট করে এবং Cumulative Layout Shift (CLS) প্রতিরোধ করে।
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"], // আপনার প্রয়োজনীয় ওজনগুলো যোগ করুন
  display: "swap", // ফন্ট লোড হওয়ার সময় ফলব্যাক ফন্ট দেখাবে
  variable: "--font-poppins", // CSS ভেরিয়েবল হিসেবে ব্যবহার করার জন্য
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-roboto",
});

// ২. SEO-ফ্রেন্ডলি মেটাডেটা: বিস্তারিত এবং ডায়নামিক টাইটেল টেমপ্লেট
export const metadata: Metadata = {
  // title.template ব্যবহার করলে প্রতিটি পেজের টাইটেলের সাথে সাইটের নাম যুক্ত হবে
  title: {
    default: "DeenCommerce - Your Modern Islamic Lifestyle Store", // ডিফল্ট টাইটেল
    template: "%s | DeenCommerce", // পেজের টাইটেল এখানে '%s' দিয়ে প্রতিস্থাপিত হবে
  },
  description:
    "Discover a curated collection of Islamic lifestyle products. Shop for modern modest fashion, books, prayer essentials, and more. Quality products for a mindful life.",
  // আরও কিছু গুরুত্বপূর্ণ মেটা ট্যাগ
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
    images: ["/twitter-image.png"], // public ফোল্ডারে রাখুন (1200x630px)
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
  themeColor: "#ffffff", // আপনার ব্র্যান্ডের প্রাইমারি কালারও দিতে পারেন
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
    // আপনার সোশ্যাল মিডিয়া লিঙ্ক
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
    <html lang="en" className={`${poppins.variable} ${roboto.variable}`}>
      <head>
        {/* JSON-LD স্কিমা যোগ করা */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-roboto antialiased">
        {" "}
        {/* ডিফল্ট বডি ফন্ট সেট করা */}
        <Header />
        <main>{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
