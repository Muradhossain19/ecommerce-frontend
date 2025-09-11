"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Upload, Star, Trash2, Edit } from "lucide-react";
import { PageHeader } from "../shared/PageHeader";
import { FilterBar } from "../shared/FilterBar";
import { useRouter } from "next/navigation";
import styles from "./AllCategories.module.css";

// Sample Data for Categories
const categories = [
  {
    id: 1,
    name: "Electronics",
    slug: "electronics",
    description: "Gadgets and devices",
    image: "/images/sample-speaker.png",
    count: 120,
    isFeatured: true,
    parentId: null,
  },
  {
    id: 2,
    name: "Mobile Phones",
    slug: "mobile-phones",
    description: "Latest smartphones",
    image: "/images/sample-shoe.png", // Placeholder
    count: 45,
    isFeatured: false,
    parentId: 1,
  },
  {
    id: 3,
    name: "Men's Fashion",
    slug: "mens-fashion",
    description: "Clothing for men",
    image: "/images/sample-lamp.png", // Placeholder
    count: 300,
    isFeatured: true,
    parentId: null,
  },
  {
    id: 4,
    name: "T-Shirts",
    slug: "t-shirts",
    description: "Casual and formal t-shirts",
    image: "/images/sample-shoe.png", // Placeholder
    count: 150,
    isFeatured: false,
    parentId: 3,
  },
];

// Helper function to render categories hierarchically
const renderCategories = (parentId: number | null = null, level = 0) => {
  return categories
    .filter((category) => category.parentId === parentId)
    .flatMap((category) => [
      <tr key={category.id}>
        <td>
          <input type="checkbox" />
        </td>
        <td>
          <div className={styles.categoryCell}>
            <Image
              src={category.image}
              alt={category.name}
              width={50}
              height={50}
              className={styles.categoryImage}
            />
            <div className={styles.categoryInfo}>
              <p
                className={styles.categoryName}
                style={{ marginLeft: `${level * 20}px` }}
              >
                {level > 0 && (
                  <span className={styles.hierarchyIndicator}>— </span>
                )}
                {category.name}
              </p>
            </div>
          </div>
        </td>
        <td className={styles.descriptionCell}>{category.description}</td>
        <td>{category.slug}</td>
        <td>{category.count}</td>
        <td>
          <button
            className={`${styles.iconButton} ${
              category.isFeatured ? styles.featured : ""
            }`}
          >
            <Star size={18} />
          </button>
        </td>
        <td>
          <div className={styles.actionButtons}>
            <Link href={`/admin/categories/edit/${category.id}`} passHref>
              <button className={styles.editButton}>
                <Edit size={14} /> Edit
              </button>
            </Link>
            <button className={styles.deleteButton}>Delete</button>
          </div>
        </td>
      </tr>,
      ...renderCategories(category.id, level + 1),
    ]);
};

export const AllCategoriesView: React.FC = () => {
  const router = useRouter();

  return (
    <div className={styles.allCategoriesPage}>
      <PageHeader
        title="All Categories"
        subtitle="Manage, edit, and organize all your product categories."
      >
        <button className={styles.secondaryButton}>
          <Upload size={16} /> Export List
        </button>
        <button
          className={styles.primaryButton}
          onClick={() => router.push("/admin/categories/add")}
        >
          <Plus size={16} /> Add Category
        </button>
      </PageHeader>

      <div className={styles.contentCard}>
        <FilterBar placeholder="Search categories..." />

        <div className={styles.tableWrapper}>
          <table className={styles.categoriesTable}>
            <thead>
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th>Name</th>
                <th>Description</th>
                <th>Slug</th>
                <th>Count</th>
                <th>Featured</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{renderCategories()}</tbody>
          </table>
        </div>
        {/* Pagination component will go here */}
      </div>
    </div>
  );
};
