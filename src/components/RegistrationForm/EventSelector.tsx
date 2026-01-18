import React from "react";

export type EventItem = {
  id: string;
  name: string;
  image: string;
  disabled?: boolean;
};

type Props = {
  events: EventItem[];
  selected: string[];
  onChange: (ids: string[]) => void;
};

export const EventSelector: React.FC<Props> = ({
  events,
  selected,
  onChange,
}) => {
  const toggle = (id: string, disabled?: boolean) => {
    if (disabled) return;
    if (selected.includes(id)) {
      onChange(selected.filter((e) => e !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {events.map((event) => (
        <button
          key={event.id}
          type="button"
          disabled={event.disabled}
          onClick={() => toggle(event.id, event.disabled)}
          className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all focus:outline-none
            ${selected.includes(event.id) ? "border-[var(--gold)] scale-95" : "border-white/10"}
            ${event.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          `}
        >
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-full object-cover brightness-50"
          />
          <div className="absolute bottom-2 left-0 right-0 px-2 text-center">
            <p className="text-xs font-black tracking-widest text-orange-500 uppercase bg-black/60 py-2 rounded-lg">
              {event.name}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
};
