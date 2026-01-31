import React, { useEffect } from "react";
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

  formData: RegistrationData;
  // profileLocked: boolean;
  onFormChange: (data: RegistrationData) => void;
  onSubmit: (data: RegistrationData) => void;
};

export const RegistrationForm: React.FC<Props> = ({
  title,
  events,
  defaultEventId,
  alreadyRegisteredEventIds = [],
  submitting = false,
  formData,
  onFormChange,
  onSubmit,
}) => {
  useEffect(() => {
    const preselected = [
      ...(defaultEventId ? [defaultEventId] : []),
      ...alreadyRegisteredEventIds,
    ];

    onFormChange({
      ...formData,
      events: Array.from(new Set(preselected)),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultEventId, alreadyRegisteredEventIds]);

  const update = (key: keyof RegistrationData, value: any) => {
    onFormChange({ ...formData, [key]: value });
  };
  // Func which took from stackoverflow, this basically makes sure the input field data aren't empty before submission
  // Contact number is 10 in length
  const validateForm = (): { valid: boolean; message?: string } => {
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
  };

  const submit = (e: React.FormEvent) => {
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
  };

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
          disabled={true}
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
        events={events.map((e) => ({
          ...e,
          disabled: alreadyRegisteredEventIds.includes(e.id),
        }))}
        selected={formData.events}
        onChange={(v) => update("events", v)}
      />
      {/*Loading animation taken chatGPT, if any error make sure to prompt it while giving enough content*/}
      <div className="flex justify-center pt-10">
        <button
          type="submit"
          disabled={submitting}
          className="primary-btn px-20 py-5 rounded-xl uppercase tracking-widest flex items-center gap-3"
        >
          {submitting ? (
            <>
              <svg
                className="animate-spin h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                />
              </svg>
              Submitting...
            </>
          ) : (
            "Submit Registration"
          )}
        </button>
      </div>
    </form>
  );
};
