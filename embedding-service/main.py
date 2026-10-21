from fastapi import FastAPI
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModel
import torch
import torch.nn.functional as F

app = FastAPI()


class EmbeddingService:
    def __init__(self):
        print("EMBEDDING SERVICE: INIT", flush=True)

        self.tokenizer = None
        self.model = None

    def load_model(self):
        if self.model is None:
            print("LOADING TOKENIZER", flush=True)

            self.tokenizer = AutoTokenizer.from_pretrained(
                "sentence-transformers/all-MiniLM-L6-v2"
            )

            print("TOKENIZER LOADED", flush=True)
            print("LOADING MODEL WEIGHTS", flush=True)

            self.model = AutoModel.from_pretrained(
                "sentence-transformers/all-MiniLM-L6-v2",
                low_cpu_mem_usage=True,
            )

            self.model.eval()
            self.model.requires_grad_(False)

            print("MODEL READY", flush=True)
            
    def generate(self, texts):
        self.load_model()

        encoded = self.tokenizer(
            texts,
            padding=True,
            truncation=True,
            max_length=256,
            return_tensors="pt",
        )

        with torch.inference_mode():
            outputs = self.model(**encoded)

            token_embeddings = outputs.last_hidden_state
            attention_mask = encoded["attention_mask"]

            input_mask_expanded = (
                attention_mask.unsqueeze(-1)
                .expand(token_embeddings.size())
                .float()
            )

            embeddings = torch.sum(
                token_embeddings * input_mask_expanded,
                dim=1,
            ) / torch.clamp(
                input_mask_expanded.sum(dim=1),
                min=1e-9,
            )

            embeddings = F.normalize(
                embeddings,
                p=2,
                dim=1,
            )

        return embeddings.cpu().numpy()


embedding_service = EmbeddingService()


class EmbeddingRequest(BaseModel):
    texts: list[str]


@app.get("/")
def health_check():
    return {
        "status": "ok",
        "model": "all-MiniLM-L6-v2",
        "dimensions": 384,
    }


@app.post("/embed")
def generate_embeddings(request: EmbeddingRequest):
    embeddings = embedding_service.generate(request.texts)

    return {
        "embeddings": embeddings.tolist()
    }