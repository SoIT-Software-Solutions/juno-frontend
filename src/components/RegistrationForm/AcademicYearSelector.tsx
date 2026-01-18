import React from "react";
import { FormInput } from "./FormInput";

type Props = {
  value: string;
  onChange: (v: string) => void;
  otherValue: string;
  onOtherChange: (v: string) => void;
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
}) => (
  <div className="space-y-6">
    <h3 className="text-sm font-black tracking-[0.2em] text-white uppercase">
      Academic Year
    </h3>

    <div className="flex flex-wrap gap-8">
      {YEARS.map((y) => (
        <label
          key={y.value}
          className="flex items-center space-x-3 cursor-pointer"
        >
          <input
            type="radio"
            className="hidden"
            checked={value === y.value}
            onChange={() => onChange(y.value)}
          />
          <div
            className={`w-5 h-5 rounded-full border-2 ${value === y.value ? "border-[var(--gold)]" : "border-white"}`}
          />
          <span
            className={`text-xs font-bold uppercase ${value === y.value ? "text-[var(--gold)]" : "text-white"}`}
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
          onChange={onOtherChange}
        />
      </div>
    )}
  </div>
);
