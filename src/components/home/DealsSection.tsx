"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  featuredProducts,
  getDiscountPercentage,
  formatPrice,
} from "@/lib/productData";
import styles from "./DealsSection.module.css";
import { ArrowRight, Clock } from "lucide-react";
import ProductCard from "../common/ProductCard";
import productCardStyles from "./FeaturedProducts.module.css"; // অথবা আপনার product card style module

// কাউন্টডাউন টাইমারের জন্য একটি কাস্টম হুক
const useCountdown = (targetDate: string) => {
  const countDownDate = new Date(targetDate).getTime();
  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
};

const DealsSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const dealProducts = featuredProducts.filter((product) => product.isDeal);
  const dealMeta = {
    title: "Monsoon Madness",
    subtitle: "Flat 25% Off On All Rainy-Day Essentials",
    bannerImage: "/images/hero-1.webp",
    endDate: "2025-09-20T23:59:59",
  };

  const { days, hours, minutes, seconds } = useCountdown(dealMeta.endDate);

  const renderTime = (value: number, label: string) => (
    <div className={styles.timeBlock}>
      <span className={styles.timeValue}>{String(value).padStart(2, "0")}</span>
      <span className={styles.timeLabel}>{label}</span>
    </div>
  );

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`${productCardStyles.star} ${
          index < Math.floor(rating) ? productCardStyles.starFilled : ""
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.dealWrapper}>
          {/* বাম অংশ: ব্যানার ও তথ্য */}
          <div className={styles.bannerArea}>
            <Image
              src={dealMeta.bannerImage}
              alt={dealMeta.title}
              fill
              className={styles.bannerImage}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className={styles.overlay} />
            <div className={styles.bannerContent}>
              <h2 className={styles.title}>{dealMeta.title}</h2>
              <p className={styles.subtitle}>{dealMeta.subtitle}</p>

              {/* কাউন্টডাউন টাইমার */}
              <div className={styles.countdownTimer}>
                <Clock size={20} className={styles.clockIcon} />
                {renderTime(days, "Days")}
                <span className={styles.separator}>:</span>
                {renderTime(hours, "Hours")}
                <span className={styles.separator}>:</span>
                {renderTime(minutes, "Mins")}
                <span className={styles.separator}>:</span>
                {renderTime(seconds, "Secs")}
              </div>
              <div className={styles.viewAllWrapper}>
                <Link href="/deals" className={styles.ctaButton}>
                  <span>View All Deals</span>
                  <ArrowRight
                    size={20}
                    style={{ marginLeft: 6 }}
                    className={styles.arrowIcon}
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* ডান অংশ: প্রোডাক্ট গ্রিড */}
          <div className={styles.productsArea}>
            <div className={styles.productsGrid}>
              {dealProducts.slice(0, 2).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isMobile={isMobile}
                  renderStars={renderStars}
                  getDiscountPercentage={getDiscountPercentage}
                  formatPrice={formatPrice}
                  type="featured"
                  styles={productCardStyles}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
