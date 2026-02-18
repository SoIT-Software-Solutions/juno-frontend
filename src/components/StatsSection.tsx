import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FiCalendar, FiStar, FiAward, FiGrid } from "react-icons/fi";

const formatStat = (value: number, type?: "prize" | "stall") => {
  if (type === "prize") return `${value}k+`;
  if (type === "stall") return `${value}+`;
  return value;
};

type CounterProps = {
  target: number;
  start: boolean;
  type?: "prize" | "stall";
};

const Counter: React.FC<CounterProps> = ({ target, start, type }) => {
  const [count, setCount] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;

    const duration = 2000; // Faster animation for impact
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = timestamp - startTimeRef.current;
      const percentage = Math.min(progress / duration, 1);

      // Easing function for smoother feel
      const easeOutQuad = (t: number) => t * (2 - t);
      const next = Math.floor(easeOutQuad(percentage) * target);

      setCount(next);

      if (percentage < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      startTimeRef.current = null;
    };
  }, [start, target]);

  return (
    <span className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter">
      {formatStat(count, type)}
    </span>
  );
};

const StatsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const stats = [
    { label: "Days", value: 2, icon: <FiCalendar /> },
    { label: "Events", value: 16, icon: <FiStar /> },
    {
      label: "Cash Prize",
      value: 100,
      type: "prize" as const,
      icon: <FiAward />,
    },
    { label: "Stalls", value: 20, type: "stall" as const, icon: <FiGrid /> },
  ];

  return (
    <section
      ref={sectionRef}
      className="px-6 py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-orange-600/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="font-hanora text-5xl md:text-7xl gold-text uppercase">
            Juno <span className="text-white">Stats</span>
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-orange-500/30" />
            <p className="text-[10px] tracking-[0.5em] text-orange-500 font-bold uppercase">
              The Numbers Behind The Magic
            </p>
            <div className="h-[1px] w-12 bg-orange-500/30" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="card-glass backdrop-blur-2xl p-8 rounded-[32px] border border-white/10 flex flex-col items-center text-center group hover:bg-white/5 transition-all duration-500"
            >
              <div className="text-3xl text-orange-500 mb-6 p-4 bg-orange-500/10 rounded-2xl group-hover:scale-110 group-hover:bg-orange-500/20 transition-all duration-300">
                {stat.icon}
              </div>
              <Counter target={stat.value} start={isInView} type={stat.type} />
              <p className="text-[10px] md:text-xs tracking-[0.4em] text-white/40 font-black uppercase mt-4 transition-colors group-hover:text-orange-500">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
