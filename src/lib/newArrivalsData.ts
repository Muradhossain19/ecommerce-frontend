export interface NewArrivalProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  category: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isNew: boolean;
  arrivalDate: string; // ISO date string
  description?: string;
  tags?: string[];
  sizes?: string[];
  colors?: string[]; // <-- add this line
}

// New Arrivals Data (Last 30 days)
export const newArrivalProducts: NewArrivalProduct[] = [
  {
    id: "na-001",
    name: "Premium Cotton Polo Shirt",
    slug: "premium-cotton-polo-shirt",
    price: 2800,
    originalPrice: 3200,
    category: "POLO SHIRT",
    imageUrl: "/images/categories/sample-product.webp",
    rating: 4.8,
    reviewCount: 24,
    inStock: true,
    isNew: true,
    arrivalDate: "2024-12-15T00:00:00Z",
    description: "High-quality cotton polo shirt with modern fit",
    tags: ["premium", "cotton", "casual"],
    sizes: ["S", "M", "L", "XL"], // <-- has sizes
  },
  {
    id: "na-002",
    name: "Slim Fit Chino Pants",
    slug: "slim-fit-chino-pants",
    price: 3500,
    category: "TROUSER",
    imageUrl: "/images/categories/sample-product.webp",
    rating: 4.6,
    reviewCount: 18,
    inStock: true,
    isNew: true,
    arrivalDate: "2024-12-12T00:00:00Z",
    description: "Comfortable slim fit chino pants for everyday wear",
    tags: ["slim-fit", "chino", "formal"],
    // no sizes
  },
  {
    id: "na-003",
    name: "Casual Button Down Shirt",
    slug: "casual-button-down-shirt",
    price: 2200,
    originalPrice: 2800,
    category: "SHIRT",
    imageUrl: "/images/categories/sample-product.webp",
    rating: 4.7,
    reviewCount: 31,
    inStock: true,
    isNew: true,
    arrivalDate: "2024-12-10T00:00:00Z",
    description: "Versatile button down shirt for casual occasions",
    tags: ["casual", "button-down", "versatile"],
    sizes: ["M", "L", "XL"], // <-- has sizes
  },
  {
    id: "na-004",
    name: "Classic Denim Jeans",
    slug: "classic-denim-jeans",
    price: 4200,
    originalPrice: 4800,
    category: "JEANS",
    imageUrl: "/images/categories/sample-product.webp",
    rating: 4.9,
    reviewCount: 67,
    inStock: true,
    isNew: true,
    arrivalDate: "2024-12-08T00:00:00Z",
    description: "Timeless classic denim jeans with perfect fit",
    tags: ["classic", "denim", "comfort"],
    sizes: ["S", "M", "L", "XL", "XXL"], // <-- has sizes
  },
  {
    id: "na-005",
    name: "Sports Athletic T-Shirt",
    slug: "sports-athletic-tshirt",
    price: 1800,
    category: "T-SHIRT",
    imageUrl: "/images/categories/sample-product.webp",
    rating: 4.5,
    reviewCount: 42,
    inStock: true,
    isNew: true,
    arrivalDate: "2024-12-05T00:00:00Z",
    description: "Moisture-wicking athletic t-shirt for active lifestyle",
    tags: ["sports", "athletic", "moisture-wicking"],
    sizes: ["S", "M", "L"], // <-- has sizes
  },
  {
    id: "na-006",
    name: "Formal Dress Pants",
    slug: "formal-dress-pants",
    price: 3800,
    category: "TROUSER",
    imageUrl: "/images/categories/sample-product.webp",
    rating: 4.6,
    reviewCount: 29,
    inStock: true,
    isNew: true,
    arrivalDate: "2024-12-03T00:00:00Z",
    description: "Elegant formal dress pants for business occasions",
    tags: ["formal", "business", "elegant"],
    // no sizes
  },
  {
    id: "na-007",
    name: "Vintage Graphic Tee",
    slug: "vintage-graphic-tee",
    price: 1500,
    originalPrice: 2000,
    category: "T-SHIRT",
    imageUrl: "/images/categories/sample-product.webp",
    rating: 4.4,
    reviewCount: 38,
    inStock: true,
    isNew: true,
    arrivalDate: "2024-12-01T00:00:00Z",
    description: "Retro-inspired graphic tee with vintage appeal",
    tags: ["vintage", "graphic", "retro"],
    sizes: ["M", "L", "XL"], // <-- has sizes
  },
  {
    id: "na-008",
    name: "Luxury Silk Shirt",
    slug: "luxury-silk-shirt",
    price: 5500,
    originalPrice: 6500,
    category: "SHIRT",
    imageUrl: "/images/categories/sample-product.webp",
    rating: 4.9,
    reviewCount: 15,
    inStock: true,
    isNew: true,
    arrivalDate: "2024-11-28T00:00:00Z",
    description: "Premium silk shirt with luxurious feel and finish",
    tags: ["luxury", "silk", "premium"],
    // no sizes
  },
];

// Utility functions
export const formatPrice = (price: number): string => {
  return `৳${price.toLocaleString()}`;
};

export const getDiscountPercentage = (
  originalPrice: number,
  currentPrice: number
): number => {
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

export const getDaysAgo = (arrivalDate: string): number => {
  const arrival = new Date(arrivalDate);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - arrival.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const getNewArrivalsInDateRange = (
  days: number = 30
): NewArrivalProduct[] => {
  return newArrivalProducts.filter(
    (product) => getDaysAgo(product.arrivalDate) <= days
  );
};

export const sortNewArrivalsByDate = (
  products: NewArrivalProduct[]
): NewArrivalProduct[] => {
  return [...products].sort(
    (a, b) =>
      new Date(b.arrivalDate).getTime() - new Date(a.arrivalDate).getTime()
  );
};
