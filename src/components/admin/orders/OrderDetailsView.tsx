"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./OrderDetails.module.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// --- ডেটা মডেল এবং টাইপ সংজ্ঞা ---

interface DocWithLastTable extends jsPDF {
  lastAutoTable: { finalY?: number };
}

type OrderStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";
type ReturnStatus =
  | "Requested"
  | "Approved"
  | "Received"
  | "Refunded"
  | "Rejected";

type OrderItem = {
  id: number | string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  image: string;
};
type Order = {
  id: string;
  date: string;
  status: OrderStatus;
  returnStatus?: ReturnStatus;
  returnReason?: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    shippingAddress: {
      street: string;
      city: string;
      postalCode: string;
      country: string;
    };
    billingAddress: {
      street: string;
      city: string;
      postalCode: string;
      country: string;
    };
  };
  items: OrderItem[];
  pricing: {
    subtotal: number;
    shipping: number;
    discount: number;
    total: number;
  };
  payment: { method: string; status: string };
  notes: { id: number; author: string; note: string; date: string }[];
};

// ডামি ডেটা (AllOrdersView থেকে আনা হয়েছে)
const ordersData: Order[] = [
  {
    id: "246522114",
    date: "26 Jan, 2023",
    status: "Pending",
    customer: {
      name: "Danial Donald",
      email: "danial@example.com",
      phone: "+123456",
      shippingAddress: {
        street: "123 Main St",
        city: "Anytown",
        postalCode: "12345",
        country: "USA",
      },
      billingAddress: {
        street: "123 Main St",
        city: "Anytown",
        postalCode: "12345",
        country: "USA",
      },
    },
    items: [
      {
        id: "p1",
        name: "Nike Air Jordan Reflex",
        sku: "N-AJR-B42",
        quantity: 2,
        price: 52.7,
        image: "/images/sample-shoe.png",
      },
    ],
    pricing: { subtotal: 52.7, shipping: 5.0, discount: 0, total: 57.7 },
    payment: { method: "Credit Card", status: "Paid" },
    notes: [],
  },
  {
    id: "246522115",
    date: "25 Jan, 2023",
    status: "Delivered",
    customer: {
      name: "Emma Watson",
      email: "emma@example.com",
      phone: "+123456",
      shippingAddress: {
        street: "456 Oak Ave",
        city: "Someville",
        postalCode: "67890",
        country: "USA",
      },
      billingAddress: {
        street: "456 Oak Ave",
        city: "Someville",
        postalCode: "67890",
        country: "USA",
      },
    },
    items: [
      {
        id: "p2",
        name: "Classic Leather Watch",
        sku: "W-CLW-BRN",
        quantity: 1,
        price: 120.5,
        image: "/images/sample-watch.png",
      },
    ],
    pricing: { subtotal: 120.5, shipping: 10.0, discount: -10.0, total: 120.5 },
    payment: { method: "PayPal", status: "Paid" },
    notes: [],
  },
  {
    id: "246522119",
    date: "21 Jan, 2023",
    status: "Delivered",
    returnStatus: "Requested",
    returnReason: "Product not as described",
    customer: {
      name: "Alice Wonderland",
      email: "alice@example.com",
      phone: "+123456",
      shippingAddress: {
        street: "789 Pine Ln",
        city: "Wonderland",
        postalCode: "10112",
        country: "USA",
      },
      billingAddress: {
        street: "789 Pine Ln",
        city: "Wonderland",
        postalCode: "10112",
        country: "USA",
      },
    },
    items: [
      {
        id: "p6",
        name: "Designer Handbag",
        sku: "H-DHB-TAN",
        quantity: 1,
        price: 150.0,
        image: "/images/sample-bag.png",
      },
    ],
    pricing: { subtotal: 150.0, shipping: 0, discount: 0, total: 150.0 },
    payment: { method: "Credit Card", status: "Paid" },
    notes: [
      {
        id: 1,
        author: "Customer",
        note: "The color is much darker than the picture.",
        date: "20 Jan, 2023",
      },
    ],
  },
  {
    id: "246522120",
    date: "20 Jan, 2023",
    status: "Delivered",
    returnStatus: "Refunded",
    returnReason: "Damaged on arrival",
    customer: {
      name: "Bob Builder",
      email: "bob@example.com",
      phone: "+123456",
      shippingAddress: {
        street: "101 Construct Rd",
        city: "Builderville",
        postalCode: "13141",
        country: "USA",
      },
      billingAddress: {
        street: "101 Construct Rd",
        city: "Builderville",
        postalCode: "13141",
        country: "USA",
      },
    },
    items: [
      {
        id: "p7",
        name: "Smart Fitness Tracker",
        sku: "E-SFT-GRN",
        quantity: 1,
        price: 75.5,
        image: "/images/sample-tracker.png",
      },
    ],
    pricing: { subtotal: 75.5, shipping: 5.0, discount: 0, total: 80.5 },
    payment: { method: "PayPal", status: "Refunded" },
    notes: [
      {
        id: 1,
        author: "Admin",
        note: "Full refund processed via PayPal.",
        date: "22 Jan, 2023",
      },
    ],
  },
];

const getStatusClass = (status: string) => {
  const statusMap: { [key: string]: string } = {
    Processing: styles.statusProcessing,
    Shipped: styles.statusShipped,
    Delivered: styles.statusDelivered,
    Cancelled: styles.statusCancelled,
    Pending: styles.statusPending,
    Requested: styles.statusPending,
    Approved: styles.statusProcessing,
    Received: styles.statusShipped,
    Refunded: styles.statusDelivered,
    Rejected: styles.statusCancelled,
  };
  return statusMap[status] || "";
};

// --- মূল কম্পোনেন্ট ---
const OrderDetailsView = () => {
  const [order, setOrder] = useState<Order | null>(null);
  const [newNote, setNewNote] = useState("");
  const [isRefundModalOpen, setRefundModalOpen] = useState(false);

  useEffect(() => {
    const orderId = window.location.pathname.split("/").pop();
    const foundOrder = ordersData.find((o) => o.id === orderId);
    setOrder(foundOrder || null);
  }, []);

  if (!order) {
    return (
      <div className={styles.container}>
        <h1>Order not found.</h1>
      </div>
    );
  }

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as OrderStatus;
    setOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
  };

  const handleReturnStatusChange = (newStatus: ReturnStatus) => {
    setOrder((prev) => (prev ? { ...prev, returnStatus: newStatus } : null));
  };

  const handleInitiateReturn = () => {
    const reason = prompt("Please enter the reason for this return:");
    if (reason) {
      setOrder((prev) =>
        prev
          ? { ...prev, returnStatus: "Requested", returnReason: reason }
          : null
      );
    }
  };

  const handleProcessRefund = () => {
    handleReturnStatusChange("Refunded");
    setRefundModalOpen(false);
    alert(`Refund for Order #${order.id} has been processed.`);
  };

  const handleAddNote = () => {
    if (newNote.trim() === "") {
      alert("Please write a note before adding.");
      return;
    }
    const noteToAdd = {
      id: Date.now(),
      author: "Admin (You)",
      note: newNote,
      date: new Date().toLocaleString(),
    };
    setOrder((prev) =>
      prev ? { ...prev, notes: [...prev.notes, noteToAdd] } : null
    );
    setNewNote("");
  };
  const handlePrintLabel = () =>
    alert(`Shipping label for Order #${order.id} is being prepared...`);
  const handlePrintInvoice = () => {
    const doc = new jsPDF() as DocWithLastTable;
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("INVOICE", 105, 20, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("Your Company Name", 20, 30);
    doc.text("123 Business Avenue, Dhaka", 20, 36);
    doc.setFontSize(14);
    doc.text(`Order ID: #${order.id}`, 20, 50);
    doc.text(`Date: ${order.date}`, 20, 56);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Bill To:", 140, 50);
    doc.setFont("helvetica", "normal");
    doc.text(order.customer.name, 140, 56);
    doc.text(order.customer.shippingAddress.street, 140, 62);
    doc.text(
      `${order.customer.shippingAddress.city} - ${order.customer.shippingAddress.postalCode}`,
      140,
      68
    );
    const tableColumn = [
      "Product Name",
      "SKU",
      "Quantity",
      "Unit Price",
      "Total",
    ];
    const tableRows = order.items.map((item) => [
      item.name,
      item.sku,
      item.quantity,
      `BDT ${(item.price / item.quantity).toFixed(2)}`,
      `BDT ${item.price.toFixed(2)}`,
    ]);
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 80,
      theme: "grid",
      headStyles: { fillColor: [22, 160, 133] },
    });
    const finalY = doc.lastAutoTable.finalY || 80;
    const summaryXStart = 130;
    const summaryXEnd = 195;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    let currentY = finalY + 10;
    doc.text("Subtotal:", summaryXStart, currentY);
    doc.text(
      `BDT ${order.pricing.subtotal.toFixed(2)}`,
      summaryXEnd,
      currentY,
      { align: "right" }
    );
    currentY += 7;
    doc.text("Shipping:", summaryXStart, currentY);
    doc.text(
      `BDT ${order.pricing.shipping.toFixed(2)}`,
      summaryXEnd,
      currentY,
      { align: "right" }
    );
    currentY += 7;
    doc.text("Discount:", summaryXStart, currentY);
    doc.text(
      `- BDT ${Math.abs(order.pricing.discount).toFixed(2)}`,
      summaryXEnd,
      currentY,
      { align: "right" }
    );
    doc.setLineWidth(0.2);
    doc.line(summaryXStart, currentY + 4, summaryXEnd, currentY + 4);
    currentY += 11;
    doc.setFont("helvetica", "bold");
    doc.text("Total:", summaryXStart, currentY);
    doc.text(`BDT ${order.pricing.total.toFixed(2)}`, summaryXEnd, currentY, {
      align: "right",
    });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(
      "Thank you for your business!",
      105,
      doc.internal.pageSize.height - 10,
      { align: "center" }
    );
    doc.save(`invoice-${order.id}.pdf`);
  };

  return (
    <div className={styles.container}>
      {/* --- Refund Modal --- */}
      {isRefundModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Process Refund for Order #{order.id}</h2>
            <p>
              You are about to refund this order. Please confirm the details
              below.
            </p>
            <div className={styles.modalDetail}>
              <strong>Amount to Refund:</strong> BDT{" "}
              {order.pricing.total.toFixed(2)}
            </div>
            <div className={styles.modalDetail}>
              <strong>Refund Method:</strong> Original Payment Method (
              {order.payment.method})
            </div>
            <div className={styles.modalActions}>
              <button
                onClick={() => setRefundModalOpen(false)}
                className={`${styles.button} ${styles.buttonSecondary}`}
              >
                Cancel
              </button>
              <button
                onClick={handleProcessRefund}
                className={`${styles.button} ${styles.buttonPrimary}`}
              >
                Confirm Refund
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.header}>
        <h1>Order #{order.id}</h1>
        <div className={styles.headerActions}>
          <button
            onClick={handlePrintInvoice}
            className={`${styles.button} ${styles.buttonSecondary}`}
          >
            Invoice
          </button>
          <button
            onClick={handlePrintLabel}
            className={`${styles.button} ${styles.buttonSecondary}`}
          >
            Print Label
          </button>
          {order.status === "Delivered" && !order.returnStatus && (
            <button
              onClick={handleInitiateReturn}
              className={`${styles.button} ${styles.buttonDanger}`}
            >
              Initiate Return
            </button>
          )}
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.leftColumn}>
          {/* ... Order Items, Pricing, Notes card অপরিবর্তিত ... */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Order Items</h2>
            <table className={styles.itemsTable}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>SKU</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className={styles.productCell}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={40}
                          height={40}
                          className={styles.productImage}
                        />
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td>{item.sku}</td>
                    <td>{item.quantity}</td>
                    <td>৳{item.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.pricingSummary}>
            <div className={styles.pricingRow}>
              <span>Subtotal</span>
              <span>৳{order.pricing.subtotal.toFixed(2)}</span>
            </div>
            <div className={styles.pricingRow}>
              <span>Shipping</span>
              <span>৳{order.pricing.shipping.toFixed(2)}</span>
            </div>
            <div className={styles.pricingRow}>
              <span>Discount</span>
              <span>- ৳{Math.abs(order.pricing.discount).toFixed(2)}</span>
            </div>
            <div className={`${styles.pricingRow} ${styles.totalRow}`}>
              <span>Total</span>
              <span>৳{order.pricing.total.toFixed(2)}</span>
            </div>
          </div>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Order Notes</h2>
            <div className={styles.notesList}>
              {order.notes.map((note) => (
                <div key={note.id} className={styles.noteItem}>
                  <p className={styles.noteText}>"{note.note}"</p>
                  <small className={styles.noteMeta}>
                    by {note.author} on {note.date}
                  </small>
                </div>
              ))}
            </div>
            <div className={styles.addNote}>
              <textarea
                className={styles.noteTextarea}
                placeholder="Add a note..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
              ></textarea>
              <button
                onClick={handleAddNote}
                className={`${styles.button} ${styles.buttonPrimary}`}
              >
                Add Note
              </button>
            </div>
          </div>
        </div>
        <div className={styles.rightColumn}>
          {/* --- Return Management Card --- */}
          {order.returnStatus && (
            <div className={`${styles.card} ${styles.returnCard}`}>
              <h2 className={styles.cardTitle}>Return Management</h2>
              <div className={styles.detailItem}>
                <strong>Return Status:</strong>
                <span
                  className={`${styles.statusBadge} ${getStatusClass(
                    order.returnStatus
                  )}`}
                >
                  {order.returnStatus}
                </span>
              </div>
              {order.returnReason && (
                <div className={styles.detailItem}>
                  <strong>Reason:</strong>
                  <span>{order.returnReason}</span>
                </div>
              )}

              {order.returnStatus === "Requested" && (
                <div className={styles.returnActions}>
                  <button
                    onClick={() => handleReturnStatusChange("Approved")}
                    className={`${styles.button} ${styles.buttonPrimary}`}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReturnStatusChange("Rejected")}
                    className={`${styles.button} ${styles.buttonDanger}`}
                  >
                    Reject
                  </button>
                </div>
              )}
              {order.returnStatus === "Approved" && (
                <div className={styles.returnActions}>
                  <button
                    onClick={() => handleReturnStatusChange("Received")}
                    className={`${styles.button} ${styles.buttonPrimary}`}
                  >
                    Mark as Received
                  </button>
                </div>
              )}
              {order.returnStatus === "Received" && (
                <div className={styles.returnActions}>
                  <button
                    onClick={() => setRefundModalOpen(true)}
                    className={`${styles.button} ${styles.buttonPrimary}`}
                  >
                    Process Refund
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ... Details, Customer, Address card অপরিবর্তিত ... */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Details</h2>
            <div className={styles.detailItem}>
              <strong>Order Date:</strong>
              <span>{order.date}</span>
            </div>
            <div className={styles.detailItem}>
              <strong>Payment Method:</strong>
              <span>{order.payment.method}</span>
            </div>
            <div className={styles.detailItem}>
              <strong>Payment Status:</strong>
              <span className={`${styles.statusBadge} ${styles.statusPending}`}>
                {order.payment.status}
              </span>
            </div>
            <div className={styles.detailItem}>
              <strong>Order Status:</strong>
              <span
                className={`${styles.statusBadge} ${getStatusClass(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>
            <div className={styles.detailItem}>
              <strong>Change Status:</strong>
              <select
                value={order.status}
                onChange={handleStatusChange}
                className={styles.statusSelect}
                disabled={!!order.returnStatus || order.status === "Cancelled"}
              >
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Customer</h2>
            <p>{order.customer.name}</p>
            <p>{order.customer.email}</p>
            <p>{order.customer.phone}</p>
          </div>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Shipping Address</h2>
            <address className={styles.address}>
              {order.customer.shippingAddress.street}
              {order.customer.shippingAddress.city} -{" "}
              {order.customer.shippingAddress.postalCode}
              {order.customer.shippingAddress.country}
            </address>
          </div>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Billing Address</h2>
            <address className={styles.address}>
              {order.customer.billingAddress.street}
              {order.customer.billingAddress.city} -{" "}
              {order.customer.billingAddress.postalCode}
              {order.customer.billingAddress.country}
            </address>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsView;
