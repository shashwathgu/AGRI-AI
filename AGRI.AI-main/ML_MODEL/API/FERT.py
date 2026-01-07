from pydantic import BaseModel

class FERT(BaseModel):
    Temparature: float   # keep spelling same as dataset & backend
    Humidity: float
    Moisture: float
    Nitrogen: float
    Potassium: float
    Phosphorous: float
    Soil_Type: str
    Crop_Type: str
