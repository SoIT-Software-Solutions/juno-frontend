import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { PriBtn } from "./ui/PriBtn";

interface GalleryProps {
  title: string;
  items: string[];
}

export const Gallery: React.FC<GalleryProps> = ({ title, items }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );

  // useEffect(() => {
  //   document.body.style.overflow =
  //     selectedImageIndex !== null ? "hidden" : "unset";
  //   return () => {
  //     document.body.style.overflow = "unset";
  //   };
  // }, [selectedImageIndex]);

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  return (
    <>
      <section className="space-y-16 text-center">
        <h2 className="font-hanora text-5xl md:text-7xl font-black gold-text tracking-[0.2em] mb-9 mt-16 uppercase">
          {title}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {items.map((url, idx) => (
            <div
              key={idx}
              className="aspect-[4/5] bg-black rounded-sm overflow-hidden shadow-lg transition-transform duration-500 hover:scale-105 hover:shadow-yellow-500/20 cursor-pointer"
              onClick={() => openModal(idx)}
            >
              <img
                src={url}
                alt={`${title} image ${idx + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-10">
          <PriBtn onClick={() => (window.location.href = "/gallery")}>
            View Full Gallery
          </PriBtn>
        </div>
      </section>

      {selectedImageIndex !== null &&
        createPortal(
          <div
            className="fixed inset-0 z-[200] h-screen w-screen flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          >
            <div className="relative w-full h-full flex items-center justify-center p-4">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-[210] text-white hover:text-yellow-500 transition-colors duration-300 bg-black/50 rounded-full p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div
                className="bg-black/95 rounded-lg overflow-hidden shadow-2xl max-w-4xl max-h-[90vh] w-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={items[selectedImageIndex]}
                  alt={`${title} full image`}
                  className="max-w-full max-h-[80vh] object-contain"
                />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};
