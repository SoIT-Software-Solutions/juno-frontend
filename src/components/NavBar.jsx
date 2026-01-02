import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#000000b3] backdrop-blur-xl text-white shadow-2xl sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link
          to="/"
          className="bull-stand text-3xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"
        >
          JUNO 2K25
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link
            to="/"
            className="text-lg font-semibold hover:text-gray-400 transition-all duration-300"
          >
            Home
          </Link>
          <Link
            to="/events"
            className="text-lg font-semibold hover:text-gray-400 transition-all duration-300"
          >
            Events
          </Link>
          <Link
            to="/team"
            className="text-lg font-semibold hover:text-gray-400 transition-all duration-300"
          >
            Team
          </Link>
          <Link
            to="/contact"
            className="text-lg font-semibold hover:text-gray-400 transition-all duration-300"
          >
            Contact
          </Link>
        </div>

        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-2xl">☰</span>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#00010D] rounded-lg shadow-lg flex flex-col items-center space-y-2 py-2">
          <Link
            to="/"
            className="block px-4 py-2 text-white hover:text-gray-400"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/events"
            className="block px-4 py-2 text-white hover:text-gray-400"
            onClick={() => setIsOpen(false)}
          >
            Events
          </Link>
          <Link
            to="/team"
            className="block px-4 py-2 text-white hover:text-gray-400"
            onClick={() => setIsOpen(false)}
          >
            Team
          </Link>
          <Link
            to="/contact"
            className="block px-4 py-2 text-white hover:text-gray-400"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
