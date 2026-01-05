import React, { useState, useEffect } from "react";
import heroLogo from "../images/JUNOHeroLogo.png";
import { SecBtn } from "./ui/SecBtn";
import { TriBtn } from "./ui/TirBtn";

export const Hero: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    min: 0,
    sec: 0,
  });

  useEffect(() => {
    // Target date: change this to the actual event date
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 15);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        min: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        sec: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="min-h-screen w-full relative flex items-center pt-20 px-6 lg:px-20 overflow-hidden select-none">
      {/* Background flare effects */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center">
        {/* Left Side: Large Logo and Event Title */}
        <div className="flex flex-col items-center lg:items-start space-y-4 animate-fade-in">
          <div className="w-full h-full  relative">
            <img
              src={heroLogo}
              className="w-[900px] h-auto object-contain"
              alt="JUNO Peacock Logo"
            />
            {/* Crown addition simulation via absolute positioning if needed, 
                but high brightness peacock already provides a very similar look */}
          </div>
        </div>

        {/* Right Side: Timer, Registration Buttons, and Rule Book */}
        <div className="flex flex-col items-center lg:items-center justify-center lg:h-full space-y-16 lg:space-y-24">
          {/* Countdown Timer */}
          <div className="flex space-x-6 md:space-x-10 lg:space-x-12">
            <TimerUnit value={timeLeft.days} label="DAYS" />
            <TimerUnit value={timeLeft.hours} label="HOURS" />
            <TimerUnit value={timeLeft.min} label="MIN" />
            <TimerUnit value={timeLeft.sec} label="SEC" />
          </div>
          <div className="flex flex-col space-y-6 items-center justify-center">
            {/* Registration Buttons */}
            <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-6 w-full lg:justify-end">
              <SecBtn onClick={() => (window.location.href = "/forms/day1")}>Day 1 Registration</SecBtn>
              <SecBtn onClick={() => (window.location.href = "/forms/day2")}>Day 2 Registration</SecBtn>
            </div>

            {/* Rule Book Link */}
            <div className="flex justify-center  text-[12px] md:text-sm font-black tracking-[0.2em]  transition-all duration-500 min-w-[240px]">
              <TriBtn onClick={() => (window.location.href = "/rulebook")}>
                Rule Book
              </TriBtn>
            </div>
          </div>  
        </div>
      </div>

      {/* Decorative vertical line at bottom */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 lg:left-auto lg:right-20 lg:translate-x-0 hidden lg:flex flex-col items-center opacity-30">
        <div className="w-px h-24 bg-gradient-to-t from-yellow-500 to-transparent"></div>
      </div>
    </section>
  );
};

const TimerUnit: React.FC<{ value: number; label: string }> = ({
  value,
  label,
}) => (
  <div className="flex flex-col items-center group">
    <span className="text-5xl md:text-6xl lg:text-7xl font-bold text-yellow-500 transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_0_20px_rgba(234,179,8,0.4)]">
      {String(value).padStart(2, "0")}
    </span>
    <span className="text-[10px] md:text-[12px] tracking-[0.3em] text-white/60 font-black mt-2 uppercase">
      {label}
    </span>
  </div>
);

export default Hero;
