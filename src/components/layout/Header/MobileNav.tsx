// src/components/layout/Header/MobileNav.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { menuData, MenuItem } from "@/lib/menuData";
import styles from "./MobileNav.module.css";
import { X, ChevronDown, ChevronUp } from "lucide-react";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNav = ({ isOpen, onClose }: MobileNavProps) => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayActive : ""}`}
        onClick={onClose}
      />

      {/* Navigation Panel */}
      <aside
        className={`${styles.navPanel} ${isOpen ? styles.panelActive : ""}`}
      >
        <div className={styles.header}>
          <h3>Menu</h3>
          <button onClick={onClose} className={styles.closeButton}>
            <X size={24} />
          </button>
        </div>

        <div className={styles.content}>
          <ul className={styles.navList}>
            {menuData.map((item) => (
              <li key={item.label} className={styles.navItem}>
                {item.submenu ? (
                  <>
                    <div
                      className={styles.navLink}
                      onClick={() => toggleSubmenu(item.label)}
                    >
                      <span>{item.label}</span>
                      {openSubmenu === item.label ? (
                        <ChevronUp />
                      ) : (
                        <ChevronDown />
                      )}
                    </div>
                    <div
                      className={`${styles.submenu} ${
                        openSubmenu === item.label ? styles.submenuActive : ""
                      }`}
                    >
                      <ul>
                        {item.submenu.map((subItem) => (
                          <li key={subItem.label}>
                            <Link
                              href={subItem.href}
                              onClick={onClose}
                              className={styles.submenuLink}
                            >
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={styles.navLink}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default MobileNav;
