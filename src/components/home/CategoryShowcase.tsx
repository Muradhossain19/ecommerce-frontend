"use client";

import { useMemo, memo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { ArrowRight } from "lucide-react";

import styles from "./CategoryShowcase.module.css";
import ProductCard from "../common/ProductCard";
import {
  getProductsByCategory,
  formatPrice,
  getDiscountPercentage,
} from "@/lib/productData";

// --- ব্যানার কনফিগারেশন (কম্পোনেন্টের বাইরে রাখা ভালো) ---
interface BannerConfig {
  imageUrl: string;
  title: string;
  subtitle: string;
  buttonText: string;
}
const bannerConfig: Record<string, BannerConfig> = {
  "bundle-blast": {
    imageUrl: "/images/categoryShowcase/category-banner.webp",
    title: "Bundle Blast",
    subtitle: "Style & Comfort Combined",
    buttonText: "Shop Now",
  },
  trouser: {
    imageUrl: "/images/categoryShowcase/category-banner.webp",
    title: "Trouser",
    subtitle: "Elegance in Every Thread",
    buttonText: "Explore Collection",
  },
  jeans: {
    imageUrl: "/images/categoryShowcase/category-banner.webp",
    title: "Jeans",
    subtitle: "Stay Cool, Look Great",
    buttonText: "Discover More",
  },
  shirt: {
    imageUrl: "/images/categoryShowcase/category-banner.webp",
    title: "Shirt",
    subtitle: "Sharp Look for Professionals",
    buttonText: "View Styles",
  },
  "polo-shirt": {
    imageUrl: "/images/categoryShowcase/category-banner.webp",
    title: "Polo Shirt",
    subtitle: "Sharp Look for Professionals",
    buttonText: "View Styles",
  },
  panjabi: {
    imageUrl: "/images/categoryShowcase/category-banner.webp",
    title: "Panjabi",
    subtitle: "Traditional Elegance",
    buttonText: "View Styles",
  },
  "t-shirt": {
    imageUrl: "/images/categoryShowcase/category-banner.webp",
    title: "T Shirt",
    subtitle: "Sharp Look for Professionals",
    buttonText: "View Styles",
  },
  boxer: {
    imageUrl: "/images/categoryShowcase/category-banner.webp",
    title: "Boxer",
    subtitle: "Comfort Meets Style",
    buttonText: "View Styles",
  },
};

// Props ইন্টারফেস
interface CategoryShowcaseProps {
  categorySlug: string;
  reverseLayout?: boolean;
}

const CategoryShowcase = ({
  categorySlug,
  reverseLayout = false,
}: CategoryShowcaseProps) => {
  const [isMobile, setIsMobile] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  // Mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // useMemo ব্যবহার করে ডেটা ক্যালকুলেশন অপ্টিমাইজ করা হয়েছে
  const products = useMemo(
    () => getProductsByCategory(categorySlug).slice(0, 8), // সর্বোচ্চ ৬টি প্রোডাক্ট
    [categorySlug]
  );
  const banner = useMemo(
    () => bannerConfig[categorySlug] || bannerConfig.default,
    [categorySlug]
  );

  // Star rendering function
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`${styles.star} ${
          index < Math.floor(rating) ? styles.starFilled : ""
        }`}
      >
        ★
      </span>
    ));
  };

  // যদি কোনো প্রোডাক্ট না থাকে, তাহলে সেকশনটি রেন্ডার হবে না
  if (products.length === 0) {
    return null;
  }

  return (
    <section
      ref={ref}
      className={`${styles.section} ${inView ? styles.inView : ""} ${
        reverseLayout ? styles.reverse : ""
      }`}
    >
      <div className="container">
        <div className={styles.showcaseWrapper}>
          {/* ব্যানার অংশ */}
          <div className={styles.bannerArea}>
            <Link
              href={`/category/${categorySlug}`}
              className={styles.bannerLink}
              aria-label={`Explore ${banner.title} collection`}
            >
              <Image
                src={banner.imageUrl}
                alt={banner.title}
                fill
                sizes="(max-width: 768px) 100vw, 35vw"
                className={styles.bannerImage}
                priority={false}
                loading="lazy"
              />
              <div className={styles.bannerOverlay} />
              <div className={styles.bannerContent}>
                <div>
                  <h2 className={styles.bannerTitle}>{banner.title}</h2>
                  <p className={styles.bannerSubtitle}>{banner.subtitle}</p>
                </div>
                <div className={styles.bannerButton}>
                  <span>{banner.buttonText}</span>
                  <ArrowRight size={20} />
                </div>
              </div>
            </Link>
          </div>

          {/* প্রোডাক্ট গ্রিড অংশ */}
          <div className={styles.productsArea}>
            <div className={styles.productsGrid}>
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isMobile={isMobile}
                  renderStars={renderStars}
                  getDiscountPercentage={getDiscountPercentage}
                  formatPrice={formatPrice}
                  type="featured"
                  styles={styles}
                  hideReviewAndColors // <-- new prop
                />
              ))}
              {/* View More div এবং empty div গুলো সম্পূর্ণভাবে মুছে ফেলা হয়েছে */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// React.memo দিয়ে কম্পোনেন্ট এক্সপোর্ট করা হচ্ছে
export default memo(CategoryShowcase);
