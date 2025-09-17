"use client";

import React, { useState } from "react";
import styles from "./AllReviews.module.css";
import { X } from "lucide-react";

// ডামি ডেটা টাইপ (প্রয়োজনে AllReviewsView থেকে ইম্পোর্ট করা যেতে পারে)
interface ReviewData {
  id: string;
  authorName: string;
  reviewText: string;
}

interface ReplyModalProps {
  review: ReviewData;
  onClose: () => void;
  onSubmit: (reviewId: string, replyText: string) => void;
}

export const ReplyModal: React.FC<ReplyModalProps> = ({
  review,
  onClose,
  onSubmit,
}) => {
  const [replyText, setReplyText] = useState("");

  const handleSubmit = () => {
    if (replyText.trim()) {
      onSubmit(review.id, replyText);
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>Reply to {review.authorName}</h3>
          <button onClick={onClose} className={styles.closeButton}>
            <X size={24} />
          </button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.originalReview}>
            <p>
              <strong>Original Review:</strong>
            </p>
            <blockquote>"{review.reviewText}"</blockquote>
          </div>
          <textarea
            className={styles.replyTextarea}
            rows={6}
            placeholder={`Type your reply here... Your reply will be publicly visible.`}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
        </div>
        <div className={styles.modalFooter}>
          <button onClick={onClose} className={styles.secondaryButton}>
            Cancel
          </button>
          <button onClick={handleSubmit} className={styles.primaryButton}>
            Submit Reply
          </button>
        </div>
      </div>
    </div>
  );
};
