"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import useReduxHook from "@/hooks/useReduxHook";
import axios from "axios";

/**
 * Auth Initializer Component
 * Automatically calls loadUser on mount to restore session
 */
function AuthInitializer({ children }: { children: React.ReactNode }) {
  const { loadUser } = useReduxHook();

  useEffect(() => {
    // Auto-rehydrate user on app load
    loadUser();
  }, []);

  return <>{children}</>;
}

/**
 * Redux Provider Component
 * Wraps app with Redux store and auth initializer
 */
export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Configure axios globally for client-side requests to include cookies
  // This ensures cross-origin auth requests send/receive cookies when using axios
  if (typeof window !== "undefined") {
    axios.defaults.withCredentials = true;
    // You can also set a default base URL if desired
    // axios.defaults.baseURL = "http://localhost:8000";
  }
  return (
    <Provider store={store}>
      <AuthInitializer>{children}</AuthInitializer>
    </Provider>
  );
}
