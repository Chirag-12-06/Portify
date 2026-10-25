import { indexAllExperiences } from "../reindexing/index-all-experiences.js";
import prisma from "../../../../lib/prisma.js";

try {
  await indexAllExperiences();
} catch (error) {
  console.error("Experience re-indexing failed:", error);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}