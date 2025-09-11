"use client";

import React from "react";
import styles from "./Shared.module.css";

export interface Column<T> {
  key: keyof T;
  title: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  title: string;
  columns: Column<T>[];
  data: T[];
}

export const DataTable = <T extends { id: string | number }>({
  title,
  columns,
  data,
}: DataTableProps<T>) => {
  return (
    // --- `tableCard` ক্লাস ব্যবহার করা হয়েছে, `modernTableCard` নয় ---
    <div className={styles.tableCard}>
      <div className={styles.chartHeader}>
        <h4 className={styles.chartTitle}>{title}</h4>
      </div>

      <div style={{ overflowX: "auto" }}>
        {/* --- নতুন `.simpleDataTable` ক্লাস ব্যবহার করা হয়েছে --- */}
        <table className={styles.simpleDataTable}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={String(col.key)}>{col.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id}>
                  {columns.map((col) => (
                    <td key={String(col.key)}>
                      {col.render ? col.render(item) : String(item[col.key])}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  style={{ textAlign: "center", padding: "2rem" }}
                >
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
