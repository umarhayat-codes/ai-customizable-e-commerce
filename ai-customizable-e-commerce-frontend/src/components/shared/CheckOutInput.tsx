import React from "react";

interface CheckOutInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const CheckOutInput: React.FC<CheckOutInputProps> = ({
  label,
  error,
  className,
  id,
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1 w-full ${className || ""}`}>
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-[var(--color-checkout-text)]"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full px-3 py-2 border rounded-md outline-none transition-colors
          bg-[var(--color-checkout-input-bg)] border-[var(--color-checkout-border)]
          focus:border-[var(--color-checkout-accent)] text-[var(--color-checkout-text)]
          placeholder:text-[var(--color-checkout-text-muted)]
          ${error ? "border-red-500" : ""}`}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default CheckOutInput;
