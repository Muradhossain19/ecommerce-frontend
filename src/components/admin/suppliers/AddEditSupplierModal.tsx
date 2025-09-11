"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import styles from "./AddEditSupplierModal.module.css";

// একটি ডামি টাইপ, যা পরে একটি সেন্ট্রালাইজড টাইপ ফাইল থেকে আসবে
interface Supplier {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  status: "Active" | "Inactive";
}

interface Props {
  supplier?: Supplier | null;
  onClose: () => void;
  onSave: (supplierData: Omit<Supplier, "id"> | Supplier) => void;
}

export const AddEditSupplierModal: React.FC<Props> = ({
  supplier,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    address: "",
    status: "Active" as "Active" | "Inactive",
  });

  const isEditMode = Boolean(supplier);

  useEffect(() => {
    if (isEditMode && supplier) {
      setFormData({
        name: supplier.name,
        company: supplier.company,
        email: supplier.email,
        phone: supplier.phone,
        address: supplier.address || "", // ঠিকানা না থাকলে খালি স্ট্রিং
        status: supplier.status,
      });
    }
  }, [supplier, isEditMode]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode && supplier) {
      onSave({ ...supplier, ...formData });
    } else {
      onSave(formData);
    }
    onClose(); // সেভ করার পর মডাল বন্ধ করে দেওয়া
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>{isEditMode ? "Edit Supplier" : "Add New Supplier"}</h3>
          <button onClick={onClose} className={styles.closeButton}>
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.modalBody}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Supplier Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="company">Company Name</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                rows={3}
                value={formData.address}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className={styles.modalFooter}>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className={styles.primaryButton}>
              {isEditMode ? "Save Changes" : "Add Supplier"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
