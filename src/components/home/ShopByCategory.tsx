"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { categoryData, CategoryItem } from "@/lib/categoryData";
import styles from "./ShopByCategory.module.css";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

// Props ইন্টারফেস
interface ShopByCategoryProps {
  title?: string;
  discoverText?: string;
}

// CategoryCard কম্পোনেন্ট
const CategoryCard = ({
  category,
  index,
}: {
  category: CategoryItem;
  index: number;
}) => {
  // রেফারেন্স অনুযায়ী কার্ডের জন্য বিভিন্ন ব্যাকগ্রাউন্ড কালার
  const bgColors = ["#fde2e4", "#e2e8f0", "#fae1dd", "#f0f8ff", "#e6e6fa"];
  const bgColor = bgColors[index % bgColors.length];

  return (
    <Link href={`/category/${category.slug}`} className={styles.categoryCard}>
      <div
        className={styles.imageContainer}
        style={{ backgroundColor: bgColor }}
      >
        <Image
          src={category.imageUrl}
          alt={category.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className={styles.categoryImage}
        />
        <div className={styles.cardLabelWrapper}>
          <span className={styles.cardLabel}>{category.name}</span>
        </div>
      </div>
    </Link>
  );
};

// মূল কম্পোনেন্ট
const ShopByCategory = ({
  title = "SHOP BY CATEGORIES",
  discoverText = "Discovery all new items",
}: ShopByCategoryProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
        const scrollAmount = card.offsetWidth + 24; // 24px হচ্ছে গ্যাপ
        current.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.navigation}>
            <button
              onClick={() => scroll("left")}
              className={styles.navButton}
              aria-label="Previous"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              className={styles.navButton}
              aria-label="Next"
            >
              <ArrowRight size={18} />
            </button>
          </div>
          <h2 className={styles.title}>{title}</h2>
        </div>

        <div className={styles.contentWrapper}>
          <div className={styles.sliderArea} ref={scrollContainerRef}>
            <div className={styles.sliderTrack}>
              {categoryData.slice(0, 7).map((category, index) => (
                <div
                  key={category.id}
                  className={`${styles.cardWrapper} ${
                    isVisible ? styles.animate : ""
                  }`}
                  style={
                    { "--delay": `${index * 0.1}s` } as React.CSSProperties
                  }
                >
                  <CategoryCard category={category} index={index} />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.discoverArea}>
            <Link href="/products" className={styles.discoverBox}>
              <span className={styles.discoverText}>{discoverText}</span>
              <div className={styles.discoverIconWrapper}>
                <ArrowUpRight size={20} />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;
