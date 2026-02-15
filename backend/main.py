
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from brain.core import brain
import uvicorn

app = FastAPI(title="Aerophysics Brain", version="1.0.0")

# Allow CORS for Express server and frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    query: str
    context: list = []
    userId: str = None

@app.get("/")
def read_root():
    return {"status": "online", "message": "Aerophysics Brain (Python) is active"}

@app.post("/chat")
async def chat_endpoint(request: QueryRequest):
    try:
        # The core logic is now async
        response = await brain.process_query(request.query, request.context)
        return response
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
def health_check():
    return {"status": "healthy", "engine": "FastAPI", "worker": "standard"}

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)
