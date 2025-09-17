"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { PageHeader } from "../products/shared/PageHeader";
import { FilterBar } from "../products/shared/FilterBar";
import { Trash2, Check, AlertTriangle } from "lucide-react";
import styles from "./AllReviews.module.css";
import { ReplyModal } from "./ReplyModal"; // <-- নতুন ইম্পোর্ট

// রিভিউ ডেটার জন্য ইন্টারফেস
interface Review {
  id: string;
  productName: string;
  productImage: string;
  authorName: string;
  authorEmail: string;
  rating: number;
  reviewText: string;
  status: "Approved" | "Pending" | "Spam";
  date: string;
  reply?: string; // উত্তর রাখার জন্য নতুন ফিল্ড
}

const reviewsData: Review[] = [
  // (আপনার আগের ডামি ডেটা এখানে থাকবে)
  {
    id: "REV001",
    productName: "Nike Air Jordan Reflex",
    productImage: "/images/sample-shoe.png",
    authorName: "John Doe",
    authorEmail: "john.doe@example.com",
    rating: 5,
    reviewText:
      "Absolutely love these shoes! So comfortable and stylish. Highly recommend to everyone looking for great sneakers.",
    status: "Approved",
    date: "2025-09-12",
    reply: "Thanks for the amazing feedback, John!",
  },
  {
    id: "REV002",
    productName: "6W Study Table Light",
    productImage: "/images/sample-lamp.png",
    authorName: "Jane Smith",
    authorEmail: "jane.s@example.com",
    rating: 3,
    reviewText:
      "It's an okay product. The light is a bit too dim for my liking, but the build quality is decent for the price.",
    status: "Pending",
    date: "2025-09-11",
  },
  {
    id: "REV003",
    productName: "Boat Bluetooth Speaker",
    productImage: "/images/sample-speaker.png",
    authorName: "Mike Johnson",
    authorEmail: "mike.j@example.com",
    rating: 1,
    reviewText:
      "Terrible product. Stopped working after just one week. Customer support was not helpful at all. Avoid!",
    status: "Spam",
    date: "2025-09-10",
  },
];

// (StarRating এবং getStatusClass হেল্পার ফাংশন অপরিবর্তিত থাকবে)
const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className={styles.starRating}>
    {" "}
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={i < rating ? styles.starFilled : styles.starEmpty}
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="currentColor"
      >
        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
      </svg>
    ))}{" "}
  </div>
);
const getStatusClass = (status: "Approved" | "Pending" | "Spam") => {
  switch (status) {
    case "Approved":
      return styles.approved;
    case "Pending":
      return styles.pending;
    case "Spam":
      return styles.spam;
    default:
      return "";
  }
};

export const AllReviewsView: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(reviewsData);
  const [selectAll, setSelectAll] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  // --- নতুন State ---
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [reviewToReply, setReviewToReply] = useState<Review | null>(null);

  useEffect(() => {
    setSelectAll(selected.length === reviews.length && reviews.length > 0);
  }, [selected, reviews]);

  const handleSelectAll = () => {
    if (selectAll) setSelected([]);
    else setSelected(reviews.map((r) => r.id));
  };

  const handleSelectRow = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  // --- নতুন ফাংশন ---
  const openReplyModal = (review: Review) => {
    setReviewToReply(review);
    setIsReplyModalOpen(true);
  };

  const handleReplySubmit = (reviewId: string, replyText: string) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId ? { ...r, reply: replyText, status: "Approved" } : r
      )
    );
    // এখানে API তে ডেটা পাঠানোর লজিক থাকবে
    console.log(`Replying to ${reviewId}: ${replyText}`);
  };

  return (
    <div className={styles.allReviewsPage}>
      <PageHeader
        title="Product Reviews"
        subtitle="Approve, manage, and respond to customer reviews."
      />

      <div className={styles.contentCard}>
        <FilterBar />

        {selected.length > 0 && (
          <div className={styles.bulkActionsBar}>
            <span>{selected.length} review(s) selected</span>
            <div className={styles.bulkButtons}>
              <button className={styles.bulkApproveButton}>
                <Check size={14} /> Approve
              </button>
              <button className={styles.bulkSpamButton}>
                <AlertTriangle size={14} /> Mark as Spam
              </button>
              <button className={styles.bulkDeleteButton}>
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        )}

        <div className={styles.tableWrapper}>
          <table className={styles.reviewsTable}>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Author</th>
                <th>Review</th>
                <th>Product</th>
                <th>Submitted On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selected.includes(review.id)}
                      onChange={() => handleSelectRow(review.id)}
                    />
                  </td>
                  <td>
                    <div className={styles.authorCell}>
                      <p className={styles.authorName}>{review.authorName}</p>
                      <p className={styles.authorEmail}>{review.authorEmail}</p>
                      <span
                        className={`${styles.statusBadge} ${getStatusClass(
                          review.status
                        )}`}
                      >
                        {review.status}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className={styles.reviewCell}>
                      <StarRating rating={review.rating} />
                      <p className={styles.reviewText}>{review.reviewText}</p>
                      {/* --- উত্তর থাকলে দেখানো হবে --- */}
                      {review.reply && (
                        <div className={styles.adminReply}>
                          <p>
                            <strong>Your Reply:</strong> {review.reply}
                          </p>
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className={styles.productCell}>
                      <Image
                        src={review.productImage}
                        alt={review.productName}
                        width={40}
                        height={40}
                        className={styles.productImage}
                      />
                      <p>{review.productName}</p>
                    </div>
                  </td>
                  <td>{review.date}</td>
                  <td>
                    <div className={styles.actionButtons}>
                      <button
                        className={`${styles.actionButton} ${styles.approveAction}`}
                      >
                        Approve
                      </button>
                      <button
                        className={`${styles.actionButton} ${styles.replyAction}`}
                        onClick={() => openReplyModal(review)}
                      >
                        {review.reply ? "Edit Reply" : "Reply"}
                      </button>
                      <button
                        className={`${styles.actionButton} ${styles.spamAction}`}
                      >
                        Spam
                      </button>
                      <button
                        className={`${styles.actionButton} ${styles.deleteAction}`}
                      >
                        Trash
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- মডাল রেন্ডারিং --- */}
      {isReplyModalOpen && reviewToReply && (
        <ReplyModal
          review={reviewToReply}
          onClose={() => setIsReplyModalOpen(false)}
          onSubmit={handleReplySubmit}
        />
      )}
    </div>
  );
};
