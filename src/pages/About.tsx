import React from "react";
import { motion } from "framer-motion";
import { aboutData } from "../data/aboutData";
import { Gallery } from "../components/Gallery";
import { FiUsers, FiAward, FiStar, FiTriangle } from "react-icons/fi";

export const About: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 lg:px-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-yellow-600/5 rounded-full blur-[120px] -z-10" />

      <div className="w-full max-w-7xl mx-auto space-y-32">
        {/* Hero Section */}
        <section className="relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="font-hanora text-6xl md:text-8xl font-black gold-text tracking-[0.2em] mb-6 uppercase">
              {aboutData.title}
            </h2>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-[1px] w-12 md:w-20 bg-gradient-to-r from-transparent to-orange-500" />
              <p className="text-xs md:text-sm tracking-[0.6em] text-orange-500 font-black uppercase">
                {aboutData.subtitle}
              </p>
              <div className="h-[1px] w-12 md:w-20 bg-gradient-to-l from-transparent to-orange-500" />
            </div>
          </motion.div>

          {/* Main Content Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="card-glass backdrop-blur-3xl p-8 md:p-16 rounded-[40px] border border-white/10 relative group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <FiTriangle className="text-8xl rotate-12 text-orange-500" />
            </div>

            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-12 space-y-8 text-white/80 leading-relaxed text-sm md:text-lg uppercase tracking-[0.2em] text-justify font-medium">
                <div
                  className="prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: aboutData.description }}
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatCard
            icon={<FiUsers />}
            value="1300+"
            label="PARTICIPANTS"
            delay={0.2}
          />
          <StatCard
            icon={<FiStar />}
            value="1000+"
            label="FOOTFALLS"
            delay={0.4}
          />
          <StatCard
            icon={<FiAward />}
            value="2024"
            label="ESTABLISHED"
            delay={0.6}
          />
        </section>

        {/* Gallery Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Gallery
            title={aboutData.galleryTitle}
            items={aboutData.galleryItems}
          />
        </motion.div>
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
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="bg-white/5 border border-white/10 p-8 rounded-[32px] backdrop-blur-xl hover:bg-white/10 transition-colors flex flex-col items-center text-center group"
  >
    <div className="text-3xl text-orange-500 mb-6 p-4 bg-orange-500/10 rounded-2xl group-hover:scale-110 transition-transform">
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
