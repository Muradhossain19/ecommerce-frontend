import Image from "next/image";
import Link from "next/link";
import { Eye, Heart, Shuffle, ShoppingCart } from "lucide-react";
import { Product } from "@/lib/productData";

type ProductCardType = Product;

interface ProductCardProps {
  product: ProductCardType;
  isMobile: boolean;
  renderStars: (rating: number) => React.ReactNode;
  getDiscountPercentage: (original: number, price: number) => number;
  formatPrice: (price: number) => string;
  type: "featured" | "new";
  styles: { [key: string]: string };
  hideReviewAndColors?: boolean; // <-- added
}

const ProductCard = ({
  product,
  isMobile,
  renderStars,
  getDiscountPercentage,
  formatPrice,
  type,
  styles,
  hideReviewAndColors = false, // <-- added
}: ProductCardProps) => {
  // Fallbacks for optional fields
  const {
    slug: productSlug,
    name: productName,
    imageUrl: productImage,

    category: productCategory,
    rating: productRating,
    reviewCount: productReviewCount,
    sizes: productSizes,
    colors: productColors,
    isNew: productIsNew,
    isFeatured: productIsFeatured,
    originalPrice: productOriginalPrice,
  } = product;

  return (
    <Link
      href={
        type === "featured"
          ? `/products/${productSlug}`
          : `/product/${productSlug}`
      }
      className={styles.productCard}
    >
      <div className={styles.imageContainer}>
        <Image
          src={productImage}
          alt={productName}
          fill
          className={styles.productImage}
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {/* Hover করলে দ্বিতীয় ছবি দেখান */}
        {product.images && product.images.length > 0 && (
          <Image
            src={product.images[0]}
            alt={productName + " alternate"}
            fill
            className={`${styles.productImage} ${styles.hoverImage}`}
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        )}

        {/* Labels */}
        <div className={styles.labelsContainer}>
          {productOriginalPrice && (
            <span className={`${styles.label} ${styles.discountLabel}`}>
              -{getDiscountPercentage(productOriginalPrice, product.price)}%
            </span>
          )}
          {(productIsNew || productIsFeatured) && (
            <span
              className={`${styles.label} ${
                productIsNew
                  ? styles.featureLabel
                  : productIsFeatured
                  ? styles.featureLabel
                  : ""
              }`}
            >
              {productIsNew ? "NEW" : productIsFeatured ? "FEATURED" : ""}
            </span>
          )}
        </div>

        {/* Hover Actions */}
        <div
          className={`${styles.hoverActions} ${
            productSizes ? styles.withSizes : ""
          }`}
        >
          {isMobile ? (
            <>
              <button className={styles.actionButton}>
                <ShoppingCart size={18} />
              </button>
              <button className={styles.actionButton}>
                <Eye size={18} />
              </button>
            </>
          ) : (
            <>
              <button className={styles.actionButton} data-title="Add to Cart">
                <ShoppingCart size={18} />
              </button>
              <button
                className={styles.actionButton}
                data-title="Add to Wishlist"
              >
                <Heart size={18} />
              </button>
              <button
                className={styles.actionButton}
                data-title="Add to Compare"
              >
                <Shuffle size={18} />
              </button>
              <button className={styles.actionButton} data-title="Quick View">
                <Eye size={18} />
              </button>
            </>
          )}
        </div>

        {/* Size Options */}
        {productSizes && (
          <div className={styles.sizeOptions}>
            {productSizes.slice(0, 4).map((size: string) => (
              <span key={size} className={styles.sizeOption}>
                {size}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className={styles.cardContent}>
        <p className={styles.productCategory}>{productCategory}</p>
        <h3 className={styles.productName}>{productName}</h3>

        {!hideReviewAndColors && (
          <div className={styles.ratingContainer}>
            <div className={styles.stars}>{renderStars(productRating)}</div>
            <span className={styles.reviewCount}>({productReviewCount})</span>
          </div>
        )}

        <div
          className={`${styles.priceContainer} ${
            !productColors || productColors.length === 0 ? styles.noColors : ""
          }`}
        >
          <span className={styles.currentPrice}>
            {formatPrice(product.price)}
          </span>
          {productOriginalPrice && (
            <span className={styles.originalPrice}>
              {formatPrice(productOriginalPrice)}
            </span>
          )}
        </div>
        {!hideReviewAndColors && productColors && productColors.length > 0 && (
          <div className={styles.colorOptions}>
            {productColors.slice(0, 4).map((color: string) => (
              <span
                key={color}
                className={styles.colorOption}
                style={{ backgroundColor: color.toLowerCase() }}
              />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
