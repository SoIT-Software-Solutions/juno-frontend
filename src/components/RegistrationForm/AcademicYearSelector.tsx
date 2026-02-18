import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FormInput } from "./FormInput";

type Props = {
  value: string | null;
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

  useEffect(() => {
    if (value && YEARS.some((y) => y.value === value)) {
      setSelectedValue(value);
      setSelectedOtherValue("");
    } else if (value) {
      setSelectedValue("others");
      setSelectedOtherValue(value);
    } else {
      setSelectedValue(null);
      setSelectedOtherValue("");
    }
  }, [value]);

  const isOthers = selectedValue === "others";

  const handleChoice = (v: string) => {
    if (disabled) return;
    setSelectedValue(v);
    if (v !== "others") {
      onChange(v);
      onOtherChange("");
    } else {
      onChange("others");
      onOtherChange(selectedOtherValue);
    }
  };

  const handleOtherChange = (v: string) => {
    setSelectedOtherValue(v);
    onOtherChange(v);
    onChange("others");
  };

  return (
    <div className="space-y-8">
      <h3 className="text-xs font-black tracking-[0.5em] text-orange-500 uppercase flex items-center gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
        Academic Year
      </h3>

      <div className="flex flex-wrap gap-4">
        {YEARS.concat({ label: "Others", value: "others" }).map((y) => {
          const isSelected = selectedValue === y.value;
          return (
            <motion.button
              key={y.value}
              type="button"
              whileHover={!disabled ? { scale: 1.05 } : {}}
              whileTap={!disabled ? { scale: 0.95 } : {}}
              onClick={() => handleChoice(y.value)}
              className={`px-6 py-3 rounded-full text-[10px] font-black tracking-widest uppercase transition-all duration-300 border
                ${
                  isSelected
                    ? "bg-orange-500 border-orange-500 text-black shadow-[0_0_20px_rgba(249,115,22,0.3)]"
                    : "bg-white/5 border-white/10 text-white/40 hover:text-white hover:border-white/30"
                }
                ${disabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}
              `}
            >
              {y.label}
            </motion.button>
          );
        })}
      </div>

      {isOthers && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md"
        >
          <FormInput
            label="Specify Your Year"
            placeholder="e.g. Alumnus, PhD, etc."
            value={selectedOtherValue}
            disabled={disabled}
            onChange={handleOtherChange}
          />
        </motion.div>
      )}
    </div>
  );
};
