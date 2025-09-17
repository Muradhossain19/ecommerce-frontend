import { AllOrdersView } from "@/components/admin/orders/AllOrdersView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Orders",
};

export default function AllOrdersPage() {
  return <AllOrdersView />;
}
