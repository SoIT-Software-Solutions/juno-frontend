import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { PriBtn } from "./ui/PriBtn";
import { FiX } from "react-icons/fi";

interface GalleryProps {
  title: string;
  items: string[];
}

export const Gallery: React.FC<GalleryProps> = ({ title, items }) => {
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );

  const openModal = (index: number) => setSelectedImageIndex(index);
  const closeModal = () => setSelectedImageIndex(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Faster stagger
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <section className="space-y-12 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-hanora text-5xl md:text-7xl font-black gold-text tracking-[0.2em] mb-4 mt-8 uppercase">
            {title}
          </h2>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-[1px] w-12 bg-orange-500/20" />
            <p className="text-[10px] tracking-[0.4em] text-orange-500/60 font-bold uppercase">
              Capturing Moments of Brilliance
            </p>
            <div className="h-[1px] w-12 bg-orange-500/20" />
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {items.map((url, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              className="aspect-[4/5] bg-white/5 rounded-2xl overflow-hidden border border-white/5 relative group"
              onClick={() => openModal(idx)}
              style={{ willChange: "transform" }}
            >
              <img
                src={url}
                alt={`${title} image ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center pt-8"
        >
          <PriBtn onClick={() => navigate("/gallery")}>View Full Gallery</PriBtn>
        </motion.div>
      </section>

      <AnimatePresence>
        {selectedImageIndex !== null &&
          createPortal(
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
              onClick={closeModal}
            >
              <motion.button
                className="absolute top-6 right-6 z-[210] p-3 bg-white/10 hover:bg-orange-500 rounded-full text-white transition-colors border border-white/10"
                onClick={closeModal}
              >
                <FiX className="text-xl" />
              </motion.button>

              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative max-w-5xl max-h-[85vh] w-full flex items-center justify-center rounded-2xl overflow-hidden border border-white/10 bg-black"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={items[selectedImageIndex]}
                  alt={`${title} full viewport`}
                  className="max-w-full max-h-[85vh] object-contain"
                />
              </motion.div>
            </motion.div>,
            document.body,
          )}
      </AnimatePresence>
    </>
  );
};
