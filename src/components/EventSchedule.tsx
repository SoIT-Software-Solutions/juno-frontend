import { useNavigate } from "react-router-dom";
import { day1Events, day2Events } from "../data/eventsNew";

export const EventSchedule: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-20">
        {/* Day 1 Card */}
        <div className="card-glass backdrop-blur-[29px] p-12 md:p-16 rounded-[2.5rem] text-center flex flex-col items-center group transition-all duration-500 hover:border-yellow-500/30">
          <h3 className="font-hanora text-5xl md:text-6xl font-black gold-text tracking-[0.2em] mb-14 uppercase transition-transform duration-500 group-hover:scale-110">
            Day 1
          </h3>
          <div className="space-y-6 w-full flex flex-col items-center">
            {day1Events.map((event, idx) => (
              <a
                key={idx}
                href={`/events/${event.id}`}
                className="text-lg md:text-2xl font-bold tracking-[0.15em] text-white/70 uppercase hover:text-yellow-500 transition-all duration-300 cursor-pointer hover:scale-105"
              >
                {event.name}
              </a>
            ))}
          </div>
        </div>

        {/* Day 2 Card */}
        <div className="card-glass p-12 md:p-16 rounded-[2.5rem] text-center flex flex-col items-center group transition-all duration-500 hover:border-yellow-500/30">
          <h3 className="font-hanora text-5xl md:text-6xl font-black gold-text tracking-[0.2em] mb-14 uppercase transition-transform duration-500 group-hover:scale-110">
            Day 2
          </h3>
          <div className="space-y-6 w-full flex flex-col items-center">
            {day2Events.map((event, idx) => (
              <a
                key={idx}
                href={`/events/${event.id}`}
                className="text-lg md:text-2xl font-bold tracking-[0.15em] text-white/70 uppercase hover:text-yellow-500 transition-all duration-300 cursor-pointer hover:scale-105"
              >
                {event.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
