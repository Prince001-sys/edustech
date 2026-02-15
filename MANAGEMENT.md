# 🕹️ Project Management Center

Here is everything you need to manage your Aerophysics Platform.

## 🌐 Public URLs
| Component | URL | Status |
|-----------|-----|--------|
| **Frontend** | [https://aerophysics-482f3.web.app](https://aerophysics-482f3.web.app) | 🟢 **LIVE** |
| **Backend** | *(Pending)* | 🟡 **Needs Deploy** |

---

## 🚀 How to Updates & Deploy

### 1. Update Frontend (UI/React)
When you change `.tsx` files or styles:
```powershell
# In the root folder:
npm run build
firebase deploy --only hosting
```

### 2. Update Backend (Python/AI)
When you change `main.py` or AI logic:
*(Requires Google Cloud SDK)*
```powershell
# Go to backend folder:
cd backend

# Deploy to Cloud Run:
gcloud run deploy aerophysics-backend --source . --region us-central1 --allow-unauthenticated
```
> **After Deploying Backend:**
> Copy the URL it gives you (e.g., `https://aerophysics-backend-xyz.run.app`).
> Tell me the URL so I can connect the Frontend to it!

---

## 🛠️ Consoles & Dashboards

- **Database & Auth (Firebase)**:  
  [https://console.firebase.google.com/project/aerophysics-482f3/overview](https://console.firebase.google.com/project/aerophysics-482f3/overview)
  *(Manage users, Firestore data, Hosting usage)*

- **Cloud Infrastructure (Google Cloud)**:  
  [https://console.cloud.google.com/home/dashboard?project=aerophysics-482f3](https://console.cloud.google.com/home/dashboard?project=aerophysics-482f3)
  *(Manage Cloud Run backend, Billing, Vertex AI)*

- **AI API Keys**:
  - **Gemini**: Managed in `backend/.env` (Local)
  - **Vertex AI**: Managed in Google Cloud Console

---

## 🧪 Testing Locally
If you want to test without deploying:
1.  **Start Backend**: `cd backend` -> `start_server.bat`
2.  **Start Frontend**: `npm run dev`
3.  Open `http://localhost:3000`

(The **Deployed Frontend** is currently configured to talk to your **Local Backend** for testing!)
