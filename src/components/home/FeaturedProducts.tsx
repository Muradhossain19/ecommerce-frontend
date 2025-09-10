// src/components/FeaturedProducts/FeaturedProducts.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  getFeaturedProducts,
  formatPrice,
  getDiscountPercentage,
} from "@/lib/productData"; // আপনার ডেটা সোর্স অনুযায়ী পাথ পরিবর্তন করুন
import styles from "./FeaturedProducts.module.css";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  Heart,
  Shuffle,
  ShoppingCart,
} from "lucide-react";

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
                  <Link
                    href={`/products/${product.slug}`}
                    className={styles.productCard}
                  >
                    <div className={styles.imageContainer}>
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className={styles.productImage}
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />

                      {/* Labels */}
                      <div className={styles.labelsContainer}>
                        {product.isOnSale && product.originalPrice && (
                          <span
                            className={`${styles.label} ${styles.discountLabel}`}
                          >
                            -
                            {getDiscountPercentage(
                              product.originalPrice,
                              product.price
                            )}
                            %
                          </span>
                        )}
                        {product.isFeatured && (
                          <span
                            className={`${styles.label} ${styles.featureLabel}`}
                          >
                            FEATURED
                          </span>
                        )}
                      </div>

                      {/* Hover Actions */}
                      <div
                        className={`${styles.hoverActions} ${
                          product.sizes ? styles.withSizes : ""
                        }`}
                      >
                        {isMobile ? (
                          <>
                            <button className={styles.actionButton}>
                              <ShoppingCart size={18} />
                            </button>
                            <button className={styles.actionButton}>
                              <Eye size={18} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className={styles.actionButton}
                              data-title="Add to Cart"
                            >
                              <ShoppingCart size={18} />
                            </button>
                            <button
                              className={styles.actionButton}
                              data-title="Add to Wishlist"
                            >
                              <Heart size={18} />
                            </button>
                            <button
                              className={styles.actionButton}
                              data-title="Add to Compare"
                            >
                              <Shuffle size={18} />
                            </button>
                            <button
                              className={styles.actionButton}
                              data-title="Quick View"
                            >
                              <Eye size={18} />
                            </button>
                          </>
                        )}
                      </div>

                      {/* Size Options */}
                      {product.sizes && (
                        <div className={styles.sizeOptions}>
                          {product.sizes.slice(0, 4).map((size) => (
                            <span key={size} className={styles.sizeOption}>
                              {size}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className={styles.cardContent}>
                      <p className={styles.productCategory}>
                        {product.category}
                      </p>
                      <h3 className={styles.productName}>{product.name}</h3>

                      <div className={styles.ratingContainer}>
                        <div className={styles.stars}>
                          {renderStars(product.rating)}
                        </div>
                        <span className={styles.reviewCount}>
                          ({product.reviewCount})
                        </span>
                      </div>

                      <div
                        className={`${styles.priceContainer} ${
                          !product.colors || product.colors.length === 0
                            ? styles.noColors
                            : ""
                        }`}
                      >
                        <span className={styles.currentPrice}>
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className={styles.originalPrice}>
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                      {product.colors && product.colors.length > 0 && (
                        <div className={styles.colorOptions}>
                          {product.colors.slice(0, 4).map((color) => (
                            <span
                              key={color}
                              className={styles.colorOption}
                              style={{ backgroundColor: color.toLowerCase() }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
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
