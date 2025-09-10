// src/components/layout/MobileBottomNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Search, User, Heart, ShoppingBag } from "lucide-react";
import styles from "./MobileBottomNav.module.css";

// নেভিগেশন আইটেমগুলোর জন্য একটি অ্যারে তৈরি করুন
const navItems = [
  { href: "/shop", icon: LayoutGrid, label: "Shop" },
  { href: "/search", icon: Search, label: "Search" },
  { href: "/account", icon: User, label: "Account" },
  { href: "/wishlist", icon: Heart, label: "Wishlist" },
  { href: "/cart", icon: ShoppingBag, label: "Cart" },
];

const MobileBottomNav = () => {
  const pathname = usePathname();

  // ডামি ডেটা: এই মানগুলো আপনার অ্যাপ্লিকেশনের state থেকে আসবে
  const wishlistCount = 0;
  const cartCount = 1;

  return (
    <nav className={styles.mobileNav}>
      <div className={styles.navContent}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`${styles.navItem} ${isActive ? styles.active : ""}`}
            >
              <div className={styles.iconWrapper}>
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                {/* Wishlist এবং Cart এর জন্য ব্যাজ */}
                {item.label === "Wishlist" && wishlistCount > 0 && (
                  <span className={styles.badge}>{wishlistCount}</span>
                )}
                {item.label === "Cart" && cartCount > 0 && (
                  <span className={styles.badge}>{cartCount}</span>
                )}
              </div>
              <span className={styles.label}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
