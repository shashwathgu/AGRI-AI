import React from "react";

function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-black shadow-md z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
        <nav className="flex justify-between items-center">
          {/* Brand */}
          <div className="text-xl font-mono font-bold text-white hover:text-green-400 transition duration-200">
            AGRI.<span className="text-green-400">AI</span>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex gap-x-8 font-mono font-bold text-base">
            <a
              href="#home"
              className="text-white hover:text-green-400 transition duration-200"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-white hover:text-green-400 transition duration-200"
            >
              About
            </a>
            <a
              href="#features"
              className="text-white hover:text-green-400 transition duration-200"
            >
              Features
            </a>
            <a
              href="#contact"
              className="text-white hover:text-green-400 transition duration-200"
            >
              Contact
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;