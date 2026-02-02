import React, { useState, useEffect } from "react";

type Album = "2k26" | "2k25" | "2k24";

const galleryData: Record<Album, string[]> = {
  "2k24": [
    "https://xbyquowixvhvfohybrni.supabase.co/storage/v1/object/public/gallery/juno_2k24_image_1.JPG",
    "https://xbyquowixvhvfohybrni.supabase.co/storage/v1/object/public/gallery/juno_2k24_image_2.JPG",
    "https://xbyquowixvhvfohybrni.supabase.co/storage/v1/object/public/gallery/juno_2k24_image_3.JPG",
    "https://xbyquowixvhvfohybrni.supabase.co/storage/v1/object/public/gallery/juno_2k24_image_4.JPG",
  ],
  "2k25": [
    "https://xbyquowixvhvfohybrni.supabase.co/storage/v1/object/public/gallery/juno_2k25_image_1.JPG",
    "https://xbyquowixvhvfohybrni.supabase.co/storage/v1/object/public/gallery/juno_2k25_image_2.JPG",
    "https://xbyquowixvhvfohybrni.supabase.co/storage/v1/object/public/gallery/juno_2k25_image_3.JPG",
  ],
  "2k26": [],
};

export const GalleryPage: React.FC = () => {
  const [activeAlbum, setActiveAlbum] = useState<Album>("2k25");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const currentImages = galleryData[activeAlbum];

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "auto";
    }
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

  return (
    <div className="pt-32 pb-20 px-6 lg:px-20 animate-fade-in min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-white/40 text-xs tracking-[0.5em] font-bold uppercase mb-4">
            Memories
          </p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-10">
            JUNO{" "}
            <span className="font-hanora gold-text font-normal">Gallery</span>
          </h1>

          {/* Album Tabs */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-8">
            {(["2k24", "2k25", "2k26"] as Album[]).map((album) => (
              <button
                key={album}
                onClick={() => {
                  setActiveAlbum(album);
                  setSelectedIndex(null);
                }}
                className={`px-10 py-3 rounded-full border transition-all duration-300 text-sm font-black tracking-widest ${
                  activeAlbum === album
                    ? "border-[var(--gold)] bg-[var(--gold)]/10 text-white shadow-[0_0_20px_rgba(234,179,8,0.2)]"
                    : "border-white/10 bg-white/5 text-white/50 hover:border-white/30 hover:text-white"
                }`}
              >
                {album.toUpperCase()}
              </button>
            ))}
          </div>
          {activeAlbum === "2k26" && (
            <h1 className="mt-6 text-3xl font-bold text-white text-center">
              2k26 gallery is yet to update
            </h1>
          )}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full">
          {currentImages.map((img, idx) => (
            <div
              key={`${activeAlbum}-${idx}`}
              onClick={() => setSelectedIndex(idx)}
              className="aspect-[4/5] bg-[#D1D5DB]/90 rounded-sm overflow-hidden shadow-lg transition-transform duration-500 hover:scale-105 hover:shadow-yellow-500/20 cursor-pointer"
            >
              <img
                src={img}
                alt={`Gallery ${activeAlbum} ${idx}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedIndex !== null && (
          <div
            className="fixed h-screen inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedIndex(null)}
          >
            <button
              className="absolute top-10 right-10 md:top-10 md:right-10 text-white text-4xl font-light hover:text-[var(--gold)] transition-all z-[110]"
              onClick={() => setSelectedIndex(null)}
            >
              ✕
            </button>

            <button
              className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 text-white/40 hover:text-[var(--gold)] text-4xl md:text-6xl font-light transition-all z-[110] p-2 md:p-4"
              onClick={handlePrev}
            >
              ‹
            </button>

            <button
              className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 text-white/40 hover:text-[var(--gold)] text-4xl md:text-6xl font-light transition-all z-[110] p-2 md:p-4"
              onClick={handleNext}
            >
              ›
            </button>

            <div className="relative w-full h-full flex items-center justify-center p-4">
              <img
                src={currentImages[selectedIndex]}
                alt="Fullscreen"
                className="max-w-[95vw] max-h-[95vh] object-contain rounded-lg shadow-[0_0_100px_rgba(234,179,8,0.3)] animate-[scaleIn_0.3s_ease-out]"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 text-white/30 font-hanora tracking-[0.2em] uppercase text-xs md:text-sm">
              FRAME {selectedIndex + 1} / {currentImages.length}
            </div>
          </div>
        )}
      </div>
      <style>{`
        @keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>
    </div>
  );
};
