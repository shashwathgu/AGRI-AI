import React from "react";
import { motion } from "framer-motion";
import bg from "./img/bg-2.jpg";

function Des() {
  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-black min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-black bg-opacity-40 backdrop-blur-lg rounded-2xl p-10 w-full max-w-6xl shadow-xl text-white"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Image Section */}
          <div className="rounded-xl overflow-hidden h-[400px]">
            <img src={bg} alt="Agri AI Overview" className="w-full h-full object-cover rounded-xl" />
          </div>

          {/* Right Text Section */}
          <div className="space-y-6">
            <h2 className="text-green-400 font-bold text-3xl mb-4 text-center lg:text-left">
              🌿 Why AGRI.AI?
            </h2>
            <p className="text-lg leading-relaxed">
              AGRI.AI is an integrated platform that combines three powerful machine learning models to assist farmers, hobbyists, and agriculture enthusiasts.
            </p>

            <div className="space-y-4">
              <div>
                <h4 className="text-white font-bold text-xl">1. Crop Recommendation Model</h4>
                <p className="text-gray-300 text-md">
                  Takes user-input details such as nitrogen, potassium, phosphorous levels, temperature, humidity, and pH of the soil. Using this information, it predicts the most suitable crop varieties that can be grown, ensuring optimal yield and resource utilization.
                </p>
              </div>

              <div>
                <h4 className="text-white font-bold text-xl">2. Plant Disease Detection</h4>
                <p className="text-gray-300 text-md">
                  Keeping your plants healthy is crucial for a successful harvest. Our second ML model identifies and diagnoses plant diseases from uploaded images, helping farmers take timely action.
                </p>
              </div>

              <div>
                <h4 className="text-white font-bold text-xl">3. Fertilizer Recommender</h4>
                <p className="text-gray-300 text-md">
                  Recommends the fertilizer required based on detected disease and soil type. 
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Des;