// src/components/layout/Header/DesktopNav.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { menuData } from "@/lib/menuData";
import styles from "./DesktopNav.module.css";
import { ChevronDown } from "lucide-react";

const DesktopNav = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <nav className={styles.nav}>
      <div className="container">
        <ul className={styles.navList}>
          {menuData.map((item) => (
            <li
              key={item.label}
              className={styles.navItem}
              onMouseEnter={() => item.submenu && setActiveMenu(item.label)}
              onMouseLeave={() => item.submenu && setActiveMenu(null)}
            >
              <Link href={item.href} className={styles.navLink}>
                {item.label}
                {item.submenu && (
                  <ChevronDown size={16} className={styles.chevron} />
                )}
              </Link>
              {item.submenu && (
                <div
                  className={`${styles.dropdown} ${
                    activeMenu === item.label ? styles.active : ""
                  }`}
                >
                  <ul className={styles.submenuList}>
                    {item.submenu.map((subItem) => (
                      <li key={subItem.label} className={styles.submenuItem}>
                        <Link
                          href={subItem.href}
                          className={styles.submenuLink}
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default DesktopNav;
