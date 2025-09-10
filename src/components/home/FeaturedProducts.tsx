// src/components/FeaturedProducts/FeaturedProducts.tsx
"use client";

import { useState, useEffect, useRef } from "react";

import Link from "next/link";
import {
  getFeaturedProducts,
  formatPrice,
  getDiscountPercentage,
} from "@/lib/productData"; // আপনার ডেটা সোর্স অনুযায়ী পাথ পরিবর্তন করুন
import styles from "./FeaturedProducts.module.css";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProductCard from "../common/ProductCard";

const FeaturedProducts = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const featuredProducts = getFeaturedProducts(8); // ৮টি প্রোডাক্ট দেখানোর জন্য
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const card = current.querySelector(
        `.${styles.cardWrapper}`
      ) as HTMLElement;
      if (card) {
        const scrollAmount = card.offsetWidth + 24; // 24px হচ্ছে gap
        current.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

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

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Featured Products</h2>
          <p className={styles.subtitle}>Discover our handpicked collection</p>
        </div>
        <div className={styles.sliderWrapper}>
          <button
            className={`${styles.navButton} ${styles.leftArrow}`}
            onClick={() => scroll("left")}
            aria-label="Previous"
          >
            <ArrowLeft size={22} />
          </button>
          <div className={styles.sliderArea} ref={scrollContainerRef}>
            <div className={styles.sliderTrack}>
              {featuredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className={`${styles.cardWrapper} ${
                    isVisible ? styles.animate : ""
                  }`}
                  style={
                    { "--delay": `${index * 0.1}s` } as React.CSSProperties
                  }
                >
                  <ProductCard
                    product={product}
                    isMobile={isMobile}
                    renderStars={renderStars}
                    getDiscountPercentage={getDiscountPercentage}
                    formatPrice={formatPrice}
                    type="featured"
                    styles={styles}
                  />
                </div>
              ))}
            </div>
          </div>
          <button
            className={`${styles.navButton} ${styles.rightArrow}`}
            onClick={() => scroll("right")}
            aria-label="Next"
          >
            <ArrowRight size={22} />
          </button>
        </div>
        {/* View All Button */}
        <div className={styles.viewAllWrapper}>
          <Link href="/products" className={styles.viewAllButton}>
            <span>View All Products</span>
            <ArrowRight
              size={18}
              style={{ marginLeft: 6 }}
              className={styles.arrowIcon}
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
