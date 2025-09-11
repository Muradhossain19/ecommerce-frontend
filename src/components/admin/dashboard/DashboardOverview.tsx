"use client";

import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  RefObject,
  useEffect,
} from "react";
import Image from "next/image";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  DollarSign,
  ShoppingCart,
  Users,
  UserCheck,
  TrendingUp,
  TrendingDown,
  Printer,
  XCircle,
  ChevronDown,
} from "lucide-react";
import styles from "./DashboardOverview.module.css";

// --- 1. Type Definitions ---
type StatTrend = "up" | "down";
type StatItem = {
  title: string;
  value: string;
  growth: number;
  Icon: React.ElementType;
  trend: StatTrend;
};
type Timeframe = "Monthly" | "Weekly" | "Daily";
type SalesChartData = { [key in Timeframe]: { name: string; sales: number }[] };
type OrderStatsData = {
  [key in Timeframe]: { name: string; value: number; color: string }[];
};
type RecentOrder = {
  orderId: string;
  customer: string;
  date: string;
  product: {
    name: string;
    image: string;
    color: string;
    size: string;
    quantity: number;
  };
  price: string;
  payment: string;
  status: "Pending" | "Delivered" | "Cancelled";
  deadline: string | null;
};
type BestSellingProduct = {
  name: string;
  image: string;
  qty: number;
  color: string;
  totalSale: number;
  totalEarning: string;
};
type TopSellingCategory = { name: string; value: number; color: string }; // Updated Type

// --- 2. Custom Hook (Type-Safe) ---
const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  handler: (event: MouseEvent | TouchEvent) => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

// --- 3. Sample Data ---
const statsData: StatItem[] = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    growth: 20.1,
    Icon: DollarSign,
    trend: "up",
  },
  {
    title: "Total Orders",
    value: "+2350",
    growth: 18.1,
    Icon: ShoppingCart,
    trend: "up",
  },
  {
    title: "Total Customers",
    value: "+1200",
    growth: -3.2,
    Icon: Users,
    trend: "down",
  },
  {
    title: "Website Visitors",
    value: "+573",
    growth: 15.6,
    Icon: UserCheck,
    trend: "up",
  },
];
const salesChartData: SalesChartData = {
  Monthly: [
    { name: "Jan", sales: 4000 },
    { name: "Feb", sales: 3000 },
    { name: "Mar", sales: 5000 },
    { name: "Apr", sales: 4500 },
    { name: "May", sales: 6000 },
    { name: "Jun", sales: 5500 },
    { name: "Jul", sales: 7000 },
  ],
  Weekly: [
    { name: "W1", sales: 1000 },
    { name: "W2", sales: 1200 },
    { name: "W3", sales: 900 },
    { name: "W4", sales: 1500 },
  ],
  Daily: [
    { name: "Mon", sales: 200 },
    { name: "Tue", sales: 250 },
    { name: "Wed", sales: 300 },
    { name: "Thu", sales: 280 },
    { name: "Fri", sales: 400 },
    { name: "Sat", sales: 500 },
    { name: "Sun", sales: 450 },
  ],
};
const orderStatsData: OrderStatsData = {
  Monthly: [
    { name: "Complete", value: 75, color: "#3b82f6" },
    { name: "Pending", value: 15, color: "#f97316" },
    { name: "Cancelled", value: 5, color: "#ef4444" },
  ],
  Weekly: [
    { name: "Complete", value: 25, color: "#3b82f6" },
    { name: "Pending", value: 8, color: "#f97316" },
    { name: "Cancelled", value: 2, color: "#ef4444" },
  ],
  Daily: [
    { name: "Complete", value: 5, color: "#3b82f6" },
    { name: "Pending", value: 2, color: "#f97316" },
    { name: "Cancelled", value: 1, color: "#ef4444" },
  ],
};
const recentOrders: RecentOrder[] = [
  {
    orderId: "246522114",
    customer: "Danial Donald",
    date: "26 Jan, 2023",
    product: {
      name: "Nike Air Jordan Reflex",
      image: "/images/sample-shoe.png",
      color: "Black",
      size: "42",
      quantity: 2,
    },
    price: "€26.35",
    payment: "Credit Card",
    status: "Pending",
    deadline: "22 Mar, 24",
  },
  {
    orderId: "246522115",
    customer: "Emma Watson",
    date: "25 Jan, 2023",
    product: {
      name: "Classic Leather Watch",
      image: "/images/sample-watch.png",
      color: "Brown",
      size: "N/A",
      quantity: 1,
    },
    price: "€120.50",
    payment: "PayPal",
    status: "Delivered",
    deadline: null,
  },
];
const bestSellingProducts: BestSellingProduct[] = [
  {
    name: "Boat Electric Water Bottle",
    image: "/images/sample-bottle.png",
    qty: 1,
    color: "Black",
    totalSale: 220,
    totalEarning: "€1,420",
  },
  {
    name: "Nike Air Jordan Reflex",
    image: "/images/sample-shoe.png",
    qty: 1,
    color: "Black",
    totalSale: 220,
    totalEarning: "€1,420",
  },
  {
    name: "Sony Headphone",
    image: "/images/sample-headphone.png",
    qty: 1,
    color: "Black",
    totalSale: 220,
    totalEarning: "€1,420",
  },
];
const topSellingCategories: TopSellingCategory[] = [
  { name: "Electronics", value: 45, color: "#3b82f6" },
  { name: "Fashion", value: 25, color: "#8b5cf6" },
  { name: "Home Goods", value: 15, color: "#10b981" },
  { name: "Sports", value: 8, color: "#f97316" },
  { name: "Books", value: 7, color: "#ef4444" },
];

// --- 4. Helper & Reusable Components ---
const StatCard: React.FC<{ item: StatItem }> = React.memo(({ item }) => {
  const TrendIcon = item.trend === "up" ? TrendingUp : TrendingDown;
  return (
    <div className={styles.card}>
      <div className={styles.statHeader}>
        <p>{item.title}</p>
        <item.Icon className={styles.statIcon} />
      </div>
      <h3 className={styles.statValue}>{item.value}</h3>
      <p
        className={`${styles.statGrowth} ${
          item.trend === "up" ? styles.trendUp : styles.trendDown
        }`}
      >
        <TrendIcon size={16} strokeWidth={3} /> {item.trend === "up" ? "+" : ""}
        {item.growth}%
      </p>
    </div>
  );
});
StatCard.displayName = "StatCard";

const TimeframeDropdown: React.FC<{
  timeframe: Timeframe;
  setTimeframe: (tf: Timeframe) => void;
  options: Timeframe[];
}> = ({ timeframe, setTimeframe, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, () => setIsOpen(false));

  const handleSelect = (option: Timeframe) => {
    setTimeframe(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdownWrapper} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={styles.filterButton}
      >
        {timeframe}
        <ChevronDown
          size={16}
          className={`${styles.chevron} ${isOpen ? styles.open : ""}`}
        />
      </button>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {options.map((opt) => (
            <button key={opt} onClick={() => handleSelect(opt)}>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
TimeframeDropdown.displayName = "TimeframeDropdown";

const OrderRow: React.FC<{ order: RecentOrder }> = React.memo(({ order }) => {
  const getStatusClass = (status: RecentOrder["status"]) =>
    ({
      Pending: styles.statusPending,
      Delivered: styles.statusDelivered,
      Cancelled: styles.statusCancelled,
    }[status] || "");

  const handlePrintLabel = useCallback(
    () => alert(`Printing label for order: ${order.orderId}`),
    [order.orderId]
  );
  const handleCancelOrder = useCallback(() => {
    if (
      window.confirm(`Are you sure you want to cancel order ${order.orderId}?`)
    ) {
      alert(`Order ${order.orderId} has been cancelled.`);
    }
  }, [order.orderId]);

  return (
    <div className={styles.orderRow}>
      <div className={styles.orderRowHeader}>
        <span>
          Customer: <strong>{order.customer}</strong>
        </span>
        <span>
          Date of Order: <strong>{order.date}</strong>
        </span>
        <span>
          Order ID: <strong>{order.orderId}</strong>
        </span>
      </div>
      <div className={styles.orderRowBody}>
        <div className={styles.productDetail}>
          <Image
            src={order.product.image}
            alt={order.product.name}
            width={60}
            height={60}
            className={styles.productImage}
          />
          <div>
            <p className={styles.productName}>{order.product.name}</p>
            <p className={styles.productMeta}>
              Color: {order.product.color} | Size: {order.product.size} | Qty:{" "}
              {order.product.quantity}
            </p>
          </div>
        </div>
        <div className={styles.price}>{order.price}</div>
        <div className={styles.payment}>{order.payment}</div>
        <div className={styles.status}>
          <span
            className={`${styles.statusBadge} ${getStatusClass(order.status)}`}
          >
            {order.status}
          </span>
          {order.status === "Pending" && (
            <p className={styles.statusDeadline}>
              Please process before {order.deadline}
            </p>
          )}
        </div>
        <div className={styles.actions}>
          <button
            onClick={handlePrintLabel}
            className={`${styles.actionButton} ${styles.printButton}`}
          >
            <Printer size={16} />
            <span>Print Label</span>
          </button>
          <button
            onClick={handleCancelOrder}
            className={`${styles.actionButton} ${styles.cancelButton}`}
          >
            <XCircle size={16} />
            <span>Cancel Order</span>
          </button>
        </div>
      </div>
    </div>
  );
});
OrderRow.displayName = "OrderRow";

// --- 5. Main Component ---
export const DashboardOverview: React.FC = () => {
  const [salesTimeframe, setSalesTimeframe] = useState<Timeframe>("Monthly");
  const [orderTimeframe, setOrderTimeframe] = useState<Timeframe>("Monthly");
  const [productTimeframe, setProductTimeframe] = useState<Timeframe>("Weekly");
  const [categoryTimeframe, setCategoryTimeframe] =
    useState<Timeframe>("Monthly");

  const timeframeOptions = useMemo(
    () => ["Monthly", "Weekly", "Daily"] as Timeframe[],
    []
  );

  return (
    <div className={styles.dashboardGrid}>
      {statsData.map((item) => (
        <StatCard key={item.title} item={item} />
      ))}

      <div className={`${styles.card} ${styles.salesChartCard}`}>
        <div className={styles.cardHeader}>
          <h4 className={styles.cardTitle}>Sales Overview</h4>
          <TimeframeDropdown
            timeframe={salesTimeframe}
            setTimeframe={setSalesTimeframe}
            options={timeframeOptions}
          />
        </div>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={salesChartData[salesTimeframe]}
              margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-primary)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-primary)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
              <XAxis
                dataKey="name"
                tick={{ fill: "var(--color-text-muted)", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "var(--color-text-muted)", fontSize: 12 }}
                tickFormatter={(value) => `$${value / 1000}k`}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "var(--border-radius)",
                }}
              />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="var(--color-primary)"
                fillOpacity={1}
                fill="url(#colorSales)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={`${styles.card} ${styles.orderStatsCard}`}>
        <div className={styles.cardHeader}>
          <h4 className={styles.cardTitle}>Order Statistics</h4>
          <TimeframeDropdown
            timeframe={orderTimeframe}
            setTimeframe={setOrderTimeframe}
            options={timeframeOptions}
          />
        </div>
        <div className={styles.donutChartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={orderStatsData[orderTimeframe]}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
                stroke="none"
              >
                {orderStatsData[orderTimeframe].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className={styles.legendContainer}>
          {orderStatsData[orderTimeframe].map((entry) => (
            <div key={entry.name} className={styles.legendItem}>
              <span
                className={styles.legendColorBox}
                style={{ backgroundColor: entry.color }}
              ></span>
              {entry.name} ({entry.value})
            </div>
          ))}
        </div>
      </div>

      <div className={`${styles.card} ${styles.recentOrdersCard}`}>
        <div className={styles.cardHeader}>
          <h4 className={styles.cardTitle}>Recent Orders</h4>
          <button
            className={styles.filterButton}
            onClick={() => alert("Navigating to All Orders page...")}
          >
            View All
          </button>
        </div>
        <div className={styles.ordersContainer}>
          <div className={styles.ordersHeader}>
            <div className={styles.headerCellProduct}>Product</div>
            <div className={styles.headerCell}>Price</div>
            <div className={styles.headerCell}>Payment</div>
            <div className={styles.headerCell}>Status</div>
            <div className={styles.headerCellAction}>Action</div>
          </div>
          <div className={styles.orderList}>
            {recentOrders.map((order) => (
              <OrderRow key={order.orderId} order={order} />
            ))}
          </div>
        </div>
      </div>

      <div className={`${styles.card} ${styles.bestSellingCard}`}>
        <div className={styles.cardHeader}>
          <h4 className={styles.cardTitle}>Best Selling Product</h4>
          <TimeframeDropdown
            timeframe={productTimeframe}
            setTimeframe={setProductTimeframe}
            options={timeframeOptions}
          />
        </div>
        <div className={styles.tableWrapper}>
          <table className={styles.bestSellingTable}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Total Sale</th>
                <th>Total Earning</th>
              </tr>
            </thead>
            <tbody>
              {bestSellingProducts.map((product, index) => (
                <tr key={index}>
                  <td>
                    <div className={styles.productInfo}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={40}
                        height={40}
                        className={styles.productImageSmall}
                      />
                      <div>
                        <p className={styles.productName}>{product.name}</p>
                        <p className={styles.productMeta}>
                          Qty: {product.qty} | Color: {product.color}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={styles.saleInfo}>
                      <ShoppingCart size={16} /> {product.totalSale}
                    </div>
                  </td>
                  <td className={styles.earningInfo}>{product.totalEarning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* === Top Selling Category (NEW PIE CHART DESIGN) === */}
      <div className={`${styles.card} ${styles.topCategoryCard}`}>
        <div className={styles.cardHeader}>
          <h4 className={styles.cardTitle}>Top Selling Category</h4>
          <TimeframeDropdown
            timeframe={categoryTimeframe}
            setTimeframe={setCategoryTimeframe}
            options={timeframeOptions}
          />
        </div>
        <div className={styles.categoryChartContainer}>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={topSellingCategories}
                cx="50%"
                cy="50%"
                dataKey="value"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
              >
                {topSellingCategories.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke={entry.color}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className={styles.categoryLegend}>
            {topSellingCategories.map((entry) => (
              <div key={entry.name} className={styles.categoryLegendItem}>
                <span
                  className={styles.legendColorBox}
                  style={{ backgroundColor: entry.color }}
                ></span>
                <span className={styles.categoryName}>{entry.name}</span>
                <span className={styles.categoryPercentage}>
                  {entry.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
