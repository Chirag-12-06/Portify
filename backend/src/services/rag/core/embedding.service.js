import axios from "axios";

const EMBEDDING_SERVICE_URL =
  process.env.EMBEDDING_SERVICE_URL || "http://127.0.0.1:8000";

export async function generateEmbeddings(texts) {

  const response = await axios.post(
    `${EMBEDDING_SERVICE_URL}/embed`,
    { texts }
  );

  return response.data.embeddings;
}