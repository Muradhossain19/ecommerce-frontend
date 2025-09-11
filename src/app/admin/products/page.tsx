import { AllProductsView } from "@/components/admin/products/all-products/AllProductsView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Products",
};

export default function AllProductsPage() {
  return <AllProductsView />;
}
