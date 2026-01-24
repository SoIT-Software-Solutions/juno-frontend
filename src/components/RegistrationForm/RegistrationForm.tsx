import React, { useEffect, useState } from "react";
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
  onSubmit: (data: RegistrationData) => void;
};

export const RegistrationForm: React.FC<Props> = ({
  title,
  events,
  defaultEventId,
  alreadyRegisteredEventIds = [],
  submitting = false,
  onSubmit,
}) => {
  const [data, setData] = useState<RegistrationData>({
    name: "",
    phone: "",
    college: "",
    department: "",
    email: "",
    academicYear: "",
    otherYear: "",
    events: [],
  });

  useEffect(() => {
    const preselected = [
      ...(defaultEventId ? [defaultEventId] : []),
      ...alreadyRegisteredEventIds,
    ];
    const uniqueEvents = Array.from(new Set(preselected));
    setData((prev) => ({ ...prev, events: uniqueEvents }));
  }, [defaultEventId, alreadyRegisteredEventIds]);

  const update = (key: keyof RegistrationData, value: string | string[]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const filteredEvents = data.events.filter(
      (id) => !alreadyRegisteredEventIds.includes(id),
    );
    onSubmit({ ...data, events: filteredEvents });
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
          value={data.name}
          onChange={(v) => update("name", v)}
        />
        <FormInput
          label="Contact Number"
          placeholder="Enter your number"
          value={data.phone}
          onChange={(v) => update("phone", v)}
        />
        <FormInput
          label="College"
          placeholder="Enter your college"
          value={data.college}
          onChange={(v) => update("college", v)}
        />
        <FormInput
          label="Department"
          placeholder="Enter your department"
          value={data.department}
          onChange={(v) => update("department", v)}
        />
        <FormInput
          label="Email"
          placeholder="Enter your email"
          value={data.email}
          onChange={(v) => update("email", v)}
        />
      </div>

      <AcademicYearSelector
        value={data.academicYear}
        onChange={(v) => update("academicYear", v)}
        otherValue={data.otherYear}
        onOtherChange={(v) => update("otherYear", v)}
      />

      <EventSelector
        events={events.map((e) => ({
          ...e,
          disabled: alreadyRegisteredEventIds.includes(e.id),
        }))}
        selected={data.events}
        onChange={(v: any) => update("events", v)}
      />

      <div className="flex justify-center pt-10">
        <button
          type="submit"
          disabled={submitting}
          className="primary-btn px-20 py-5 rounded-xl uppercase tracking-widest flex items-center justify-center gap-3"
        >
          {submitting ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                ></path>
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
