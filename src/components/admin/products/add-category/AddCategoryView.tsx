"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "../shared/PageHeader";
import styles from "./AddCategory.module.css";
import { UploadCloud, X } from "lucide-react";

// Interface for Category Data
interface CategoryData {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
  description: string;
  image: string | null;
  isFeatured: boolean;
}

// Props for the component
interface AddCategoryViewProps {
  isEditMode?: boolean;
  initialData?: CategoryData | null;
}

// Sample categories for the parent dropdown
const sampleCategories = [
  { id: 1, name: "Electronics" },
  { id: 3, name: "Men's Fashion" },
];

export const AddCategoryView: React.FC<AddCategoryViewProps> = ({
  isEditMode = false,
  initialData = null,
}) => {
  // State for form fields
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [parentId, setParentId] = useState<string>("none");
  const [description, setDescription] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Populate form with initial data in edit mode
  useEffect(() => {
    if (isEditMode && initialData) {
      setName(initialData.name);
      setSlug(initialData.slug);
      setParentId(initialData.parentId?.toString() || "none");
      setDescription(initialData.description);
      setIsFeatured(initialData.isFeatured);
      setImagePreview(initialData.image);
    }
  }, [isEditMode, initialData]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Dynamic UI content based on mode
  const pageTitle = isEditMode ? "Edit Category" : "Add New Category";
  const pageSubtitle = isEditMode
    ? `Editing the category: ${initialData?.name}`
    : "Fill in the details below to create a new product category.";
  const breadcrumbs = [
    "Categories",
    isEditMode ? "Edit Category" : "Add Category",
  ];
  const saveButtonText = isEditMode ? "Update Category" : "Save Category";

  return (
    <div className={styles.addCategoryPage}>
      <PageHeader
        title={pageTitle}
        subtitle={pageSubtitle}
        breadcrumbs={breadcrumbs}
      />

      <div className={styles.contentLayout}>
        {/* Main Form Content */}
        <main className={styles.mainContent}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Category Information</h3>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.formLabel}>
                Category Name
              </label>
              <input
                type="text"
                id="name"
                className={styles.formInput}
                placeholder="e.g., T-Shirts"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="slug" className={styles.formLabel}>
                Slug
              </label>
              <input
                type="text"
                id="slug"
                className={styles.formInput}
                placeholder="e.g., t-shirts (auto-generated if blank)"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="parent" className={styles.formLabel}>
                Parent Category
              </label>
              <select
                id="parent"
                className={styles.formInput}
                value={parentId}
                onChange={(e) => setParentId(e.target.value)}
              >
                <option value="none">None</option>
                {sampleCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.formLabel}>
                Description
              </label>
              <textarea
                id="description"
                className={`${styles.formInput} ${styles.textarea}`}
                rows={5}
                placeholder="Enter a short description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
        </main>

        {/* Sidebar for Thumbnail and Status */}
        <aside className={styles.sidebar}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Category Thumbnail</h3>
            <div className={styles.imageUploadWrapper}>
              <input
                type="file"
                id="imageUpload"
                className={styles.imageUploadInput}
                onChange={handleImageChange}
                accept="image/*"
              />
              <label htmlFor="imageUpload" className={styles.imageUploadLabel}>
                {imagePreview ? (
                  <>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className={styles.imagePreview}
                    />
                    <button
                      className={styles.removeImageButton}
                      onClick={(e) => {
                        e.preventDefault();
                        setImagePreview(null);
                      }}
                    >
                      <X size={16} />
                    </button>
                  </>
                ) : (
                  <div className={styles.uploadPlaceholder}>
                    <UploadCloud size={40} />
                    <p>
                      <span>Click to upload</span> or drag and drop
                    </p>
                    <p className={styles.uploadHint}>
                      SVG, PNG, JPG or GIF (max. 800x400px)
                    </p>
                  </div>
                )}
              </label>
            </div>
          </div>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Featured Category</h3>
            <div className={styles.toggleWrapper}>
              <label htmlFor="isFeatured" className={styles.formLabel}>
                Mark as featured
              </label>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                />
                <span className={`${styles.slider} ${styles.round}`}></span>
              </label>
            </div>
            <p className={styles.cardDescription}>
              Featured categories can be highlighted on your homepage.
            </p>
          </div>
        </aside>
      </div>

      {/* Footer with action buttons */}
      <footer className={styles.pageFooter}>
        <button className={styles.secondaryButton}>Cancel</button>
        <button className={styles.primaryButton}>{saveButtonText}</button>
      </footer>
    </div>
  );
};
