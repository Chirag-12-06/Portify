import "dotenv/config";

import { answerQuestion } from "./core/querying/rag.service.js";

const questions = [
  "Which projects demonstrate MongoDB?",
  "Which certifications demonstrate CI/CD?",
  "DevOps projects?",
  "Which projects use React?",
  "Which projects use PostgreSQL?",
  "Tell me about BudgetWise.",
  "Tell me about RoamAI.",
  "What projects demonstrate machine learning?",
  "What projects demonstrate AI?",
  "Which certifications demonstrate machine learning?",
];

for (const question of questions) {
  console.log("\n========================================");
  console.log(`QUESTION: ${question}`);
  console.log("========================================");

  try {
    const result = await answerQuestion(question);

    console.dir(result, {
      depth: null,
    });
  } catch (error) {
    console.error("ERROR:", error);
  }
}