import React from "react";
import { Search, ListFilter, ChevronDown } from "lucide-react";
import styles from "./Shared.module.css";

export const FilterBar: React.FC = () => {
  return (
    <div className={styles.filterBar}>
      <div className={styles.searchWrapper}>
        <Search className={styles.searchIcon} size={20} />
        <input
          type="text"
          placeholder="Search by ID, name, status..."
          className={styles.searchInput}
        />
      </div>
      <div className={styles.filterActions}>
        <div className={styles.sortWrapper}>
          <span>Sort By:</span>
          <select className={styles.sortSelect}>
            <option>New Order</option>
            <option>Old Order</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
        <button className={styles.filterButton}>
          <ListFilter size={16} />
          <span>Filter</span>
        </button>
      </div>
    </div>
  );
};
