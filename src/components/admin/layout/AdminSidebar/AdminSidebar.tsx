"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  MessageSquare,
  FileText,
  CreditCard,
  Settings,
  User,
  ChevronDown,
  TrendingUp,
  Tag,
  Star,
  Truck,
  HelpCircle,
  Heart,
  Bell,
  Globe,
  Palette,
  Shield,
} from "lucide-react";
import styles from "./AdminSidebar.module.css";

const icons = {
  LayoutDashboard,
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  MessageSquare,
  FileText,
  CreditCard,
  Settings,
  User,
  TrendingUp,
  Tag,
  Star,
  Truck,
  HelpCircle,
  Heart,
  Bell,
  Globe,
  Palette,
  Shield,
};

type MenuChild = {
  id: string;
  label: string;
  icon: keyof typeof icons;
  href: string;
  badge?: string;
};
type MenuItemType = {
  id: string;
  label: string;
  icon: keyof typeof icons;
  href?: string;
  badge?: string;
  children?: MenuChild[];
};

const menuItems: MenuItemType[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "LayoutDashboard",
    href: "/admin",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: "BarChart3",
    children: [
      {
        id: "sales-analytics",
        label: "Sales Reports",
        icon: "TrendingUp",
        href: "/admin/analytics/sales",
      },
      {
        id: "customer-analytics",
        label: "Customer Insights",
        icon: "Users",
        href: "/admin/analytics/customers",
      },
      {
        id: "product-analytics",
        label: "Product Performance",
        icon: "Package",
        href: "/admin/analytics/products",
      },
      {
        id: "traffic-analytics",
        label: "Website Traffic",
        icon: "Globe",
        href: "/admin/analytics/traffic",
      },
    ],
  },
  {
    id: "products",
    label: "Products",
    icon: "Package",
    children: [
      {
        id: "all-products",
        label: "All Products",
        icon: "Package",
        href: "/admin/products",
      },
      {
        id: "add-product",
        label: "Add Product",
        icon: "Package",
        href: "/admin/products/add",
      },
      {
        id: "categories",
        label: "Categories",
        icon: "Tag",
        href: "/admin/categories",
      },
      {
        id: "inventory",
        label: "Inventory",
        icon: "Package",
        href: "/admin/inventory",
      },
      {
        id: "suppliers",
        label: "Suppliers",
        icon: "Package",
        href: "/admin/suppliers",
      },
      {
        id: "reviews",
        label: "Product Reviews",
        icon: "Star",
        href: "/admin/reviews",
      },
    ],
  },
  {
    id: "orders",
    label: "Orders",
    icon: "ShoppingCart",
    badge: "12",
    children: [
      {
        id: "all-orders",
        label: "All Orders",
        icon: "ShoppingCart",
        href: "/admin/orders",
        badge: "12",
      },
      {
        id: "pending-orders",
        label: "Pending Orders",
        icon: "ShoppingCart",
        href: "/admin/orders/pending",
        badge: "5",
      },
      {
        id: "processing",
        label: "Processing",
        icon: "Package",
        href: "/admin/orders/processing",
        badge: "3",
      },
      {
        id: "shipped",
        label: "Shipped",
        icon: "Truck",
        href: "/admin/orders/shipped",
      },
      {
        id: "delivered",
        label: "Delivered",
        icon: "Package",
        href: "/admin/orders/delivered",
      },
      {
        id: "returns",
        label: "Returns & Refunds",
        icon: "Package",
        href: "/admin/orders/returns",
        badge: "2",
      },
    ],
  },
  {
    id: "customers",
    label: "Customers",
    icon: "Users",
    children: [
      {
        id: "all-customers",
        label: "All Customers",
        icon: "Users",
        href: "/admin/customers",
      },
      {
        id: "customer-groups",
        label: "Customer Groups",
        icon: "Users",
        href: "/admin/customers/groups",
      },
      {
        id: "customer-support",
        label: "Support Tickets",
        icon: "HelpCircle",
        href: "/admin/customers/support",
        badge: "8",
      },
      {
        id: "loyalty",
        label: "Loyalty Program",
        icon: "Heart",
        href: "/admin/customers/loyalty",
      },
    ],
  },
  {
    id: "messages",
    label: "Messages",
    icon: "MessageSquare",
    badge: "5",
    children: [
      {
        id: "customer-chat",
        label: "Customer Chat",
        icon: "MessageSquare",
        href: "/admin/messages/chat",
        badge: "5",
      },
      {
        id: "support-tickets",
        label: "Support Tickets",
        icon: "HelpCircle",
        href: "/admin/messages/tickets",
        badge: "3",
      },
      {
        id: "email-campaigns",
        label: "Email Campaigns",
        icon: "MessageSquare",
        href: "/admin/messages/campaigns",
      },
      {
        id: "notifications",
        label: "Notifications",
        icon: "Bell",
        href: "/admin/messages/notifications",
      },
    ],
  },
  {
    id: "content",
    label: "Content",
    icon: "FileText",
    children: [
      {
        id: "homepage",
        label: "Homepage",
        icon: "Globe",
        href: "/admin/content/homepage",
      },
      {
        id: "banners",
        label: "Banners & Promotions",
        icon: "Palette",
        href: "/admin/content/banners",
      },
      {
        id: "blog",
        label: "Blog Management",
        icon: "FileText",
        href: "/admin/content/blog",
      },
      {
        id: "pages",
        label: "Static Pages",
        icon: "FileText",
        href: "/admin/content/pages",
      },
      {
        id: "seo",
        label: "SEO Management",
        icon: "Globe",
        href: "/admin/content/seo",
      },
    ],
  },
  {
    id: "financial",
    label: "Financial",
    icon: "CreditCard",
    children: [
      {
        id: "revenue",
        label: "Revenue Reports",
        icon: "TrendingUp",
        href: "/admin/financial/revenue",
      },
      {
        id: "payments",
        label: "Payment Tracking",
        icon: "CreditCard",
        href: "/admin/financial/payments",
      },
      {
        id: "taxes",
        label: "Tax Management",
        icon: "CreditCard",
        href: "/admin/financial/taxes",
      },
      {
        id: "expenses",
        label: "Expense Tracking",
        icon: "CreditCard",
        href: "/admin/financial/expenses",
      },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    icon: "Settings",
    children: [
      {
        id: "general",
        label: "General Settings",
        icon: "Settings",
        href: "/admin/settings",
      },
      {
        id: "payment-methods",
        label: "Payment Methods",
        icon: "CreditCard",
        href: "/admin/settings/payments",
      },
      {
        id: "shipping",
        label: "Shipping Zones",
        icon: "Truck",
        href: "/admin/settings/shipping",
      },
      {
        id: "users",
        label: "User Management",
        icon: "Users",
        href: "/admin/settings/users",
      },
      {
        id: "permissions",
        label: "Roles & Permissions",
        icon: "Shield",
        href: "/admin/settings/permissions",
      },
      {
        id: "api",
        label: "API Settings",
        icon: "Settings",
        href: "/admin/settings/api",
      },
    ],
  },
];

interface MenuItemProps {
  item: MenuItemType;
  isOpen: boolean;
  onToggle: () => void;
  isCollapsed: boolean;
  onLinkClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  item,
  isOpen,
  onToggle,
  isCollapsed,
  onLinkClick,
}) => {
  const pathname = usePathname();
  const hasChildren = !!item.children;

  const isActive = useMemo(() => {
    if (!hasChildren && item.href) return pathname === item.href;
    return item.children?.some((child) => pathname.startsWith(child.href));
  }, [pathname, item, hasChildren]);

  const Icon = icons[item.icon];

  const handleLinkClick = (e: React.MouseEvent) => {
    if (isCollapsed && hasChildren) {
      e.preventDefault();
    }
    if (onLinkClick) {
      onLinkClick();
    }
  };

  return (
    <li className={styles.navItem}>
      {hasChildren ? (
        <div
          onClick={isCollapsed ? undefined : onToggle}
          className={`${styles.navLink} ${isActive ? styles.active : ""}`}
        >
          {Icon && <Icon size={20} className={styles.navIcon} />}
          <span className={styles.navLabel}>{item.label}</span>
          {item.badge && <span className={styles.badge}>{item.badge}</span>}
          <ChevronDown
            size={16}
            className={`${styles.chevron} ${isOpen ? styles.open : ""}`}
          />
        </div>
      ) : (
        item.href && (
          <Link
            href={item.href}
            onClick={handleLinkClick}
            className={`${styles.navLink} ${isActive ? styles.active : ""}`}
          >
            {Icon && <Icon size={20} className={styles.navIcon} />}
            <span className={styles.navLabel}>{item.label}</span>
            {item.badge && <span className={styles.badge}>{item.badge}</span>}
          </Link>
        )
      )}

      {hasChildren && !isCollapsed && (
        <ul className={`${styles.subMenu} ${isOpen ? styles.open : ""}`}>
          {item.children?.map((child: MenuChild) => {
            const SubIcon = icons[child.icon];
            const isSubActive = pathname === child.href;
            return (
              <li key={child.id}>
                <Link
                  href={child.href}
                  onClick={onLinkClick}
                  className={`${styles.subLink} ${
                    isSubActive ? styles.active : ""
                  }`}
                >
                  {SubIcon && <SubIcon size={18} className={styles.navIcon} />}
                  <span className={styles.navLabel}>{child.label}</span>
                  {child.badge && (
                    <span className={styles.badge}>{child.badge}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
};

export const AdminSidebar = ({
  isCollapsed,
  isMobileNavOpen,
  onLinkClick,
}: {
  isCollapsed: boolean;
  isMobileNavOpen: boolean;
  onLinkClick: () => void;
}) => {
  const pathname = usePathname();
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (isCollapsed) {
      setOpenItems({});
    } else {
      const activeParent = menuItems.find((item) =>
        item.children?.some((child) => pathname.startsWith(child.href))
      );
      if (activeParent) {
        // This ensures we don't create an infinite loop with setOpenItems
        if (!openItems[activeParent.id]) {
          setOpenItems((prev) => ({ ...prev, [activeParent.id]: true }));
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, isCollapsed]);

  const handleToggle = (id: string) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const isProfileActive = pathname.startsWith("/admin/profile");

  return (
    <aside
      className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""} ${
        isMobileNavOpen ? styles.open : ""
      }`}
    >
      <div className={styles.sidebarHeader}>
        <span className={styles.logoText}>DEEN</span>
      </div>

      <div className={styles.sidebarBody}>
        <nav>
          <ul className={styles.navList}>
            {menuItems.map((item) => (
              <MenuItem
                key={item.id}
                item={item}
                isOpen={!!openItems[item.id]}
                onToggle={() => handleToggle(item.id)}
                isCollapsed={isCollapsed}
                onLinkClick={onLinkClick}
              />
            ))}
          </ul>
        </nav>
      </div>

      <div className={styles.sidebarFooter}>
        <Link
          href="/admin/profile"
          onClick={onLinkClick}
          className={`${styles.profileLink} ${
            isProfileActive ? styles.active : ""
          }`}
        >
          <div className={styles.profileAvatar}>N</div>
          <span className={styles.navLabel}>Profile</span>
        </Link>
      </div>
    </aside>
  );
};
