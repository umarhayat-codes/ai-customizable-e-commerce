import { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { SignupFormData, SignupResponse, ApiError } from "@/types/Auth.types";
import { supabase } from "@/lib/supabaseClient";

const useSignupHook = () => {
  const [loading, setLoading] = useState(false);

  const validateForm = (formData: SignupFormData): boolean => {
    if (formData.firstName.length < 3) {
      toast.error("First Name must be at least 3 characters long");
      return false;
    }
    if (formData.lastName.length < 3) {
      toast.error("Last Name must be at least 3 characters long");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleSubmit = async (
    e: React.FormEvent,
    formData: SignupFormData,
  ): Promise<SignupResponse | null> => {
    e.preventDefault();

    if (!validateForm(formData)) {
      return null;
    }

    setLoading(true);

    try {
      const response = await axios.post<SignupResponse>(
        "http://localhost:8000/auth/register",
        formData,
        { withCredentials: true },
      );

      toast.success("Registration successful! Please log in.");
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>;
      const errorMessage =
        axiosError.response?.data?.detail ||
        axiosError.message ||
        "An error occurred during registration";
      toast.error(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSubmit,
    handleGoogleLogin: async () => {
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
        toast.error("An error occurred during Google signup");
        console.error(error);
      }
    },
    loading,
  };
};

export default useSignupHook;
