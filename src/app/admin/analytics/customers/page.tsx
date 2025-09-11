import { CustomerAnalyticsView } from "@/components/admin/analytics/customers/CustomerAnalyticsView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Insights",
  description: "Analyze customer behavior, demographics, and value.",
};

export default function CustomerAnalyticsPage() {
  return <CustomerAnalyticsView />;
}
