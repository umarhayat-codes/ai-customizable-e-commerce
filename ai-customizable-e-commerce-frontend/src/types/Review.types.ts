export interface Review {
  id: number;
  user_id: number;
  rating: number;
  review: string;
}

export interface ReviewCreate {
  user_id: number;
  rating: number;
  review: string;
}
