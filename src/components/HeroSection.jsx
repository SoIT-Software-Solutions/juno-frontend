import { useState, useEffect } from "react";
import Logo from "../images/juno2k25_logo.png";

import HeroEventDetail from "./HeroEventDetail";
import Events from "../pages/Events";

function HeroSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const handleRegisterClick = () => {
    alert("Redirected!!!");
  };

  useEffect(() => {
    const targetDate = new Date("Feb 25, 2026").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(interval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 sm:p-8 text-white mt-8">
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between space-y-8 md:space-y-0">
        <img
          className="w-3/4 sm:w-1/2 md:w-[500px] h-auto"
          src={Logo}
          alt="Logo"
        />

        <div className="flex flex-col items-center text-center">
          <div className="font-extrabold tracking-wider bg-gradient-to-b from-goldish1 to-goldish2 bg-clip-text text-transparent">
            <div className="grid grid-cols-4 gap-8 text-[clamp(2rem,8vw,6rem)]">
              <div className="flex flex-col items-center">
                <span className="text-6xl sm:text-8xl">
                  {timeLeft.days.toString().padStart(2, "0")}
                </span>
                <span className="text-xl text-gray-400">Days</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-6xl sm:text-8xl">
                  {timeLeft.hours.toString().padStart(2, "0")}
                </span>
                <span className="text-xl text-gray-400">Hours</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-6xl sm:text-8xl">
                  {timeLeft.minutes.toString().padStart(2, "0")}
                </span>
                <span className="text-xl text-gray-400">Min</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-6xl sm:text-8xl">
                  {timeLeft.seconds.toString().padStart(2, "0")}
                </span>
                <span className="text-xl text-gray-400">Sec</span>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col md:flex-col items-center space-y-0">
            <br />
            <a
              className="bg-gradient-to-r from-goldish1 to-goldish2 text-black px-16 py-4 rounded-lg text-[17px] font-bold md:w-auto hover:scale-105 hover:shadow-lg transition-all"
              href="https://drive.google.com/file/d/1fhKMbjfgYWQ5Gc1eCiO0Qr1jSlnIAvjh/view"
              target="_blank"
            >
              Rule book
            </a>
            <br />
            <a
              className="bg-gradient-to-r from-goldish1 to-goldish2 text-black px-16 py-4 rounded-lg text-[17px] font-bold w-full md:w-auto hover:scale-105 hover:shadow-lg transition-all"
              href="https://docs.google.com/forms/d/e/1FAIpQLScX6bKYLR2zxUwtMQqFlWgquP6WWxKXmhUOMfX3s_wfVEFEiw/viewform"
              target="_blank"
            >
              Day-1 Registration form
            </a>
            <br />
            <a
              className="bg-gradient-to-r from-goldish1 to-goldish2 text-black px-16 py-4 rounded-lg text-[17px] font-bold w-full md:w-auto hover:scale-105 hover:shadow-lg transition-all"
              href="https://docs.google.com/forms/d/e/1FAIpQLSfUoaxuqk1wO4Ve5tPTvdlhQwexs2g1jhIaQzKtmdKYjfx1IA/viewform"
              target="_blank"
            >
              Day-2 Registration form
            </a>
          </div>
        </div>
      </div>

      <HeroEventDetail />
      <Events />
    </div>
  );
}

export default HeroSection;
