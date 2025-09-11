"use client";

import React from "react";
import styles from "./Shared.module.css";

// Column ইন্টারফেস আপডেট করা হয়েছে className যোগ করার জন্য
export interface Column<T> {
  key: keyof T;
  title: string;
  className?: string; // <-- নতুন: কলামের জন্য CSS ক্লাস
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
    <div className={styles.tableCard}>
      <div className={styles.chartHeader}>
        <h4 className={styles.chartTitle}>{title}</h4>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table className={styles.simpleDataTable}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={String(col.key)} className={col.className}>
                  {" "}
                  {/* <-- className যোগ করা হয়েছে */}
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id}>
                  {columns.map((col) => (
                    <td key={String(col.key)} className={col.className}>
                      {" "}
                      {/* <-- className যোগ করা হয়েছে */}
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
