export interface CallbackSession {
  user: {
    id: string;
    email?: string;
    user_metadata: {
      full_name?: string;
      name?: string;
      avatar_url?: string;
    };
  };
}

export interface SyncResponse {
  data: {
    id: number;
    name: string;
    email: string;
  } | null;
  message: string;
  status: "success" | "error";
}
