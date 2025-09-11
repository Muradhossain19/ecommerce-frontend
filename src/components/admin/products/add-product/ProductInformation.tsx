"use client";

import React, { useState } from "react";
import styles from "./AddProduct.module.css";
import dynamic from "next/dynamic";
import { ProductData } from "./AddProductView";
import { X, Search } from "lucide-react";

const TiptapEditor = dynamic(
  () => import("../shared/TiptapEditor").then((mod) => mod.TiptapEditor),
  { ssr: false }
);

// ডামি ডেটা
const sampleSuppliers = [
  { id: "SUP001", name: "Global Fashion Supplies" },
  { id: "SUP002", name: "Electronics Hub" },
];
const searchableProducts = [
  { id: "SKU1001", name: "Camera Body" },
  { id: "SKU1002", name: "50mm Lens" },
  { id: "SKU1003", name: "Camera Bag" },
];

const FormGroup: React.FC<{
  label: string;
  children: React.ReactNode;
  className?: string;
}> = ({ label, children, className = "" }) => (
  <div className={`${styles.formGroup} ${className}`}>
    <label className={styles.formLabel}>{label}</label>
    {children}
  </div>
);

interface ProductInformationProps {
  productData: ProductData;
  onDataChange: (updates: Partial<ProductData>) => void;
}

export const ProductInformation: React.FC<ProductInformationProps> = ({
  productData,
  onDataChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddLinkedProduct = (product: { id: string; name: string }) => {
    const existing = productData.linkedProducts || [];
    if (!existing.find((p) => p.id === product.id)) {
      onDataChange({
        linkedProducts: [...existing, { id: product.id, quantity: 1 }],
      });
    }
    setSearchTerm("");
  };

  const handleRemoveLinkedProduct = (id: string) => {
    onDataChange({
      linkedProducts: (productData.linkedProducts || []).filter(
        (p) => p.id !== id
      ),
    });
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    onDataChange({
      linkedProducts: (productData.linkedProducts || []).map((p) =>
        p.id === id ? { ...p, quantity } : p
      ),
    });
  };

  return (
    <div className={styles.formSection}>
      <h3 className={styles.sectionTitle}>Product Information</h3>

      {/* --- Product Type --- */}
      <FormGroup label="Product Type">
        <select
          className={styles.formInput}
          value={productData.productType}
          onChange={(e) =>
            onDataChange({ productType: e.target.value as "simple" | "bundle" })
          }
        >
          <option value="simple">Simple Product</option>
          <option value="bundle">Bundle Product</option>
        </select>
      </FormGroup>

      <div className={styles.formGrid}>
        <FormGroup label="Product Title">
          <input
            type="text"
            placeholder="Add product title"
            className={styles.formInput}
            value={productData.name || ""}
            onChange={(e) => onDataChange({ name: e.target.value })}
          />
        </FormGroup>
        <FormGroup label="Brand Name">
          <input
            type="text"
            placeholder="Add brand name"
            className={styles.formInput}
            value={productData.brand || ""}
            onChange={(e) => onDataChange({ brand: e.target.value })}
          />
        </FormGroup>
        <FormGroup label="Category">
          <select
            className={styles.formInput}
            value={productData.category || ""}
            onChange={(e) => onDataChange({ category: e.target.value })}
          >
            <option value="">Select category</option>
            <option>Electronics</option>
            <option>Fashion</option>
          </select>
        </FormGroup>
        <FormGroup label="Sub Category">
          <select
            className={styles.formInput}
            value={productData.subCategory || ""}
            onChange={(e) => onDataChange({ subCategory: e.target.value })}
          >
            <option value="">Select sub category</option>
          </select>
        </FormGroup>
      </div>

      <FormGroup label="Product Description">
        <TiptapEditor
          value={productData.description || ""}
          onChange={(value) => onDataChange({ description: value })}
          placeholder="Add a detailed description..."
        />
      </FormGroup>

      {/* --- Linked Products Section (শুধুমাত্র বান্ডেলের জন্য) --- */}
      {productData.productType === "bundle" && (
        <div className={styles.linkedProductsSection}>
          <h4 className={styles.subSectionTitle}>Bundle Contents</h4>
          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} size={18} />
            <input
              type="text"
              placeholder="Search for products to add to the bundle..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <div className={styles.searchResults}>
                {searchableProducts
                  .filter((p) =>
                    p.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((p) => (
                    <div
                      key={p.id}
                      className={styles.searchResultItem}
                      onClick={() => handleAddLinkedProduct(p)}
                    >
                      {p.name}
                    </div>
                  ))}
              </div>
            )}
          </div>
          <div className={styles.linkedProductsList}>
            {(productData.linkedProducts || []).map((linked) => {
              const productInfo = searchableProducts.find(
                (p) => p.id === linked.id
              );
              return (
                <div key={linked.id} className={styles.linkedProductItem}>
                  <span>{productInfo?.name || linked.id}</span>
                  <div className={styles.linkedProductActions}>
                    <label>Qty:</label>
                    <input
                      type="number"
                      min="1"
                      value={linked.quantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          linked.id,
                          parseInt(e.target.value) || 1
                        )
                      }
                    />
                    <button
                      onClick={() => handleRemoveLinkedProduct(linked.id)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className={styles.supplierSection}>
        <h4 className={styles.subSectionTitle}>Supplier Details</h4>
        <div className={styles.formGrid}>
          <FormGroup label="Supplier">
            <select
              className={styles.formInput}
              value={productData.supplierId || ""}
              onChange={(e) => onDataChange({ supplierId: e.target.value })}
            >
              <option value="">Select a supplier</option>
              {sampleSuppliers.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </FormGroup>
          <FormGroup label="Purchase Cost ($)">
            <input
              type="number"
              placeholder="Cost from supplier"
              className={styles.formInput}
              value={productData.purchaseCost || ""}
              onChange={(e) =>
                onDataChange({ purchaseCost: Number(e.target.value) })
              }
            />
          </FormGroup>
        </div>
      </div>
      <FormGroup label="Product Tags (Max 10)">
        <input
          type="text"
          placeholder="Add tags, separated by commas"
          className={styles.formInput}
          value={(productData.tags || []).join(", ")}
          onChange={(e) =>
            onDataChange({
              tags: e.target.value.split(",").map((t) => t.trim()),
            })
          }
        />
      </FormGroup>
    </div>
  );
};
