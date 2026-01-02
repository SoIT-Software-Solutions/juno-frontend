import React from "react";

interface TirBtnProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export const TriBtn: React.FC<TirBtnProps> = ({
  children,
  onClick,
  className = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-10 py-5 group relative inline-block text-white text-[12px] md:text-sm tracking-[0.4em] uppercase font-black transition-colors duration-300 hover:text-yellow-500 ${className}`}
    >
      {children}
      <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-yellow-500/50 scale-x-100 group-hover:bg-yellow-500 transition-all duration-300"></span>
    </button>
  );
};
