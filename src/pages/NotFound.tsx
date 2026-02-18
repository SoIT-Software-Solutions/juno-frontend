import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { PriBtn } from "../components/ui/PriBtn";
import { FiAlertTriangle } from "react-icons/fi";

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-40 pb-20 px-6 lg:px-20 relative overflow-hidden flex items-center justify-center">
      {/* Background Decor */}
      <div className="absolute top-1/4 -right-40 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 -left-40 w-[500px] h-[500px] bg-yellow-600/5 rounded-full blur-[120px] -z-10" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full text-center space-y-12 relative"
      >
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="inline-block p-8 bg-red-500/10 rounded-[3rem] border border-red-500/20 shadow-[0_0_50px_rgba(239,68,68,0.1)]"
        >
          <FiAlertTriangle className="text-7xl md:text-9xl text-red-500 opacity-80" />
        </motion.div>

        <div className="space-y-6">
          <h1 className="font-hanora text-6xl md:text-9xl gold-text uppercase tracking-tighter">
            404 <span className="text-white">Lost?</span>
          </h1>

          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-orange-500/30" />
            <p className="text-orange-500 text-[10px] md:text-xs tracking-[0.8em] font-black uppercase">
              Page Not Found
            </p>
            <div className="h-[1px] w-12 bg-orange-500/30" />
          </div>
        </div>

        <p className="text-white/40 text-sm md:text-lg tracking-[0.2em] font-medium uppercase max-w-xl mx-auto leading-relaxed">
          The coordinates you entered do not exist in the JUNO universe. Return
          to the mothership and try again.
        </p>

        <div className="pt-8 flex justify-center">
          <PriBtn onClick={() => navigate("/")}>Back to Home</PriBtn>
        </div>
      </motion.div>
    </div>
  );
};
