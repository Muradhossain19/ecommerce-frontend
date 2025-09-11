import { AddCategoryView } from "@/components/admin/products/add-category/AddCategoryView";
import React from "react";

// This is the same sample data from AllCategoriesView for demonstration
const categories = [
  {
    id: 1,
    name: "Electronics",
    slug: "electronics",
    description: "Gadgets and devices",
    image: "/images/sample-speaker.png",
    isFeatured: true,
    parentId: null,
  },
  {
    id: 2,
    name: "Mobile Phones",
    slug: "mobile-phones",
    description: "Latest smartphones",
    image: "/images/sample-shoe.png",
    isFeatured: false,
    parentId: 1,
  },
  {
    id: 3,
    name: "Men's Fashion",
    slug: "mens-fashion",
    description: "Clothing for men",
    image: "/images/sample-lamp.png",
    isFeatured: true,
    parentId: null,
  },
  {
    id: 4,
    name: "T-Shirts",
    slug: "t-shirts",
    description: "Casual and formal t-shirts",
    image: "/images/sample-shoe.png",
    isFeatured: false,
    parentId: 3,
  },
];

interface EditCategoryPageProps {
  params: {
    id: string;
  };
}

const EditCategoryPage = ({ params }: EditCategoryPageProps) => {
  const categoryId = parseInt(params.id, 10);
  const categoryData = categories.find((cat) => cat.id === categoryId) || null;

  if (!categoryData) {
    return <div>Category not found!</div>;
  }

  // We are reusing AddCategoryView in "edit mode"
  return <AddCategoryView isEditMode={true} initialData={categoryData} />;
};

export default EditCategoryPage;
