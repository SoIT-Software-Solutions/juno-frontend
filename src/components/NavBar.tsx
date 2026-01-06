import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import NavLogo from "../images/juno2k26_navbar_logo.png";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-black/09 backdrop-blur-xl border-b border-white/5 transition-all duration-500">
        <div className="max-w-screen-2xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-3 cursor-pointer group mr-auto"
          >
            <div className="h-10 flex items-end justify-start transition-transform duration-500 group-hover:scale-110">
              <img
                src={NavLogo}
                className="w-full h-full object-contain"
                alt="JUNO Logo"
              />
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-10">
            <NavLink label="HOME" href="/" />
            <NavLink label="ABOUT" href="/about" />
            <NavLink label="EVENTS" href="/events" />
            <NavLink label="GALLERY" href="/gallery" />
            <NavLink label="TEAM" href="/team" />
            {/* <NavLink label="CONTACT US" href="/contact" /> */}
          </div>

          {/* Mobile menu icon */}
          <div
            className="md:hidden text-yellow-500 cursor-pointer"
            onClick={toggleMobileMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 8h16M4 16h16"
              />
            </svg>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 z-[90] bg-black/80 backdrop-blur-md transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`fixed top-0 right-0 h-full w-80 bg-black/95 backdrop-blur-xl border-l border-white/10 transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Close Button */}
          <div className="flex justify-end p-6">
            <button
              onClick={closeMobileMenu}
              className="text-white hover:text-yellow-500 transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
          </div>

          {/* Mobile Menu Links */}
          <div className="flex flex-col space-y-8 px-6 pt-8">
            <MobileNavLink label="HOME" href="/" onClick={closeMobileMenu} />
            <MobileNavLink
              label="ABOUT"
              href="/about"
              onClick={closeMobileMenu}
            />
            <MobileNavLink
              label="EVENTS"
              href="/events"
              onClick={closeMobileMenu}
            />
            <MobileNavLink
              label="GALLERY"
              href="/gallery"
              onClick={closeMobileMenu}
            />
            <MobileNavLink
              label="CONTACT US"
              href="/contact"
              onClick={closeMobileMenu}
            />
            <MobileNavLink label="ABOUT" href="/about" onClick={closeMobileMenu} />
            <MobileNavLink label="EVENTS" href="/events" onClick={closeMobileMenu} />
            <MobileNavLink label="GALLERY" href="/gallery" onClick={closeMobileMenu} />
            <MobileNavLink label="TEAM" href="/team" onClick={closeMobileMenu} />
            {/* <MobileNavLink label="CONTACT US" href="/contact" onClick={closeMobileMenu} /> */}
          </div>
        </div>
      </div>
    </>
  );
}

const NavLink: React.FC<{ label: string; href: string; active?: boolean }> = ({
  label,
  href,
  active,
}) => (
  <a
    href={href}
    className={`nav-link text-[11px] font-bold tracking-[0.25em] transition-all duration-300 ${
      active ? "text-yellow-500 active" : "text-white/60 hover:text-white"
    }`}
  >
    {label}
  </a>
);

const MobileNavLink: React.FC<{
  label: string;
  href: string;
  onClick: () => void;
}> = ({ label, href, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className="text-white/80 hover:text-yellow-500 text-lg font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:translate-x-2 block py-2"
  >
    {label}
  </a>
);
export default Navbar;
