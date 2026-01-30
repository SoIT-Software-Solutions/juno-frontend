import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const staggered = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const formatStat = (value: number, type?: "prize" | "stall") => {
  if (type === "prize") return `${value}k+`;
  if (type === "stall") return `${value}+`;
  return value;
};

const Counter: React.FC<{
  target: number;
  start: boolean;
  type?: "prize" | "stall";
}> = ({ target, start, type }) => {
  const [count, setCount] = useState(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start) {
      setCount(0);
      startRef.current = null;
      return;
    }

    const duration = 5000;
    const step = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const progress = timestamp - startRef.current;
      const next = Math.min(target, Math.floor((progress / duration) * target));
      setCount(next);
      if (next < target) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [start, target]);

  return (
    <motion.h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-500">
      {formatStat(count, type)}
    </motion.h2>
  );
};

const StatsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [countStart, setCountStart] = useState(false);

  const stats = [
    { label: "Days", value: 2 },
    { label: "Events", value: 16 },
    { label: "Prizes", value: 100, type: "prize" },
    { label: "Stalls", value: 20, type: "stall" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setCountStart(entry.isIntersecting),
      { threshold: 0.3 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
      variants={staggered}
      className="px-6 py-12 flex flex-col items-center w-full"
    >
      <motion.h1
        variants={fadeUp}
        className="text-white/70 font-bold text-3xl sm:text-4xl md:text-5xl text-center mb-12"
      >
        Events
      </motion.h1>

      <motion.div
        variants={staggered}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 w-full max-w-5xl text-center"
      >
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            variants={fadeUp}
            className="flex flex-col items-center"
          >
            <Counter
              target={stat.value}
              start={countStart}
              type={stat.type as any}
            />
            <p className="text-sm md:text-base text-white/70 uppercase mt-2">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default StatsSection;
