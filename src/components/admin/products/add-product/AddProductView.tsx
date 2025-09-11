"use client";

import React, { useState } from "react";
import { PageHeader } from "../shared/PageHeader";
import styles from "./AddProduct.module.css";
import { ProductInformation } from "./ProductInformation";
import MediaUpload from "./MediaUpload";
import PricingInventory from "./PricingInventory";
import ProductVariation from "./ProductVariation";
import ShippingFee from "./ShippingFee";

export interface ProductVariationData {
  id: string; // প্রতিটি ভ্যারিয়েশনের একটি ইউনিক আইডি থাকবে
  attributes: { [key: string]: string }; // যেমন: { Color: 'Red', Size: 'L' }
  price?: number;
  sku?: string;
  stock?: number;
  image?: string; // প্রতিটি ভ্যারিয়েশনের জন্য আলাদা ছবি থাকতে পারে
}

// Product data interface (productType এবং linkedProducts যোগ করা হয়েছে)
export interface ProductData {
  id?: string;
  name?: string;
  productType?: "simple" | "bundle"; // <-- নতুন ফিল্ড
  description?: string;
  price?: number;
  sku?: string;
  brand?: string;
  category?: string;
  subCategory?: string;
  images?: string[];
  stock?: number;
  tags?: string[];
  supplierId?: string;
  purchaseCost?: number;
  weight?: number;
  length?: number;
  width?: number;
  height?: number;
  shippingClass?: string;
  shippingCost?: number;
  isNew?: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isOnSale?: boolean;
  isDeal?: boolean;
  variations?: ProductVariationData[];
  linkedProducts?: { id: string; quantity: number }[]; // <-- নতুন ফিল্ড
}

interface AddProductViewProps {
  isEditMode?: boolean;
  initialData?: ProductData | null;
}

export const AddProductView: React.FC<AddProductViewProps> = ({
  isEditMode = false,
  initialData = null,
}) => {
  const [activeTab, setActiveTab] = useState<string>("info");
  // --- কেন্দ্রীয় State ---
  const [productData, setProductData] = useState<ProductData>(
    initialData || { productType: "simple" }
  );

  // --- ডেটা পরিবর্তনের জন্য কেন্দ্রীয় ফাংশন ---
  const handleDataChange = (updates: Partial<ProductData>) => {
    setProductData((prev) => ({ ...prev, ...updates }));
  };

  const navItems = [
    { id: "info", label: "Product Information", component: ProductInformation },
    { id: "media", label: "Upload Media", component: MediaUpload },
    {
      id: "pricing",
      label: "Pricing & Inventory",
      component: PricingInventory,
    },
    {
      id: "variation",
      label: "Product Variation",
      component: ProductVariation,
    },
    { id: "shipping", label: "Shipping Fee", component: ShippingFee },
  ];

  const ActiveComponent = navItems.find(
    (item) => item.id === activeTab
  )?.component;

  return (
    <div className={styles.pageWrapper}>
      <PageHeader
        title={isEditMode ? "Edit Product" : "Add Product"}
        subtitle={
          isEditMode
            ? `Editing: ${productData.name || ""}`
            : "Add product properly"
        }
        breadcrumbs={["Products", isEditMode ? "Edit Product" : "Add Product"]}
      />
      <div className={styles.contentLayout}>
        <aside className={styles.quickNav}>
          <h4 className={styles.navTitle}>Quick Navigation</h4>
          <nav>
            <ul>
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`${styles.navButton} ${
                      activeTab === item.id ? styles.active : ""
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className={styles.mainContent}>
          {ActiveComponent &&
            React.createElement(ActiveComponent, {
              productData,
              onDataChange: handleDataChange,
            })}
        </main>
      </div>
      <footer className={styles.pageFooter}>
        <div className={styles.footerLeft}>
          <span>Product completion: </span>
          <div className={styles.progressBar}>
            <div className={styles.progress} style={{ width: "20%" }}></div>
          </div>
          <span>20%</span>
        </div>
        <div className={styles.footerRight}>
          <button className={`${styles.footerButton} ${styles.draftButton}`}>
            Save as Draft
          </button>
          <button className={`${styles.footerButton} ${styles.cancelButton}`}>
            Cancel
          </button>
          <button className={`${styles.footerButton} ${styles.nextButton}`}>
            {isEditMode ? "Save Changes" : "Go Next"}
          </button>
        </div>
      </footer>
    </div>
  );
};
