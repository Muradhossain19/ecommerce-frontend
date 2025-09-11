"use client";

import React, {
  useState,
  useEffect,
  useRef,
  RefObject,
  useCallback,
} from "react";
import Image from "next/image";
import {
  Bell,
  MessageSquare,
  Menu,
  ChevronsLeft,
  ChevronsRight,
  Search,
  Calendar,
  User,
  UserCog,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import styles from "./AdminHeader.module.css";

// --- 1. Type-Safe and Generic Custom Hook ---
const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  handler: (event: MouseEvent | TouchEvent) => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

// --- 2. Main Component ---
export const AdminHeader: React.FC<{
  onToggleSidebar: () => void;
  isCollapsed: boolean;
}> = ({ onToggleSidebar, isCollapsed }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState("");

  const profileRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useClickOutside(
    profileRef,
    () => openDropdown === "profile" && setOpenDropdown(null)
  );
  useClickOutside(
    messagesRef,
    () => openDropdown === "messages" && setOpenDropdown(null)
  );
  useClickOutside(
    notificationsRef,
    () => openDropdown === "notifications" && setOpenDropdown(null)
  );

  useEffect(() => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    setCurrentDate(date.toLocaleDateString("en-US", options));
  }, []);

  const handleDropdownToggle = useCallback((dropdownName: string) => {
    setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  }, []);

  const handleSearch = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = e.currentTarget.search.value;
    if (query) {
      alert(`Searching for: ${query}`);
    }
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <button
          onClick={onToggleSidebar}
          className={`${styles.toggleButton} ${styles.hamburgerButton}`}
          aria-label="Toggle mobile menu"
        >
          <Menu size={22} />
        </button>
        <button
          onClick={onToggleSidebar}
          className={`${styles.toggleButton} ${styles.sidebarToggleButton}`}
          aria-label="Toggle sidebar"
        >
          {isCollapsed ? (
            <ChevronsRight size={22} />
          ) : (
            <ChevronsLeft size={22} />
          )}
        </button>
        <form onSubmit={handleSearch} className={styles.searchWrapper}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            name="search"
            placeholder="Search anything..."
            className={styles.searchInput}
          />
        </form>
      </div>

      <div className={styles.headerRight}>
        <div className={styles.dateDisplay}>
          <Calendar size={16} />
          <span>{currentDate}</span>
        </div>

        {/* Messages Dropdown (CORRECTED STRUCTURE) */}
        <div ref={messagesRef} className={styles.dropdownContainer}>
          <button
            onClick={() => handleDropdownToggle("messages")}
            className={styles.iconButton}
            aria-label="Open messages"
          >
            <MessageSquare size={22} />
            <span className={styles.badge}>5</span>
          </button>
          <div
            className={`${styles.dropdownMenu} ${
              openDropdown === "messages" ? styles.open : ""
            }`}
          >
            <div className={styles.dropdownHeader}>Messages</div>
            <div className={styles.dropdownItem}>No new messages</div>
          </div>
        </div>

        {/* Notifications Dropdown (CORRECTED STRUCTURE) */}
        <div ref={notificationsRef} className={styles.dropdownContainer}>
          <button
            onClick={() => handleDropdownToggle("notifications")}
            className={styles.iconButton}
            aria-label="Open notifications"
          >
            <Bell size={22} />
          </button>
          <div
            className={`${styles.dropdownMenu} ${
              openDropdown === "notifications" ? styles.open : ""
            }`}
          >
            <div className={styles.dropdownHeader}>Notifications</div>
            <div className={styles.dropdownItem}>No new notifications</div>
          </div>
        </div>

        {/* Profile Dropdown */}
        <div
          ref={profileRef}
          className={`${styles.profile} ${styles.dropdownContainer}`} // <-- .profile এবং .dropdownContainer উভয়ই থাকবে
          onClick={() => handleDropdownToggle("profile")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) =>
            e.key === "Enter" && handleDropdownToggle("profile")
          }
        >
          <Image
            src="/images/admin/user-avatar.png"
            alt="User"
            width={40}
            height={40}
            className={styles.profileAvatar}
          />
          <div className={styles.profileInfo}>
            <span className={styles.profileName}>Admin User</span>
            <span className={styles.profileRole}>Administrator</span>
          </div>
          <div
            className={`${styles.dropdownMenu} ${
              openDropdown === "profile" ? styles.open : ""
            }`}
          >
            <button className={styles.dropdownItem}>
              <User size={16} />
              <span>My Profile</span>
            </button>
            <button className={styles.dropdownItem}>
              <UserCog size={16} />
              <span>Account Settings</span>
            </button>
            <button className={styles.dropdownItem}>
              <Settings size={16} />
              <span>Preferences</span>
            </button>
            <button className={styles.dropdownItem}>
              <HelpCircle size={16} />
              <span>Help & Support</span>
            </button>
            <hr className={styles.dropdownDivider} />
            <button className={`${styles.dropdownItem} ${styles.logoutItem}`}>
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
