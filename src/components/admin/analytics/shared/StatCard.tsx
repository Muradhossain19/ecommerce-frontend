"use client";

import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import styles from "./Shared.module.css";

// Props এর জন্য টাইপ
type StatCardProps = {
  title: string;
  value: string;
  change: number;
  trend: "up" | "down";
  period?: string; // যেমন: "vs last month"
};

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  trend,
  period = "vs last period",
}) => {
  const TrendIcon = trend === "up" ? TrendingUp : TrendingDown;

  return (
    <div className={styles.statCard}>
      <p className={styles.statTitle}>{title}</p>
      <h3 className={styles.statValue}>{value}</h3>
      <p
        className={`${styles.statComparison} ${
          trend === "up" ? styles.trendUp : styles.trendDown
        }`}
      >
        <TrendIcon size={16} />
        <span>
          {change}% {period}
        </span>
      </p>
    </div>
  );
};
