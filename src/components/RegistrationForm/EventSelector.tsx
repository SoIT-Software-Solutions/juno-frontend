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
  const selectedSet = React.useMemo(() => new Set(selected), [selected]);

  const toggle = React.useCallback(
    (id: number, disabled?: boolean) => {
      if (disabled) return;
      if (selectedSet.has(id)) {
        onChange(selected.filter((e) => e !== id));
      } else {
        onChange([...selected, id]);
      }
    },
    [selected, onChange, selectedSet],
  );

  // Memoized button component
  const EventButton = React.memo(
    ({
      event,
      isSelected,
      onClick,
    }: {
      event: EventItem;
      isSelected: boolean;
      onClick: () => void;
    }) => (
      <button
        type="button"
        disabled={event.disabled}
        onClick={onClick}
        className={`relative aspect-square rounded-2xl overflow-hidden border-2
          ${isSelected ? "border-[var(--gold)]" : "border-white/10"}
          ${event.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
      >
        {isSelected && (
          <div className="absolute top-2 left-2 w-4 h-4 bg-[var(--gold)] flex items-center justify-center text-black text-xs font-bold">
            ✓
          </div>
        )}

        <img
          src={event.image}
          alt={event.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        <div className="absolute bottom-1 left-0 right-0 px-1 text-center">
          <p className="text-xs font-bold tracking-widest text-orange-500 uppercase bg-black/60 py-1 rounded">
            {event.name}
          </p>
        </div>
      </button>
    ),
    (prev, next) =>
      prev.isSelected === next.isSelected && prev.event === next.event,
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {events.map((event) => {
        const isSelected = selectedSet.has(event.id);
        return (
          <EventButton
            key={event.id}
            event={event}
            isSelected={isSelected}
            onClick={() => toggle(event.id, event.disabled)}
          />
        );
      })}
    </div>
  );
};
