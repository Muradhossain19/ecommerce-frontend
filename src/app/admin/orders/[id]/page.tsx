import OrderDetailsView from "@/components/admin/orders/OrderDetailsView";
import { notFound } from "next/navigation";

interface OrderPageProps {
  params: {
    id: string;
  };
}

// এই ফাংশনটি একটি বাস্তব অ্যাপ্লিকেশনে আসল ডেটা আনবে
async function getOrderData(orderId: string) {
  // আপাতত, আমরা শুধু আইডি যাচাই করে মক ডেটা ব্যবহার করব
  // বাস্তব অ্যাপে, আপনি আপনার ডেটাবেস থেকে ডেটা আনবেন:
  // const order = await db.orders.findUnique({ where: { id: orderId } });
  // if (!order) return null;

  console.log(`Fetching data for order ID: ${orderId}`);

  // সফলতার ইঙ্গিত হিসাবে একটি সাধারণ অবজেক্ট রিটার্ন করা হচ্ছে
  return { id: orderId };
}

export default async function OrderDetailsPage({ params }: OrderPageProps) {
  const order = await getOrderData(params.id);

  if (!order) {
    notFound();
  }

  return <OrderDetailsView />;
}
