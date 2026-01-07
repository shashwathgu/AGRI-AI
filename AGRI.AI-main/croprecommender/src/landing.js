import React from "react";

function Landing() {
  return (
    <section
      id="home"
      className="min-h-screen bg-black flex items-center justify-center px-4 py-24"
    >
      <div className="relative max-w-6xl w-full glassy-card rounded-3xl shadow-2xl text-center p-10 animate-fadeIn">
        <h1 className="mx-auto max-w-4xl font-display text-5xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
          FUTURE{" "}
          <span className="text-green-400 animate-glow">MADE SIMPLE</span>{" "}
          WITH{" "}
          <span className="text-green-400 animate-glow">MACHINE LEARNING</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-gray-300">
          A GROUNDBREAKING INITIATIVE THAT HARNESSES THE POWER OF MACHINE
          LEARNING TO REVOLUTIONIZE AGRICULTURE PRACTICES.
        </p>

        <div className="mt-10 flex justify-center">
          <a
            href="#features"
            className="group inline-flex items-center justify-center rounded-full py-3 px-6 text-sm font-semibold bg-green-600 text-white hover:bg-green-700 hover:scale-105 transition-all duration-300 shadow-xl animate-pulse focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            VIEW PREDICTIONS
          </a>
        </div>
      </div>
    </section>
  );
}

export default Landing;