import axios from "axios";

const EMBEDDING_SERVICE_URL =
  process.env.EMBEDDING_SERVICE_URL || "http://127.0.0.1:8000";

export async function generateEmbeddings(text) {
  const url = `${EMBEDDING_SERVICE_URL}/embed`;

  console.log("Embedding service URL:", url);

  const response = await axios.post(url, {
    texts: [text],
  });

  return response.data.embeddings[0];
}