import React from "react";

interface SecBtnProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export const SecBtn: React.FC<SecBtnProps> = ({
  children,
  onClick,
  className = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full md:w-auto gold-btn px-10 py-5 rounded-2xl text-[12px] md:text-sm tracking-[0.2em] border-white/20 hover:border-yellow-500 transition-all duration-500 min-w-[240px] ${className}`}
    >
      {children}
    </button>
  );
};
