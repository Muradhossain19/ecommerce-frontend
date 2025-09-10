"use client";

import { useState, useEffect, useRef } from "react";
import { featuresData } from "@/lib/featuresData";
import styles from "./Features.module.css";

const Features = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          {featuresData.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className={`${styles.featureCard} ${
                  isVisible ? styles.animate : ""
                }`}
                style={
                  {
                    "--delay": `${index * 0.15}s`,
                    backgroundColor: feature.bgColor,
                  } as React.CSSProperties
                }
              >
                <div className={styles.iconWrapper}>
                  <Icon size={24} />
                </div>
                <div className={styles.content}>
                  <h3 className={styles.title}>{feature.title}</h3>
                  <p className={styles.description}>{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
