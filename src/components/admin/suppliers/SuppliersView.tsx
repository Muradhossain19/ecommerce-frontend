"use client";

import React, { useState } from "react";
import { PageHeader } from "../products/shared/PageHeader";
import { FilterBar } from "../products/shared/FilterBar";
import { Plus, Upload, MoreVertical } from "lucide-react";
import styles from "./Suppliers.module.css";
import { AddEditSupplierModal } from "./AddEditSupplierModal"; // <-- আসল কম্পোনেন্ট ইম্পোর্ট

// (স্যাম্পল ডেটা এবং হেল্পার ফাংশন অপরিবর্তিত)
interface Supplier {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  status: "Active" | "Inactive";
  productCount: number;
}
const initialSuppliersData: Supplier[] = [
  {
    id: "SUP001",
    name: "John Doe",
    company: "Global Fashion Supplies",
    email: "john.doe@gfsupplies.com",
    phone: "+1-202-555-0174",
    address: "123 Fashion Ave, New York, NY 10018",
    productCount: 120,
    status: "Active" as const,
  },
  {
    id: "SUP002",
    name: "Jane Smith",
    company: "Electronics Hub",
    email: "jane.s@electronichub.net",
    phone: "+44-20-7946-0958",
    address: "456 Tech Road, London, EC1V 9LT",
    productCount: 45,
    status: "Active" as const,
  },
  {
    id: "SUP003",
    name: "Robert Brown",
    company: "Home Decor Inc.",
    email: "robert.b@homedecor.com",
    phone: "+1-310-555-0188",
    address: "789 Comfort Ln, Los Angeles, CA 90001",
    productCount: 0,
    status: "Inactive" as const,
  },
];
const getStatusClass = (status: "Active" | "Inactive") => {
  return status === "Active" ? styles.activeStatus : styles.inactiveStatus;
};

export const SuppliersView: React.FC = () => {
  const [suppliers, setSuppliers] = useState(initialSuppliersData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);

  const handleAddNew = () => {
    setEditingSupplier(null);
    setIsModalOpen(true);
  };

  const handleEdit = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setIsModalOpen(true);
  };

  const handleSave = (
    supplierData: Omit<Supplier, "id" | "productCount"> | Supplier
  ) => {
    if ("id" in supplierData) {
      // Edit mode
      setSuppliers(
        suppliers.map((s) =>
          s.id === supplierData.id ? { ...s, ...supplierData } : s
        )
      );
    } else {
      // Add mode
      const newSupplier: Supplier = {
        id: `SUP${Math.floor(1000 + Math.random() * 9000)}`,
        ...supplierData,
        productCount: 0, // নতুন সাপ্লায়ারের জন্য প্রোডাক্ট কাউন্ট ০
      };
      setSuppliers([newSupplier, ...suppliers]);
    }
  };

  return (
    <div className={styles.suppliersPage}>
      <PageHeader
        title="All Suppliers"
        subtitle="Manage your product suppliers and their information."
        breadcrumbs={["Suppliers"]}
      >
        <button className={styles.secondaryButton}>
          <Upload size={16} /> Export List
        </button>
        <button className={styles.primaryButton} onClick={handleAddNew}>
          <Plus size={16} /> Add Supplier
        </button>
      </PageHeader>

      <div className={styles.contentCard}>
        <FilterBar placeholder="Search by supplier name or company..." />

        <div className={styles.tableWrapper}>
          <table className={styles.suppliersTable}>
            {/* টেবিলের বাকি অংশ অপরিবর্তিত */}
            <thead>
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th>Supplier Info</th>
                <th>Contact</th>
                <th>Products</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier.id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>
                    <div className={styles.supplierCell}>
                      <div className={styles.avatar}>
                        {supplier.name.charAt(0)}
                      </div>
                      <div>
                        <p className={styles.supplierName}>{supplier.name}</p>
                        <p className={styles.companyName}>{supplier.company}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className={styles.contactInfo}>{supplier.email}</p>
                    <p className={styles.contactInfo}>{supplier.phone}</p>
                  </td>
                  <td className={styles.productCount}>
                    {supplier.productCount}
                  </td>
                  <td>
                    <span
                      className={`${styles.statusBadge} ${getStatusClass(
                        supplier.status
                      )}`}
                    >
                      {supplier.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actionButtons}>
                      <button
                        className={styles.editButton}
                        onClick={() => handleEdit(supplier)}
                      >
                        Edit
                      </button>
                      <button className={styles.moreButton}>
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <AddEditSupplierModal
          supplier={editingSupplier}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};
