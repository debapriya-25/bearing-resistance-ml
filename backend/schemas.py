from pydantic import BaseModel

class PredictionInput(BaseModel):
    X1: float
    X2: float
    X3: float
    X4: float
    X5: float

class PredictionOutput(BaseModel):
    prediction: float
