export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  description: string;
  productCount: number;
  isNew?: boolean;
  isFeatured?: boolean;
}

export const categoryData: CategoryItem[] = [
  {
    id: "1",
    name: "TROUSER",
    slug: "trouser",
    imageUrl: "/images/categories/sample-product.webp",
    description: "Premium quality trousers for all occasions",
    productCount: 45,
    isFeatured: true,
  },
  {
    id: "2",
    name: "JEANS",
    slug: "jeans",
    imageUrl: "/images/categories/sample-product.webp",
    description: "Stylish and comfortable jeans collection",
    productCount: 32,
    isFeatured: true,
  },
  {
    id: "3",
    name: "PANJABI",
    slug: "panjabi",
    imageUrl: "/images/categories/sample-product.webp",
    description: "Traditional and modern panjabi designs",
    productCount: 28,
    isFeatured: true,
  },
  {
    id: "4",
    name: "T-SHIRT",
    slug: "t-shirt",
    imageUrl: "/images/categories/sample-product.webp",
    description: "Comfortable casual t-shirts",
    productCount: 56,
    isNew: true,
  },
  {
    id: "5",
    name: "POLO SHIRT",
    slug: "polo-shirt",
    imageUrl: "/images/categories/sample-product.webp",
    description: "Classic polo shirts for casual wear",
    productCount: 23,
  },
  {
    id: "6",
    name: "SHIRT",
    slug: "shirt",
    imageUrl: "/images/categories/sample-product.webp",
    description: "Formal and casual shirts collection",
    productCount: 41,
  },
  {
    id: "7",
    name: "ACCESSORIES",
    slug: "accessories",
    imageUrl: "/images/categories/sample-product.webp",
    description: "Essential accessories for your wardrobe",
    productCount: 78,
    isFeatured: true,
  },
  {
    id: "8",
    name: "BOXER",
    slug: "boxer",
    imageUrl: "/images/categories/sample-product.webp",
    description: "Comfortable underwear collection",
    productCount: 19,
  },
];
