"use client";
import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import useReduxHook from "@/hooks/useReduxHook";
import { ReviewCreate } from "@/types/Review.types";

interface ReviewFormProps {
  onAddReview: (reviewData: ReviewCreate) => Promise<void>;
  isLoading: boolean;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onAddReview, isLoading }) => {
  const { user } = useReduxHook();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to post a review.");
      return;
    }
    if (!comment || rating === 0) {
      alert("Please provide both a rating and a comment.");
      return;
    }

    await onAddReview({
      user_id: user.id,
      rating,
      review: comment,
    });

    setComment("");
    setRating(0);
  };

  return (
    <div className="mt-12 p-6 bg-white border border-(--color-border-light) rounded-lg shadow-sm font-poppins">
      <h3 className="text-lg font-bold text-(--color-product-text) mb-4">
        Write a Review
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="author"
            className="block text-xs font-semibold text-(--color-text-gray) uppercase tracking-wider mb-1"
          >
            Your Name
          </label>
          <input
            id="author"
            type="text"
            value={user?.name || "Anonymous"}
            readOnly
            className="w-full px-4 py-2 border border-(--color-border-light) rounded bg-gray-50 cursor-not-allowed text-sm"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-(--color-text-gray) uppercase tracking-wider mb-1">
            Rating
          </label>
          <div className="flex gap-1">
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              return (
                <button
                  type="button"
                  key={ratingValue}
                  className="bg-transparent cursor-pointer outline-none transition-all hover:scale-110 p-1"
                  onClick={() => setRating(ratingValue)}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(0)}
                >
                  <FaStar
                    size={24}
                    className={
                      ratingValue <= (hover || rating)
                        ? "text-(--color-star-active)"
                        : "text-(--color-star-inactive)"
                    }
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label
            htmlFor="comment"
            className="block text-xs font-semibold text-(--color-text-gray) uppercase tracking-wider mb-1"
          >
            Your Review
          </label>
          <textarea
            id="comment"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-4 py-2 border border-(--color-border-light) rounded focus:outline-none focus:border-black transition-colors text-sm resize-none"
            placeholder="Share your thoughts about the product..."
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-[#1e1f28] text-white font-bold text-xs uppercase tracking-widest hover:bg-black transition-colors rounded"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
