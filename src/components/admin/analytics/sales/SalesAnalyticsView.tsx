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
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { AnalyticsPageLayout } from "../layouts/AnalyticsPageLayout";
import { StatCard } from "../shared/StatCard";
import { ChartCard } from "../shared/ChartCard";
import { DataTable, Column } from "../shared/DataTable";
import styles from "../shared/Shared.module.css";

// --- ডেটা সেট (UPDATED) ---
const statsData = [
  {
    title: "Total Sales",
    value: "$125,430",
    change: 12.5,
    trend: "up" as const,
  },
  {
    title: "Avg. Order Value",
    value: "$85.60",
    change: -1.2,
    trend: "down" as const,
  },
  { title: "Total Orders", value: "1,665", change: 8.3, trend: "up" as const },
  {
    title: "Total Profit",
    value: "$27,575",
    change: 15.1,
    trend: "up" as const,
  },
];
const salesChartData = [
  { name: "Jan", sales: 4000, profit: 2400 },
  { name: "Feb", sales: 3000, profit: 1398 },
  { name: "Mar", sales: 5000, profit: 9800 },
  { name: "Apr", sales: 4780, profit: 3908 },
  { name: "May", sales: 5890, profit: 4800 },
  { name: "Jun", sales: 4390, profit: 3800 },
];
const categorySalesData = [
  { name: "Electronics", value: 40, color: "var(--color-primary)" },
  { name: "Fashion", value: 25, color: "#00C49F" },
  { name: "Home Goods", value: 15, color: "#FFBB28" },
  { name: "Books", value: 10, color: "#0088FE" },
  { name: "Others", value: 10, color: "#FF8042" },
];
const paymentMethodsData = [
  { name: "Credit Card", value: 51, color: "var(--color-primary)" },
  { name: "PayPal", value: 25, color: "#00C49F" },
  { name: "Cash on Delivery", value: 12, color: "#FFBB28" },
  { name: "Bank Transfer", value: 12, color: "#0088FE" },
];
const topProductsData = [
  {
    id: "P001",
    name: "Nike Air Jordan",
    quantity: 350,
    totalSales: "$52,500",
    totalRevenue: "$15,750",
  },
  {
    id: "P002",
    name: "Classic Leather Watch",
    quantity: 280,
    totalSales: "$33,600",
    totalRevenue: "$10,080",
  },
  {
    id: "P003",
    name: "Smart Home Assistant",
    quantity: 210,
    totalSales: "$21,000",
    totalRevenue: "$6,300",
  },
  {
    id: "P004",
    name: "Organic Green Tea",
    quantity: 550,
    totalSales: "$8,250",
    totalRevenue: "$2,475",
  },
];
const productColumns: Column<(typeof topProductsData)[0]>[] = [
  { key: "name", title: "Product Name" },
  { key: "quantity", title: "Qty Sold" },
  { key: "totalSales", title: "Total Sales" },
  { key: "totalRevenue", title: "Revenue" },
];

export const SalesAnalyticsView: React.FC = () => {
  return (
    <AnalyticsPageLayout title="Sales Reports" defaultDateRange="Last 6 Months">
      <div className={styles.statsGrid}>
        {statsData.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className={styles.analyticsGrid}>
        <ChartCard title="Sales & Profit Over Time">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesChartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip
                cursor={{ fill: "rgba(241, 102, 32, 0.05)" }}
                contentStyle={{
                  borderRadius: "var(--border-radius)",
                  border: "1px solid var(--color-border)",
                }}
              />
              <Legend />
              <Bar
                dataKey="sales"
                fill="var(--color-primary)"
                name="Sales"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="profit"
                fill="#82ca9d"
                name="Profit"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* --- NEW: Sales by Category (Pie Chart with Legend Below) --- */}
        <ChartCard title="Sales by Category">
          <div className={styles.pieChartWithLegend}>
            <div className={styles.pieChartContainer}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categorySalesData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                  >
                    {categorySalesData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className={styles.pieLegendContainer}>
              {categorySalesData.map((entry) => (
                <div key={entry.name} className={styles.pieLegendItem}>
                  <span
                    className={styles.pieLegendColorBox}
                    style={{ backgroundColor: entry.color }}
                  ></span>
                  <span className={styles.pieLegendLabel}>{entry.name}</span>
                  <span className={styles.pieLegendValue}>{entry.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>
      </div>

      <div className={styles.bottomGrid}>
        {/* --- NEW: Payment Methods as Pie Chart --- */}
        <ChartCard title="Payment Methods">
          <div className={styles.pieChartWithLegend}>
            <div className={styles.pieChartContainer}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentMethodsData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                  >
                    {paymentMethodsData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className={styles.pieLegendContainer}>
              {paymentMethodsData.map((entry) => (
                <div key={entry.name} className={styles.pieLegendItem}>
                  <span
                    className={styles.pieLegendColorBox}
                    style={{ backgroundColor: entry.color }}
                  ></span>
                  <span className={styles.pieLegendLabel}>{entry.name}</span>
                  <span className={styles.pieLegendValue}>{entry.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>

        <DataTable
          title="Top Products by Sale"
          columns={productColumns}
          data={topProductsData}
        />
      </div>
    </AnalyticsPageLayout>
  );
};
