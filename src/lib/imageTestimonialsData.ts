// src/lib/imageTestimonialsData.ts

export interface ImageTestimonial {
  id: string;
  name: string;
  imageUrl: string; // গ্রাহকের ছবি
  link?: string; // ফেসবুক বা অন্য কোনো প্রোফাইলের লিঙ্ক (ঐচ্ছিক)
}

export const imageTestimonialsData: ImageTestimonial[] = [
  {
    id: "it1",
    name: "সাক্কাফ মোরশেদ",
    imageUrl: "/images/testimonials/Tuhin-Thashin.png",
  },
  {
    id: "it2",
    name: "ইমরান সরকার ইমু",
    imageUrl: "/images/testimonials/Tuhin-Thashin.png",
  },
  {
    id: "it3",
    name: "Md Imrul Miah",
    imageUrl: "/images/testimonials/Tuhin-Thashin.png",
  },
  {
    id: "it4",
    name: "L. K. Dey",
    imageUrl: "/images/testimonials/Tuhin-Thashin.png",
  },
  {
    id: "it5",
    name: "আহম্মেদ আল আকিদ",
    imageUrl: "/images/testimonials/Tuhin-Thashin.png",
  },
  {
    id: "it6",
    name: "আরেকজন গ্রাহক", // আরও কিছু ডামি ডেটা
    imageUrl: "/images/testimonials/Tuhin-Thashin.png",
  },
];
