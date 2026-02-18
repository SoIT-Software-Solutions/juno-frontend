import React from "react";
import { motion } from "framer-motion";
import { FiInstagram, FiMail, FiMapPin, FiPhone } from "react-icons/fi";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black/80 backdrop-blur-xl border-t border-white/10 px-6 py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-orange-600/5 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 text-center md:text-left">
          {/* Queries Section */}
          <div className="space-y-10">
            <h4 className="font-hanora text-2xl gold-text tracking-[0.3em] font-black uppercase">
              For Queries
            </h4>

            <div className="space-y-8">
              <ContactPerson
                name="Jana R"
                role="CHAIRMAN"
                phone="+91 883 819 3447"
                link="8838193447"
              />
              <ContactPerson
                name="Pandiaraj K"
                role="VICE CHAIRMAN"
                phone="+91 72004 67758"
                link="7200467758"
              />
              <ContactPerson
                name="Thejashree A"
                role="VICE CHAIRWOMAN"
                phone="+91 89390 03481"
                link="8939003481"
              />
            </div>
          </div>

          {/* Location & Contact Section */}
          <div className="flex flex-col space-y-16">
            <div className="space-y-8">
              <h4 className="font-hanora text-2xl gold-text tracking-[0.3em] font-black uppercase flex items-center justify-center md:justify-start gap-4">
                Location
              </h4>

              <a
                href="https://maps.app.goo.gl/336pieByUpv2UFrX8"
                target={"_blank"}
                rel="noreferrer"
                className="block text-white/50 text-sm md:text-md font-medium tracking-[0.1em] leading-relaxed hover:text-white transition-all duration-300"
              >
                161, Guru Nanak Salai,
                <br />
                Velachery, Chennai – 600042
              </a>
            </div>

            <div className="space-y-8">
              <h4 className="font-hanora text-2xl gold-text tracking-[0.3em] font-black uppercase flex items-center justify-center md:justify-start gap-4">
                Contact
              </h4>
              <a
                href="mailto:juno@gurunanakcollege.edu.in"
                className="block text-white/50 text-sm md:text-md tracking-[0.1em] font-medium hover:text-white transition-all duration-300"
              >
                juno@gurunanakcollege.edu.in
              </a>
            </div>
          </div>

          {/* Socials Section */}
          <div className="flex flex-col items-center lg:items-end space-y-10">
            <h4 className="font-hanora text-2xl gold-text tracking-[0.3em] font-black uppercase">
              Follow Us
            </h4>

            <motion.a
              href="https://www.instagram.com/juno_gnc/"
              target={"_blank"}
              rel="noreferrer"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(249,115,22,0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              className="card-glass w-36 h-36 rounded-[2.5rem] flex items-center justify-center group overflow-hidden border border-white/5 transition-all duration-500 hover:border-orange-500/30 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/10 group-hover:to-orange-500/5 transition-all duration-500" />
              <FiInstagram className="w-12 h-12 text-white/20 group-hover:text-orange-500 transition-all duration-500 filter group-hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
            </motion.a>
          </div>
        </div>

        <div className="mt-24 pt-10 border-t border-white/5 flex flex-col items-center justify-center gap-6">
          <p className="text-white/20 text-[10px] sm:text-[11px] tracking-[0.6em] uppercase font-black text-center">
            © 2026 JUNO Edition III
          </p>
        </div>
      </div>
    </footer>
  );
};

const ContactPerson: React.FC<{
  name: string;
  role: string;
  phone: string;
  link: string;
}> = ({ name, role, phone, link }) => (
  <motion.a
    href={`tel:${link}`}
    className="group block space-y-3"
    whileHover={{ x: 5 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    <div className="flex flex-col">
      <span className="text-orange-500/60 text-[8px] sm:text-[9px] tracking-[0.5em] font-black uppercase mb-1">
        {role}
      </span>
      <h5 className="text-white font-black text-lg sm:text-xl tracking-[0.05em] uppercase group-hover:text-orange-500 transition-colors duration-300">
        {name}
      </h5>
    </div>
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-orange-500/10 transition-colors duration-300">
        <FiPhone className="text-white/30 group-hover:text-orange-500 text-xs transition-colors duration-300" />
      </div>
      <p className="text-white/50 font-bold text-sm sm:text-base tracking-[0.1em] transition-colors duration-300 group-hover:text-white/80">
        {phone}
      </p>
    </div>
  </motion.a>
);
