"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Upload } from "lucide-react";
import { PageHeader } from "../shared/PageHeader";
import { FilterBar } from "../shared/FilterBar";
import styles from "./AllProducts.module.css";
import { useRouter } from "next/navigation";
import { ProductData } from "../add-product/AddProductView";

// Sample Data
const products: ProductData[] = [
  {
    id: "SKU26558522",
    name: "Nike Air Jordan Reflex",
    brand: "Nike",
    category: "Style & Fashion",
    image: "/images/sample-shoe.png",
    styleCount: 3,
    price: 26.35,
    stock: 2240,
    status: "In Stock",
  },
  {
    id: "SKU26558523",
    name: "6W Study Table Light",
    brand: "No Brand",
    category: "Home Décor",
    image: "/images/sample-lamp.png",
    styleCount: 1,
    price: 15.5,
    stock: 0,
    status: "Out of Stock",
  },
  {
    id: "SKU26558524",
    name: "Boat Bluetooth Speaker",
    brand: "Boat",
    category: "Electronics",
    image: "/images/sample-speaker.png",
    styleCount: 2,
    price: 45.0,
    stock: 20,
    status: "Low Stock",
  },
  // ... আরও প্রোডাক্ট যোগ করা যেতে পারে
];

// স্ট্যাটাস অনুযায়ী স্টাইল দেওয়ার জন্য একটি হেল্পার ফাংশন
const getStatusClass = (status: string) => {
  switch (status) {
    case "In Stock":
      return styles.inStock;
    case "Out of Stock":
      return styles.outOfStock;
    case "Low Stock":
      return styles.lowStock;
    default:
      return "";
  }
};

export const AllProductsView: React.FC = () => {
  const router = useRouter();

  return (
    <div className={styles.allProductsPage}>
      <PageHeader
        title="All Product"
        subtitle="Check all listed products and manage them easily."
      >
        <button className={styles.secondaryButton}>
          <Upload size={16} /> Export List
        </button>
        <button
          className={styles.primaryButton}
          onClick={() => router.push("/admin/products/add")}
        >
          <Plus size={16} /> Add Product
        </button>
      </PageHeader>

      <div className={styles.contentCard}>
        <FilterBar />

        <div className={styles.tableWrapper}>
          <table className={styles.productsTable}>
            <thead>
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th>Product</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>
                    <div className={styles.productCell}>
                      <Image
                        src={product.image as string}
                        alt={product.name}
                        width={50}
                        height={50}
                        className={styles.productImage}
                      />
                      <div className={styles.productInfo}>
                        <p className={styles.productName}>{product.name}</p>
                        <p className={styles.productMeta}>
                          SKU: {product.id} | Brand: {product.brand} | Category:{" "}
                          {product.category}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className={styles.price}>
                      {typeof product.price === "number"
                        ? `€${product.price.toFixed(2)}`
                        : product.price}
                    </p>
                    <p className={styles.styleCount}>
                      {product.styleCount} Style
                    </p>
                  </td>
                  <td className={styles.stock}>
                    {product.stock?.toLocaleString()}
                  </td>
                  <td>
                    <span
                      className={`${styles.statusBadge} ${getStatusClass(
                        product.status as string
                      )}`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actionButtons}>
                      <Link
                        href={`/admin/products/edit/${product.id}`}
                        passHref
                      >
                        <button className={styles.editButton}>Edit</button>
                      </Link>
                      <button className={styles.deleteButton}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* এখানে পেজিনেশন কম্পোনেন্ট যোগ হবে */}
      </div>
    </div>
  );
};
