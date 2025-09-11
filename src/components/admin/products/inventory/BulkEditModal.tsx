import React, { useState } from "react";
import styles from "./Inventory.module.css";
import { X } from "lucide-react";

interface Product {
  id: string;
  name: string;
  stockByLocation: { location: string; quantity: number }[];
}

interface BulkEditModalProps {
  selectedProducts: Product[];
  onClose: () => void;
  onBulkUpdate: (
    updates: { productId: string; location: string; quantity: number }[]
  ) => void;
}

export const BulkEditModal: React.FC<BulkEditModalProps> = ({
  selectedProducts,
  onClose,
  onBulkUpdate,
}) => {
  const [updates, setUpdates] = useState<{ [key: string]: string }>({});

  const handleInputChange = (
    productId: string,
    location: string,
    value: string
  ) => {
    const key = `${productId}-${location}`;
    setUpdates((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalUpdates: {
      productId: string;
      location: string;
      quantity: number;
    }[] = [];
    for (const key in updates) {
      const [productId, location] = key.split("-");
      const quantity = parseInt(updates[key], 10);
      if (!isNaN(quantity)) {
        finalUpdates.push({ productId, location, quantity });
      }
    }
    onBulkUpdate(finalUpdates);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>Bulk Edit Stock by Location</h3>
          <button onClick={onClose} className={styles.closeButton}>
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.modalBody}>
            <p>
              Update stock quantities for selected products across different
              locations.
            </p>
            <div className={styles.bulkEditTableWrapper}>
              <table className={styles.bulkEditTable}>
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Location</th>
                    <th>Current Stock</th>
                    <th>New Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedProducts.map((product) => (
                    <React.Fragment key={product.id}>
                      {product.stockByLocation.map((loc, index) => (
                        <tr key={`${product.id}-${loc.location}`}>
                          {index === 0 && (
                            <td
                              rowSpan={product.stockByLocation.length}
                              className={styles.productNameCell}
                            >
                              {product.name}
                            </td>
                          )}
                          <td>{loc.location}</td>
                          <td>{loc.quantity}</td>
                          <td>
                            <input
                              type="number"
                              className={styles.stockInput}
                              placeholder={String(loc.quantity)}
                              value={
                                updates[`${product.id}-${loc.location}`] || ""
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  product.id,
                                  loc.location,
                                  e.target.value
                                )
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className={styles.modalFooter}>
            <button
              type="button"
              onClick={onClose}
              className={styles.secondaryButton}
            >
              Cancel
            </button>
            <button type="submit" className={styles.primaryButton}>
              Apply Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
