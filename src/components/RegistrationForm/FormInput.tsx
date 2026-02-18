import React from "react";
import { motion } from "framer-motion";

type Props = {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
};

const canDisabled = (label: string) => {
  return label === "Email";
};

export const FormInput: React.FC<Props> = ({
  label,
  placeholder,
  value,
  onChange,
}) => (
  <div className="flex flex-col space-y-3 group">
    <label className="text-[10px] md:text-xs font-black tracking-[0.4em] text-white/40 group-focus-within:text-orange-500 uppercase transition-colors duration-300">
      {label}
    </label>

    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        disabled={canDisabled(label)}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-2xl px-6 py-5 text-sm tracking-[0.1em] font-medium outline-none transition-all duration-500
          ${
            canDisabled(label)
              ? "bg-white/5 border border-white/5 text-white/20 cursor-not-allowed"
              : "bg-white/5 border border-white/10 text-white placeholder-white/20 focus:border-orange-500 focus:bg-orange-500/5 focus:shadow-[0_0_20px_rgba(249,115,22,0.1)]"
          }`}
      />
      {!canDisabled(label) && (
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]"
          initial={{ width: 0 }}
          whileFocus={{ width: "100%" }}
          transition={{ duration: 0.3 }}
        />
      )}
    </div>
  </div>
);
