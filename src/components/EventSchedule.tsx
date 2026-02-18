import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCalendar, FiArrowRight } from "react-icons/fi";
import { getEventByDays } from "../common/utils/eventUtils";

export const EventSchedule: React.FC = () => {
  const day1Events = useMemo(() => getEventByDays(1), []);
  const day2Events = useMemo(() => getEventByDays(2), []);

  return (
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-16">
      <DaySchedule dayNum={1} events={day1Events} delay={0.2} />
      <DaySchedule dayNum={2} events={day2Events} delay={0.4} />
    </div>
  );
};

const DaySchedule: React.FC<{
  dayNum: number;
  events: any[];
  delay: number;
}> = ({ dayNum, events, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
    className="card-glass backdrop-blur-[30px] p-8 md:p-12 rounded-[40px] border border-white/10 relative overflow-hidden group"
  >
    {/* Decorative corner icon */}
    <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
      <FiCalendar className="text-8xl -rotate-12 text-orange-500" />
    </div>

    <div className="relative text-center">
      <h3 className="gold-text text-4xl md:text-5xl font-black tracking-[0.2em] mb-12 uppercase">
        Day {dayNum}
      </h3>

      <div className="space-y-4">
        {events.map((event, idx) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: delay + idx * 0.05 }}
          >
            <Link
              to={`/events/${event.id}`}
              className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-orange-500/50 hover:bg-orange-500/5 transition-all duration-300 group/link"
            >
              <div className="flex flex-col items-start">
                <span className="text-sm md:text-md font-bold tracking-[0.2em] text-white/80 group-hover/link:text-white uppercase transition-colors">
                  {event.name}
                </span>
                <span className="text-[10px] tracking-[0.3em] text-orange-500/60 font-black uppercase mt-1">
                  Click for details
                </span>
              </div>
              <FiArrowRight className="text-white/20 group-hover/link:text-orange-500 group-hover/link:translate-x-1 transition-all" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);
