import { InventoryView } from "@/components/admin/products/inventory/InventoryView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inventory",
};

export default function InventoryPage() {
  return <InventoryView />;
}
