import React from "react";

type Props = {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
};

export const FormInput: React.FC<Props> = ({
  label,
  placeholder,
  value,
  onChange,
  disabled = false,
}) => (
  <div className="flex flex-col space-y-4">
    <label className="text-sm font-black tracking-[0.2em] text-white uppercase">
      {label}
    </label>

    <input
      type="text"
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      className={`rounded-xl px-6 py-5 text-xs tracking-[0.2em] font-bold outline-none transition-all
        ${
          disabled
            ? "bg-black/30 border border-white/10 text-white/40 cursor-not-allowed"
            : "bg-black/40 border border-white/20 text-white/60 placeholder-white/60 focus:border-[var(--gold)] focus:bg-black/60"
        }`}
    />
  </div>
);
