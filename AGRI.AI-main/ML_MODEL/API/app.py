import uvicorn
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import numpy as np
import pickle
import joblib
import os
import pandas as pd
from PIL import Image
import logging

# Import schemas
from CROP import CROP
from FERT import FERT

# ================== Logging ==================
logging.basicConfig(level=logging.INFO)

# ================== FastAPI App ==================
app = FastAPI(
    title="Crop, Fertilizer & Disease Prediction API",
    version="1.1",
    description="API to recommend crops, fertilizers, and predict plant diseases",
)

# ================== CORS Middleware ==================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ================== Model Paths ==================
CROP_MODEL_PATH = "./croprecommender.pkl"
FERT_MODEL_PATH = "./fertilizer_model.pkl"
FERT_COLUMNS_PATH = "./fertilizer_columns.pkl"
DISEASE_MODEL_PATH = "./disease_model.pkl"

# ================== Model Checks ==================
for path, name in [
    (CROP_MODEL_PATH, "Crop model"),
    (FERT_MODEL_PATH, "Fertilizer model"),
    (FERT_COLUMNS_PATH, "Fertilizer columns"),
    (DISEASE_MODEL_PATH, "Disease model"),
]:
    if not os.path.exists(path):
        raise FileNotFoundError(f"❌ {name} not found at {path}")

# ================== Load Models ==================
with open(CROP_MODEL_PATH, "rb") as f:
    crop_model = pickle.load(f)
with open(FERT_MODEL_PATH, "rb") as f:
    fert_model = pickle.load(f)
with open(FERT_COLUMNS_PATH, "rb") as f:
    fert_columns = pickle.load(f)

# ✅ Load disease model using joblib
disease_model = joblib.load(DISEASE_MODEL_PATH)
print("✅ Disease model loaded:", type(disease_model))

# ✅ Precaution tips for each disease
precaution_map = {
    "Tomato___Late_blight": "Remove infected leaves, avoid overhead watering, and apply copper fungicide.",
    "Apple___Black_rot": "Prune infected branches and remove fallen fruit. Spray fungicide during bloom.",
    "Corn_(maize)___Common_rust_": "Use resistant varieties and rotate crops. Apply fungicide if needed.",
    "Grape___Black_rot": "Ensure good air circulation, prune infected parts, and apply protective sprays.",
    "Orange___Haunglongbing_(Citrus_greening)": "Remove infected trees and control psyllid insects.",
    "Potato___Early_blight": "Use certified seed, rotate crops, and apply protective fungicides.",
    "Peach___Bacterial_spot": "Avoid overhead irrigation and apply copper sprays during early growth.",
    "Strawberry___Leaf_scorch": "Improve drainage, remove infected leaves, and avoid overcrowding.",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus": "Control whiteflies and use resistant tomato varieties.",
    "Tomato___healthy": "No disease detected. Maintain regular watering and nutrient balance.",
    # Add more as needed...
}

# ================== Routes ==================

@app.get("/")
def index():
    return {"message": "🌱 Crop, Fertilizer & Disease Prediction API is running!"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/model-info")
def model_info():
    return {
        "crop_model": "croprecommender.pkl",
        "fertilizer_model": "fertilizer_model.pkl",
        "disease_model": "disease_model.pkl",
        "version": "1.1"
    }

# --- Crop Prediction Endpoint ---
@app.post("/predict-crop")
def predict_crop(data: CROP):
    try:
        logging.info("Received crop prediction request")
        feature_list = [
            data.N, data.P, data.K,
            data.temperature, data.humidity,
            data.ph, data.rainfall,
        ]
        single_pred = np.array(feature_list).reshape(1, -1)
        pred_label = crop_model.predict(single_pred)[0]
        crop_name = pred_label.strip().title() if isinstance(pred_label, str) else str(pred_label)
        return JSONResponse(content={
            "mapped_crop_name": crop_name,
            "message": f"Recommended Crop: {crop_name}",
        })
    except Exception as e:
        logging.error(f"Crop prediction error: {e}")
        return JSONResponse(status_code=500, content={"error": str(e)})

# --- Fertilizer Prediction Endpoint ---
@app.post("/predict-fertilizer")
def predict_fertilizer(data: FERT):
    try:
        logging.info("Received fertilizer prediction request")
        sample_df = pd.DataFrame([{
            "Temparature": data.Temparature,
            "Humidity": data.Humidity,
            "Moisture": data.Moisture,
            "Soil Type": data.Soil_Type,
            "Crop Type": data.Crop_Type,
            "Nitrogen": data.Nitrogen,
            "Potassium": data.Potassium,
            "Phosphorous": data.Phosphorous,
        }])
        sample_df = pd.get_dummies(sample_df)
        sample_df = sample_df.reindex(columns=fert_columns, fill_value=0)
        prediction = fert_model.predict(sample_df)[0]
        return JSONResponse(content={
            "fertilizer": prediction,
            "message": f"{prediction} is the best Fertilizer to use.",
        })
    except Exception as e:
        logging.error(f"Fertilizer prediction error: {e}")
        return JSONResponse(status_code=500, content={"error": str(e)})

# --- Disease Prediction Endpoint ---
@app.post("/predict-disease")
async def predict_disease(file: UploadFile = File(...)):
    try:
        logging.info("Received disease prediction image")
        image = Image.open(file.file).resize((64, 64)).convert('RGB')
        img_array = np.array(image).flatten().reshape(1, -1)
        logging.info(f"🧪 Image shape: {img_array.shape}")
        prediction = disease_model.predict(img_array)[0]
        logging.info(f"✅ Prediction: {prediction}")

        precaution = precaution_map.get(prediction, "No specific precaution available.")
        return JSONResponse(content={
            "disease": prediction,
            "precaution": precaution,
            "message": f"Predicted Disease: {prediction}",
        })
    except Exception as e:
        logging.error(f"Disease prediction error: {e}")
        return JSONResponse(status_code=500, content={"error": str(e)})

# ================== Run Server ==================
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)