// src/components/layout/Header.tsx
"use client";

import Link from "next/link";
import { Search, ShoppingCart, User, Menu, Phone } from "lucide-react";
import styles from "./Header.module.css";
import DesktopNav from "./Header/DesktopNav";
import MobileNav from "./Header/MobileNav";
import { useState } from "react";

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={styles.header}>
      {/* 1. Top Announcement Bar */}
      <div className={styles.announcementBar}>
        <div className={`${styles.announcementContent} container`}>
          <Phone size={16} className={styles.phoneIcon} />
          <span>Call us at 09617-700500 (10 AM – 6 PM)</span>
        </div>
      </div>

      {/* 2. Main Header (Middle Bar) */}
      <div className={styles.mainHeader}>
        <div className={`${styles.mainHeaderContent} container`}>
          {/* Left: Mobile Menu Toggle */}
          <button
            className={styles.mobileMenuButton}
            aria-label="Toggle menu"
            onClick={toggleMobileMenu}
          >
            <div className={styles.hamburger}>
              <span className={styles.topBun}></span>
              <span className={styles.meat}></span>
              <span className={styles.bottomBun}></span>
            </div>
          </button>

          {/* Center: Logo */}
          <div className={styles.logoContainer}>
            <Link href="/" className={styles.logo}>
              DeenCommerce
            </Link>
          </div>

          {/* Right: Icons */}
          <div className={styles.iconContainer}>
            <button className={styles.iconButton}>
              <Search size={22} />
            </button>
            <Link
              href="/cart"
              className={`${styles.iconButton} ${styles.cartIcon}`}
            >
              <ShoppingCart size={22} />
              <span className={styles.cartBadge}>0</span>
            </Link>
            <Link href="/login" className={styles.iconButton}>
              <User size={22} />
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Bottom Bar: Desktop Navigation */}
      <DesktopNav />

      <MobileNav isOpen={isMobileMenuOpen} onClose={toggleMobileMenu} />
    </header>
  );
};

export default Header;
