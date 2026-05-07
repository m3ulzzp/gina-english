from fastapi import FastAPI
from app.routers import words, progress, wrong_words

app = FastAPI(
    title="Gina学英语 API",
    description="沪教版小学英语同步背词工具 — 后端 API",
    version="0.1.0",
)

app.include_router(words.router, prefix="/api", tags=["单词"])
app.include_router(progress.router, prefix="/api", tags=["复习进度"])
app.include_router(wrong_words.router, prefix="/api", tags=["错词本"])


@app.get("/api/health")
def health_check():
    return {"status": "ok", "service": "gina-english-backend"}
