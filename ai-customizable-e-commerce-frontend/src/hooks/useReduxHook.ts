import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import axios from "axios";
import { toast } from "react-toastify";
import {
  setLoading,
  setUser,
  setError,
  clearAuth,
  selectUser,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
} from "@/redux/slice/AuthSlice";
import {
  AuthMeResponse,
  LoginResponse,
  LogoutResponse,
} from "@/types/Redux.types";
import { SigninFormData } from "@/types/Auth.types";
import { AppDispatch } from "@/redux/store";

const API_BASE_URL = "http://localhost:8000/auth";

// Configure axios to send cookies with requests
axios.defaults.withCredentials = true;

// Helper function to set auth cookie for middleware (client-side readable)
const setAuthCookie = (value: boolean) => {
  if (typeof document !== "undefined") {
    if (value) {
      // Set cookie that expires in 7 days
      const expires = new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000,
      ).toUTCString();
      document.cookie = `auth_status=authenticated; path=/; expires=${expires}; SameSite=Lax`;
    } else {
      // Delete the cookie
      document.cookie =
        "auth_status=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }
};

// Debug interceptor
axios.interceptors.request.use((config) => {
  console.log(
    "🔍 DEBUG Axios Request:",
    config.url,
    "withCredentials:",
    config.withCredentials,
  );
  return config;
});

interface UseReduxHook {
  // Auth state selectors
  user: ReturnType<typeof selectUser>;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;

  // Auth actions
  login: (formData: SigninFormData) => Promise<void>;
  logout: () => Promise<void>;
  loadUser: () => Promise<void>;
}

/**
 * Centralized Auth Hook - The brain of authentication
 * All auth logic lives here. Components never call APIs directly.
 */
const useReduxHook = (): UseReduxHook => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // Selectors
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  /**
   * Login Handler
   * 1. Call login API (sets cookie)
   * 2. Call /auth/me to get user data
   * 3. Update Redux state
   * 4. Redirect to home
   */
  const login = async (formData: SigninFormData): Promise<void> => {
    try {
      dispatch(setLoading(true));

      // Step 1: Login - backend sets HTTP-only cookie
      const loginResponse = await axios.post<LoginResponse>(
        `${API_BASE_URL}/login`,
        formData,
      );

      if (loginResponse.data.status === "success") {
        // Step 2: Get user data from /auth/me (using cookie)
        const meResponse = await axios.get<AuthMeResponse>(
          `${API_BASE_URL}/me`,
        );

        if (meResponse.data.status === "success" && meResponse.data.data) {
          // Step 3: Update Redux state
          dispatch(setUser(meResponse.data.data));

          // Set auth cookie for middleware route protection
          setAuthCookie(true);

          toast.success(loginResponse.data.message);

          // Step 4: Redirect to home
          router.push("/");
        } else {
          dispatch(setError("Failed to load user data"));
          toast.error("Failed to load user data");
        }
      } else {
        dispatch(setError(loginResponse.data.message));
        toast.error(loginResponse.data.message);
      }
    } catch (error: unknown) {
      console.error("Login error:", error);
      let message = "An error occurred during login. Please try again.";

      if (axios.isAxiosError(error)) {
        message =
          error.response?.data?.message ||
          error.response?.data?.detail ||
          message;
      }

      dispatch(setError(message));
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  /**
   * Logout Handler
   * 1. Call logout API (clears cookie)
   * 2. Clear Redux state
   * 3. Redirect to signin
   */
  const logout = async (): Promise<void> => {
    try {
      dispatch(setLoading(true));

      // Step 1: Call logout API to clear cookie
      await axios.post<LogoutResponse>(`${API_BASE_URL}/logout`);

      // Step 2: Clear Redux state
      dispatch(clearAuth());

      // Clear auth cookie for middleware
      setAuthCookie(false);

      toast.success("Logged out successfully");

      // Step 3: Call Supabase signOut to clear local storage session
      const { error: supabaseError } = await supabase.auth.signOut();
      if (supabaseError)
        console.error("Supabase signOut error:", supabaseError);

      // Step 4: Redirect to signin
      router.push("/auth/signin");
    } catch (error: unknown) {
      console.error("Logout error:", error);

      // Even if API fails, clear local state
      dispatch(clearAuth());
      setAuthCookie(false);
      router.push("/auth/signin");

      toast.error("Logout completed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  /**
   * Load User Handler (for auto-rehydration on refresh)
   * 1. Call /auth/me (uses cookie)
   * 2. Update Redux state on success
   * 3. Clear state on failure
   */
  const loadUser = async (): Promise<void> => {
    try {
      dispatch(setLoading(true));

      // Call /auth/me - backend reads cookie
      const response = await axios.get<AuthMeResponse>(`${API_BASE_URL}/me`);

      if (response.data.status === "success" && response.data.data) {
        // Update Redux state with user data
        dispatch(setUser(response.data.data));
        // Ensure auth cookie is set for middleware
        setAuthCookie(true);
      } else {
        // Clear auth state if failed
        dispatch(clearAuth());
        setAuthCookie(false);
      }
    } catch (error: unknown) {
      // 401 is expected when not logged in - no need to log it
      if (axios.isAxiosError(error) && error.response?.status !== 401) {
        console.error("Load user error:", error);
      }

      // If unauthorized or any error, clear auth state
      dispatch(clearAuth());
      setAuthCookie(false);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    // Selectors
    user,
    isAuthenticated,
    loading,
    error,

    // Actions
    login,
    logout,
    loadUser,
  };
};

export default useReduxHook;
