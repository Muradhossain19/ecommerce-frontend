"use client";

import React, { useState, useEffect } from "react";
import styles from "./ShippingFee.module.css";
import { ProductData } from "./AddProductView";

interface ShippingFeeProps {
  isEditMode?: boolean;
  initialData?: ProductData | null;
}

const ShippingFee: React.FC<ShippingFeeProps> = ({
  isEditMode = false,
  initialData = null,
}) => {
  // Edit mode: initial value
  const [weight, setWeight] = useState<number | undefined>(initialData?.weight);
  const [length, setLength] = useState<number | undefined>(initialData?.length);
  const [width, setWidth] = useState<number | undefined>(initialData?.width);
  const [height, setHeight] = useState<number | undefined>(initialData?.height);
  const [shippingClass, setShippingClass] = useState<string>(
    initialData?.shippingClass || "none"
  );
  const [shippingCost, setShippingCost] = useState<number | undefined>(
    initialData?.shippingCost
  );

  useEffect(() => {
    if (isEditMode && initialData) {
      setWeight(initialData.weight);
      setLength(initialData.length);
      setWidth(initialData.width);
      setHeight(initialData.height);
      setShippingClass(initialData.shippingClass || "none");
      setShippingCost(initialData.shippingCost);
    }
  }, [isEditMode, initialData]);

  return (
    <div className={styles.formSection}>
      {/* --- Weight & Dimensions Section --- */}
      <h3 className={styles.sectionTitle}>Weight & Dimensions</h3>
      <p className={styles.sectionSubtitle}>
        This information is used for shipping cost calculation with certain
        carriers.
      </p>

      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="weight" className={styles.formLabel}>
            Weight (kg)
          </label>
          <input
            type="number"
            id="weight"
            className={styles.formInput}
            placeholder="e.g., 0.5"
            value={weight ?? ""}
            onChange={(e) => setWeight(Number(e.target.value))}
          />
        </div>
        {/* This empty div is a placeholder to maintain grid alignment */}
        <div></div>
      </div>

      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="length" className={styles.formLabel}>
            Length (cm)
          </label>
          <input
            type="number"
            id="length"
            className={styles.formInput}
            placeholder="e.g., 20"
            value={length ?? ""}
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="width" className={styles.formLabel}>
            Width (cm)
          </label>
          <input
            type="number"
            id="width"
            className={styles.formInput}
            placeholder="e.g., 15"
            value={width ?? ""}
            onChange={(e) => setWidth(Number(e.target.value))}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="height" className={styles.formLabel}>
            Height (cm)
          </label>
          <input
            type="number"
            id="height"
            className={styles.formInput}
            placeholder="e.g., 10"
            value={height ?? ""}
            onChange={(e) => setHeight(Number(e.target.value))}
          />
        </div>
      </div>

      {/* --- Shipping Class Section --- */}
      <h3 className={styles.sectionTitle}>Shipping Class</h3>
      <p className={styles.sectionSubtitle}>
        Group products with similar shipping requirements. Shipping classes are
        used by certain shipping methods to provide different rates to different
        types of products.
      </p>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="shippingClass" className={styles.formLabel}>
            Select a shipping class
          </label>
          <select
            id="shippingClass"
            className={styles.formInput}
            value={shippingClass}
            onChange={(e) => setShippingClass(e.target.value)}
          >
            <option value="none">No shipping class</option>
            <option value="bulky">Bulky Items</option>
            <option value="fragile">Fragile Items</option>
            <option value="free-shipping">Free Shipping Items</option>
          </select>
        </div>
      </div>

      {/* --- Shipping Cost Override (Optional) --- */}
      <h3 className={styles.sectionTitle}>Shipping Cost</h3>
      <p className={styles.sectionSubtitle}>
        Optionally, you can set a specific shipping cost for this product. This
        will override the default shipping zone costs.
      </p>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="shippingCost" className={styles.formLabel}>
            Product-specific Cost ($)
          </label>
          <input
            type="number"
            id="shippingCost"
            className={styles.formInput}
            placeholder="Leave blank to use default zone rates"
            value={shippingCost ?? ""}
            onChange={(e) => setShippingCost(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingFee;
