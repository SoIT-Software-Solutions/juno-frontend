import React, { useEffect, useState } from "react";
import { FormInput } from "./FormInput";

type Props = {
  value: string | null; // incoming value from DB or form state
  onChange: (v: string) => void;
  otherValue: string; // typed value if 'Others'
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
];

export const AcademicYearSelector: React.FC<Props> = ({
  value,
  onChange,
  otherValue,
  onOtherChange,
  disabled = false,
}) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [selectedOtherValue, setSelectedOtherValue] = useState<string>("");

  // Determine if incoming value is in known years
  useEffect(() => {
    if (value && YEARS.some((y) => y.value === value)) {
      setSelectedValue(value);
      setSelectedOtherValue("");
    } else if (value) {
      // Not a known year → others
      setSelectedValue("others");
      setSelectedOtherValue(value);
    } else {
      setSelectedValue(null);
      setSelectedOtherValue("");
    }
  }, [value]);

  const isOthers = selectedValue === "others";

  const handleRadioChange = (v: string) => {
    setSelectedValue(v);
    if (v !== "others") {
      onChange(v);
      onOtherChange(""); // clear otherValue
    } else {
      onChange("others");
      onOtherChange(selectedOtherValue); // keep current otherValue
    }
  };

  const handleOtherChange = (v: string) => {
    setSelectedOtherValue(v);
    onOtherChange(v);
    onChange("others"); // always keep value as "others" in state
  };

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-black tracking-[0.2em] text-white uppercase">
        Academic Year
      </h3>

      <div className="flex flex-wrap gap-8">
        {YEARS.concat({ label: "Others", value: "others" }).map((y) => {
          const labelText =
            y.value === "others" && isOthers && selectedOtherValue
              ? selectedOtherValue
              : y.label;

          return (
            <label
              key={y.value}
              className={`flex items-center gap-3 ${
                disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <input
                type="radio"
                name="academicYear"
                value={y.value}
                disabled={disabled}
                checked={selectedValue === y.value}
                onChange={() => handleRadioChange(y.value)}
                className="
                  w-5 h-5 rounded-full
                  appearance-none border-2 border-white
                  checked:border-[var(--gold)]
                  checked:bg-[var(--gold)]
                  transition-colors
                "
              />
              <span
                className={`text-xs font-bold uppercase transition-colors ${
                  selectedValue === y.value
                    ? "text-[var(--gold)]"
                    : "text-white"
                }`}
              >
                {labelText}
              </span>
            </label>
          );
        })}
      </div>

      {isOthers && (
        <div className="max-w-md pt-4">
          <FormInput
            label="Specify Other"
            placeholder="Enter your year / designation"
            value={selectedOtherValue}
            disabled={disabled}
            onChange={handleOtherChange}
          />
        </div>
      )}
    </div>
  );
};
