import React from "react";
import { motion } from "framer-motion";

function Feature() {
  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-black min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-black bg-opacity-40 backdrop-blur-lg rounded-2xl p-10 w-full max-w-6xl shadow-xl text-white"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* Crop Recommendation Card */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-gray-800 bg-opacity-60 rounded-xl p-8 shadow-lg flex flex-col justify-center items-center h-[500px]"
          >
            <h3 className="text-2xl font-bold text-green-400 mb-6">🌾 Crop Recommendation Model</h3>
            <a href="#croprecommender">
              <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                Try Now
              </button>
            </a>
          </motion.div>

          {/* Fertilizer Recommender Card */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-gray-800 bg-opacity-60 rounded-xl p-8 shadow-lg flex flex-col justify-center items-center h-[500px]"
          >
            <h3 className="text-2xl font-bold text-green-400 mb-6">🧪 Fertilizer Recommender</h3>
            <a href="#fertilizer">
              <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                Try Now
              </button>
            </a>
          </motion.div>

          {/* Plant Disease Detection Card */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-gray-800 bg-opacity-60 rounded-xl p-8 shadow-lg flex flex-col justify-center items-center h-[500px]"
          >
            <h3 className="text-2xl font-bold text-green-400 mb-6">🦠 Plant Disease Detection</h3>
            <a href="#plantdisease">
              <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                Try Now
              </button>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Feature;