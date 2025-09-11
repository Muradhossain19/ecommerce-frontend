"use client";

import React from "react";
import { Download, Calendar } from "lucide-react";
import styles from "./Shared.module.css";

// Props এর জন্য একটি টাইপ ডিফাইন করা হচ্ছে
type FilterBarProps = {
  defaultDateRange?: string; // যেমন: "Last 30 Days"
  onExport?: () => void; // এক্সপোর্ট বাটনের ফাংশন
};

export const FilterBar: React.FC<FilterBarProps> = ({
  defaultDateRange = "Last 30 Days",
  onExport,
}) => {
  const handleExportClick = () => {
    if (onExport) {
      onExport();
    } else {
      alert("Export functionality to be implemented!");
    }
  };

  return (
    <div className={styles.filters}>
      <button className={styles.dateRangePicker}>
        <Calendar size={16} />
        <span>{defaultDateRange}</span>
      </button>
      <button onClick={handleExportClick} className={styles.exportButton}>
        <Download size={16} />
        <span>Export</span>
      </button>
    </div>
  );
};
