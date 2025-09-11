import { DashboardOverview } from "@/components/admin/dashboard/DashboardOverview";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Overview",
  description: "DeenCommerce admin dashboard with analytics and insights",
};

export default function AdminDashboardPage() {
  return (
    <div className="admin-page">
      <DashboardOverview />
    </div>
  );
}
