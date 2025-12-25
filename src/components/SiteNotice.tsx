import { motion } from "framer-motion";

function SiteNotice() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <motion.h1
        className="text-yellow-100 text-center text-3xl sm:text-4xl font-extrabold drop-shadow-lg mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        We are working on something exciting <br />
        <br /> coming soon.
      </motion.h1>
      <motion.p
        className="text-white text-center opacity-80 text-sm sm:text-base tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        By SoIT Software Solutions
      </motion.p>
    </main>
  );
}

export default SiteNotice;
