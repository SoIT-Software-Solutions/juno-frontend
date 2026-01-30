import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black/60 backdrop-blur-md border-t border-yellow-500/10 px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-hanora text-2xl gold-text tracking-[0.2em] font-black uppercase mb-10">
              For Queries
            </h4>

            <div className="space-y-6">
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

          <div className="flex flex-col items-center md:items-start space-y-14">
            <div className="max-w-xs md:max-w-sm">
              <h4 className="font-hanora text-2xl gold-text tracking-[0.2em] font-black uppercase mb-8">
                Location
              </h4>

              <a
                href="https://maps.app.goo.gl/336pieByUpv2UFrX8"
                target={"_blank"}
                className="block text-white/70 text-base md:text-lg font-medium leading-relaxed hover:text-yellow-500 transition"
              >
                161, Guru Nanak Salai,
                <br />
                Velachery,
                <br />
                Chennai – 600042
              </a>
            </div>

            <div>
              <h4 className="font-hanora text-2xl gold-text tracking-[0.2em] font-black uppercase mb-6">
                Contact
              </h4>
              <a
                href="mailto:juno@gurunanakcollege.edu.in"
                className="text-white/70 text-base md:text-lg font-medium hover:text-yellow-500 transition"
              >
                juno@gurunanakcollege.edu.in
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center lg:items-end">
            <h4 className="font-hanora text-2xl gold-text tracking-[0.2em] font-black uppercase mb-10">
              Follow Us
            </h4>

            <div className="card-glass w-44 h-44 rounded-[2rem] flex items-center justify-center group cursor-pointer transition-all duration-500 hover:border-yellow-500/40 hover:scale-105">
              <a href="https://www.instagram.com/juno_gnc/" target={"_blank"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16 text-white/40 group-hover:text-yellow-500 transition-colors duration-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/5 text-center">
          <p className="text-white/30 text-[10px] tracking-[0.4em] uppercase font-bold">
            © 2026 JUNO Edition III. All Rights Reserved.
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
  <a href={`tel:${link}`} className="group block">
    <h5 className="text-white font-black text-lg tracking-[0.15em] uppercase mb-1 group-hover:text-yellow-500 transition">
      {name}
    </h5>
    <p className="text-white/40 text-[11px] tracking-[0.2em] font-bold uppercase mb-1">
      {role}
    </p>
    <p className="text-white/70 font-bold text-lg tracking-[0.2em]">{phone}</p>
  </a>
);
