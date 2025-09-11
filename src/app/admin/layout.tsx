import { Metadata } from "next";
import AdminLayout from "@/components/admin/layout/AdminLayout/AdminLayout";

export const metadata: Metadata = {
  title: {
    template: "%s | DeenCommerce Admin",
    default: "Dashboard | DeenCommerce Admin",
  },
  description: "DeenCommerce Admin Dashboard - Manage your ecommerce business",
  robots: "noindex, nofollow", // Prevent search engine indexing
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
