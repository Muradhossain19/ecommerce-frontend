import HeroSection from "@/components/home/HeroSection";
import Features from "@/components/home/Features"; // <-- Add this
import ShopByCategory from "@/components/home/ShopByCategory";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import NewArrivals from "@/components/home/NewArrivals";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <Features /> {/* <-- Add this after Hero */}
      <ShopByCategory />
      <FeaturedProducts />
      <NewArrivals />
    </main>
  );
}
