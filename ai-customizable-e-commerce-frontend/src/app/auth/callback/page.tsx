"use client";

import React from "react";
import useCallbackHook from "@/hooks/useCallbackHook";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const AuthCallbackPage = () => {
  // The hook handles all the logic on mount
  useCallbackHook();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="grow flex flex-col items-center justify-center py-20 px-4">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-auth-border border-t-transparent rounded-full animate-spin"></div>
          <h2 className="text-2xl font-poppins font-medium text-gray-700">
            Authenticating...
          </h2>
          <p className="text-auth-placeholder font-inter">
            Please wait while we sync your account.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AuthCallbackPage;
