import React from "react";
import { motion } from "framer-motion";
import heroLogo from "../images/JUNO_LOGO_NEW.png";
import { SecBtn } from "./ui/SecBtn";
import { TriBtn } from "./ui/TirBtn";
import CountdownTimer from "./CountdownTimer";

const WHATSAPP_LINK = "https://chat.whatsapp.com/H65JITps7qwF6ELa4s9D0B";
const RULE_BOOK_LINK =
  "https://drive.google.com/file/d/1_zD06Fv2D_8v97s-UMg7-eaYC5lTRDF1/view";

export const WhatsAppBtn: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <TriBtn onClick={() => (window.location.href = WHATSAPP_LINK)}>
      {children}
    </TriBtn>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="min-h-screen w-full relative flex items-center pt-24 px-6 lg:px-20 overflow-hidden select-none">
      {/* Background Decor Orbs */}
      <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[140px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] bg-yellow-600/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-0 items-center">
        {/* Left Side: Logo */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center lg:items-start"
        >
          <motion.img
            src={heroLogo}
            alt="JUNO Logo"
            className="w-full max-w-[850px] h-auto object-contain drop-shadow-[0_0_50px_rgba(234,179,8,0.2)]"
            loading="eager"
            decoding="async"
            draggable={false}
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Right Side: Actions */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col items-center justify-center space-y-12 lg:space-y-20 w-full"
        >
          <div className="w-full transform translate-y-4">
            <CountdownTimer />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md lg:max-w-lg">
            <motion.div whileHover={{ y: -4 }}>
              <SecBtn onClick={() => (window.location.href = "/register/1")}>
                Day 1 Registration
              </SecBtn>
            </motion.div>
            <motion.div whileHover={{ y: -4 }}>
              <SecBtn onClick={() => (window.location.href = "/register/2")}>
                Day 2 Registration
              </SecBtn>
            </motion.div>

            <motion.div whileHover={{ y: -4 }}>
              <TriBtn onClick={() => (window.location.href = RULE_BOOK_LINK)}>
                Rule Book
              </TriBtn>
            </motion.div>

            <motion.div whileHover={{ y: -4 }}>
              <TriBtn onClick={() => (window.location.href = WHATSAPP_LINK)}>
                Join Whatsapp
              </TriBtn>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
