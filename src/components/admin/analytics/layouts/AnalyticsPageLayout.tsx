import React from "react";
import { FilterBar } from "../shared/FilterBar";
import styles from "./Layouts.module.css";

// Props এর জন্য টাইপ
type AnalyticsPageLayoutProps = {
  title: string;
  children: React.ReactNode; // পেজের মূল কন্টেন্ট এখানে আসবে
  defaultDateRange?: string;
  onExport?: () => void;
};

export const AnalyticsPageLayout: React.FC<AnalyticsPageLayoutProps> = ({
  title,
  children,
  defaultDateRange,
  onExport,
}) => {
  return (
    <div className={styles.analyticsPage}>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>{title}</h1>
        <FilterBar defaultDateRange={defaultDateRange} onExport={onExport} />
      </header>
      <main className={styles.pageContent}>{children}</main>
    </div>
  );
};
