import axios from "axios";

const EMBEDDING_SERVICE_URL =
  process.env.EMBEDDING_SERVICE_URL || "http://127.0.0.1:8000";

export async function generateEmbeddings(text) {
  const response = await axios.post(
    `${process.env.EMBEDDING_SERVICE_URL}/embed`,
    {
      texts: [text],
    },
  );

  return response.data.embeddings[0];
}