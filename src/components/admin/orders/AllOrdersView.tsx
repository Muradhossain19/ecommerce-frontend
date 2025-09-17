"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "../products/shared/PageHeader";
import { FilterBar } from "../products/shared/FilterBar";
import {
  Upload,
  XCircle,
  List,
  Clock,
  Loader,
  Truck,
  CheckCircle,
  ArchiveRestore, // ১. নতুন আইকন ইম্পোর্ট করা হয়েছে
} from "lucide-react";
import styles from "./Orders.module.css";

// --- টাইপ সংজ্ঞা আপডেট করা হয়েছে ---
type OrderStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

// ২. ReturnStatus টাইপ যোগ করা হয়েছে
type ReturnStatus =
  | "Requested"
  | "Approved"
  | "Received"
  | "Refunded"
  | "Rejected";

type OrderItem = {
  id: string;
  name: string;
  image: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
};

// ৩. Order টাইপে returnStatus এবং returnReason যোগ করা হয়েছে
type Order = {
  orderId: string;
  customer: string;
  date: string;
  items: OrderItem[];
  paymentMethod: string;
  status: OrderStatus;
  deadline?: string;
  returnStatus?: ReturnStatus;
  returnReason?: string;
};

// --- ডামি ডেটা আপডেট করা হয়েছে ---
const ordersData: Order[] = [
  {
    orderId: "246522114",
    customer: "Danial Donald",
    date: "26 Jan, 2023",
    items: [
      {
        id: "p1",
        name: "Nike Air Jordan Reflex",
        image: "/images/sample-shoe.png",
        color: "Black",
        size: "42",
        quantity: 2,
        price: 26.35,
      },
    ],
    paymentMethod: "Credit Card",
    status: "Pending",
    deadline: "22 Mar, 24",
  },
  {
    orderId: "246522115",
    customer: "Emma Watson",
    date: "25 Jan, 2023",
    items: [
      {
        id: "p2",
        name: "Classic Leather Watch",
        image: "/images/sample-watch.png",
        color: "Brown",
        size: "N/A",
        quantity: 1,
        price: 120.5,
      },
    ],
    paymentMethod: "PayPal",
    status: "Delivered",
  },
  {
    orderId: "246522116",
    customer: "John Doe",
    date: "24 Jan, 2023",
    items: [
      {
        id: "p3",
        name: "Boat Bluetooth Speaker",
        image: "/images/sample-speaker.png",
        color: "Blue",
        size: "Medium",
        quantity: 1,
        price: 45.0,
      },
      {
        id: "p4",
        name: "6W Study Table Light",
        image: "/images/sample-lamp.png",
        color: "White",
        size: "N/A",
        quantity: 1,
        price: 15.5,
      },
    ],
    paymentMethod: "Credit Card",
    status: "Processing",
    deadline: "28 Mar, 24",
  },
  {
    orderId: "246522117",
    customer: "Mike Johnson",
    date: "23 Jan, 2023",
    items: [
      {
        id: "p5",
        name: "Sony Headphone",
        image: "/images/sample-headphone.png",
        color: "Black",
        size: "N/A",
        quantity: 1,
        price: 99.99,
      },
    ],
    paymentMethod: "COD",
    status: "Shipped",
  },
  {
    orderId: "246522118",
    customer: "Jane Smith",
    date: "22 Jan, 2023",
    items: [
      {
        id: "p1",
        name: "Nike Air Jordan Reflex",
        image: "/images/sample-shoe.png",
        color: "Red",
        size: "40",
        quantity: 1,
        price: 26.35,
      },
    ],
    paymentMethod: "Credit Card",
    status: "Cancelled",
  },
  // ৪. রিটার্নের জন্য দুটি নতুন অর্ডার যোগ করা হয়েছে
  {
    orderId: "246522119",
    customer: "Alice Wonderland",
    date: "21 Jan, 2023",
    items: [
      {
        id: "p6",
        name: "Designer Handbag",
        image: "/images/sample-bag.png",
        color: "Tan",
        size: "Large",
        quantity: 1,
        price: 150.0,
      },
    ],
    paymentMethod: "Credit Card",
    status: "Delivered",
    returnStatus: "Requested",
    returnReason: "Product not as described",
  },
  {
    orderId: "246522120",
    customer: "Bob Builder",
    date: "20 Jan, 2023",
    items: [
      {
        id: "p7",
        name: "Smart Fitness Tracker",
        image: "/images/sample-tracker.png",
        color: "Green",
        size: "N/A",
        quantity: 1,
        price: 75.5,
      },
    ],
    paymentMethod: "PayPal",
    status: "Delivered",
    returnStatus: "Refunded",
    returnReason: "Damaged on arrival",
  },
];

// --- স্ট্যাটাস ক্লাস (রিটার্নের জন্য নতুন ক্লাস যোগ করা হয়েছে) ---
const getStatusClass = (status: OrderStatus | ReturnStatus) =>
  ({
    Pending: styles.statusPending,
    Processing: styles.statusProcessing,
    Shipped: styles.statusShipped,
    Delivered: styles.statusDelivered,
    Cancelled: styles.statusCancelled,
    // রিটার্নের স্ট্যাটাস
    Requested: styles.statusPending, // Pending এর রঙ ব্যবহার করা হচ্ছে
    Approved: styles.statusProcessing, // Processing এর রঙ
    Received: styles.statusShipped, // Shipped এর রঙ
    Refunded: styles.statusDelivered, // Delivered এর রঙ
    Rejected: styles.statusCancelled, // Cancelled এর রঙ
  }[status] || "");

// --- ট্যাব লিস্ট আপডেট করা হয়েছে ---
const tabs = [
  { label: "All Orders", value: "All", icon: <List size={18} /> },
  { label: "Pending", value: "Pending", icon: <Clock size={18} /> },
  { label: "Processing", value: "Processing", icon: <Loader size={18} /> },
  { label: "Shipped", value: "Shipped", icon: <Truck size={18} /> },
  { label: "Delivered", value: "Delivered", icon: <CheckCircle size={18} /> },
  // ৫. নতুন ট্যাব যোগ করা হয়েছে
  {
    label: "Returns & Refunds",
    value: "Returns",
    icon: <ArchiveRestore size={18} />,
  },
  { label: "Cancelled", value: "Cancelled", icon: <XCircle size={18} /> },
];

export const AllOrdersView: React.FC = () => {
  // ৬. activeTab এর টাইপ আপডেট করা হয়েছে
  const [activeTab, setActiveTab] = useState<OrderStatus | "All" | "Returns">(
    "All"
  );
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());

  // ৭. ফিল্টারিং লজিক আপডেট করা হয়েছে
  const filteredOrders = useMemo(() => {
    if (activeTab === "All") return ordersData;
    if (activeTab === "Returns") {
      return ordersData.filter((order) => order.returnStatus);
    }
    return ordersData.filter((order) => order.status === activeTab);
  }, [activeTab]);

  const handleSelectOrder = (orderId: string) => {
    setSelectedOrders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) newSet.delete(orderId);
      else newSet.add(orderId);
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedOrders.size === filteredOrders.length) {
      setSelectedOrders(new Set());
    } else {
      setSelectedOrders(new Set(filteredOrders.map((o) => o.orderId)));
    }
  };

  return (
    <div className={styles.allOrdersPage}>
      <PageHeader
        title="All Orders"
        subtitle="Check all orders at single place. It's easy to manage."
      >
        <button className={styles.exportButton}>
          <Upload size={16} /> Export Order List
        </button>
      </PageHeader>

      <div className={styles.contentCard}>
        <div className={styles.tabsWrapper}>
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() =>
                setActiveTab(tab.value as OrderStatus | "All" | "Returns")
              }
              className={`${styles.tabButton} ${
                activeTab === tab.value ? styles.active : ""
              }`}
            >
              {tab.icon}
              {tab.label}
              <span className={styles.tabCount}>
                {/* ৮. ট্যাব কাউন্ট লজিক আপডেট করা হয়েছে */}
                {tab.value === "All"
                  ? ordersData.length
                  : tab.value === "Returns"
                  ? ordersData.filter((o) => o.returnStatus).length
                  : ordersData.filter((o) => o.status === tab.value).length}
              </span>
            </button>
          ))}
        </div>

        <FilterBar placeholder="Search by ID, name, status..." />

        <div className={styles.tableWrapper}>
          <table className={styles.productsTable}>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={
                      selectedOrders.size === filteredOrders.length &&
                      filteredOrders.length > 0
                    }
                  />
                </th>
                <th>Product</th>
                <th>Price</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.orderId}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedOrders.has(order.orderId)}
                      onChange={() => handleSelectOrder(order.orderId)}
                    />
                  </td>
                  <td>
                    <div className={styles.productCell}>
                      <Image
                        src={order.items[0].image}
                        alt={order.items[0].name}
                        width={48}
                        height={48}
                        className={styles.productImage}
                      />
                      <div className={styles.productInfo}>
                        <Link
                          href={`/admin/orders/${order.orderId}`}
                          className={styles.productLink}
                        >
                          <p className={styles.productName}>
                            {order.items[0].name}
                          </p>
                        </Link>
                        <p className={styles.productMeta}>
                          Color: {order.items[0].color} | Size:{" "}
                          {order.items[0].size} | Qty: {order.items[0].quantity}
                        </p>
                        {order.items.length > 1 && (
                          <span
                            className={styles.moreItemsBadge}
                            title={order.items
                              .slice(1)
                              .map((i) => i.name)
                              .join(", ")}
                          >
                            +{order.items.length - 1} more item
                          </span>
                        )}
                        <div className={styles.customerMeta}>
                          <span className={styles.customerName}>
                            {order.customer}
                          </span>
                          <div className={styles.customerDate}>
                            {order.date}
                          </div>
                          <Link
                            href={`/admin/orders/${order.orderId}`}
                            className={styles.orderIdLink}
                          >
                            <span className={styles.customerOrderId}>
                              Order ID: {order.orderId}
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className={styles.price}>
                      €
                      {order.items
                        .reduce(
                          (sum, item) => sum + item.price * item.quantity,
                          0
                        )
                        .toFixed(2)}
                    </p>
                  </td>
                  <td className={styles.cellPayment}>{order.paymentMethod}</td>
                  <td>
                    {/* ৯. স্ট্যাটাস প্রদর্শনের লজিক আপডেট করা হয়েছে */}
                    {order.returnStatus ? (
                      <span
                        className={`${styles.statusBadge} ${getStatusClass(
                          order.returnStatus
                        )}`}
                      >
                        Return: {order.returnStatus}
                      </span>
                    ) : (
                      <span
                        className={`${styles.statusBadge} ${getStatusClass(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    )}
                    {order.deadline && !order.returnStatus && (
                      <div className={styles.statusDeadline}>
                        Please process before {order.deadline}
                      </div>
                    )}
                  </td>
                  <td>
                    <div className={styles.actionButtons}>
                      <button className={styles.editButton}>Print Label</button>
                      <button className={styles.deleteButton}>
                        Cancel Order
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
