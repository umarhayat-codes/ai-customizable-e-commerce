"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import InputField from "@/components/shared/InputField";
import Button from "@/components/shared/Button";
import { FcGoogle } from "react-icons/fc";
import { SigninFormData } from "@/types/Auth.types";

import useSignInHook from "@/hooks/useSignInHook";

const SigninPage: React.FC = () => {
  const { isLoading, handleSubmit, handleGoogleLogin } = useSignInHook();
  const [formData, setFormData] = useState<SigninFormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    handleSubmit(e, formData);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="grow flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-[500px] flex flex-col items-center">
          <h1 className="text-3xl sm:text-[40px] font-poppins font-medium text-auth-border mb-10 text-center">
            Login
          </h1>

          <form onSubmit={onSubmit} className="w-full space-y-4">
            <InputField
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <InputField
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />

            <div className="pt-4 space-y-4">
              <Button
                type="submit"
                variant="primary"
                className="text-base font-inter"
                isLoading={isLoading}
              >
                Login
              </Button>

              <Button
                type="button"
                variant="outline"
                icon={FcGoogle}
                onClick={handleGoogleLogin}
                className="text-base font-inter border-gray-300"
              >
                Login with Google
              </Button>
            </div>
          </form>

          <div className="mt-6 flex items-center gap-2">
            <span className="text-auth-placeholder font-poppins text-sm sm:text-base">
              Don't have account?
            </span>
            <Link
              href="/auth/signup"
              className="text-auth-border font-poppins font-medium text-sm sm:text-base underline underline-offset-4"
            >
              Create Account
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SigninPage;
