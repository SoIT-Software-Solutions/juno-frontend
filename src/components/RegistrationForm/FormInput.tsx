import React from "react";

type Props = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
};

export const FormInput: React.FC<Props> = ({
  label,
  placeholder,
  value,
  onChange,
}) => (
  <div className="flex flex-col space-y-4">
    <label className="text-sm font-black tracking-[0.2em] text-white uppercase">
      {label}
    </label>
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-black/40 border border-white/20 rounded-xl px-6 py-5 text-xs tracking-[0.2em] font-bold text-white/60 placeholder-white/60 outline-none focus:border-[var(--gold)] focus:bg-black/60 transition-all"
    />
  </div>
);
