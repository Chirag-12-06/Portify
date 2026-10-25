import torch
import threading
import torch.nn.functional as F
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModel

# Limit CPU threading to reduce resource overhead.
torch.set_num_threads(1)
torch.set_num_interop_threads(1)

MODEL_NAME = "sentence-transformers/paraphrase-MiniLM-L3-v2"
BATCH_SIZE = 4
MAX_LENGTH = 256
EMBEDDING_DIMENSIONS = 384

app = FastAPI(title="Portify Embedding Service")


class EmbeddingRequest(BaseModel):
    texts: list[str]


class EmbeddingService:
    def __init__(self):
        self.tokenizer = None
        self.model = None
        self._load_lock = threading.Lock()

    def load_model(self):
        if self.model is None:
            with self._load_lock:
                if self.model is None:
                    print("LOADING TOKENIZER", flush=True)

                    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)

                    print("LOADING MODEL", flush=True)

                    print("ABOUT TO LOAD MODEL WEIGHTS", flush=True)

                    model = AutoModel.from_pretrained(
                        MODEL_NAME,
                        low_cpu_mem_usage=True,
                    )

                    print("MODEL WEIGHTS LOADED", flush=True)

                    model.eval()
                    model.requires_grad_(False)

                    self.tokenizer = tokenizer
                    self.model = model

                    print("MODEL READY", flush=True)
                    
    def generate(self, texts):
        if not texts:
            return []

        self.load_model()

        all_embeddings = []

        for start in range(0, len(texts), BATCH_SIZE):
            batch = texts[start:start + BATCH_SIZE]

            encoded = self.tokenizer(
                batch,
                padding=True,
                truncation=True,
                max_length=MAX_LENGTH,
                return_tensors="pt",
            )

            with torch.inference_mode():
                outputs = self.model(**encoded)

                token_embeddings = outputs.last_hidden_state
                attention_mask = encoded["attention_mask"]

                mask = attention_mask.unsqueeze(-1).to(
                    token_embeddings.dtype
                )

                summed = (token_embeddings * mask).sum(dim=1)
                counts = mask.sum(dim=1).clamp(min=1e-9)

                embeddings = summed / counts

                embeddings = F.normalize(
                    embeddings,
                    p=2,
                    dim=1,
                )

            all_embeddings.extend(embeddings.cpu().tolist())

        return all_embeddings


embedding_service = EmbeddingService()


@app.get("/")
def health_check():
    return {
        "status": "ok",
        "model": MODEL_NAME,
        "dimensions": EMBEDDING_DIMENSIONS,
    }


@app.post("/embed")
def generate_embeddings(request: EmbeddingRequest):
    if any(not text.strip() for text in request.texts):
        raise HTTPException(
            status_code=400,
            detail="Texts must not contain empty strings.",
        )

    try:
        embeddings = embedding_service.generate(request.texts)

        return {"embeddings": embeddings}

    except Exception as exc:
        print(f"EMBEDDING ERROR: {exc}", flush=True)
        raise HTTPException(
            status_code=500,
            detail="Failed to generate embeddings.",
        ) from exc