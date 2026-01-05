import React from "react";

interface PriBtnProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export const PriBtn: React.FC<PriBtnProps> = ({
  children,
  onClick,
  className = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full md:w-auto px-10 py-5 rounded-2xl primary-btn text-[12px] md:text-sm tracking-[0.2em] font-black min-w-[240px] uppercase transition-all duration-500 hover:scale-105 hover:drop-shadow-[0_0_30px_rgba(234,179,8,0.4)] ${className}`}
    >
      {children}
    </button>
  );
};
