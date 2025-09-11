"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { AnalyticsPageLayout } from "../layouts/AnalyticsPageLayout";
import { StatCard } from "../shared/StatCard";
import { ChartCard } from "../shared/ChartCard";
import { DataTable, Column } from "../shared/DataTable"; // DataTable ইম্পোর্ট
import styles from "../shared/Shared.module.css";

// --- ডেটা সেট (id সহ) ---
const customerStats = [
  {
    title: "Total Customers",
    value: "8,230",
    change: 5.1,
    trend: "up" as const,
  },
  {
    title: "New Customers (Last 30d)",
    value: "1,150",
    change: 15.8,
    trend: "up" as const,
  },
  {
    title: "Avg. Lifetime Value",
    value: "$480.50",
    change: -2.1,
    trend: "down" as const,
  },
  {
    title: "Active Customers",
    value: "7,080",
    change: 3.2,
    trend: "up" as const,
  },
];
const customerTypeData = [
  { name: "New Customers", value: 14, color: "#00C49F" },
  { name: "Returning Customers", value: 86, color: "var(--color-primary)" },
];
const topCustomers = [
  {
    id: "CUST-001",
    name: "John Doe",
    location: "New York, USA",
    totalOrders: 25,
    totalSpend: "$2,500",
  },
  {
    id: "CUST-002",
    name: "Jane Smith",
    location: "London, UK",
    totalOrders: 18,
    totalSpend: "$1,850",
  },
  {
    id: "CUST-003",
    name: "Carlos Garcia",
    location: "Madrid, Spain",
    totalOrders: 15,
    totalSpend: "$1,520",
  },
  {
    id: "CUST-004",
    name: "Aisha Khan",
    location: "Dubai, UAE",
    totalOrders: 12,
    totalSpend: "$1,300",
  },
];

// --- কলাম ডেফিনিশন (className সহ) ---
const customerColumns: Column<(typeof topCustomers)[0]>[] = [
  { key: "name", title: "Customer Name" },
  { key: "location", title: "Location" },
  { key: "totalOrders", title: "Total Orders", className: styles.numericCell },
  { key: "totalSpend", title: "Total Spend", className: styles.numericCell },
];

const renderCustomizedLabel = (props: {
  cx?: number | string;
  cy?: number | string;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  percent?: number;
}) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;

  // --- কঠোর টাইপ-গার্ড ---
  if (
    cx === undefined ||
    cy === undefined ||
    midAngle === undefined ||
    innerRadius === undefined ||
    outerRadius === undefined ||
    percent === undefined ||
    percent === 0
  ) {
    return null;
  }

  // cx এবং cy কে number হিসেবে নিশ্চিত করা
  const numCx = typeof cx === "string" ? parseFloat(cx) : cx;
  const numCy = typeof cy === "string" ? parseFloat(cy) : cy;

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = numCx + radius * Math.cos(-midAngle * (Math.PI / 180));
  const y = numCy + radius * Math.sin(-midAngle * (Math.PI / 180));

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize="14px"
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const CustomerAnalyticsView: React.FC = () => {
  return (
    <AnalyticsPageLayout title="Customer Insights" defaultDateRange="All Time">
      <div className={styles.statsGrid}>
        {customerStats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className={styles.balancedGrid}>
        <ChartCard title="New vs. Returning Customers">
          <div className={styles.pieChartWithLegend}>
            <div className={styles.pieChartContainer}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customerTypeData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                  >
                    {customerTypeData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className={styles.pieLegendContainer}>
              {customerTypeData.map((entry) => (
                <div key={entry.name} className={styles.pieLegendItem}>
                  <span
                    className={styles.pieLegendColorBox}
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className={styles.pieLegendLabel}>{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>

        <DataTable
          title="Top Customers by Spend"
          columns={customerColumns}
          data={topCustomers}
        />
      </div>
    </AnalyticsPageLayout>
  );
};
