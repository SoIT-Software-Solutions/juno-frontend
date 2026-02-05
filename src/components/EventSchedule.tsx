import { Link } from "react-router-dom";
import { getEventByDays } from "../common/utils/eventUtils";

export const EventSchedule: React.FC = () => {
  const day1Events = getEventByDays(1);
  const day2Events = getEventByDays(2);

  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-20">
        <div className="bg-[var(--bg-glass-black)] backdrop-blur-[30px] p-12 rounded-[2.5rem] text-center">
          <h3 className="gold-text text-5xl font-black tracking-widest mb-14 uppercase">
            Day 1
          </h3>

          <div className="space-y-6">
            {day1Events.map((event) => (
              <a
                key={event.id}
                href={`/events/${event.id}`}
                className="block text-xl font-bold tracking-widest text-white/70 hover:text-yellow-500 transition"
              >
                {event.name}
              </a>
            ))}
          </div>
        </div>

        <div className="bg-[var(--bg-glass-black)] backdrop-blur-[30px] p-12 rounded-[2.5rem] text-center">
          <h3 className="gold-text text-5xl font-black tracking-widest mb-14 uppercase">
            Day 2
          </h3>

          <div className="space-y-6">
            {day2Events.map((event) => (
              <Link
                key={event.id}
                to={`/events/${event.id}`}
                className="block text-xl font-bold tracking-widest text-white/70 hover:text-yellow-500 transition"
              >
                {event.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
