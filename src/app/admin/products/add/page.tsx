import { AddProductView } from "@/components/admin/products/add-product/AddProductView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add New Product",
};

export default function AddProductPage() {
  return <AddProductView />;
}
