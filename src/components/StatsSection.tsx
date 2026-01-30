import React from "react";

export const StatsSection: React.FC = () => {
  return (
    <section className="px-6 w-full flex flex-col items-center justify-center relative">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="mt-20 font-hanora text-5xl md:text-7xl font-black gold-text tracking-[0.2em] mb-16 uppercase">
          Events
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <StatItem value="2" label="DAYS" />
          <StatItem value="16" label="EVENTS" />
          <StatItem value="1L+" label="PRIZES" />
          <StatItem value="20+" label="STALLS" />
        </div>
      </div>
    </section>
  );
};

const StatItem: React.FC<{ value: string; label: string }> = ({
  value,
  label,
}) => (
  <div className="font-kirsty font-medium flex flex-col items-center justify-center group p-6 md:p-8 rounded-2xl transition-all duration-500 hover:bg-white/[0.02]">
    <span className="text-4xl sm:text-5xl md:text-[4.5rem] font-black text-yellow-500 transition-all duration-500 group-hover:scale-105 group-hover:drop-shadow-[0_0_30px_rgba(234,179,8,0.4)]">
      {value}
    </span>
    <span className="text-xs sm:text-sm md:text-sm tracking-[0.4em] font-black text-white/60 mt-4 uppercase transition-colors group-hover:text-white/90">
      {label}
    </span>
  </div>
);
