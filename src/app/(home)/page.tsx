// src/app/page.tsx

import HeroSection from "@/components/home/HeroSection";
import Features from "@/components/home/Features";
import ShopByCategory from "@/components/home/ShopByCategory";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import DealsSection from "@/components/home/DealsSection";
import NewArrivals from "@/components/home/NewArrivals";
import ImageTestimonials from "@/components/home/ImageTestimonials";
import CategoryShowcase from "@/components/home/CategoryShowcase";

import Newsletter from "@/components/layout/Newsletter/Newsletter";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <Features />
      <ShopByCategory />
      <FeaturedProducts />
      <NewArrivals />
      <DealsSection />
      <CategoryShowcase categorySlug="bundle-blast" />
      <CategoryShowcase categorySlug="trouser" reverseLayout={true} />
      <CategoryShowcase categorySlug="jeans" />
      <CategoryShowcase categorySlug="shirt" reverseLayout={true} />
      <CategoryShowcase categorySlug="polo-shirt" />
      <CategoryShowcase categorySlug="panjabi" reverseLayout={true} />
      <CategoryShowcase categorySlug="t-shirt" />
      <CategoryShowcase categorySlug="boxer" reverseLayout={true} />
      <ImageTestimonials />
      <Newsletter />
    </main>
  );
}
