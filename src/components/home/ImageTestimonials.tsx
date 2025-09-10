"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { imageTestimonialsData } from "@/lib/imageTestimonialsData";
import styles from "./ImageTestimonials.module.css";
import { ArrowLeft, ArrowRight } from "lucide-react";

const ImageTestimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
    <section ref={sectionRef} className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Our Happy Customers</h2>
          <p className={styles.subtitle}>
            See what our real customers are saying about us.
          </p>
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
              {imageTestimonialsData.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`${styles.cardWrapper} ${
                    isVisible ? styles.animate : ""
                  }`}
                  style={
                    { "--delay": `${index * 0.1}s` } as React.CSSProperties
                  }
                >
                  <Link
                    href={testimonial.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.testimonialCard}
                  >
                    <Image
                      src={testimonial.imageUrl}
                      alt={testimonial.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className={styles.testimonialImage}
                    />
                    <div className={styles.overlay}>
                      <span className={styles.name}>{testimonial.name}</span>
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
      </div>
    </section>
  );
};

export default ImageTestimonials;
