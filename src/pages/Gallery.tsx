import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

type Album = "2k26" | "2k25" | "2k24";

const galleryData: Record<Album, string[]> = {
  "2k24": [
    "https://xbyquowixvhvfohybrni.supabase.co/storage/v1/object/public/gallery/juno_2k24_image_1.webp",
    "https://xbyquowixvhvfohybrni.supabase.co/storage/v1/object/public/gallery/juno_2k24_image_2.webp",
    "https://xbyquowixvhvfohybrni.supabase.co/storage/v1/object/public/gallery/juno_2k24_image_3.webp",
    "https://xbyquowixvhvfohybrni.supabase.co/storage/v1/object/public/gallery/juno_2k24_image_4.webp",
  ],
  "2k25": [
    "https://xbyquowixvhvfohybrni.supabase.co/storage/v1/object/public/gallery/juno_2k25_image_1.webp",
    "https://xbyquowixvhvfohybrni.supabase.co/storage/v1/object/public/gallery/juno_2k25_image_2.webp",
    "https://xbyquowixvhvfohybrni.supabase.co/storage/v1/object/public/gallery/juno_2k25_image_3.webp",
  ],
  "2k26": [],
};

export const GalleryPage: React.FC = () => {
  const [activeAlbum, setActiveAlbum] = useState<Album>("2k25");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const currentImages = galleryData[activeAlbum];

  useEffect(() => {
    document.body.style.overflow = selectedIndex !== null ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedIndex]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((prev) =>
      prev === 0 ? currentImages.length - 1 : prev! - 1,
    );
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((prev) =>
      prev === currentImages.length - 1 ? 0 : prev! + 1,
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="pt-32 pb-20 px-6 lg:px-20 min-h-screen relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 -right-40 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 -left-40 w-[500px] h-[500px] bg-yellow-600/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 space-y-6"
        >
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-8 bg-orange-500/30" />
            <p className="text-orange-500 text-[10px] tracking-[0.6em] font-black uppercase">
              The Collection
            </p>
            <div className="h-[1px] w-8 bg-orange-500/30" />
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase italic">
            JUNO{" "}
            <span className="gold-text font-hanora not-italic">Gallery</span>
          </h1>

          {/* Album Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mt-12 bg-white/5 p-2 rounded-2xl backdrop-blur-xl border border-white/10">
            {(["2k24", "2k25", "2k26"] as Album[]).map((album) => (
              <button
                key={album}
                onClick={() => {
                  setActiveAlbum(album);
                  setSelectedIndex(null);
                }}
                className={`px-8 py-3 rounded-xl transition-all duration-500 text-[11px] font-black tracking-[0.3em] uppercase relative overflow-hidden group ${
                  activeAlbum === album
                    ? "text-black"
                    : "text-white/40 hover:text-white"
                }`}
              >
                {activeAlbum === album && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-[#ffe100] to-[#ff9100] -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {album}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeAlbum === "2k26" && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-12 text-white/30 text-sm tracking-[0.2em] font-medium"
              >
                Edition III captures are coming soon...
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          key={activeAlbum}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 w-full"
        >
          {currentImages.map((img, idx) => (
            <motion.div
              key={`${activeAlbum}-${idx}`}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedIndex(idx)}
              className="aspect-[4/5] bg-white/[0.02] rounded-3xl overflow-hidden border border-white/10 relative group cursor-pointer shadow-2xl"
              style={{ willChange: "transform" }}
            >
              <img
                src={img}
                alt={`Gallery ${activeAlbum} ${idx}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <p className="text-[10px] tracking-[0.3em] text-orange-500 font-black uppercase">
                  Frame {idx + 1}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 md:p-12"
              onClick={() => setSelectedIndex(null)}
            >
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute top-10 right-10 z-[210] p-4 bg-white/10 hover:bg-orange-500 rounded-full text-white transition-all duration-300 backdrop-blur-md border border-white/10 shadow-2xl"
                onClick={() => setSelectedIndex(null)}
              >
                <FiX className="text-2xl" />
              </motion.button>

              <button
                className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 text-white/40 hover:text-white p-4 transition-all z-[210] bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-md border border-white/5"
                onClick={handlePrev}
              >
                <FiChevronLeft className="text-3xl md:text-5xl" />
              </button>

              <button
                className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 text-white/40 hover:text-white p-4 transition-all z-[210] bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-md border border-white/5"
                onClick={handleNext}
              >
                <FiChevronRight className="text-3xl md:text-5xl" />
              </button>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative max-w-6xl max-h-[85vh] w-full flex items-center justify-center rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(249,115,22,0.1)] border border-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={currentImages[selectedIndex]}
                  alt="Fullscreen view"
                  className="max-w-full max-h-[85vh] object-contain"
                />

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full text-white/40 text-[10px] tracking-[0.4em] font-black uppercase">
                  {activeAlbum} — {selectedIndex + 1} / {currentImages.length}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
