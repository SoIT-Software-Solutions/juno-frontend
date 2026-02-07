import React from "react";

interface TriBtnProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export const TriBtn: React.FC<TriBtnProps> = ({
  children,
  onClick,
  className = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-t-[20px] backdrop-blur-[29px] px-10 py-5 block text-center text-white text-[12px] md:text-sm tracking-[0.4em] uppercase font-black transition-colors duration-300 hover:text-yellow-500 ${className}`}
    >
      {children}
      <span className="absolute -bottom-0 left-0 w-full h-0.5 bg-yellow-500/50 scale-x-100 group-hover:bg-yellow-500 transition-all duration-300"></span>
    </button>
  );
};
