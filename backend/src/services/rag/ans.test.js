import { answerQuestion } from "./core/querying/rag.service.js";

const result = await answerQuestion(
  // "Which projects demonstrate machine learning?",
  "machine learning projects?",
);

console.dir(result, { depth: null });
