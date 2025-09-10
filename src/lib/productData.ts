export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  images?: string[];
  category: string;
  categorySlug: string;
  description: string;
  shortDescription: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  isNew?: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isOnSale?: boolean;
  tags?: string[];
  colors?: string[];
  sizes?: string[];
  brand?: string;
  material?: string;
  createdAt: string;
}

export const featuredProducts: Product[] = [
  {
    id: "1",
    name: "Premium Cotton Trouser",
    slug: "premium-cotton-trouser",
    price: 2800,
    originalPrice: 3200,
    imageUrl: "/images/categories/sample-product.webp",
    images: [
      "/images/categories/sample-product.webp",
      "/images/categories/sample-product-2.webp",
    ],
    category: "Trouser",
    categorySlug: "trouser",
    description:
      "High-quality premium cotton trouser perfect for both formal and casual occasions. Made with finest fabric for maximum comfort and durability.",
    shortDescription: "Premium cotton trouser for everyday comfort",
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    stockCount: 45,
    isFeatured: true,
    isBestSeller: true,
    isOnSale: true,
    tags: ["comfort", "premium", "cotton"],
    colors: ["Black", "Navy", "Gray"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    brand: "DeenCommerce",
    material: "100% Cotton",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Classic Denim Jeans",
    slug: "classic-denim-jeans",
    price: 3500,
    originalPrice: 4000,
    imageUrl: "/images/categories/sample-product.webp",
    images: [
      "/images/categories/sample-product.webp",
      "/images/categories/sample-product-2.webp",
    ],
    category: "Jeans",
    categorySlug: "jeans",
    description:
      "Classic fit denim jeans made from premium denim fabric. Features comfortable stretch and modern styling for the contemporary man.",
    shortDescription: "Classic fit denim jeans with modern styling",
    rating: 4.6,
    reviewCount: 89,
    inStock: true,
    stockCount: 32,
    isFeatured: true,
    isOnSale: true,
    tags: ["denim", "classic", "comfortable"],
    colors: ["Blue", "Black", "Dark Blue"],
    sizes: ["28", "30", "32", "34", "36", "38"],
    brand: "DeenCommerce",
    material: "98% Cotton, 2% Elastane",
    createdAt: "2024-01-20",
  },
  {
    id: "3",
    name: "Traditional Panjabi",
    slug: "traditional-panjabi",
    price: 2200,
    imageUrl: "/images/categories/sample-product.webp",
    images: [
      "/images/categories/sample-product.webp",
      "/images/categories/sample-product-2.webp",
    ],
    category: "Panjabi",
    categorySlug: "panjabi",
    description:
      "Elegant traditional panjabi crafted from soft cotton fabric. Perfect for religious occasions, festivals, and formal events.",
    shortDescription: "Elegant traditional panjabi for special occasions",
    rating: 4.9,
    reviewCount: 156,
    inStock: true,
    stockCount: 28,
    isFeatured: true,
    isBestSeller: true,
    isNew: true,
    tags: ["traditional", "cotton", "elegant"],
    colors: ["White", "Cream", "Light Blue"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    brand: "DeenCommerce",
    material: "100% Cotton",
    createdAt: "2024-02-01",
  },
  {
    id: "4",
    name: "Premium Polo Shirt",
    slug: "premium-polo-shirt",
    price: 1800,
    originalPrice: 2200,
    imageUrl: "/images/categories/sample-product.webp",
    images: [
      "/images/categories/sample-product.webp",
      "/images/categories/sample-product-2.webp",
    ],
    category: "Polo Shirt",
    categorySlug: "polo-shirt",
    description:
      "Premium quality polo shirt made from breathable cotton blend. Features classic collar design and comfortable fit.",
    shortDescription: "Premium cotton blend polo shirt",
    rating: 4.5,
    reviewCount: 73,
    inStock: true,
    stockCount: 56,
    isFeatured: true,
    isOnSale: true,
    tags: ["polo", "casual", "breathable"],
    colors: ["Navy", "White", "Maroon", "Gray"],
    sizes: ["S", "M", "L", "XL"],
    brand: "DeenCommerce",
    material: "60% Cotton, 40% Polyester",
    createdAt: "2024-01-25",
  },
  {
    id: "5",
    name: "Casual Cotton T-Shirt",
    slug: "casual-cotton-t-shirt",
    price: 1200,
    imageUrl: "/images/categories/sample-product.webp",
    images: [
      "/images/categories/sample-product.webp",
      "/images/categories/sample-product-2.webp",
    ],
    category: "T-Shirt",
    categorySlug: "t-shirt",
    description:
      "Comfortable casual t-shirt made from soft cotton fabric. Perfect for everyday wear with excellent breathability.",
    shortDescription: "Comfortable casual cotton t-shirt",
    rating: 4.4,
    reviewCount: 102,
    inStock: true,
    stockCount: 78,
    isFeatured: true,
    isNew: true,
    tags: ["casual", "comfortable", "cotton"],
    colors: ["Black", "White", "Navy", "Gray", "Red"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    brand: "DeenCommerce",
    material: "100% Cotton",
    createdAt: "2024-02-05",
  },
  {
    id: "6",
    name: "Formal Dress Shirt",
    slug: "formal-dress-shirt",
    price: 2500,
    originalPrice: 3000,
    imageUrl: "/images/categories/sample-product.webp",
    images: [
      "/images/categories/sample-product.webp",
      "/images/categories/sample-product-2.webp",
    ],
    category: "Shirt",
    categorySlug: "shirt",
    description:
      "Professional formal dress shirt with slim fit design. Made from premium cotton blend for office and formal occasions.",
    shortDescription: "Professional slim fit formal shirt",
    rating: 4.7,
    reviewCount: 67,
    inStock: true,
    stockCount: 34,
    isFeatured: true,
    isOnSale: true,
    tags: ["formal", "slim-fit", "professional"],
    colors: ["White", "Light Blue", "Pink"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    brand: "DeenCommerce",
    material: "70% Cotton, 30% Polyester",
    createdAt: "2024-01-30",
  },
  {
    id: "7",
    name: "Premium Leather Wallet",
    slug: "premium-leather-wallet",
    price: 1500,
    originalPrice: 1800,
    imageUrl: "/images/categories/sample-product.webp",
    images: [
      "/images/categories/sample-product.webp",
      "/images/categories/sample-product-2.webp",
    ],
    category: "Accessories",
    categorySlug: "accessories",
    description:
      "Handcrafted premium leather wallet with multiple card slots and bill compartments. Elegant design for the modern gentleman.",
    shortDescription: "Handcrafted premium leather wallet",
    rating: 4.8,
    reviewCount: 91,
    inStock: true,
    stockCount: 23,
    isFeatured: true,
    isBestSeller: true,
    isOnSale: true,
    tags: ["leather", "premium", "handcrafted"],
    colors: ["Brown", "Black"],
    brand: "DeenCommerce",
    material: "Genuine Leather",
    createdAt: "2024-01-18",
  },
  {
    id: "8",
    name: "Cotton Boxer Shorts",
    slug: "cotton-boxer-shorts",
    price: 800,
    originalPrice: 1000,
    imageUrl: "/images/categories/sample-product.webp",
    images: [
      "/images/categories/sample-product.webp",
      "/images/categories/sample-product-2.webp",
    ],
    category: "Boxer",
    categorySlug: "boxer",
    description:
      "Comfortable cotton boxer shorts with breathable fabric and elastic waistband. Perfect for everyday comfort and support.",
    shortDescription: "Comfortable cotton boxer shorts",
    rating: 4.3,
    reviewCount: 145,
    inStock: true,
    stockCount: 67,
    isFeatured: true,
    isOnSale: true,
    tags: ["comfortable", "cotton", "breathable"],
    colors: ["Navy", "Black", "Gray", "White"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    brand: "DeenCommerce",
    material: "95% Cotton, 5% Elastane",
    createdAt: "2024-02-03",
  },
];

// Helper functions
export const getProductsByCategory = (categorySlug: string): Product[] => {
  return featuredProducts.filter(
    (product) => product.categorySlug === categorySlug
  );
};

export const getFeaturedProducts = (limit?: number): Product[] => {
  const featured = featuredProducts.filter((product) => product.isFeatured);
  return limit ? featured.slice(0, limit) : featured;
};

export const getBestSellerProducts = (limit?: number): Product[] => {
  const bestSellers = featuredProducts.filter(
    (product) => product.isBestSeller
  );
  return limit ? bestSellers.slice(0, limit) : bestSellers;
};

export const getNewProducts = (limit?: number): Product[] => {
  const newProducts = featuredProducts.filter((product) => product.isNew);
  return limit ? newProducts.slice(0, limit) : newProducts;
};

export const getSaleProducts = (limit?: number): Product[] => {
  const saleProducts = featuredProducts.filter((product) => product.isOnSale);
  return limit ? saleProducts.slice(0, limit) : saleProducts;
};

export const getProductById = (id: string): Product | undefined => {
  return featuredProducts.find((product) => product.id === id);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return featuredProducts.find((product) => product.slug === slug);
};

// Calculate discount percentage
export const getDiscountPercentage = (
  originalPrice: number,
  currentPrice: number
): number => {
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

// Format price for display
export const formatPrice = (price: number): string => {
  return `৳${price.toLocaleString()}`;
};
