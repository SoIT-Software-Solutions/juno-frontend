import React, { useEffect, useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { RegistrationData } from "../../common/types/eventTypes";
import { FormInput } from "./FormInput";
import { AcademicYearSelector } from "./AcademicYearSelector";
import { EventSelector, EventItem } from "./EventSelector";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";

type Props = {
  title: string;
  events: EventItem[];
  defaultEventId?: number;
  alreadyRegisteredEventIds?: number[];
  submitting?: boolean;
  initialData: RegistrationData;
  onSubmit: (data: RegistrationData) => void;
  isFirstTimeForDay: boolean;
};

export const RegistrationForm: React.FC<Props> = ({
  title,
  events,
  defaultEventId,
  alreadyRegisteredEventIds = [],
  submitting = false,
  initialData,
  onSubmit,
  isFirstTimeForDay,
}) => {
  const [formData, setFormData] = useState<RegistrationData>(initialData);

  const preselectedEvents = useMemo(() => {
    return Array.from(
      new Set([
        ...(defaultEventId ? [defaultEventId] : []),
        ...alreadyRegisteredEventIds,
      ]),
    );
  }, [defaultEventId, alreadyRegisteredEventIds]);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, events: preselectedEvents }));
  }, [preselectedEvents]);

  const update = useCallback((key: keyof RegistrationData, value: any) => {
    setFormData((prev) =>
      prev[key] === value ? prev : { ...prev, [key]: value },
    );
  }, []);

  const validateForm = useCallback((): { valid: boolean; message?: string } => {
    if (!formData.name.trim())
      return { valid: false, message: "Name is required" };
    if (!formData.phone.trim())
      return { valid: false, message: "Contact number is required" };
    if (!/^\d{10}$/.test(formData.phone))
      return { valid: false, message: "Contact number must be 10 digits" };
    if (!formData.college.trim())
      return { valid: false, message: "College is required" };
    if (!formData.department.trim())
      return { valid: false, message: "Department is required" };
    if (!formData.academicYear.trim())
      return { valid: false, message: "Academic year is required" };
    if (formData.academicYear === "others" && !formData.otherYear.trim())
      return { valid: false, message: "Please specify your year" };
    if (formData.events.length === 0)
      return { valid: false, message: "Select at least one event" };
    return { valid: true };
  }, [formData]);

  const submit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const validation = validateForm();
      if (!validation.valid) {
        alert(validation.message);
        return;
      }
      const newEvents = formData.events.filter(
        (id) => !alreadyRegisteredEventIds.includes(id),
      );
      onSubmit({ ...formData, events: newEvents });
    },
    [formData, alreadyRegisteredEventIds, onSubmit, validateForm],
  );

  const eventOptions = useMemo(
    () =>
      events.map((e) => ({
        ...e,
        disabled: alreadyRegisteredEventIds.includes(e.id),
      })),
    [events, alreadyRegisteredEventIds],
  );

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      onSubmit={submit}
      className="max-w-4xl mx-auto space-y-16"
    >
      {/* Header Info */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-black gold-text uppercase tracking-widest leading-tight">
          {title}
        </h1>
        <div className="flex items-center justify-center gap-2">
          <div className="h-[1px] w-8 bg-orange-500/50" />
          <p className="text-[10px] tracking-[0.4em] text-white/40 font-bold uppercase">
            {isFirstTimeForDay
              ? "Complete your profile to proceed"
              : "Update your event selection"}
          </p>
          <div className="h-[1px] w-8 bg-orange-500/50" />
        </div>
      </div>

      <div className="card-glass backdrop-blur-3xl rounded-[40px] p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden group">
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 -mr-16 -mt-16 rounded-full blur-[40px]" />

        <div className="space-y-12 relative">
          {/* Section: Personal Info */}
          <div className="space-y-8">
            <h3 className="text-xs font-black tracking-[0.5em] text-orange-500 uppercase flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              Primary Information
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <FormInput
                label="Name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(v) => update("name", v)}
              />
              <FormInput
                label="Contact Number"
                placeholder="10-digit mobile number"
                value={formData.phone}
                onChange={(v) => update("phone", v)}
              />
              <FormInput
                label="College"
                placeholder="Your institution name"
                value={formData.college}
                onChange={(v) => update("college", v)}
              />
              <FormInput
                label="Department"
                placeholder="e.g. BCA, B.Sc. IT"
                value={formData.department}
                onChange={(v) => update("department", v)}
              />
              <FormInput
                label="Email"
                placeholder="Your verified email"
                value={formData.email}
                disabled
                onChange={() => {}}
              />
            </div>
          </div>

          <div className="h-[1px] w-full bg-white/5" />

          {/* Section: Academic Info */}
          <AcademicYearSelector
            value={formData.academicYear}
            onChange={(v) => update("academicYear", v)}
            otherValue={formData.otherYear}
            onOtherChange={(v) => update("otherYear", v)}
          />

          <div className="h-[1px] w-full bg-white/5" />

          {/* Section: Event Selection */}
          <div className="space-y-8">
            <h3 className="text-xs font-black tracking-[0.5em] text-orange-500 uppercase flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              Select Events
            </h3>
            <EventSelector
              events={eventOptions}
              selected={formData.events}
              onChange={(v) => update("events", v)}
            />
          </div>
        </div>

        <div className="flex justify-center pt-16">
          <motion.button
            type="submit"
            disabled={submitting}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 0 30px rgba(234, 179, 8, 0.4)",
            }}
            whileTap={{ scale: 0.98 }}
            className={`primary-btn min-w-[300px] py-6 rounded-2xl uppercase tracking-[0.3em] font-black flex items-center justify-center gap-4 text-sm
              ${submitting ? "opacity-70" : "opacity-100"} shadow-xl transition-all duration-300`}
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                Processing...
              </span>
            ) : (
              <>
                {isFirstTimeForDay ? (
                  <>
                    Proceed to payment <FiArrowRight className="text-xl" />
                  </>
                ) : (
                  <>
                    Update Registration <FiCheckCircle className="text-xl" />
                  </>
                )}
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.form>
  );
};
