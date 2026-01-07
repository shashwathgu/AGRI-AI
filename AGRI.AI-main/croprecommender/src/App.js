import "./App.css";
import Footer from "./footer";
import Header from "./header";
import React, { useEffect } from "react";
import Landing from "./landing";
import Des from "./des";
import Feature from "./feature";
import Croprecommend from "./croprecommend";
import Plantdis from "./plantdis";
import Fertilizer from "./fertilizer";
import Contact from "./contact"; // ✅ Restored contact section
import { inject } from "@vercel/analytics";
import { Analytics } from "@vercel/analytics/react";

inject();

function App() {
  useEffect(() => {
    async function fetchdata() {
      try {
        const formValues = {
          Temparature: 0,
          Humidity: 0,
          Moisture: 0,
          Nitrogen: 0,
          Potassium: 0,
          Phosphorous: 0,
          Soil_Type: "Sandy",
          Crop_Type: "Sugarcane",
        };

        const response = await fetch(
          "https://karthikfertapi.onrender.com/predict", // 🔧 Replace with your own backend soon
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formValues),
          }
        );

        const data = await response.json();
        console.log("🌱 Fertilizer prediction:", data.result);
      } catch (error) {
        console.error("❌ Prediction error:", error);
      }
    }

    fetchdata();
  }, []);

  return (
    <>
      <Analytics />
      <div id="top" className="flex flex-col">
        <Header />
        <Landing />

        {/* Sections stacked inline */}
        <section id="about" className="min-h-screen bg-slate-100">
          <Des />
        </section>

        <section id="features" className="min-h-screen bg-slate-100">
          <Feature />
        </section>

        <section id="croprecommender" className="min-h-screen bg-slate-100">
          <Croprecommend />
        </section>

        <section id="fertilizer" className="min-h-screen bg-slate-100">
          <Fertilizer />
        </section>

        <section id="plantdisease" className="min-h-screen bg-slate-100">
          <Plantdis />
        </section>

        <section id="contact" className="min-h-screen bg-white">
          <Contact />
        </section>
      </div>
      <Footer />
    </>
  );
}

export default App;