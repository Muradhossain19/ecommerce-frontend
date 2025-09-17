"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { PageHeader } from "../shared/PageHeader";
import { FilterBar } from "../shared/FilterBar";
import {
  Upload,
  ChevronDown,
  ChevronUp,
  Trash2,
  MapPin,
  BarChart2,
  History,
} from "lucide-react";
import styles from "./Inventory.module.css";
import { BulkEditModal } from "./BulkEditModal";
import { ForecastingChart } from "./ForecastingChart"; // <-- নতুন ইম্পোর্ট

// (আপনার আগের ডেটা স্ট্রাকচার এবং হেল্পার ফাংশনগুলো এখানে থাকবে)
// ... (এখানে আপনার inventoryData, getTotalStock, getStockStatus, getStatusClass ফাংশনগুলো পেস্ট করুন)
// ADVANCED: Updated Sample Data for Multi-Location Inventory & Forecasting
const generateSalesHistory = () => {
  const history = [];
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    history.push({
      date: date.toISOString().split("T")[0],
      unitsSold: Math.floor(Math.random() * (i % 7 === 0 ? 25 : 10)) + 1,
    });
  }
  return history;
};

const inventoryData = [
  {
    id: "SKU26558522",
    name: "Nike Air Jordan Reflex",
    image: "/images/sample-shoe.png",
    category: "Style & Fashion",
    lowStockThreshold: 20,
    stockByLocation: [
      { location: "Main Warehouse", quantity: 2200 },
      { location: "Dhaka Outlet", quantity: 40 },
    ],
    history: [
      {
        date: "2025-09-10",
        reason: "Initial Stock",
        change: "+2300",
        newStock: 2300,
        location: "Main Warehouse",
      },
      {
        date: "2025-09-11",
        reason: "Order #1121",
        change: "-50",
        newStock: 2250,
        location: "Main Warehouse",
      },
      {
        date: "2025-09-12",
        reason: "Order #1125",
        change: "-10",
        newStock: 40,
        location: "Dhaka Outlet",
      },
    ],
    salesHistory: generateSalesHistory(),
  },
  // ... (অন্যান্য প্রোডাক্টের জন্যও salesHistory যোগ করুন)
];
const getTotalStock = (
  stockByLocation: { location: string; quantity: number }[]
) => {
  return stockByLocation.reduce((total, loc) => total + loc.quantity, 0);
};
const getStockStatus = (
  totalStock: number,
  threshold: number
): "In Stock" | "Low Stock" | "Out of Stock" => {
  if (totalStock === 0) return "Out of Stock";
  if (totalStock <= threshold) return "Low Stock";
  return "In Stock";
};
const getStatusClass = (status: "In Stock" | "Out of Stock" | "Low Stock") => {
  switch (status) {
    case "In Stock":
      return styles.inStock;
    case "Out of Stock":
      return styles.outOfStock;
    case "Low Stock":
      return styles.lowStock;
    default:
      return "";
  }
};

export const InventoryView: React.FC = () => {
  const [inventory, setInventory] = useState(inventoryData);
  const [selectAll, setSelectAll] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [expandedRows, setExpandedRows] = useState<{
    [key: string]: "history" | "forecast";
  }>({}); // <-- পরিবর্তিত
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeLocationPopover, setActiveLocationPopover] = useState<
    string | null
  >(null);

  // (আপনার আগের সব useEffect এবং হ্যান্ডলার ফাংশন এখানে থাকবে)
  // ... (handleStockChange, handleSelectAll, handleSelectRow, handleBulkUpdate ইত্যাদি)
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        activeLocationPopover &&
        !(event.target as HTMLElement).closest(`.${styles.stockCell}`)
      ) {
        setActiveLocationPopover(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [activeLocationPopover]);
  useEffect(() => {
    if (selected.length < inventory.length && selected.length > 0) {
      setSelectAll(false);
    } else if (selected.length === inventory.length && inventory.length > 0) {
      setSelectAll(true);
    } else if (selected.length === 0) {
      setSelectAll(false);
    }
  }, [selected, inventory.length]);
  const handleStockChange = (
    id: string,
    location: string,
    newQuantity: number
  ) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newStockByLocation = item.stockByLocation.map((loc) =>
            loc.location === location ? { ...loc, quantity: newQuantity } : loc
          );
          return { ...item, stockByLocation: newStockByLocation };
        }
        return item;
      })
    );
  };
  const handleSelectAll = () => {
    if (selectAll) {
      setSelected([]);
    } else {
      setSelected(inventory.map((item) => item.id));
    }
    setSelectAll(!selectAll);
  };
  const handleSelectRow = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };
  const handleBulkUpdate = (
    updates: { productId: string; location: string; quantity: number }[]
  ) => {
    setInventory((prev) => {
      const inventoryMap = new Map(
        prev.map((item) => [item.id, JSON.parse(JSON.stringify(item))])
      );
      updates.forEach(({ productId, location, quantity }) => {
        const item = inventoryMap.get(productId);
        if (item) {
          let locationFound = false;
          item.stockByLocation = item.stockByLocation.map(
            (loc: { location: string; quantity: number }) => {
              if (loc.location === location) {
                locationFound = true;
                return { ...loc, quantity };
              }
              return loc;
            }
          );
          inventoryMap.set(productId, item);
        }
      });
      return Array.from(inventoryMap.values());
    });
  };

  const toggleRowExpansion = (id: string, type: "history" | "forecast") => {
    setExpandedRows((prev) => {
      const current = prev[id];
      if (current === type) {
        const { [id]: _, ...rest } = prev; // Remove the key
        return rest;
      }
      return { ...prev, [id]: type };
    });
  };

  return (
    <div className={styles.inventoryPage}>
      {/* (PageHeader, FilterBar, BulkActionsBar অপরিবর্তিত) */}
      <PageHeader
        title="Product Inventory"
        subtitle="Track and manage stock levels for all your products."
      >
        <button className={styles.secondaryButton}>
          <Upload size={16} /> Export List
        </button>
      </PageHeader>
      <div className={styles.contentCard}>
        <FilterBar />
        {selected.length > 0 && (
          <div className={styles.bulkActionsBar}>
            <span>{selected.length} item(s) selected</span>
            <div className={styles.bulkButtons}>
              <button
                className={styles.bulkEditButton}
                onClick={() => setIsModalOpen(true)}
              >
                Edit Selected
              </button>
              <button className={styles.bulkDeleteButton}>
                <Trash2 size={14} /> Delete Selected
              </button>
            </div>
          </div>
        )}

        <div className={styles.tableWrapper}>
          <table className={styles.inventoryTable}>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Product</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Stock Quantity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => {
                const totalStock = getTotalStock(item.stockByLocation);
                const status = getStockStatus(
                  totalStock,
                  item.lowStockThreshold
                );
                const isExpanded = expandedRows[item.id];

                return (
                  <React.Fragment key={item.id}>
                    <tr>
                      {/* (অন্যান্য td সেলগুলো অপরিবর্তিত) */}
                      <td>
                        <input
                          type="checkbox"
                          checked={selected.includes(item.id)}
                          onChange={() => handleSelectRow(item.id)}
                        />
                      </td>
                      <td>
                        <div className={styles.productCell}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                            className={styles.productImage}
                          />
                          <p className={styles.productName}>{item.name}</p>
                        </div>
                      </td>
                      <td>{item.id}</td>
                      <td>{item.category}</td>
                      <td
                        className={styles.stockCell}
                        onClick={() =>
                          setActiveLocationPopover(
                            activeLocationPopover === item.id ? null : item.id
                          )
                        }
                      >
                        <div className={styles.totalStock}>
                          {totalStock.toLocaleString()}
                        </div>
                        <div className={styles.locationIndicator}>
                          {item.stockByLocation.length} Locations{" "}
                          <ChevronDown size={14} />
                        </div>
                        {activeLocationPopover === item.id && (
                          <div
                            className={styles.locationPopover}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className={styles.popoverHeader}>
                              Stock by Location
                            </div>
                            {item.stockByLocation.map((loc) => (
                              <div
                                key={loc.location}
                                className={styles.locationRow}
                              >
                                <span>
                                  <MapPin size={12} /> {loc.location}
                                </span>
                                <input
                                  type="number"
                                  value={loc.quantity}
                                  className={styles.popoverStockInput}
                                  onChange={(e) =>
                                    handleStockChange(
                                      item.id,
                                      loc.location,
                                      parseInt(e.target.value, 10) || 0
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </td>
                      <td>
                        <span
                          className={`${styles.statusBadge} ${getStatusClass(
                            status
                          )}`}
                        >
                          {status}
                        </span>
                      </td>

                      <td className={styles.actionsCell}>
                        <button
                          className={`${styles.actionButton} ${
                            isExpanded === "history" ? styles.active : ""
                          }`}
                          onClick={() => toggleRowExpansion(item.id, "history")}
                        >
                          <History size={16} />
                        </button>
                        <button
                          className={`${styles.actionButton} ${
                            isExpanded === "forecast" ? styles.active : ""
                          }`}
                          onClick={() =>
                            toggleRowExpansion(item.id, "forecast")
                          }
                        >
                          <BarChart2 size={16} />
                        </button>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr className={styles.detailsRow}>
                        <td colSpan={7}>
                          {isExpanded === "history" && (
                            <div className={styles.detailsContainer}>
                              <h4 className={styles.detailsTitle}>
                                Stock Movement for {item.name}
                              </h4>
                              {/* (History Table অপরিবর্তিত) */}
                              <div className={styles.historyTableWrapper}>
                                <table className={styles.historyTable}>
                                  <thead>
                                    <tr>
                                      <th>Date</th>
                                      <th>Reason</th>
                                      <th>Location</th>
                                      <th>Change</th>
                                      <th>New Stock</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {item.history.map((log, index) => (
                                      <tr key={index}>
                                        <td>{log.date}</td>
                                        <td>{log.reason}</td>
                                        <td>{log.location}</td>
                                        <td
                                          className={
                                            log.change.startsWith("+")
                                              ? styles.stockChangeIn
                                              : styles.stockChangeOut
                                          }
                                        >
                                          {log.change}
                                        </td>
                                        <td>{log.newStock}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}
                          {isExpanded === "forecast" && (
                            <div className={styles.detailsContainer}>
                              <h4 className={styles.detailsTitle}>
                                Sales Forecast for {item.name}
                              </h4>
                              <ForecastingChart
                                salesHistory={item.salesHistory}
                                currentStock={totalStock}
                              />
                            </div>
                          )}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* (Modal অপরিবর্তিত) */}
      {isModalOpen && (
        <BulkEditModal
          selectedProducts={inventory.filter((p) => selected.includes(p.id))}
          onClose={() => setIsModalOpen(false)}
          onBulkUpdate={handleBulkUpdate}
        />
      )}
    </div>
  );
};
