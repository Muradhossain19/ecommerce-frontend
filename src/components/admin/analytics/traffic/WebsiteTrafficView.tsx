"use client";

import React from "react";
import {
  LineChart,
  Line,
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
import { Globe, Facebook, Instagram, Link as LinkIcon } from "lucide-react";
import styles from "../shared/Shared.module.css";

// --- ডেটা সেট ---
const trafficStats = [
  {
    title: "Total Sessions",
    value: "45,230",
    change: 18.2,
    trend: "up" as const,
  },
  {
    title: "Avg. Session Duration",
    value: "2m 45s",
    change: -5.1,
    trend: "down" as const,
  },
  {
    title: "Bounce Rate",
    value: "42.3%",
    change: -8.9,
    trend: "down" as const,
  },
  { title: "New Visitors", value: "65%", change: 3.7, trend: "up" as const },
];
const sessionsData = [
  { date: "01 Sep", sessions: 2200 },
  { date: "02 Sep", sessions: 2500 },
  { date: "03 Sep", sessions: 2100 },
  { date: "04 Sep", sessions: 2800 },
  { date: "05 Sep", sessions: 3200 },
  { date: "06 Sep", sessions: 3000 },
  { date: "07 Sep", sessions: 3500 },
];
const deviceData = [
  { name: "Desktop", value: 65, color: "var(--color-primary)" },
  { name: "Mobile", value: 30, color: "#00C49F" },
  { name: "Tablet", value: 5, color: "#FFBB28" },
];
const trafficSources = [
  { id: "google", source: "Google", visitors: 18500, conversionRate: "4.5%" },
  {
    id: "facebook",
    source: "Facebook",
    visitors: 12300,
    conversionRate: "3.1%",
  },
  { id: "direct", source: "Direct", visitors: 8500, conversionRate: "5.2%" },
  {
    id: "instagram",
    source: "Instagram",
    visitors: 5400,
    conversionRate: "2.8%",
  },
  {
    id: "referral",
    source: "Referral",
    visitors: 2100,
    conversionRate: "2.1%",
  },
];

const sourceIcons: { [key: string]: React.ElementType } = {
  Google: Globe,
  Facebook: Facebook,
  Instagram: Instagram,
  Referral: LinkIcon,
  Direct: LinkIcon,
};

// --- কলাম ডেফিনিশন (className সহ) ---
const trafficColumns: Column<(typeof trafficSources)[0]>[] = [
  {
    key: "source",
    title: "Source",
    render: (item) => {
      const Icon = sourceIcons[item.source] || Globe;
      return (
        <div className={styles.sourceCell}>
          {" "}
          <Icon size={18} className={styles.sourceIcon} />{" "}
          <span>{item.source}</span>{" "}
        </div>
      );
    },
  },
  {
    key: "visitors",
    title: "Visitors",
    className: styles.numericCell,
    render: (item) => item.visitors.toLocaleString(),
  },
  {
    key: "conversionRate",
    title: "Conversion Rate",
    className: styles.numericCell,
  },
];

export const WebsiteTrafficView: React.FC = () => {
  return (
    <AnalyticsPageLayout title="Website Traffic" defaultDateRange="Last 7 Days">
      <div className={styles.statsGrid}>
        {trafficStats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>
      <ChartCard title="Sessions Over Time">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sessionsData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" axisLine={false} tickLine={false} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "var(--border-radius)",
                border: "1px solid var(--color-border)",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="sessions"
              stroke="var(--color-primary)"
              strokeWidth={2}
              name="Sessions"
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>
      <div className={styles.balancedGrid} style={{ marginTop: "1.5rem" }}>
        <ChartCard title="Traffic by Device">
          <div className={styles.pieChartWithLegend}>
            <div className={styles.pieChartContainer}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius="80%"
                  >
                    {deviceData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className={styles.pieLegendContainer}>
              {deviceData.map((entry) => (
                <div key={entry.name} className={styles.pieLegendItem}>
                  <span
                    className={styles.pieLegendColorBox}
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className={styles.pieLegendLabel}>{entry.name}</span>
                  <span className={styles.pieLegendValue}>
                    ({entry.value}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>
        <DataTable
          title="Top Traffic Sources"
          columns={trafficColumns}
          data={trafficSources}
        />
      </div>
    </AnalyticsPageLayout>
  );
};
