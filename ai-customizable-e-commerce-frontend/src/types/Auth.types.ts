import { IconType } from "react-icons";

export interface InputFieldProps {
  label?: string;
  type: string;
  placeholder: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  icon?: IconType;
  isLoading?: boolean;
}

export interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SigninFormData {
  email: string;
  password: string;
}

export interface SignupResponse {
  message: string;
  user?: {
    email: string;
    firstName: string;
    lastName: string;
  };
}

export interface ApiError {
  detail: string;
}

export interface SigninResponse {
  data?: {
    id: number;
    name: string;
    email: string;
  };
  message: string;
  status: string;
}
