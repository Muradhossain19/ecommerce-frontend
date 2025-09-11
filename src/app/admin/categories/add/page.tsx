import { AddCategoryView } from "@/components/admin/products/add-category/AddCategoryView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add New Category",
};

export default function AddCategoryPage() {
  return <AddCategoryView />;
}
