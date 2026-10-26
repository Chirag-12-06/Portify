import axios from "axios";

const EMBEDDING_SERVICE_URL = process.env.EMBEDDING_SERVICE_URL;

export async function generateEmbeddings(texts) {
  const response = await axios.post(EMBEDDING_SERVICE_URL, {
    texts,
  });

  return response.data.embeddings;
}