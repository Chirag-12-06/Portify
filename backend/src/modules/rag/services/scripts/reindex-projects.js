import prisma  from "../../../../lib/prisma.js";
import { indexAllProjects } from "../reindexing/index-all-projects.js";

try {
  await indexAllProjects();
} catch (error) {
  console.error("Project re-indexing failed:", error);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
