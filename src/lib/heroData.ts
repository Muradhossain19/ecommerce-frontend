// src/lib/heroData.ts

export interface SlideData {
  id: number;
  imageUrl: string;
  mobileImageUrl: string;
  alt: string;
  buttonLink: string;
}

export const heroSlides: SlideData[] = [
  {
    id: 1,
    imageUrl: "/images/hero-1.webp",
    mobileImageUrl: "/images/Hero-Banner-Mobile-1.webp",
    alt: "Hero Banner 1",
    buttonLink: "/shop/new-arrivals",
  },
  {
    id: 2,
    imageUrl: "/images/hero-2.webp",
    mobileImageUrl: "/images/Hero-Banner-Mobile-copy.webp",
    alt: "Hero Banner 2",
    buttonLink: "/shop/offers",
  },
];
