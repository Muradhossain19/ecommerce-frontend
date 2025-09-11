"use client";

import React from "react";
import {
  LineChart,
  Line,
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
import styles from "../shared/Shared.module.css"; // কমন স্টাইল ব্যবহার করছি

// Sample Data (বাস্তব অ্যাপ্লিকেশনে এপিআই থেকে আসবে)
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
  { source: "Google", visitors: 18500, conversionRate: "4.5%" },
  { source: "Facebook", visitors: 12300, conversionRate: "3.1%" },
  { source: "Direct", visitors: 8500, conversionRate: "5.2%" },
  { source: "Instagram", visitors: 5400, conversionRate: "2.8%" },
  { source: "Referral", visitors: 2100, conversionRate: "2.1%" },
];

export const WebsiteTrafficView: React.FC = () => {
  return (
    <AnalyticsPageLayout title="Website Traffic" defaultDateRange="Last 7 Days">
      <div className={styles.statsGrid}>
        {trafficStats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
          />
        ))}
      </div>

      <ChartCard title="Sessions Over Time">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sessionsData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
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

      <div className={styles.analyticsGrid}>
        <ChartCard title="Traffic by Device">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={deviceData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
              >
                {deviceData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `${value}%`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <div className={styles.tableCard}>
          <h4 className={styles.chartTitle}>Top Traffic Sources</h4>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>Source</th>
                <th>Visitors</th>
                <th>Conversion Rate</th>
              </tr>
            </thead>
            <tbody>
              {trafficSources.map((source) => (
                <tr key={source.source}>
                  <td>{source.source}</td>
                  <td>{source.visitors.toLocaleString()}</td>
                  <td>{source.conversionRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AnalyticsPageLayout>
  );
};
