import React from "react";
import heroLogo from "../images/JUNO_LOGO_NEW.png";
import { SecBtn } from "./ui/SecBtn";
import { TriBtn } from "./ui/TirBtn";
import CountdownTimer from "./CountdownTimer";

const WHATSAPP_LINK = "https://chat.whatsapp.com/H65JITps7qwF6ELa4s9D0B";

const Hero: React.FC = () => {
  return (
    <section className="min-h-screen w-full relative flex items-center pt-20 px-6 lg:px-20 overflow-hidden select-none">
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center">
        <div className="flex flex-col items-center lg:items-start">
          <img
            src={heroLogo}
            alt="JUNO Logo"
            className="w-full max-w-[900px] h-auto object-contain"
            loading="eager"
            decoding="async"
            draggable={false}
          />
        </div>

        <div className="flex flex-col items-center justify-center space-y-16 lg:space-y-24">
          <CountdownTimer />

          <div className="flex flex-col space-y-6 items-center w-full">
            <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-6 w-full lg:justify-end">
              <SecBtn onClick={() => (window.location.href = "/register/1")}>
                Day 1 Registration
              </SecBtn>
              <SecBtn onClick={() => (window.location.href = "/register/2")}>
                Day 2 Registration
              </SecBtn>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-[12px] md:text-sm font-black tracking-[0.2em]">
              <TriBtn
                onClick={() =>
                  (window.location.href =
                    "https://drive.google.com/file/d/1teflOLLqo6AoeLYyRgQ8dPCKE9H14Tw-/view")
                }
              >
                Rule Book
              </TriBtn>

              <TriBtn onClick={() => (window.location.href = WHATSAPP_LINK)}>
                Join WhatsApp
              </TriBtn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
