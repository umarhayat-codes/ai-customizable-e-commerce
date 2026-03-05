"use client";

import useCallbackHook from "@/hooks/useCallbackHook";

/**
 * AuthObserver component handles global authentication events (like Supabase SIGNED_IN).
 * It must be mounted in the layout to ensure it's always running.
 */
export default function AuthObserver() {
  useCallbackHook();
  return null;
}
