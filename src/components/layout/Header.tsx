// src/components/layout/Header.tsx
"use client";

import Link from "next/link";
import { Search, ShoppingCart, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaTiktok,
  FaPinterestP,
} from "react-icons/fa6";
import Image from "next/image";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import styles from "./Header.module.css";
import DesktopNav from "./Header/DesktopNav";
import MobileNav from "./Header/MobileNav";

const messages = [
  "Time to refresh your wardrobe.",
  "New arrivals dropping every week!",
  "Enjoy free shipping on orders over 2000৳.",
];

function AnnouncementBar() {
  const [current, setCurrent] = useState(0);
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % messages.length);
    }, 4000); // Interval increased for a smoother feel
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.announcementBar}>
      <div className="container">
        <div className={styles.announcementContent}>
          <div className={styles.announcementSocial}>
            <a href="#">
              <FaFacebookF />
            </a>
            <a href="#">
              <FaXTwitter />
            </a>
            <a href="#">
              <FaInstagram />
            </a>
            <a href="#">
              <FaTiktok />
            </a>
            <a href="#">
              <FaPinterestP />
            </a>
          </div>

          <div className={styles.announcementSlider}>
            <SwitchTransition mode="out-in">
              <CSSTransition
                key={current}
                nodeRef={nodeRef} // Solves findDOMNode error
                timeout={500}
                classNames={{
                  enter: styles.announcementTextEnter,
                  enterActive: styles.announcementTextEnterActive,
                  exit: styles.announcementTextExit,
                  exitActive: styles.announcementTextExitActive,
                }}
              >
                <div ref={nodeRef} className={styles.announcementText}>
                  {messages[current]}
                </div>
              </CSSTransition>
            </SwitchTransition>
          </div>

          <div className={styles.announcementRight}></div>
        </div>
      </div>
    </div>
  );
}

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <AnnouncementBar />
      <header className={styles.stickyHeader}>
        <div className={styles.mainHeader}>
          <div className="container">
            <div className={styles.mainHeaderContent}>
              {/* Left: Mobile Menu + Slogan */}
              <div className={styles.leftSection}>
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
                <div className={styles.sloganWrapper}>
                  <span className={styles.sloganText}>
                    দেশের প্রথম{" "}
                    <span className={styles.sloganHighlight}>
                      ডেনিম ব্র্যান্ড
                    </span>
                  </span>
                </div>
              </div>

              {/* Center: Logo */}
              <div className={styles.logoContainer}>
                <Link href="/">
                  <Image
                    src="/images/logo/deen-logo.png"
                    alt="DEEN Logo"
                    width={140}
                    height={48}
                    className={styles.logoImg}
                    priority
                  />
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
                <Link
                  href="/login"
                  className={`${styles.iconButton} ${styles.userIcon}`}
                >
                  <User size={22} />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <DesktopNav />
      </header>
      <MobileNav isOpen={isMobileMenuOpen} onClose={toggleMobileMenu} />
    </>
  );
};

export default Header;
