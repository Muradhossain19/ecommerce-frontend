import { AddProductView } from "@/components/admin/products/add-product/AddProductView";
import React from "react";

const products = [
  {
    id: "SKU26558522",
    name: "Nike Air Jordan Reflex",
    brand: "Nike",
    category: "Style & Fashion",
    image: "/images/sample-shoe.png",
    styleCount: 3,
    price: "€26.35",
    stock: 2240,
    status: "In Stock" as const,
  },
  {
    id: "SKU26558523",
    name: "6W Study Table Light",
    brand: "No Brand",
    category: "Home Décor",
    image: "/images/sample-lamp.png",
    styleCount: 1,
    price: "€15.50",
    stock: 0,
    status: "Out of Stock" as const,
  },
  {
    id: "SKU26558524",
    name: "Boat Bluetooth Speaker",
    brand: "Boat",
    category: "Electronics",
    image: "/images/sample-speaker.png",
    styleCount: 2,
    price: "€45.00",
    stock: 20,
    status: "Low Stock" as const,
  },
  // ... আরও প্রোডাক্ট যোগ করা যেতে পারে
];

interface EditProductPageProps {
  params: {
    id: string;
  };
}

const EditProductPage = ({ params }: EditProductPageProps) => {
  const productId = params.id;
  const productData = products.find((prod) => prod.id === productId) || null;

  if (!productData) {
    return <div>Product not found!</div>;
  }

  // We are reusing AddProductView in "edit mode"
  return <AddProductView isEditMode={true} initialData={productData} />;
};

export default EditProductPage;
