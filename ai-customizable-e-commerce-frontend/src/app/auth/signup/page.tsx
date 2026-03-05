"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import InputField from "@/components/shared/InputField";
import Button from "@/components/shared/Button";
import { FcGoogle } from "react-icons/fc";
import { SignupFormData } from "@/types/Auth.types";

import useSignupHook from "@/hooks/useSignupHook";

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { handleSubmit, handleGoogleLogin, loading } = useSignupHook();

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

      <main className="grow flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-[500px] flex flex-col items-center">
          <h1 className="text-3xl sm:text-[40px] font-poppins font-medium text-auth-border mb-10 text-center">
            Create Account
          </h1>

          <form onSubmit={onSubmit} className="w-full space-y-4">
            <InputField
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
            <InputField
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
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
                disabled={loading}
                isLoading={loading}
              >
                Create Account
              </Button>

              <Button
                type="button"
                variant="outline"
                icon={FcGoogle}
                onClick={handleGoogleLogin}
                className="text-base font-inter border-gray-300"
              >
                Sign up with Google
              </Button>
            </div>
          </form>

          <div className="mt-8 flex items-center gap-2">
            <span className="text-auth-placeholder font-poppins text-sm sm:text-base">
              Already have account?
            </span>
            <Link
              href="/auth/login"
              className="text-auth-border font-poppins font-medium text-sm sm:text-base underline underline-offset-4"
            >
              Log in
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SignupPage;
