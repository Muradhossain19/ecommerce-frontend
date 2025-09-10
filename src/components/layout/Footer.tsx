"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import styles from "./Footer.module.css";

const Footer = () => {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>(
    {}
  );

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const footerSections = {
    shop: {
      title: "Shop",
      links: [
        { label: "New Arrivals", href: "/new-arrivals" },
        { label: "Featured Products", href: "/featured" },
        { label: "T-Shirts", href: "/category/t-shirt" },
        { label: "Shirts", href: "/category/shirt" },
        { label: "Polo Shirts", href: "/category/polo-shirt" },
        { label: "Panjabi", href: "/category/panjabi" },
        { label: "Jeans", href: "/category/jeans" },
        { label: "Trousers", href: "/category/trouser" },
      ],
    },
    customer: {
      title: "Customer Care",
      links: [
        { label: "Contact Us", href: "/contact" },
        { label: "Size Guide", href: "/size-guide" },
        { label: "Shipping Info", href: "/shipping" },
        { label: "Returns", href: "/returns" },
        { label: "Track Order", href: "/track-order" },
        { label: "FAQ", href: "/faq" },
        { label: "Support Center", href: "/support" },
      ],
    },
    company: {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Blog", href: "/blog" },
        { label: "Press", href: "/press" },
        { label: "Sustainability", href: "/sustainability" },
        { label: "Store Locator", href: "/stores" },
      ],
    },
    legal: {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Cookie Policy", href: "/cookies" },
        { label: "Refund Policy", href: "/refund-policy" },
      ],
    },
  };

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://facebook.com/deencommerce",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/deencommerce",
      label: "Instagram",
    },
    {
      icon: Twitter,
      href: "https://twitter.com/deencommerce",
      label: "Twitter",
    },
    {
      icon: Youtube,
      href: "https://youtube.com/deencommerce",
      label: "YouTube",
    },
  ];

  const paymentMethods = [
    "/images/payments/visa.png",
    "/images/payments/mastercard.png",
    "/images/payments/bkash.png",
    "/images/payments/nagad.png",
    "/images/payments/rocket.png",
  ];

  return (
    <footer className={styles.footer}>
      {/* Main Footer Content */}
      <div className={styles.mainContent}>
        <div className="container">
          <div className={styles.footerGrid}>
            {/* Company Info */}
            <div className={styles.companySection}>
              <div className={styles.logo}>
                <Link href="/">
                  <Image
                    src="/images/logo.png"
                    alt="DeenCommerce"
                    width={150}
                    height={40}
                    className={styles.logoImage}
                  />
                </Link>
              </div>

              <p className={styles.companyDescription}>
                Your trusted destination for premium fashion. We bring you the
                latest trends with uncompromising quality and exceptional
                service.
              </p>

              {/* Contact Info */}
              <div className={styles.contactInfo}>
                <div className={styles.contactItem}>
                  <Phone size={16} className={styles.contactIcon} />
                  <span>+880 1700-000000</span>
                </div>
                <div className={styles.contactItem}>
                  <Mail size={16} className={styles.contactIcon} />
                  <span>support@deencommerce.com</span>
                </div>
                <div className={styles.contactItem}>
                  <MapPin size={16} className={styles.contactIcon} />
                  <span>Dhaka, Bangladesh</span>
                </div>
              </div>

              {/* Social Links */}
              <div className={styles.socialSection}>
                <h4 className={styles.socialTitle}>Follow Us</h4>
                <div className={styles.socialLinks}>
                  {socialLinks.map(({ icon: Icon, href, label }) => (
                    <Link
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      aria-label={label}
                    >
                      <Icon size={18} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Links */}
            {Object.entries(footerSections).map(([key, section]) => (
              <div key={key} className={styles.linkSection}>
                <button
                  className={styles.sectionHeader}
                  onClick={() => toggleSection(key)}
                  aria-expanded={openSections[key]}
                >
                  <h4 className={styles.sectionTitle}>{section.title}</h4>
                  <div className={styles.toggleIcon}>
                    {openSections[key] ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </div>
                </button>

                <ul
                  className={`${styles.linkList} ${
                    openSections[key] ? styles.expanded : ""
                  }`}
                >
                  {section.links.map((link) => (
                    <li key={link.href} className={styles.linkItem}>
                      <Link href={link.href} className={styles.footerLink}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <div className="container">
          <div className={styles.bottomContent}>
            {/* Payment Methods */}
            <div className={styles.paymentSection}>
              <span className={styles.paymentLabel}>We Accept:</span>
              <div className={styles.paymentMethods}>
                {paymentMethods.map((method, index) => (
                  <div key={index} className={styles.paymentMethod}>
                    <Image
                      src={method}
                      alt="Payment method"
                      width={35}
                      height={22}
                      className={styles.paymentIcon}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Copyright */}
            <div className={styles.copyright}>
              <p>
                &copy; {new Date().getFullYear()} DeenCommerce. All rights
                reserved.
              </p>
            </div>

            {/* Additional Links */}
            <div className={styles.additionalLinks}>
              <Link href="/sitemap" className={styles.additionalLink}>
                Sitemap
              </Link>
              <Link href="/accessibility" className={styles.additionalLink}>
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
