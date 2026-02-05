import React, { useEffect, useState } from "react";

const TARGET_DATE = new Date(2026, 1, 24).getTime();

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const next = calculateTimeLeft();

        if (
          prev.days === next.days &&
          prev.hours === next.hours &&
          prev.min === next.min &&
          prev.sec === next.sec
        ) {
          return prev;
        }

        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex space-x-6 md:space-x-10 lg:space-x-12">
      <TimerUnit value={timeLeft.days} label="DAYS" />
      <TimerUnit value={timeLeft.hours} label="HOURS" />
      <TimerUnit value={timeLeft.min} label="MIN" />
      <TimerUnit value={timeLeft.sec} label="SEC" />
    </div>
  );
};

const calculateTimeLeft = () => {
  const now = Date.now();
  const distance = TARGET_DATE - now;

  return {
    days: Math.max(Math.floor(distance / (1000 * 60 * 60 * 24)), 0),
    hours: Math.max(
      Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      0,
    ),
    min: Math.max(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)), 0),
    sec: Math.max(Math.floor((distance % (1000 * 60)) / 1000), 0),
  };
};

const TimerUnit = React.memo(
  ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-yellow-500">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-xs md:text-sm tracking-[0.3em] text-white/60 font-black mt-2 uppercase">
        {label}
      </span>
    </div>
  ),
);

export default CountdownTimer;
