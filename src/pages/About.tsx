import React from "react";
import { aboutData } from "../data/aboutData";
import { Gallery } from "../components/Gallery";

export const About: React.FC = () => {
  return (
    <div className="pt-32 pb-20 px-6 lg:px-20 animate-fade-in">
      <div className="w-full max-w-7xl mx-auto space-y-24 ">
        {/* About Description Card */}
        <section className="bg-black/50 backdrop-blur-[29px] p-5 md:p-12 lg:p-16 rounded-[20px] md:rounded-[40px] shadow-2xl">
          <h2 className="font-hanora text-5xl md:text-6xl font-black gold-text tracking-[0.15em] mb-4">
            {aboutData.title}
          </h2>
          <p className="text-[10px] md:text-[12px] tracking-[0.4em] text-white/90 font-black uppercase mb-12">
            {aboutData.subtitle}
          </p>

          <div className="space-y-8 text-white/80 leading-relaxed text-sm md:text-base uppercase tracking-[0.15em] text-justify">
            <div dangerouslySetInnerHTML={{ __html: aboutData.description }} />
          </div>
        </section>

        {/* Gallery Section */}
        <Gallery
          title={aboutData.galleryTitle}
          items={aboutData.galleryItems}
        />
      </div>
    </div>
  );
};
