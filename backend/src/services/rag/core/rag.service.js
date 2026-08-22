import { generateEmbeddings } from "./embedding.service.js";
import { searchSimilarChunks } from "./search.service.js";
import { generateAnswer } from "./answer.service.js";

export async function answerQuestion(question) {
  if (!question || !question.trim()) {
    throw new Error("Question is required");
  }

  // Generate embedding for the user's question
  const [queryEmbedding] = await generateEmbeddings([question]);

  // Retrieve relevant chunks
  const chunks = await searchSimilarChunks(queryEmbedding, 5);

  // Generate answer from retrieved context
  const answer = await generateAnswer(question, chunks);

  return {
    answer,
    sources: chunks,
  };
}
