// src/components/home/HeroSection.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { heroSlides } from "@/lib/heroData";
import { useSwipe } from "@/hooks/useSwipe";
import styles from "./HeroSection.module.css";

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
  }, []);

  const goToPrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + heroSlides.length) % heroSlides.length
    );
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      const timer = setInterval(goToNext, 5000);
      return () => clearInterval(timer);
    }
  }, [isMobile, goToNext]);

  const swipeHandlers = useSwipe({
    onSwipedLeft: goToNext,
    onSwipedRight: goToPrev,
  });

  return (
    <section
      className={styles.hero}
      {...(isMobile ? swipeHandlers : {})}
      aria-roledescription="carousel"
      aria-label="Hero Banners"
    >
      <div className={styles.sliderWrapper}>
        {heroSlides.map((slide, index) => {
          // স্লাইডের পজিশন নির্ধারণ
          let positionClass = styles.nextSlide;
          if (index === currentIndex) {
            positionClass = styles.activeSlide;
          } else if (
            index ===
            (currentIndex - 1 + heroSlides.length) % heroSlides.length
          ) {
            positionClass = styles.prevSlide;
          }

          return (
            <Link
              key={slide.id}
              href={slide.buttonLink}
              className={`${styles.slide} ${positionClass}`}
              aria-hidden={index !== currentIndex}
              draggable="false"
            >
              <Image
                src={isMobile ? slide.mobileImageUrl : slide.imageUrl}
                alt={slide.alt}
                fill
                style={{ objectFit: "cover" }}
                priority={index === 0}
                sizes="100vw"
                quality={95}
                draggable="false"
              />
            </Link>
          );
        })}
      </div>

      {/* ডেস্কটপ নেভিগেশন বাটন */}
      {!isMobile && (
        <div className={styles.controlsContainer}>
          <div className={styles.navigationButtons}>
            <button
              onClick={goToPrev}
              className={styles.prevButton}
              aria-label="Previous Slide"
            >
              &#10094;
            </button>
            <button
              onClick={goToNext}
              className={styles.nextButton}
              aria-label="Next Slide"
            >
              &#10095;
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
