# Bearing Resistance Prediction System

<div align="center">

![Bearing Resistance ML](https://img.shields.io/badge/ML-XGBoost-orange?style=for-the-badge&logo=python)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi)
![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=for-the-badge&logo=vercel)
![Render](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render)

**An end-to-end Machine Learning web application that predicts soil bearing resistance using XGBoost — featuring a React dashboard, FastAPI backend, and real-time chart visualizations.**

[Live Demo](#live-links) · [Screenshots](#screenshots) · [Setup](#setup--installation) · [API Docs](#api-reference)

</div>

---

## Live Links

| Service | URL |
|---|---|
| **Frontend** | [https://bearing-resistance-ml.vercel.app](https://bearing-resistance-ml.vercel.app) |
| **Backend API** | [https://bearing-resistance-backend.onrender.com](https://bearing-resistance-backend.onrender.com) |
| **API Docs (Swagger)** | [https://bearing-resistance-backend.onrender.com/docs](https://bearing-resistance-backend.onrender.com/docs) |

> The backend is hosted on Render's free tier — first load may take **~30 seconds** to spin up.

---

## Screenshots

### Prediction Page
![Prediction Page](screenshots/Screenshot%202026-03-24%20011117.png)

---

### Input Form & Parameters
![Input Form](screenshots/Screenshot%202026-03-24%20011132.png)

---

### ML Output Result
![Output Result](screenshots/Screenshot%202026-03-24%20011140.png)

---

### Dashboard Overview
![Dashboard](screenshots/Screenshot%202026-03-24%20011227.png)

---

### Chart Visualizations
![Charts](screenshots/Screenshot%202026-03-24%20011234.png)

---

### Analytics & Insights
![Analytics](screenshots/Screenshot%202026-03-24%20011255.png)

---

## Features

- **ML Prediction Engine** — XGBoost model trained on geotechnical soil data for accurate bearing resistance predictions
- **Interactive Dashboard** — Real-time Chart.js visualizations including bar charts, line graphs, and scatter plots
- **FastAPI Backend** — High-performance REST API with auto-generated Swagger docs
- **Responsive UI** — Clean React + Tailwind CSS interface optimized for desktop and mobile
- **REST API Integration** — Seamless frontend-backend communication with proper error handling
- **Input Validation** — Real-time form validation with user-friendly error messages

---

## System Architecture

```
User Input
    │
    ▼
┌─────────────────────┐
│   React Frontend    │  ← Tailwind CSS, Chart.js
│   (Vercel)          │
└─────────┬───────────┘
          │  HTTP POST /predict
          ▼
┌─────────────────────┐
│   FastAPI Backend   │  ← Input validation, routing
│   (Render)          │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│   XGBoost ML Model  │  ← Trained on soil dataset
│   (.pkl / joblib)   │
└─────────┬───────────┘
          │  prediction value
          ▼
┌─────────────────────┐
│   JSON Response     │  → Displayed in React UI
│   { result: N }     │
└─────────────────────┘
```

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 18** | UI component framework |
| **Tailwind CSS** | Utility-first styling |
| **Chart.js** | Data visualizations & dashboards |
| **Axios** | HTTP client for API calls |
| **Vercel** | Deployment & hosting |

### Backend
| Technology | Purpose |
|---|---|
| **FastAPI** | REST API framework (Python) |
| **XGBoost** | Gradient boosting ML model |
| **Scikit-learn** | Preprocessing & model pipeline |
| **Joblib / Pickle** | Model serialization |
| **Uvicorn** | ASGI server |
| **Render** | Cloud deployment |

---

## Project Structure

```
bearing-resistance-ml/
│
├── frontend/                    # React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── PredictionForm.jsx
│   │   │   ├── ResultCard.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── tailwind.config.js
│   └── package.json
│
├── backend/                     # FastAPI application
│   ├── main.py
│   ├── model.py
│   ├── schemas.py
│   ├── model.pkl
│   └── requirements.txt
│
├── screenshots/                 # App screenshots
│   ├── Screenshot 2026-03-24 011117.png
│   ├── Screenshot 2026-03-24 011132.png
│   ├── Screenshot 2026-03-24 011140.png
│   ├── Screenshot 2026-03-24 011227.png
│   ├── Screenshot 2026-03-24 011234.png
│   └── Screenshot 2026-03-24 011255.png
│
├── .gitignore
└── README.md
```

---

## Setup & Installation

### Prerequisites
- Node.js ≥ 18
- Python ≥ 3.9
- pip

### 1. Clone the Repository

```bash
git clone https://github.com/debapriya-25/bearing-resistance-ml.git
cd bearing-resistance-ml
```

### 2. Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Backend runs at: `http://localhost:8000`  
Swagger docs at: `http://localhost:8000/docs`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend/` folder:

```env
VITE_API_URL=http://localhost:8000
```

```bash
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## API Reference

### `POST /predict`

Predict bearing resistance from soil parameters.

**Request Body:**
```json
{
  "cohesion": 25.5,
  "friction_angle": 30.0,
  "unit_weight": 18.0,
  "foundation_depth": 1.5,
  "foundation_width": 2.0
}
```

**Response:**
```json
{
  "bearing_resistance": 342.76,
  "unit": "kN/m²",
  "status": "success"
}
```

### `GET /health`

```json
{ "status": "ok" }
```

---

## ML Model Details

| Property | Value |
|---|---|
| **Algorithm** | XGBoost Regressor |
| **Input Features** | Cohesion, Friction Angle, Unit Weight, Foundation Depth & Width |
| **Target Variable** | Ultimate Bearing Resistance (kN/m²) |
| **Evaluation Metric** | RMSE, R² Score |

---

## Deployment

### Frontend → Vercel
1. Push code to GitHub
2. Connect repo on [vercel.com](https://vercel.com)
3. Set environment variable: `VITE_API_URL=https://bearing-resistance-backend.onrender.com`
4. Deploy 

### Backend → Render
1. Connect GitHub repo on [render.com](https://render.com)
2. Set **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
3. Set **Root Directory**: `backend`
4. Deploy 

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
⭐ If this project helped you, please consider giving it a star!
</div>
