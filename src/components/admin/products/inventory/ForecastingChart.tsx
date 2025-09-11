"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "./Inventory.module.css";

interface SalesHistory {
  date: string;
  unitsSold: number;
}

interface ForecastingChartProps {
  salesHistory: SalesHistory[];
  currentStock: number;
}

// Helper to format date for the chart
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export const ForecastingChart: React.FC<ForecastingChartProps> = ({
  salesHistory,
  currentStock,
}) => {
  // Simple forecasting logic
  const last30DaysSales = salesHistory.slice(-30);
  const totalSold = last30DaysSales.reduce(
    (sum, item) => sum + item.unitsSold,
    0
  );
  const averageDailySales = totalSold / (last30DaysSales.length || 1);
  const daysRemaining =
    averageDailySales > 0
      ? Math.floor(currentStock / averageDailySales)
      : Infinity;

  return (
    <div className={styles.forecastingContainer}>
      <div className={styles.forecastingSummary}>
        <div className={styles.summaryCard}>
          <h4>Avg. Daily Sales (30d)</h4>
          <p>{averageDailySales.toFixed(2)} units</p>
        </div>
        <div className={styles.summaryCard}>
          <h4>Stock Remaining</h4>
          <p>{currentStock.toLocaleString()} units</p>
        </div>
        <div
          className={`${styles.summaryCard} ${
            daysRemaining < 7 ? styles.critical : ""
          }`}
        >
          <h4>Estimated Days Left</h4>
          {daysRemaining === Infinity ? (
            <p>N/A</p>
          ) : (
            <p>~ {daysRemaining} days</p>
          )}
        </div>
      </div>

      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={salesHistory}
            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="date" tickFormatter={formatDate} />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: "var(--border-radius)",
              }}
              labelFormatter={formatDate}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="unitsSold"
              name="Units Sold"
              stroke="var(--color-primary)"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
