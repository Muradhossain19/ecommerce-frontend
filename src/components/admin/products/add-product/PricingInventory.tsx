"use client";

import React, { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import styles from "./PricingInventory.module.css";
import { ProductData } from "./AddProductView";

interface PricingInventoryProps {
  productData: ProductData;
  onDataChange: (updates: Partial<ProductData>) => void;
}

const PricingInventory: React.FC<PricingInventoryProps> = ({
  productData,
  onDataChange,
}) => {
  const [manageStock, setManageStock] = useState(true);
  const [showSaleSchedule, setShowSaleSchedule] = useState(false);
  const [saleDate, setSaleDate] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);

  const isBundle = productData.productType === "bundle";

  return (
    <div className={styles.formSection}>
      <h3 className={styles.sectionTitle}>Pricing</h3>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="regularPrice" className={styles.formLabel}>
            {isBundle ? "Bundle Price ($)" : "Regular Price ($)"}
          </label>
          <input
            type="number"
            id="regularPrice"
            className={styles.formInput}
            placeholder="e.g., 99.99"
            value={productData.price ?? ""}
            onChange={(e) => onDataChange({ price: Number(e.target.value) })}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="salePrice" className={styles.formLabel}>
            Sale Price ($)
          </label>
          <div className={styles.inputWithButton}>
            <input
              type="number"
              id="salePrice"
              className={styles.formInput}
              placeholder="e.g., 79.99"
            />
            <button
              className={styles.scheduleButton}
              onClick={() => setShowSaleSchedule(!showSaleSchedule)}
            >
              {showSaleSchedule ? "Cancel" : "Schedule"}
            </button>
          </div>
        </div>
      </div>
      {showSaleSchedule && (
        <div className={styles.dateRangeWrapper}>
          <label className={styles.formLabel}>Sale price dates</label>
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setSaleDate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={saleDate}
            className={styles.datePicker}
          />
        </div>
      )}

      <h3 className={styles.sectionTitle} style={{ marginTop: "2rem" }}>
        Tax
      </h3>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="taxStatus" className={styles.formLabel}>
            Tax status
          </label>
          <select id="taxStatus" className={styles.formInput}>
            <option value="taxable">Taxable</option>
            <option value="shipping">Shipping only</option>
            <option value="none">None</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="taxClass" className={styles.formLabel}>
            Tax class
          </label>
          <select id="taxClass" className={styles.formInput}>
            <option value="standard">Standard</option>
            <option value="reduced">Reduced rate</option>
            <option value="zero">Zero rate</option>
          </select>
        </div>
      </div>

      {/* --- Inventory Section (শর্তসাপেক্ষ) --- */}
      <div className={isBundle ? styles.disabledSection : ""}>
        <h3 className={styles.sectionTitle} style={{ marginTop: "2rem" }}>
          Inventory
        </h3>
        {isBundle && (
          <p className={styles.disabledMessage}>
            Inventory for bundle products is managed from the individual
            products within the bundle.
          </p>
        )}
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label htmlFor="sku" className={styles.formLabel}>
              SKU
            </label>
            <input
              type="text"
              id="sku"
              className={styles.formInput}
              placeholder="e.g., TSHIRT-RED-L"
              value={productData.sku || ""}
              onChange={(e) => onDataChange({ sku: e.target.value })}
              disabled={isBundle}
            />
          </div>
          <div className={styles.formGroup}></div>
        </div>
        <div className={styles.switchWrapper}>
          <label htmlFor="manageStock" className={styles.formLabel}>
            Track stock quantity
          </label>
          <label className={styles.switch}>
            <input
              type="checkbox"
              id="manageStock"
              checked={manageStock}
              onChange={() => setManageStock(!manageStock)}
              disabled={isBundle}
            />
            <span className={`${styles.slider} ${styles.round}`}></span>
          </label>
        </div>
        {manageStock && (
          <div className={styles.indentedSection}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="stockQuantity" className={styles.formLabel}>
                  Stock quantity
                </label>
                <input
                  type="number"
                  id="stockQuantity"
                  className={styles.formInput}
                  placeholder="e.g., 100"
                  value={productData.stock ?? ""}
                  onChange={(e) =>
                    onDataChange({ stock: Number(e.target.value) })
                  }
                  disabled={isBundle}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="lowStockThreshold" className={styles.formLabel}>
                  Low stock threshold
                </label>
                <input
                  type="number"
                  id="lowStockThreshold"
                  className={styles.formInput}
                  placeholder="e.g., 5"
                  disabled={isBundle}
                />
              </div>
            </div>
            <div className={styles.formGroup} style={{ marginTop: "1.5rem" }}>
              <label htmlFor="backorders" className={styles.formLabel}>
                Allow backorders?
              </label>
              <select
                id="backorders"
                className={styles.formInput}
                disabled={isBundle}
              >
                <option value="no">Do not allow</option>
                <option value="notify">Allow, but notify customer</option>
                <option value="yes">Allow</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingInventory;
