import { SigninFormData } from "@/types/Auth.types";
import { toast } from "react-toastify";
import useReduxHook from "./useReduxHook";
import { supabase } from "@/lib/supabaseClient";

interface UseSignInHook {
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent, formData: SigninFormData) => Promise<void>;
  handleGoogleLogin: () => Promise<void>;
}

const useSignInHook = (): UseSignInHook => {
  const { login, loading } = useReduxHook();

  const validateForm = (formData: SigninFormData): boolean => {
    const { email, password } = formData;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address (e.g., name@gmail.com)");
      return false;
    }

    // Password validation
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent, formData: SigninFormData) => {
    e.preventDefault();

    if (!validateForm(formData)) {
      return;
    }

    // Use centralized login from useReduxHook
    await login(formData);
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/?auth_callback=true`,
          queryParams: {
            prompt: "select_account",
          },
        },
      });

      if (error) {
        toast.error(error.message);
      }
    } catch (error: any) {
      toast.error("An error occurred during Google login");
      console.error(error);
    }
  };

  return { isLoading: loading, handleSubmit, handleGoogleLogin };
};

export default useSignInHook;
