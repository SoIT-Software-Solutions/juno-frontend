import React from "react";
import { motion } from "framer-motion";
import { aboutData } from "../data/aboutData";
import { Gallery } from "../components/Gallery";
import { FiUsers, FiAward, FiStar, FiTriangle } from "react-icons/fi";

export const About: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 lg:px-20 relative overflow-hidden">
      {/* Background Decor - Optimized Blur */}
      <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-orange-600/5 rounded-full blur-[80px] -z-10" />
      <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-yellow-600/5 rounded-full blur-[80px] -z-10" />

      <div className="w-full max-w-7xl mx-auto space-y-24 md:space-y-32">
        {/* Hero Section */}
        <section className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-hanora text-6xl md:text-8xl font-black gold-text tracking-[0.2em] mb-6 uppercase">
              {aboutData.title}
            </h2>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-[1px] w-12 md:w-20 bg-orange-500/20" />
              <p className="text-xs md:text-sm tracking-[0.5em] text-orange-500 font-bold uppercase">
                {aboutData.subtitle}
              </p>
              <div className="h-[1px] w-12 md:w-20 bg-orange-500/20" />
            </div>
          </motion.div>

          {/* Main Content Card */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="bg-white/[0.03] backdrop-blur-xl p-8 md:p-16 rounded-[40px] border border-white/5 relative overflow-hidden"
          >
            <FiTriangle className="absolute top-0 right-0 m-8 text-8xl rotate-12 text-orange-500 opacity-5 pointer-events-none" />

            <div className="relative space-y-8 text-white/70 leading-relaxed text-sm md:text-lg uppercase tracking-[0.2em] text-justify font-medium">
              <div
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: aboutData.description }}
              />
            </div>
          </motion.div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <StatCard
            icon={<FiUsers />}
            value="1300+"
            label="PARTICIPANTS"
            delay={0.1}
          />
          <StatCard
            icon={<FiStar />}
            value="1000+"
            label="FOOTFALLS"
            delay={0.2}
          />
          <StatCard
            icon={<FiAward />}
            value="2024"
            label="ESTABLISHED"
            delay={0.3}
          />
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

const StatCard: React.FC<{
  icon: React.ReactNode;
  value: string;
  label: string;
  delay: number;
}> = ({ icon, value, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay }}
    className="bg-white/[0.02] border border-white/5 p-8 rounded-[32px] backdrop-blur-lg hover:bg-white/[0.05] transition-colors flex flex-col items-center text-center group"
    style={{ willChange: "transform, opacity" }}
  >
    <div className="text-3xl text-orange-500 mb-6 p-4 bg-orange-500/10 rounded-2xl transition-transform group-hover:scale-110">
      {icon}
    </div>
    <span className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">
      {value}
    </span>
    <span className="text-[10px] tracking-[0.4em] text-white/40 font-bold uppercase transition-colors group-hover:text-orange-500">
      {label}
    </span>
  </motion.div>
);
