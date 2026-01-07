import React, { useState } from "react";
import { motion } from "framer-motion";

// ---------- Form Component ----------
function Form({ onSubmit }) {
  const [formValues, setFormValues] = useState({
    Temparature: "",
    Humidity: "",
    Moisture: "",
    Soil_Type: "",
    Crop_Type: "",
    Nitrogen: "",
    Potassium: "",
    Phosphorous: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  const range100 = Array.from({ length: 100 }, (_, i) => (i + 1).toString());

  const dropdownOptions = {
    Temparature: ["15", "20", "25", "30", "35", "40"],
    Humidity: ["30", "40", "50", "60", "70", "80", "90"],
    Moisture: ["10", "20", "30", "40", "50", "60"],
    Soil_Type: [
      "Sandy", "Loamy", "Black", "Red", "Clayey",
      "Alluvial", "Laterite", "Peaty", "Saline", "Chalky"
    ],
    Crop_Type: [
      "Rice", "Wheat", "Maize", "Sugarcane", "Cotton",
      "Barley", "Groundnut", "Soybean", "Sunflower",
      "Jowar", "Bajra", "Pulses", "Tea", "Coffee"
    ],
    Nitrogen: range100,
    Potassium: range100,
    Phosphorous: range100,
  };

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-black min-h-screen flex items-center justify-center px-4 py-10">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-black bg-opacity-40 backdrop-blur-lg rounded-2xl p-10 w-full max-w-5xl shadow-xl text-white"
      >
        <h2 className="text-3xl font-bold text-center mb-10">🧪 Fertilizer Prediction Model</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(dropdownOptions).map(([name, options]) => (
            <div key={name}>
              <label htmlFor={name} className="block mb-2 font-semibold capitalize">
                {name.replace("_", " ")}
              </label>
              <select
                id={name}
                name={name}
                value={formValues[name]}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select {name.replace("_", " ")}</option>
                {options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
          >
            GET RECOMMENDATION
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
}

// ---------- Result Card Component ----------
function ResultCard({ result, onBack }) {
  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-black min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-black bg-opacity-40 backdrop-blur-lg rounded-2xl p-10 w-full max-w-5xl shadow-xl text-white"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center min-h-[400px]">
          <div className="text-white/80 text-lg leading-relaxed space-y-4">
            <p>This fertilizer is recommended based on your crop type, soil condition, and nutrient levels.</p>
            <p>Balanced fertilization improves plant health, boosts yield, and supports sustainable farming.</p>
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-green-400 mb-4">Recommended Fertilizer</h2>
            <p className="text-xl">{result}</p>
            <button
              onClick={onBack}
              className="mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              Back
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ---------- Main Component ----------
function FertilizerRecommend() {
  const [response, setResponse] = useState(null);
  const [showForm, setShowForm] = useState(true);

  const handleFormSubmit = async (formValues) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/predict-fertilizer", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      const data = await res.json();
      console.log("Fertilizer payload sent:", formValues);
      console.log("Fertilizer API response:", data);

      const fertName = data.fertilizer || "Unknown Fertilizer";

      setResponse(fertName);
      setShowForm(false);
    } catch (error) {
      console.error("Error:", error);
      setResponse("Unknown Fertilizer");
      setShowForm(false);
    }
  };

  const handleBack = () => {
    setResponse(null);
    setShowForm(true);
  };

  return showForm ? (
    <Form onSubmit={handleFormSubmit} />
  ) : (
    <ResultCard result={response} onBack={handleBack} />
  );
}

export default FertilizerRecommend;