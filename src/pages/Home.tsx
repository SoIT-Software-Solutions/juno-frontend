import React from "react";
import Hero from "../components/HeroSection";
import StatsSection from "../components/StatsSection";
import { EventSchedule } from "../components/EventSchedule";
import { motion } from "framer-motion";

export const Home: React.FC = () => {
  return (
    <div className="space-y-24 md:space-y-40 pb-20">
      <Hero />
      <StatsSection />

      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 space-y-6"
        >
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-orange-500/20" />
            <p className="text-orange-500 text-[10px] tracking-[0.8em] font-black uppercase">
              Schedule
            </p>
            <div className="h-[1px] w-12 bg-orange-500/20" />
          </div>

          <h2 className="font-hanora text-6xl md:text-8xl gold-text uppercase tracking-tighter">
            Quick <span className="text-white">Schedule</span>
          </h2>
        </motion.div>
        <EventSchedule />
      </div>
    </div>
  );
};

export default Home;
