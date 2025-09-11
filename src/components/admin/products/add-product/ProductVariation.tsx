"use client";

import React, { useState, useEffect } from "react";
import styles from "./ProductVariation.module.css";
import { X } from "lucide-react";
import { ProductData } from "./AddProductView";

interface IVariationCombination {
  id: number;
  attributes: { [key: string]: string };
  price: string;
  sku: string;
  stock: string;
}

interface ProductVariationProps {
  isEditMode?: boolean;
  initialData?: ProductData | null;
}

const ProductVariation: React.FC<ProductVariationProps> = ({
  isEditMode = false,
  initialData = null,
}) => {
  // Attribute states
  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  // Input states for tag fields
  const [colorInput, setColorInput] = useState("");
  const [sizeInput, setSizeInput] = useState("");
  const [materialInput, setMaterialInput] = useState("");
  const [brandInput, setBrandInput] = useState("");
  const [tagInput, setTagInput] = useState("");

  // Variation combinations
  const [combinations, setCombinations] = useState<IVariationCombination[]>([]);

  // New boolean attributes
  const [isNew, setIsNew] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [isOnSale, setIsOnSale] = useState(false);
  const [isDeal, setIsDeal] = useState(false);

  // Edit mode: initialData থেকে মান বসানো
  useEffect(() => {
    if (isEditMode && initialData) {
      setTags(initialData.tags || []);
      setIsNew(!!initialData.isNew);
      setIsFeatured(!!initialData.isFeatured);
      setIsBestSeller(!!initialData.isBestSeller);
      setIsOnSale(!!initialData.isOnSale);
      setIsDeal(!!initialData.isDeal);
      // যদি variation attributes থাকে, চাইলে সেগুলোও বসাতে পারেন
    }
  }, [isEditMode, initialData]);

  // Add tag helpers
  const handleAddTag = (
    value: string,
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    list: string[],
    setInput: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (value && !list.includes(value)) {
      setList([...list, value]);
      setInput("");
    }
  };

  // Remove tag helpers
  const handleRemoveTag = (
    value: string,
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    list: string[]
  ) => {
    setList(list.filter((v) => v !== value));
  };

  // Generate combinations (Color × Size × Material)
  const generateCombinations = () => {
    if (!colors.length && !sizes.length && !materials.length) {
      alert("Please add at least one value for Color, Size or Material.");
      return;
    }
    const combos: { [key: string]: string }[] = [];
    const colorList = colors.length ? colors : [""];
    const sizeList = sizes.length ? sizes : [""];
    const materialList = materials.length ? materials : [""];

    for (const color of colorList) {
      for (const size of sizeList) {
        for (const material of materialList) {
          combos.push({
            ...(color && { Color: color }),
            ...(size && { Size: size }),
            ...(material && { Material: material }),
          });
        }
      }
    }
    setCombinations(
      combos.map((c, i) => ({
        id: Date.now() + i,
        attributes: c,
        price: "",
        sku: "",
        stock: "",
      }))
    );
  };

  // Reset combinations if attributes change
  useEffect(() => {
    setCombinations([]);
  }, [colors, sizes, materials]);

  return (
    <div className={styles.variationSection}>
      <div className={styles.card}>
        <h3 className={styles.sectionTitle}>Product Attributes</h3>
        <div className={styles.formGrid}>
          {/* Colors */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Colors</label>
            <input
              type="text"
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
              className={styles.formInput}
              placeholder="Add a color and press Enter"
              onKeyDown={(e) => {
                if (e.key === "Enter" && colorInput.trim()) {
                  e.preventDefault();
                  handleAddTag(
                    colorInput.trim(),
                    setColors,
                    colors,
                    setColorInput
                  );
                }
              }}
            />
            <div className={styles.tagContainer}>
              {colors.map((color, i) => (
                <span key={i} className={styles.tag}>
                  {color}
                  <button
                    onClick={() => handleRemoveTag(color, setColors, colors)}
                    className={styles.tagRemoveButton}
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>
          {/* Sizes */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Sizes</label>
            <input
              type="text"
              value={sizeInput}
              onChange={(e) => setSizeInput(e.target.value)}
              className={styles.formInput}
              placeholder="Add a size and press Enter"
              onKeyDown={(e) => {
                if (e.key === "Enter" && sizeInput.trim()) {
                  e.preventDefault();
                  handleAddTag(sizeInput.trim(), setSizes, sizes, setSizeInput);
                }
              }}
            />
            <div className={styles.tagContainer}>
              {sizes.map((size, i) => (
                <span key={i} className={styles.tag}>
                  {size}
                  <button
                    onClick={() => handleRemoveTag(size, setSizes, sizes)}
                    className={styles.tagRemoveButton}
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>
          {/* Materials */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Materials</label>
            <input
              type="text"
              value={materialInput}
              onChange={(e) => setMaterialInput(e.target.value)}
              className={styles.formInput}
              placeholder="Add a material and press Enter"
              onKeyDown={(e) => {
                if (e.key === "Enter" && materialInput.trim()) {
                  e.preventDefault();
                  handleAddTag(
                    materialInput.trim(),
                    setMaterials,
                    materials,
                    setMaterialInput
                  );
                }
              }}
            />
            <div className={styles.tagContainer}>
              {materials.map((mat, i) => (
                <span key={i} className={styles.tag}>
                  {mat}
                  <button
                    onClick={() =>
                      handleRemoveTag(mat, setMaterials, materials)
                    }
                    className={styles.tagRemoveButton}
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>
          {/* Brand */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Brand</label>
            <input
              type="text"
              value={brandInput}
              onChange={(e) => setBrandInput(e.target.value)}
              className={styles.formInput}
              placeholder="Enter brand name"
              onBlur={(e) => {
                if (brandInput.trim() && !brands.includes(brandInput.trim())) {
                  setBrands([brandInput.trim()]);
                }
              }}
            />
            {brands.length > 0 && (
              <div className={styles.tagContainer}>
                {brands.map((brand, i) => (
                  <span key={i} className={styles.tag}>
                    {brand}
                    <button
                      onClick={() => setBrands([])}
                      className={styles.tagRemoveButton}
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
          {/* Tags */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Tags</label>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className={styles.formInput}
              placeholder="Add a tag and press Enter"
              onKeyDown={(e) => {
                if (e.key === "Enter" && tagInput.trim()) {
                  e.preventDefault();
                  handleAddTag(tagInput.trim(), setTags, tags, setTagInput);
                }
              }}
            />
            <div className={styles.tagContainer}>
              {tags.map((tag, i) => (
                <span key={i} className={styles.tag}>
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag, setTags, tags)}
                    className={styles.tagRemoveButton}
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* Boolean attributes in two columns */}
        <div className={styles.booleanGrid}>
          <label className={styles.booleanLabel}>
            <input
              type="checkbox"
              checked={isNew}
              onChange={() => setIsNew((v) => !v)}
            />
            New
          </label>
          <label className={styles.booleanLabel}>
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={() => setIsFeatured((v) => !v)}
            />
            Featured
          </label>
          <label className={styles.booleanLabel}>
            <input
              type="checkbox"
              checked={isBestSeller}
              onChange={() => setIsBestSeller((v) => !v)}
            />
            Best Seller
          </label>
          <label className={styles.booleanLabel}>
            <input
              type="checkbox"
              checked={isOnSale}
              onChange={() => setIsOnSale((v) => !v)}
            />
            On Sale
          </label>
          <label className={styles.booleanLabel}>
            <input
              type="checkbox"
              checked={isDeal}
              onChange={() => setIsDeal((v) => !v)}
            />
            Deal
          </label>
        </div>
      </div>

      {/* Variation Generation */}
      {(colors.length > 0 || sizes.length > 0 || materials.length > 0) && (
        <div className={styles.generateButtonContainer}>
          <button
            onClick={generateCombinations}
            className={styles.primaryButtonLarge}
          >
            Generate Variations (
            {Math.max(
              1,
              (colors.length || 1) *
                (sizes.length || 1) *
                (materials.length || 1)
            )}
            )
          </button>
        </div>
      )}

      {/* Variations List */}
      {combinations.length > 0 && (
        <div className={styles.card}>
          <h3 className={styles.sectionTitle}>Edit Variations</h3>
          {combinations.map((combo) => (
            <details key={combo.id} className={styles.variationItem} open>
              <summary className={styles.variationHeader}>
                <span>
                  {Object.entries(combo.attributes)
                    .map(([k, v]) => `${k}: ${v}`)
                    .join(" / ")}
                </span>
              </summary>
              <div className={styles.variationBody}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Price</label>
                  <input
                    type="number"
                    className={styles.formInput}
                    placeholder="Variation Price"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>SKU</label>
                  <input
                    type="text"
                    className={styles.formInput}
                    placeholder="Variation SKU"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Stock</label>
                  <input
                    type="number"
                    className={styles.formInput}
                    placeholder="Stock Quantity"
                  />
                </div>
              </div>
            </details>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductVariation;
