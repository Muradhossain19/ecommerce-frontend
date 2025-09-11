import { WebsiteTrafficView } from "@/components/admin/analytics/traffic/WebsiteTrafficView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Traffic Analytics",
  description:
    "Analyze your website traffic sources, user devices, and session data.",
};

export default function WebsiteTrafficPage() {
  return <WebsiteTrafficView />;
}
