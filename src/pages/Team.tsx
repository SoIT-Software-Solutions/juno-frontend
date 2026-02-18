import React from "react";
import { motion } from "framer-motion";
import { FiUsers } from "react-icons/fi";

const Team: React.FC = () => {
  return (
    <div className="min-h-screen pt-40 pb-20 px-6 lg:px-20 relative overflow-hidden flex items-center justify-center">
      {/* Background Decor */}
      <div className="absolute top-1/4 -right-40 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 -left-40 w-[500px] h-[500px] bg-yellow-600/5 rounded-full blur-[120px] -z-10" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="max-w-4xl w-full text-center space-y-12 relative"
      >
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="inline-block p-8 bg-orange-500/10 rounded-[3rem] border border-orange-500/20 shadow-[0_0_50px_rgba(234,179,8,0.1)]"
        >
          <FiUsers className="text-7xl md:text-9xl text-orange-500 opacity-80" />
        </motion.div>

        <div className="space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-hanora text-5xl md:text-8xl gold-text uppercase tracking-tighter"
          >
            Meet the <span className="text-white">Dream Team</span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-4"
          >
            <div className="h-[1px] w-12 bg-orange-500/30" />
            <p className="text-orange-500 text-[10px] md:text-xs tracking-[0.8em] font-black uppercase">
              Coming Soon
            </p>
            <div className="h-[1px] w-12 bg-orange-500/30" />
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-white/40 text-sm md:text-lg tracking-[0.2em] font-medium uppercase max-w-2xl mx-auto leading-relaxed"
        >
          The architects of JUNO Edition III are finalizing their masterpiece. 
          The board of brilliance will be unveiled shortly.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Team;
