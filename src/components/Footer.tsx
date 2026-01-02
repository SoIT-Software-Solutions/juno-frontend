import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="pt-32 pb-12 px-8 border-t border-yellow-500/10 bg-black/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-auto text-center md:text-left">
          {/* Column 1: For Queries */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-hanora text-2xl gold-text tracking-[0.2em] font-black mb-10 uppercase">
              For Queries
            </h4>
            <div className="flex flex-col gap-3">
              <ContactPerson
                name="Nirmal G"
                role="Chairman"
                phone="+91 74490 69661"
              />
              <ContactPerson
                name="Nirmal G"
                role="Chairman"
                phone="+91 74490 69661"
              />
              <ContactPerson
                name="Nirmal G"
                role="Chairman"
                phone="+91 74490 69661"
              />
            </div>
          </div>

          {/* Column 2: Location & Email */}
          <div className="flex flex-col items-center md:items-start lg:pl-10">
            <div className="mb-14">
              <h4 className="font-hanora text-2xl gold-text tracking-[0.2em] font-black mb-6 uppercase">
                Location
              </h4>
              <p className="text-white/70 text-base md:text-lg font-medium tracking-wide leading-relaxed">
                161, Guru Nanak Salai,
                <br />
                Velachery, Chennai - 600042
              </p>
            </div>

            <div>
              <h4 className="font-hanora text-2xl gold-text tracking-[0.2em] font-black mb-6 uppercase">
                Contact
              </h4>
              <p className="text-white/70 text-sm md:text-lg font-bold tracking-[0.15em] break-all uppercase">
                juno@gurunanakcollege.edu.in
              </p>
            </div>
          </div>

          {/* Column 3: Follow Us */}
          <div className="flex flex-col items-center lg:items-end">
            <h4 className="font-hanora text-2xl gold-text tracking-[0.2em] font-black mb-10 uppercase">
              Follow Us
            </h4>
            <div className="card-glass w-48 h-48 rounded-[2rem] flex items-center justify-center group cursor-pointer transition-all duration-500 hover:border-yellow-500/40 hover:scale-105">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-20 h-20 text-white/40 group-hover:text-yellow-500 transition-colors duration-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </div>
          </div>
        </div>

        <div className="mt-32 pt-10 border-t border-white/5 text-center flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0">
          <p className="text-white/30 text-[10px] tracking-[0.4em] uppercase font-bold">
            © 2024 JUNO Edition III. All Rights Reserved.
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
  link?: string | undefined;
}> = ({ name, role, phone, link }) => (
  <a href={link} className="group mb-3">
    <h5 className="text-white font-black text-lg tracking-[0.15em] mb-1 uppercase group-hover:text-yellow-500 transition-colors">
      {name}
    </h5>
    <p className="text-white/40 text-[11px] tracking-[0.2em] font-bold uppercase mb-1">
      {role}
    </p>
    <p className="text-white/70 font-bold text-lg tracking-[0.2em]">{phone}</p>
  </a>
);
