import React from "react";
import { FormInput } from "./FormInput";

type Props = {
  value: string;
  onChange: (v: string) => void;
  otherValue: string;
  onOtherChange: (v: string) => void;
  disabled?: boolean;
};

const YEARS = [
  { label: "1st Year (UG)", value: "UG-1" },
  { label: "2nd Year (UG)", value: "UG-2" },
  { label: "3rd Year (UG)", value: "UG-3" },
  { label: "4th Year (UG)", value: "UG-4" },
  { label: "1st Year (PG)", value: "PG-1" },
  { label: "2nd Year (PG)", value: "PG-2" },
  { label: "Others", value: "others" },
];

export const AcademicYearSelector: React.FC<Props> = ({
  value,
  onChange,
  otherValue,
  onOtherChange,
  disabled = false,
}) => (
  <div className="space-y-6">
    <h3 className="text-sm font-black tracking-[0.2em] text-white uppercase">
      Academic Year
    </h3>

    <div className="flex flex-wrap gap-8">
      {YEARS.map((y) => (
        <label
          key={y.value}
          className={`flex items-center gap-3
            ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        >
          <input
            type="radio"
            name="academicYear"
            value={y.value}
            checked={value === y.value}
            disabled={disabled}
            onChange={(e) => onChange(e.target.value)}
            className="
              w-5 h-5 rounded-full
              appearance-none border-2 border-white
              checked:border-[var(--gold)]
              checked:bg-[var(--gold)]
              transition-colors
            "
          />

          <span
            className={`text-xs font-bold uppercase transition-colors
              ${value === y.value ? "text-[var(--gold)]" : "text-white"}`}
          >
            {y.label}
          </span>
        </label>
      ))}
    </div>

    {value === "others" && (
      <div className="max-w-md pt-4">
        <FormInput
          label="Specify Other"
          placeholder="ENTER YOUR YEAR / DESIGNATION"
          value={otherValue}
          disabled={disabled}
          onChange={onOtherChange}
        />
      </div>
    )}

    {disabled && (
      <p className="text-xs text-white/40">
        To edit your personal data, go to Profile
      </p>
    )}
  </div>
);
