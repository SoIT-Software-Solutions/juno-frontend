import React from "react";

export const EventSchedule: React.FC = () => {
  const day1Events = [
    "Photography",
    "Short Film",
    "Poster Making",
    "Paper Presentations",
    "Movie Quiz",
    "Debugging",
    "Meme Creation",
    "Cooking Without Fire",
  ];

  const day2Events = [
    "Box Cricket",
    "Tech Bingo",
    "IPL Auction",
    "Ramp Walk",
    "Dance",
    "Tech Quiz",
    "Tech Connection",
    "Tech Treasure Hunt",
  ];

  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-20">
        {/* Day 1 Card */}
        <div className="card-glass p-12 md:p-16 rounded-[2.5rem] text-center flex flex-col items-center group transition-all duration-500 hover:border-yellow-500/30">
          <h3 className="font-hanora text-5xl md:text-6xl font-black gold-text tracking-[0.2em] mb-14 uppercase transition-transform duration-500 group-hover:scale-110">
            Day 1
          </h3>
          <div className="space-y-6 w-full">
            {day1Events.map((event, idx) => (
              <p
                key={idx}
                className="text-lg md:text-2xl font-bold tracking-[0.15em] text-white/70 uppercase hover:text-yellow-500 transition-all duration-300 cursor-default hover:scale-105"
              >
                {event}
              </p>
            ))}
          </div>
        </div>

        {/* Day 2 Card */}
        <div className="card-glass p-12 md:p-16 rounded-[2.5rem] text-center flex flex-col items-center group transition-all duration-500 hover:border-yellow-500/30">
          <h3 className="font-hanora text-5xl md:text-6xl font-black gold-text tracking-[0.2em] mb-14 uppercase transition-transform duration-500 group-hover:scale-110">
            Day 2
          </h3>
          <div className="space-y-6 w-full">
            {day2Events.map((event, idx) => (
              <p
                key={idx}
                className="text-lg md:text-2xl font-bold tracking-[0.15em] text-white/70 uppercase hover:text-yellow-500 transition-all duration-300 cursor-default hover:scale-105"
              >
                {event}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
