import axios from "axios";

const EMBEDDING_SERVICE_URL = process.env.EMBEDDING_SERVICE_URL;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function generateEmbeddings(texts) {
  let lastError;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await axios.post(
        EMBEDDING_SERVICE_URL,
        { texts },
        { timeout: 120000 },
      );

      return response.data.embeddings;
    } catch (error) {
      lastError = error;

      const status = error.response?.status;
      const isRetryable = !status || [502, 503, 504].includes(status);

      if (!isRetryable || attempt === 3) {
        throw error;
      }

      const delay = attempt * 2000;

      console.log(
        `Embedding request failed (attempt ${attempt}/3). ` +
          `Retrying in ${delay / 1000}s...`,
      );

      await sleep(delay);
    }
  }

  throw lastError;
}
