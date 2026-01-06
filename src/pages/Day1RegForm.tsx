import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { day1Events } from "../data/eventsNew";

const availableEvents = day1Events.map((event) => ({
  id: event.id,
  name: event.name,
  img: event.img,
}));

export const Day1RegForm: React.FC = () => {
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [academicYear, setAcademicYear] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const eventParam = query.get("event");
    if (eventParam) {
      const foundEvent = availableEvents.find((e) => e.id === eventParam);
      if (foundEvent) {
        setSelectedEvents([foundEvent.id]);
      }
    }
  }, [location.search]);

  const toggleEvent = (id: string) => {
    setSelectedEvents((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  return (
    <div className="pt-28 pb-20 px-6 lg:px-20 min-h-screen">
      <div className="max-w-7xl mx-auto p-7 glass-card rounded-[40px] backdrop-blur-[29px]">
        <h1 className="w-full text-4xl font-hanora tracking-[0.12em] gold-text uppercase text-center mb-12">
          Day 1 Registration
        </h1>
        {/* Form Grid */}
        <form className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <FormInput
              label="Name of the Participants"
              placeholder="ENTER YOUR NAME"
            />
            <FormInput
              label="Contact Number"
              placeholder="ENTER YOUR CONTACT NUMBER"
            />
            <FormInput
              label="Name of the College"
              placeholder="ENTER YOUR COLLEGE"
            />
            <FormInput label="Department" placeholder="ENTER YOUR DEPARTMENT" />
            <div className="md:col-span-1">
              <FormInput
                label="Email Address"
                placeholder="ENTER YOUR EMAIL ADDRESS"
              />
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-sm font-black tracking-[0.2em] text-white uppercase">
              Academic Year
            </h3>

            {/* Under Graduate Selection */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-8">
                <RadioOption
                  label="1st Year (UG)"
                  value="UG-1"
                  selected={academicYear}
                  onSelect={setAcademicYear}
                />
                <RadioOption
                  label="2nd Year (UG)"
                  value="UG-2"
                  selected={academicYear}
                  onSelect={setAcademicYear}
                />
                <RadioOption
                  label="3rd Year (UG)"
                  value="UG-3"
                  selected={academicYear}
                  onSelect={setAcademicYear}
                />
                <RadioOption
                  label="4th Year (UG)"
                  value="UG-4"
                  selected={academicYear}
                  onSelect={setAcademicYear}
                />
                <RadioOption
                  label="1st Year (PG)"
                  value="PG-1"
                  selected={academicYear}
                  onSelect={setAcademicYear}
                />
                <RadioOption
                  label="2nd Year (PG)"
                  value="PG-2"
                  selected={academicYear}
                  onSelect={setAcademicYear}
                />
                <RadioOption
                  label="Others"
                  value="others"
                  selected={academicYear}
                  onSelect={setAcademicYear}
                />
              </div>
              {academicYear === "others" && (
                <div className="animate-fade-in pt-4 max-w-md">
                  <FormInput
                    label="Specify Other"
                    placeholder="ENTER YOUR YEAR / DESIGNATION"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Events Grid */}
          <div className="space-y-8 pt-6">
            <h3 className="text-sm font-black tracking-[0.2em] text-white uppercase">
              Events
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {availableEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={() => toggleEvent(event.id)}
                  className={`relative aspect-square rounded-2xl overflow-hidden cursor-pointer group border-2 transition-all duration-300 ${
                    selectedEvents.includes(event.id)
                      ? "border-[var(--gold)] scale-95 shadow-[0_0_20px_rgba(249,115,22,0.3)]"
                      : "border-white/5"
                  }`}
                >
                  <img
                    src={event.img}
                    alt={event.name}
                    className="w-full h-full object-cover filter brightness-50 group-hover:brightness-75 transition-all"
                  />

                  {/* Selection Indicator */}
                  <div className="absolute top-4 right-4 w-6 h-6 rounded-md border-2 border-[var(--gold)] flex items-center justify-center bg-black/40">
                    {selectedEvents.includes(event.id) && (
                      <div className="w-4 h-4 bg-orange-500 rounded-[2px] flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="absolute bottom-2 left-0 right-0 px-2 text-center">
                    <p className="text-[14px] font-black tracking-[0.1em] text-orange-500 uppercase border border-orange-500/50 py-3 rounded-lg bg-black/60 backdrop-blur-sm">
                      {event.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-center pt-10">
            <button
              type="submit"
              className="primary-btn px-20 py-5 rounded-xl font-cinzel text-xl tracking-[0.3em] font-black uppercase"
            >
              Submit Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const FormInput: React.FC<{ label: string; placeholder: string }> = ({
  label,
  placeholder,
}) => (
  <div className="flex flex-col space-y-4">
    <label className="text-sm font-black tracking-[0.2em] text-white uppercase">
      {label}
    </label>
    <input
      type="text"
      placeholder={placeholder}
      className="bg-black/40 border border-white/20 rounded-xl px-6 py-5 text-xs tracking-[0.2em] font-bold text-white/60 placeholder-white/60 outline-none focus:border-[var(--gold)] focus:bg-black/60 transition-all"
    />
  </div>
);

const RadioOption: React.FC<{
  label: string;
  value: string;
  selected: string;
  onSelect: (v: string) => void;
}> = ({ label, value, selected, onSelect }) => (
  <label className="flex items-center space-x-3 cursor-pointer group">
    <div className="relative" onClick={() => onSelect(value)}>
      <div
        className={`w-5 h-5 rounded-full border-2 transition-all ${
          selected === value
            ? "border-[var(--gold)]"
            : "border-white group-hover:border-white"
        }`}
      ></div>
      {selected === value && (
        <div className="absolute inset-1 bg-[var(--gold)] rounded-full animate-pulse"></div>
      )}
    </div>
    <span
      className={`text-[12px] font-bold tracking-[0.1em] uppercase ${
        selected === value
          ? "text-[var(--gold)]"
          : "text-white group-hover:text-white"
      }`}
    >
      {label}
    </span>
  </label>
);
