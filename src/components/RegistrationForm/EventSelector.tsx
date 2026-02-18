import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheck } from "react-icons/fi";

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

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {events.map((event) => {
        const isSelected = selectedSet.has(event.id);
        return (
          <motion.div
            key={event.id}
            whileHover={!event.disabled ? { y: -5 } : {}}
            whileTap={!event.disabled ? { scale: 0.98 } : {}}
            className="relative"
          >
            <button
              type="button"
              disabled={event.disabled}
              onClick={() => toggle(event.id, event.disabled)}
              className={`w-full relative aspect-square rounded-[32px] overflow-hidden border-2 transition-all duration-500
                ${
                  isSelected
                    ? "border-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.3)] scale-[1.02]"
                    : "border-white/10 hover:border-white/30"
                }
                ${event.disabled ? "opacity-30 cursor-not-allowed grayscale" : "cursor-pointer"}
              `}
            >
              <img
                src={event.image}
                alt={event.name}
                className={`w-full h-full object-cover transition-transform duration-700 ${isSelected ? "scale-110" : "scale-100"}`}
                loading="lazy"
              />

              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-500 ${isSelected ? "from-black/90 via-orange-950/40" : "from-black/80 via-transparent"}`}
              />

              {/* Selected Badge */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 45 }}
                    className="absolute top-4 right-4 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-lg border-2 border-black"
                  >
                    <FiCheck className="text-black text-lg font-bold" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p
                  className={`text-[10px] md:text-xs font-black tracking-widest uppercase transition-colors duration-300 ${isSelected ? "text-white" : "text-white/70"}`}
                >
                  {event.name}
                </p>
                {event.disabled && (
                  <p className="text-[8px] text-orange-500 font-bold mt-1 tracking-wider opacity-60">
                    REGISTERED
                  </p>
                )}
              </div>
            </button>
          </motion.div>
        );
      })}
    </div>
  );
};
