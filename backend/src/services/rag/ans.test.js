import { answerQuestion } from "./core/rag.service.js";

const result = await answerQuestion(
  // "Which projects demonstrate machine learning?",
  "What is Budgetwise?",
);

console.dir(result, { depth: null });
