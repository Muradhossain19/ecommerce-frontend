"use client";

import React, { useState, useCallback } from "react";
import { AdminSidebar } from "@/components/admin/layout/AdminSidebar/AdminSidebar";
import { AdminHeader } from "@/components/admin/layout/AdminHeader/AdminHeader";
import styles from "./AdminLayout.module.css";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  const handleToggleSidebar = useCallback(() => {
    if (window.innerWidth <= 768) {
      setMobileNavOpen((prev) => !prev);
    } else {
      setIsCollapsed((prev) => !prev);
    }
  }, []);

  const handleLinkClick = useCallback(() => {
    if (isMobileNavOpen) {
      setMobileNavOpen(false);
    }
  }, [isMobileNavOpen]);

  return (
    <div className={styles.adminLayout}>
      {/* সাইডবার */}
      <AdminSidebar
        isCollapsed={isCollapsed}
        isMobileNavOpen={isMobileNavOpen}
        onLinkClick={handleLinkClick}
      />

      {/* মূল কনটেন্ট এলাকা */}
      <div
        className={`${styles.mainWrapper} ${
          isCollapsed ? styles.collapsed : ""
        }`}
      >
        {/* হেডার */}
        <AdminHeader
          onToggleSidebar={handleToggleSidebar}
          isCollapsed={isCollapsed}
        />
        {/* মূল পেইজের কনটেন্ট */}
        <main className={styles.mainContent}>{children}</main>
      </div>

      {/* মোবাইল ভিউতে সাইডবার খোলা থাকলে ওভারলে */}
      {isMobileNavOpen && (
        <div
          className={styles.overlay}
          onClick={() => setMobileNavOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
