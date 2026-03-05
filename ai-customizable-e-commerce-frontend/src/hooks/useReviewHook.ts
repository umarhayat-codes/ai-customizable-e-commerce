import { useState, useEffect } from "react";
import axios from "axios";
import { Review, ReviewCreate } from "@/types/Review.types";
import { toast } from "react-toastify";

const API_BASE_URL = "http://localhost:8000/reviews";

interface ApiResponse<T> {
  data: T;
  message: string;
  status: string;
}

export const useReviewHook = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await axios.get<ApiResponse<Review[]>>(
        `${API_BASE_URL}/`,
      );
      if (response.data.status === "success") {
        setReviews(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  const addReview = async (reviewData: ReviewCreate) => {
    try {
      setLoading(true);
      const response = await axios.post<ApiResponse<Review>>(
        `${API_BASE_URL}/`,
        reviewData,
      );
      if (response.data.status === "success") {
        toast.success(response.data.message);
        await fetchReviews(); // Refetch reviews after successful submission
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      console.error("Error adding review:", error);
      toast.error(error.response?.data?.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return {
    reviews,
    loading,
    addReview,
    fetchReviews,
  };
};
