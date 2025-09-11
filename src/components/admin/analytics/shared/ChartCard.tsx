"use client";

import React from "react";
import styles from "./Shared.module.css";

// Props এর জন্য টাইপ
type ChartCardProps = {
  title: string;
  children: React.ReactNode; // চার্ট কম্পোনেন্ট এখানে আসবে
};

export const ChartCard: React.FC<ChartCardProps> = ({ title, children }) => {
  return (
    <div className={styles.chartCard}>
      <div className={styles.chartHeader}>
        <h4 className={styles.chartTitle}>{title}</h4>
        {/* ভবিষ্যতে এখানে ফিল্টার বা অন্য কিছু যোগ করা যেতে পারে */}
      </div>
      <div className={styles.chartContainer}>{children}</div>
    </div>
  );
};
