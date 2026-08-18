import axios from "axios";

export async function generateEmbeddings(texts) {
  if (!texts || texts.length === 0) {
    return [];
  }

 const response = await axios.post(
  `${EMBEDDING_SERVICE_URL}/embed`,
  {
    texts,
  }
);

  return response.data.embeddings;
}
