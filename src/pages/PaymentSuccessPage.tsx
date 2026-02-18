import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCheckCircle, FiShare2, FiArrowRight } from "react-icons/fi";

const WHATSAPP_LINK = "https://chat.whatsapp.com/H65JITps7qwF6ELa4s9D0B";

const isMobile = () => /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

const PaymentSuccessPage = () => {
  const { day } = useParams<{ day: string }>();

  useEffect(() => {
    // We might want to delay the redirect to let the user see the success state
    if (isMobile()) {
      const timer = setTimeout(() => {
        window.location.href = WHATSAPP_LINK;
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="min-h-screen pt-40 pb-20 px-6 lg:px-20 relative overflow-hidden flex items-center justify-center">
      {/* Background Celebration Decor */}
      <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-green-600/10 rounded-full blur-[140px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 -left-40 w-[500px] h-[500px] bg-yellow-600/5 rounded-full blur-[120px] -z-10" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl w-full text-center space-y-12 relative"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            boxShadow: [
              "0 0 20px rgba(34,197,94,0.2)",
              "0 0 50px rgba(34,197,94,0.4)",
              "0 0 20px rgba(34,197,94,0.2)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="inline-block p-8 bg-green-500/10 rounded-[3rem] border border-green-500/30"
        >
          <FiCheckCircle className="text-7xl md:text-9xl text-green-500" />
        </motion.div>

        <div className="space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-hanora text-5xl md:text-8xl gold-text uppercase tracking-tighter"
          >
            Payment <span className="text-white">Confirmed</span>
          </motion.h1>

          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-green-500/30" />
            <p className="text-green-500 text-[10px] md:text-xs tracking-[0.8em] font-black uppercase">
              Welcome to the Arena
            </p>
            <div className="h-[1px] w-12 bg-green-500/30" />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="card-glass p-8 rounded-[2.5rem] border border-white/10 space-y-8"
        >
          <p className="text-white/60 text-sm md:text-lg tracking-[0.1em] font-medium leading-relaxed max-w-xl mx-auto uppercase">
            Your registration for Day {day} is complete. Join our official
            community to get real-time updates and connect with other
            participants.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="primary-btn px-12 py-5 rounded-2xl w-full sm:w-auto flex items-center justify-center gap-3"
            >
              JOIN WHATSAPP <FiShare2 className="text-xl" />
            </motion.a>

            <Link
              to="/"
              className="px-12 py-5 bg-white/5 border border-white/10 rounded-2xl text-white/40 hover:text-white hover:border-white/20 transition-all font-black text-xs tracking-[0.3em] uppercase w-full sm:w-auto flex items-center justify-center gap-3"
            >
              DASHBOARD <FiArrowRight className="text-xl" />
            </Link>
          </div>
        </motion.div>

        <p className="text-[10px] text-white/20 tracking-[0.4em] font-black uppercase">
          Redirecting to community group in{" "}
          {isMobile() ? "3s" : "a few moments"}...
        </p>
      </motion.div>
    </div>
  );
};

export default PaymentSuccessPage;
