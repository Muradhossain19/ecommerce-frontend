"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AnalyticsPageLayout } from "../layouts/AnalyticsPageLayout";
import { StatCard } from "../shared/StatCard";
import { ChartCard } from "../shared/ChartCard";
import { DataTable, Column } from "../shared/DataTable"; // DataTable ইম্পোর্ট
import styles from "../shared/Shared.module.css";

// --- ডেটা সেট (id সহ) ---
const productStats = [
  {
    title: "Total Products",
    value: "1,250",
    change: 25,
    trend: "up" as const,
    period: "new this month",
  },
  {
    title: "Avg. Views per Product",
    value: "3,450",
    change: 10.2,
    trend: "up" as const,
  },
  {
    title: "Conversion Rate (View to Sale)",
    value: "2.8%",
    change: -0.4,
    trend: "down" as const,
  },
  {
    title: "Items Low in Stock",
    value: "42",
    change: 5,
    trend: "up" as const,
    period: "new alerts",
  },
];
const topViewedProducts = [
  { name: "Nike Air Jordan", views: 15000 },
  { name: "Leather Watch", views: 12500 },
  { name: "Water Bottle", views: 11000 },
  { name: "Sony Headphone", views: 9800 },
  { name: "Smart Thermos", views: 8500 },
];
const bestSellingProducts = [
  {
    id: "PROD-001",
    name: "Nike Air Jordan",
    unitsSold: 350,
    totalRevenue: "$52,500",
  },
  {
    id: "PROD-002",
    name: "Leather Watch",
    unitsSold: 280,
    totalRevenue: "$33,600",
  },
  {
    id: "PROD-003",
    name: "Water Bottle",
    unitsSold: 510,
    totalRevenue: "$12,750",
  },
];
const lowStockProducts = [
  { id: "PROD-004", name: "Smart Thermos", stock: 8, avgDailySale: 5 },
  { id: "PROD-005", name: "Yoga Mat", stock: 5, avgDailySale: 2 },
  { id: "PROD-006", name: "Organic Green Tea", stock: 12, avgDailySale: 10 },
];

// --- কলাম ডেফিনিশন (className সহ) ---
const bestSellingColumns: Column<(typeof bestSellingProducts)[0]>[] = [
  { key: "name", title: "Product Name" },
  { key: "unitsSold", title: "Units Sold", className: styles.numericCell },
  {
    key: "totalRevenue",
    title: "Total Revenue",
    className: styles.numericCell,
  },
];
const lowStockColumns: Column<(typeof lowStockProducts)[0]>[] = [
  { key: "name", title: "Product Name" },
  {
    key: "stock",
    title: "Stock Left",
    render: (item) => (
      <span className={styles.lowStockValue}>{item.stock}</span>
    ),
    className: styles.numericCell,
  },
  {
    key: "avgDailySale",
    title: "Avg. Daily Sale",
    className: styles.numericCell,
  },
];

export const ProductPerformanceView: React.FC = () => {
  return (
    <AnalyticsPageLayout
      title="Product Performance"
      defaultDateRange="Last 30 Days"
    >
      <div className={styles.statsGrid}>
        {productStats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <ChartCard title="Top 5 Most Viewed Products">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={topViewedProducts}
            layout="vertical"
            margin={{ left: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              width={150}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: "rgba(241, 102, 32, 0.05)" }}
              contentStyle={{
                borderRadius: "var(--border-radius)",
                border: "1px solid var(--color-border)",
              }}
            />
            <Bar
              dataKey="views"
              fill="var(--color-primary)"
              name="Total Views"
              radius={[0, 4, 4, 0]}
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className={styles.balancedGrid} style={{ marginTop: "1.5rem" }}>
        <DataTable
          title="Best Selling Products"
          columns={bestSellingColumns}
          data={bestSellingProducts}
        />
        <DataTable
          title="Products Low in Stock"
          columns={lowStockColumns}
          data={lowStockProducts}
        />
      </div>
    </AnalyticsPageLayout>
  );
};
