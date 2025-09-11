import { SalesAnalyticsView } from "@/components/admin/analytics/sales/SalesAnalyticsView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sales Reports",
  description:
    "Detailed sales analytics and reports for your e-commerce store.",
};

export default function SalesAnalyticsPage() {
  return <SalesAnalyticsView />;
}
