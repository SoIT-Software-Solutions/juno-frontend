import React from "react";
import { motion } from "framer-motion";
import { EventSchedule } from "../components/EventSchedule";

export const Events: React.FC = () => {
  return (
    <div className="min-h-screen pt-40 pb-20 px-6 lg:px-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-[140px] -z-10" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-yellow-600/5 rounded-full blur-[120px] -z-10" />

      <div className="w-full max-w-7xl mx-auto space-y-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 md:w-20 bg-orange-500/20" />
            <p className="text-xs md:text-sm tracking-[0.8em] text-orange-500 uppercase">
              The Grand Stage
            </p>
            <div className="h-[1px] w-12 md:w-20 bg-orange-500/20" />
          </div>

          <h1 className="text-6xl md:text-8 xl gold-text tracking-tighter uppercase leading-none">
            Technotsav <br /> <span className="text-white">Events</span>
          </h1>
        </motion.div>

        <div className="relative">
          <EventSchedule />
        </div>
      </div>
    </div>
  );
};
