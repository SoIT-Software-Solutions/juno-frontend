import heroLogo from "../images/JUNO_LOGO_NEW.png";
import { SecBtn } from "./ui/SecBtn";
import { TriBtn } from "./ui/TirBtn";

import CountdownTimer from "./CountdownTimer";

const WHATSAPP_LINK = "https://chat.whatsapp.com/H65JITps7qwF6ELa4s9D0B";
const RULE_BOOK_LINK =
  "https://drive.google.com/file/d/1_zD06Fv2D_8v97s-UMg7-eaYC5lTRDF1/view";

export const WhatsAppBtn: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <TriBtn onClick={() => (window.location.href = WHATSAPP_LINK)}>
      {children}
    </TriBtn>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="min-h-screen w-full relative flex items-center pt-20 px-6 lg:px-20 overflow-hidden select-none">
      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center">
        <div className="flex flex-col items-center lg:items-start">
          <img
            src={heroLogo}
            alt="JUNO Logo"
            className="w-full max-w-[900px] h-auto object-contain"
            loading="eager"
            decoding="async"
            draggable={false}
          />
        </div>

        <div className="flex flex-col items-center justify-center space-y-16 lg:space-y-24 w-full">
          <CountdownTimer />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md lg:max-w-lg">
            <SecBtn onClick={() => (window.location.href = "/register/1")}>
              Day 1 Registration
            </SecBtn>
            <SecBtn onClick={() => (window.location.href = "/register/2")}>
              Day 2 Registration
            </SecBtn>

            <TriBtn onClick={() => (window.location.href = RULE_BOOK_LINK)}>
              Rule Book
            </TriBtn>

            <TriBtn onClick={() => (window.location.href = WHATSAPP_LINK)}>
              Join Whatsapp
            </TriBtn>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
