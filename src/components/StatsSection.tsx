import React, { useEffect, useRef, useState } from "react";

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

    const duration = 5000;
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = timestamp - startTimeRef.current;

      const next = Math.min(target, Math.floor((progress / duration) * target));

      setCount(next);

      if (next < target) {
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
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-500">
      {formatStat(count, type)}
    </h2>
  );
};

const StatsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [countStart, setCountStart] = useState(false);

  const stats = [
    { label: "Days", value: 2 },
    { label: "Events", value: 16 },
    { label: "Cash Prize", value: 100, type: "prize" as const },
    { label: "Stalls", value: 20, type: "stall" as const },
  ];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCountStart(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-6 py-12 flex flex-col items-center w-full"
    >
      <h1 className="text-white/70 font-bold text-3xl sm:text-4xl md:text-5xl text-center mb-12">
        Events
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 w-full max-w-5xl text-center">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center">
            <Counter target={stat.value} start={countStart} type={stat.type} />
            <p className="text-sm md:text-base text-white/70 uppercase mt-2">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
