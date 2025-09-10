import { Truck, Shield, Headphones, CreditCard } from "lucide-react";

export interface FeatureItem {
  id: string;
  icon: typeof Truck; // Lucide icon component type
  title: string;
  description: string;
  bgColor: string;
}

export const featuresData: FeatureItem[] = [
  {
    id: "1",
    icon: Truck,
    title: "Free Shipping",
    description:
      "Free shipping on orders over $130. Fast and reliable delivery.",
    bgColor: "#e8f5e8",
  },
  {
    id: "2",
    icon: Shield,
    title: "Money Back Guarantee",
    description:
      "100% satisfaction guaranteed. Return within 30 days for refund.",
    bgColor: "#fff3e0",
  },
  {
    id: "3",
    icon: Headphones,
    title: "24/7 Support Services",
    description: "Round-the-clock customer support. We're here to help you.",
    bgColor: "#f3e5f5",
  },
  {
    id: "4",
    icon: CreditCard,
    title: "Secure Payment",
    description: "Your payment information is safe with our secure encryption.",
    bgColor: "#e3f2fd",
  },
];
