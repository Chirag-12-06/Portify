from fastapi import FastAPI
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer

app = FastAPI()

model = SentenceTransformer("all-MiniLM-L6-v2")


class EmbeddingRequest(BaseModel):
    texts: list[str]


@app.get("/")
def health_check():
    return {
        "status": "ok",
        "model": "all-MiniLM-L6-v2",
        "dimensions": 384
    }


@app.post("/embed")
def generate_embeddings(request: EmbeddingRequest):
    embeddings = model.encode(
        request.texts,
        convert_to_numpy=True
    )

    return {
        "embeddings": embeddings.tolist()
    }