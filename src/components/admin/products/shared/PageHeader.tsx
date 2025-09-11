import React from "react";
import styles from "./Shared.module.css";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  children?: React.ReactNode; // বাটনগুলোর জন্য
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <div className={styles.pageHeader}>
      <div>
        <h1 className={styles.pageTitle}>{title}</h1>
        <p className={styles.pageSubtitle}>{subtitle}</p>
      </div>
      <div className={styles.headerActions}>{children}</div>
    </div>
  );
};
