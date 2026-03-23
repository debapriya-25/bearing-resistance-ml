import os
import pickle
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from schemas import PredictionInput, PredictionOutput

app = FastAPI(
    title="Machine Learning Prediction API",
    description="API for serving ML model predictions",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔥 FIXED PATH (VERY IMPORTANT)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "pipeline.pkl")

model = None


@app.on_event("startup")
def startup_event():
    global model
    if os.path.exists(MODEL_PATH):
        try:
            with open(MODEL_PATH, "rb") as f:
                model = pickle.load(f)
            print("✅ Model loaded successfully")
        except Exception as e:
            print(f"❌ Model load failed: {e}")
    else:
        print("❌ Model file not found")


@app.get("/")
def read_root():
    return {
        "status": "online",
        "model_loaded": model is not None
    }


@app.post("/predict", response_model=PredictionOutput)
def predict(input_data: PredictionInput):

    if model is None:
        raise HTTPException(
            status_code=503,
            detail="Model not loaded"
        )

    try:
        # 🔥 FIXED (Pydantic v2)
        data_dict = input_data.model_dump()

        df = pd.DataFrame([data_dict])

        # Ensure column order
        df = df[['X1', 'X2', 'X3', 'X4', 'X5']]

        prediction = model.predict(df)

        return PredictionOutput(prediction=float(prediction[0]))

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )