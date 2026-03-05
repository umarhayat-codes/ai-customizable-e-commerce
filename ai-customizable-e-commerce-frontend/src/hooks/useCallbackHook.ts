"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  setUser,
  setLoading,
  setError,
  selectIsAuthenticated,
} from "@/redux/slice/AuthSlice";
import { useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { SyncResponse } from "@/types/Callback.type";

const API_BASE_URL = "http://localhost:8000/auth";

/**
 * useCallbackHook - Refactored as a Global Auth Observer Hook
 * This hook listens for Supabase auth state changes and syncs with the backend.
 */
const useCallbackHook = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const syncWithBackend = useCallback(
    async (user: any) => {
      try {
        dispatch(setLoading(true));

        // Sync with backend Neon DB
        const syncResponse = await axios.post<SyncResponse>(
          `${API_BASE_URL}/supabase-sync`,
          {
            email: user.email,
            name: user.user_metadata.full_name || user.user_metadata.name,
            supabase_id: user.id,
          },
          { withCredentials: true },
        );

        if (syncResponse.data.status === "success" && syncResponse.data.data) {
          // Update Redux state
          dispatch(setUser(syncResponse.data.data));

          // Set auth cookie for middleware (client-side readable)
          const expires = new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000,
          ).toUTCString();
          document.cookie = `auth_status=authenticated; path=/; expires=${expires}; SameSite=Lax`;

          toast.success("Sync successful!");

          // Clear URL fragment/hash after successful login
          if (typeof window !== "undefined") {
            window.history.replaceState(null, "", window.location.pathname);
          }

          // Redirect to home page
          router.push("/");
        } else {
          throw new Error(syncResponse.data.message || "Sync failed");
        }
      } catch (error: any) {
        console.error("Auth sync error:", error);
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Authentication sync failed";
        dispatch(setError(errorMessage));
        toast.error(errorMessage);
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, router],
  );
  useEffect(() => {
    // Listen for auth state changes (especially SIGNED_IN)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Supabase Auth Event:", event, "Session exists:", !!session);

      if (
        (event === "SIGNED_IN" || event === "INITIAL_SESSION") &&
        session?.user
      ) {
        // Only sync if not already authenticated AND we are returning from OAuth
        // We check for our custom query param OR the standard Supabase hash fragment
        const hasCallbackParam =
          window.location.search.includes("auth_callback=true");
        const hasHashFragment = window.location.hash.includes("access_token=");

        console.log(
          "Sync Check -> isAuthenticated:",
          isAuthenticated,
          "hasCallbackParam:",
          hasCallbackParam,
          "hasHashFragment:",
          hasHashFragment,
        );

        if (!isAuthenticated && (hasCallbackParam || hasHashFragment)) {
          console.log("🚀 Starting backend sync for user:", session.user.email);
          await syncWithBackend(session.user);
        } else if (!isAuthenticated) {
          console.log(
            "Auth event detected, but skipping sync: No callback marker/fragment found in URL",
          );
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [syncWithBackend, isAuthenticated]);

  return {};
};

export default useCallbackHook;
