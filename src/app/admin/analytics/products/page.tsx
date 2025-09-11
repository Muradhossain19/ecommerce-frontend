import { ProductPerformanceView } from "@/components/admin/analytics/products/ProductPerformanceView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Performance",
  description: "Track and analyze the performance of your products.",
};

export default function ProductPerformancePage() {
  return <ProductPerformanceView />;
}
