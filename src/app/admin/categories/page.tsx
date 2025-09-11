import { AllCategoriesView } from "@/components/admin/products/all-categories/AllCategoriesView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Categories",
};

export default function AllCategories() {
  return <AllCategoriesView />;
}
