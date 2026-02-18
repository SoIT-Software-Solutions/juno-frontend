import { useSearchParams } from "react-router-dom";
import React from "react";
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import { FiShield, FiLock } from "react-icons/fi";

const RegisterOAuth: React.FC = () => {
  const [searchParams] = useSearchParams();
  const day = searchParams.get("day");

  const backendURL = import.meta.env.VITE_BACKEND_API;

  const loginWithGoogle = () => {
    const url = new URL(`${backendURL}/auth/google`);

    if (day) {
      url.searchParams.append("state", day);
    }

    window.location.href = url.toString();
  };

  return (
    <div className="min-h-screen pt-40 pb-20 px-6 lg:px-20 relative overflow-hidden flex items-center justify-center">
      {/* Background Decor */}
      <div className="absolute top-1/4 -right-40 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 -left-40 w-[500px] h-[500px] bg-yellow-600/5 rounded-full blur-[120px] -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full text-center space-y-12"
      >
        <div className="space-y-6">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="inline-block p-4 bg-orange-500/10 rounded-2xl border border-orange-500/20 mb-4"
          >
            <FiLock className="text-4xl text-orange-500" />
          </motion.div>

          <h1 className="font-hanora text-5xl md:text-7xl gold-text uppercase tracking-tighter leading-tight">
            Authentication <br /> <span className="text-white">Required</span>
          </h1>

          <p className="text-white/40 text-sm md:text-lg tracking-[0.2em] font-medium uppercase leading-relaxed max-w-md mx-auto">
            To ensure a secure registration process, please verify your identity
            using Google.
          </p>
        </div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative inline-block"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
          <button
            onClick={loginWithGoogle}
            className="relative flex items-center justify-center gap-4 bg-white text-black px-12 py-6 rounded-2xl font-black text-xs tracking-[0.4em] uppercase shadow-2xl transition-all"
          >
            <FaGoogle className="text-xl" /> Sign in with Google
          </button>
        </motion.div>

        <div className="grid grid-cols-2 gap-8 pt-8">
          <div className="flex flex-col items-center gap-3">
            <FiShield className="text-orange-500/60 text-xl" />
            <p className="text-[10px] tracking-[0.3em] text-white/30 font-black uppercase text-center">
              Identity <br /> Protected
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <FiLock className="text-orange-500/60 text-xl" />
            <p className="text-[10px] tracking-[0.3em] text-white/30 font-black uppercase text-center">
              Secure <br /> Transmission
            </p>
          </div>
        </div>

        <p className="text-[10px] tracking-[0.4em] text-white/10 font-black uppercase max-w-xs mx-auto">
          We only use your account to verify your identity. Your data remains
          strictly confidential.
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterOAuth;
