# 🌱 AGRI.AI  
### AI-Driven Agricultural Decision Support System

AGRI.AI is an AI-powered web application designed to help farmers make **data-driven agricultural decisions**.  
It provides intelligent recommendations for crops, fertilizers, and plant disease detection using Machine Learning and Deep Learning models.

---

## ✨ Key Features

- 🌾 **Crop Recommendation** based on soil nutrients and environmental conditions  
- 🧪 **Fertilizer Suggestion** using nutrient deficiency analysis  
- 🌿 **Plant Disease Detection** from leaf images using CNN  
- 🌍 Farmer-friendly and scalable AI-based solution  

---

## 🧠 Technologies Used

### Frontend
- React.js  
- JavaScript (ES6)  
- Tailwind CSS  
- HTML & CSS  

### Backend
- Python  
- FastAPI  
- Flask  

### Machine Learning / Deep Learning
- Random Forest – Crop Recommendation  
- Decision Tree – Fertilizer Recommendation  
- Convolutional Neural Network (CNN) – Disease Detection  
- Scikit-learn  
- TensorFlow / Keras  

### Data Handling
- Pandas  
- NumPy  
- CSV datasets  
- PlantVillage dataset  

### Tools
- VS Code  
- Jupyter Notebook  
- Git & GitHub  

---

## ⚙️ System Workflow

1. User inputs soil or crop-related data  
2. Backend API processes the request  
3. ML/DL models generate predictions  
4. Results are returned and displayed on the UI  

---

## 🌐 API Endpoints

- `/predict-crop` – Crop recommendation  
- `/predict-fertilizer` – Fertilizer suggestion  
- `/predict-disease` – Plant disease detection  

---

## 🚀 Run the Project Locally

### Backend
pip install -r requirements.txt
uvicorn app:app --reload
Backend URL:
http://localhost:8000

### Frontend
npm install
npm start
Frontend URL:
http://localhost:3000

📁 Repository Notes
Datasets and trained model files are excluded to keep the repository lightweight

Focus is on application logic, ML pipelines, and API integration

This repository is intended for academic and portfolio demonstration