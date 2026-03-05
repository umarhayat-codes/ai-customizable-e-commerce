import React from "react";
import { ButtonProps } from "@/types/Auth.types";

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  className = "",
  variant = "primary",
  icon: Icon,
  isLoading = false,
}) => {
  const baseStyles =
    "w-full py-3 flex items-center justify-center gap-2 font-medium transition-all rounded-sm";

  const variants = {
    primary: "bg-auth-btn-bg text-white hover:opacity-90",
    secondary:
      "bg-white text-auth-border border border-auth-border hover:bg-gray-50",
    outline:
      "bg-transparent text-auth-border border border-auth-border hover:bg-gray-50",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {isLoading ? (
        <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-current"></span>
      ) : (
        <>
          {Icon && <Icon className="text-xl" />}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
