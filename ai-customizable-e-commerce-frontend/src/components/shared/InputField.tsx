import React from "react";
import { InputFieldProps } from "@/types/Auth.types";

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  name,
  value,
  onChange,
  className = "",
}) => {
  return (
    <div className={`w-full ${className}`}>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 border border-auth-border focus:outline-none placeholder:text-auth-placeholder placeholder:font-inter font-inter text-auth-border bg-transparent"
      />
    </div>
  );
};

export default InputField;
