import React from "react";
import { EventSchedule } from "../components/EventSchedule";

export const Events: React.FC = () => {
  return (
    <div className="pt-32  px-6 lg:px-20 animate-fade-in min-h-screen">
      <div className="text-center mb-3 uppercase">
        <p className="text-white/40 text-sm mb-4   tracking-[0.5em] font-bold uppercase">
          Events
        </p>
        <h1 className="text-5xl md:text-7xl font-hanora tracking-tight text-white">
          Showcase <span className="font-hanora gold-text">Events</span>
        </h1>
      </div>
      <EventSchedule />
    </div>
  );
};
