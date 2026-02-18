import React from "react";
import { motion } from "framer-motion";
import { FiMail, FiMapPin, FiSend, FiMessageSquare } from "react-icons/fi";

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen pt-40 pb-20 px-6 lg:px-20 relative overflow-hidden flex items-center justify-center">
      {/* Background Decor */}
      <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-[140px] -z-10" />
      <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] bg-yellow-600/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
        {/* Left Side: Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <div className="space-y-6">
            <h1 className="font-hanora text-6xl md:text-8xl gold-text tracking-tighter uppercase leading-none">
              Get In <br /> <span className="text-white">Touch</span>
            </h1>
            <p className="text-white/40 text-sm md:text-lg tracking-[0.2em] font-medium uppercase leading-relaxed max-w-md">
              Have questions about JUNO Edition III? Our team is here to help
              you navigate through the brilliance.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-6 group">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 group-hover:border-orange-500/50 transition-colors">
                <FiMail className="text-2xl text-orange-500" />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.4em] text-white/20 font-black uppercase">
                  Email Us
                </p>
                <a
                  href="mailto:juno@gurunanakcollege.edu.in"
                  className="text-white font-bold tracking-widest hover:text-orange-500 transition-colors"
                >
                  juno@gurunanakcollege.edu.in
                </a>
              </div>
            </div>

            <div className="flex items-center gap-6 group pointer-events-none">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <FiMessageSquare className="text-2xl text-orange-500" />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.4em] text-white/20 font-black uppercase">
                  Response Time
                </p>
                <p className="text-white font-bold tracking-widest">
                  Within 24 Hours
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                window.open(
                  "https://maps.app.goo.gl/336pieByUpv2UFrX8",
                  "_blank",
                )
              }
              className="flex items-center gap-6 p-6 bg-white/5 rounded-3xl border border-white/10 hover:border-orange-500/50 transition-all w-full max-w-sm"
            >
              <div className="p-4 bg-orange-500/10 rounded-2xl">
                <FiMapPin className="text-2xl text-orange-500" />
              </div>
              <div className="text-left">
                <p className="text-[10px] tracking-[0.3em] text-orange-500 font-black uppercase">
                  Our Location
                </p>
                <p className="text-white/60 text-xs font-medium tracking-widest mt-1">
                  Guru Nanak Salai, Velachery, Chennai
                </p>
              </div>
            </motion.button>
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="card-glass p-8 md:p-12 rounded-[3rem] border border-white/10 relative"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid gap-6">
              <div className="space-y-2">
                <label className="text-[10px] tracking-[0.5em] text-white/20 font-black uppercase ml-4">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="ENTER FULL NAME"
                  className="w-full p-6 bg-white/5 border border-white/10 rounded-2xl text-white tracking-[0.1em] focus:outline-none focus:border-orange-500/50 transition-colors uppercase text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] tracking-[0.5em] text-white/20 font-black uppercase ml-4">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="NAME@EXAMPLE.COM"
                  className="w-full p-6 bg-white/5 border border-white/10 rounded-2xl text-white tracking-[0.1em] focus:outline-none focus:border-orange-500/50 transition-colors uppercase text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] tracking-[0.5em] text-white/20 font-black uppercase ml-4">
                  Message
                </label>
                <textarea
                  placeholder="HOW CAN WE HELP YOU?"
                  rows={4}
                  className="w-full p-6 bg-white/5 border border-white/10 rounded-2xl text-white tracking-[0.1em] focus:outline-none focus:border-orange-500/50 transition-colors uppercase text-sm resize-none"
                />
              </div>
            </div>

            <motion.button
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 30px rgba(234, 179, 8, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-6 bg-gradient-to-r from-[#ffe100] to-[#ff9100] rounded-2xl text-black font-black tracking-[0.4em] uppercase text-sm flex items-center justify-center gap-4 transition-all"
            >
              Send Message <FiSend className="text-xl" />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
