import React, { useEffect, useState, useCallback, useMemo } from "react";
import { RegistrationData } from "../../common/types/eventTypes";
import { FormInput } from "./FormInput";
import { AcademicYearSelector } from "./AcademicYearSelector";
import { EventSelector, EventItem } from "./EventSelector";

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
  const [buttonTextStatus] = useState(
    isFirstTimeForDay ? "Proceed to payment" : "Update submission",
  );

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
    <form onSubmit={submit} className="space-y-12">
      <h1 className="text-4xl text-center gold-text uppercase tracking-widest">
        {title}
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        <FormInput
          label="Name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={(v) => update("name", v)}
        />
        <FormInput
          label="Contact Number"
          placeholder="Enter your number"
          value={formData.phone}
          onChange={(v) => update("phone", v)}
        />
        <FormInput
          label="College"
          placeholder="Enter your college"
          value={formData.college}
          onChange={(v) => update("college", v)}
        />
        <FormInput
          label="Department"
          placeholder="Enter your department"
          value={formData.department}
          onChange={(v) => update("department", v)}
        />
        <FormInput
          label="Email"
          placeholder="Your email"
          value={formData.email}
          disabled
          onChange={() => {}}
        />
      </div>

      <AcademicYearSelector
        value={formData.academicYear}
        onChange={(v) => update("academicYear", v)}
        otherValue={formData.otherYear}
        onOtherChange={(v) => update("otherYear", v)}
      />

      <EventSelector
        events={eventOptions}
        selected={formData.events}
        onChange={(v) => update("events", v)}
      />

      <div className="flex justify-center pt-10">
        <button
          type="submit"
          disabled={submitting}
          className="primary-btn px-20 py-5 rounded-xl uppercase tracking-widest flex items-center gap-3"
        >
          {submitting ? <span>Submitting...</span> : buttonTextStatus}
        </button>
      </div>
    </form>
  );
};
