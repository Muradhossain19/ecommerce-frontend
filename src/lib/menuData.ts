// src/lib/menuData.ts
export interface MenuItem {
  label: string;
  href: string;
  submenu?: MenuItem[];
}

export const menuData: MenuItem[] = [
  { label: "NEW IN", href: "/new-in" },
  { label: "BUNDLE BLAST", href: "/bundle-blast" },
  { label: "TROUSER", href: "/category/trouser" },
  { label: "JEANS", href: "/category/jeans" },
  { label: "SHIRT", href: "/category/shirt" },
  { label: "POLO SHIRT", href: "/category/polo-shirt" },
  { label: "PANJABI", href: "/category/panjabi" },
  { label: "T-SHIRT", href: "/category/t-shirt" },
  { label: "BOXER", href: "/category/boxer" },
  {
    label: "ACCESSORIES",
    href: "/category/accessories",
    submenu: [
      { label: "BAG", href: "/category/accessories/bag" },
      { label: "WALLET", href: "/category/accessories/wallet" },
      { label: "BELT", href: "/category/accessories/belt" },
      {
        label: "PASSPORT HOLDER",
        href: "/category/accessories/passport-holder",
      },
      { label: "WATER BOTTLE", href: "/category/accessories/water-bottle" },
      { label: "MASK", href: "/category/accessories/mask" },
    ],
  },
  {
    label: "OTHERS",
    href: "/category/others",
    submenu: [
      { label: "SWEATSHIRT", href: "/category/others/sweatshirt" },
      { label: "TWILL CHINO", href: "/category/others/twill-chino" },
    ],
  },
  { label: "SALE", href: "/sale" },
  { label: "OFFERS", href: "/offers" },
];
