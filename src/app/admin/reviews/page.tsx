import { AllReviewsView } from "@/components/admin/reviews/AllReviewsView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Reviews",
};

export default function AllReviewsPage() {
  return <AllReviewsView />;
}
