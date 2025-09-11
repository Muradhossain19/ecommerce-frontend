import { SuppliersView } from "@/components/admin/suppliers/SuppliersView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Suppliers",
};

export default function AllSuppliersPage() {
  return <SuppliersView />;
}
