import React from "react";

export type EventItem = {
  id: number;
  name: string;
  image: string;
  disabled?: boolean;
};

type Props = {
  events: EventItem[];
  selected: number[];
  onChange: (ids: number[]) => void;
};

export const EventSelector: React.FC<Props> = ({
  events,
  selected,
  onChange,
}) => {
  const toggle = (id: number, disabled?: boolean) => {
    if (disabled) return;
    if (selected.includes(id)) {
      onChange(selected.filter((e) => e !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {events.map((event) => {
        const isSelected = selected.includes(event.id);

        return (
          <button
            key={event.id}
            type="button"
            disabled={event.disabled}
            onClick={() => toggle(event.id, event.disabled)}
            className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all focus:outline-none
              ${isSelected ? "border-[var(--gold)] scale-95" : "border-white/10"}
              ${event.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            `}
          >
            <div
              className={`absolute top-3 left-3 z-10 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors
                ${
                  isSelected
                    ? "bg-[var(--gold)] border-[var(--gold)]"
                    : "bg-black/60 border-white/60"
                }
              `}
            >
              {isSelected && (
                <span className="text-black text-xs font-black">✓</span>
              )}
            </div>

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
        );
      })}
    </div>
  );
};
