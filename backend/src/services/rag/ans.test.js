import { answerQuestion } from "./core/querying/rag.service.js";

const result = await answerQuestion(
  // "Which projects demonstrate mongodb?",
  "Which certifications demonstrate CI/CD?",
  // "devops projects?",
);

console.dir(result, { depth: null });
