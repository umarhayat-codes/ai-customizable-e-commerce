import React from "react";

interface CheckOutCardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

const CheckOutCard: React.FC<CheckOutCardProps> = ({
  children,
  title,
  className,
}) => {
  return (
    <div
      className={`p-4 border rounded-lg bg-[var(--color-checkout-input-bg)] border-[var(--color-checkout-border)] ${className || ""}`}
    >
      {title && (
        <h3 className="mb-4 text-lg font-semibold text-[var(--color-checkout-text)]">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};

export default CheckOutCard;
