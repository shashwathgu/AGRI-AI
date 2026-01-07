import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaShieldAlt, FaVirus, FaLeaf } from "react-icons/fa";

function Plantdis() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [precaution, setPrecaution] = useState("");
  const [confidence, setConfidence] = useState(null);
  const [severity, setSeverity] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
    setPrediction("");
    setPrecaution("");
    setConfidence(null);
    setSeverity("");
  };

  const handlePredict = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("file", selectedImage);

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8000/predict-disease", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setPrediction(response.data.disease || "No prediction returned");
      setPrecaution(response.data.precaution || "No precaution available");
      setConfidence(response.data.confidence || null);
      setSeverity(response.data.severity || "");
    } catch (error) {
      setPrediction("Error: " + (error.response?.data?.error || "Something went wrong"));
      setPrecaution("");
      setConfidence(null);
      setSeverity("");
    } finally {
      setLoading(false);
    }
  };

  const readableDisease = prediction?.split("__")[1]?.replace(/_/g, " ") || prediction;
  const cropName = prediction?.split("__")[0] || "";

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-black min-h-screen flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-black bg-opacity-40 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-10 w-full max-w-6xl space-y-8 text-white"
      >
        {/* Title */}
        <h2 className="text-4xl font-extrabold text-center tracking-wide flex items-center justify-center gap-2">
          Plant Disease Prediction
        </h2>

        {/* Intro Text */}
        {!preview && (
          <div className="text-center space-y-3">
            <p className="text-xl text-white">Upload a leaf image to detect plant health.</p>
            <p className="text-md italic text-white">Healthy crops, happy harvests. Let’s keep them glowing.</p>
          </div>
        )}

        {/* File Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="bg-white text-black rounded px-4 py-2 text-lg shadow-md w-full"
        />

        {/* Predict Button */}
        <motion.button
          onClick={handlePredict}
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 text-lg rounded-full shadow-lg transition-all duration-300 mx-auto block"
        >
          {loading ? "Predicting..." : "PREDICT DISEASE"}
        </motion.button>

        {/* Image + Result Side-by-Side */}
        {preview && prediction && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row gap-10 items-start"
          >
            {/* Image Preview */}
            <motion.img
              src={preview}
              alt="Preview"
              className="w-[320px] h-[300px] object-cover rounded-xl shadow-xl border-4 border-white/30"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            />

            {/* Result Panel */}
            <div className="flex-1 bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/20 space-y-6 text-white">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FaLeaf className="text-green-300 text-xl" />
                  <h3 className="text-lg font-bold">Crop</h3>
                </div>
                <p className="text-md">{cropName}</p>

                <div className="flex items-center gap-3">
                  <FaVirus className="text-pink-300 text-xl" />
                  <h3 className="text-lg font-bold">Disease</h3>
                </div>
                <p className="text-md">{readableDisease}</p>

                {precaution && (
                  <>
                    <div className="flex items-center gap-3">
                      <FaShieldAlt className="text-blue-300 text-xl" />
                      <h3 className="text-lg font-bold">Precaution</h3>
                    </div>
                    <p className="text-md">{precaution}</p>
                  </>
                )}

                {confidence && (
                  <>
                    <p className="text-sm text-purple-300">Confidence</p>
                    <p className="text-md">{(confidence * 100).toFixed(2)}%</p>
                  </>
                )}

                {severity && (
                  <>
                    <p className="text-sm text-purple-300">Severity Level</p>
                    <p className="text-md">{severity}</p>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default Plantdis;