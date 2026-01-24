import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { SecBtn } from "./ui/SecBtn";
import { PriBtn } from "./ui/PriBtn";

interface GalleryProps {
  title: string;
  items: any[];
}

export const Gallery: React.FC<GalleryProps> = ({ title, items }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (selectedImageIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedImageIndex]);

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
          {items.map((_, idx) => (
            <div
              key={idx}
              className="aspect-[4/5] bg-[#D1D5DB]/90 rounded-sm overflow-hidden shadow-lg transition-transform duration-500 hover:scale-105 hover:shadow-yellow-500/20 cursor-pointer"
              onClick={() => openModal(idx)}
            >
              {/* Image placeholder - in production would be real gallery photos */}
              <div className="w-full h-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-black/10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-10">
          <PriBtn onClick={() => (window.location.href = "/team")}>
            View Full Gallery
          </PriBtn>
        </div>
      </section>

      {/* Image Modal */}
      {/* Image Modal */}
      {selectedImageIndex !== null &&
        createPortal(
          <div
            className="fixed inset-0 z-[200] h-screen w-screen flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          >
            <div className="relative w-full h-full flex items-center justify-center p-4">
              {/* Close Button */}
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

              {/* Image Container */}
              <div
                className="bg-[#D1D5DB]/95 rounded-lg overflow-hidden shadow-2xl max-w-4xl max-h-[90vh] w-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image
              >
                <div className="w-full h-full max-w-2xl max-h-[80vh] flex items-center justify-center p-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-32 w-32 text-black/10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
