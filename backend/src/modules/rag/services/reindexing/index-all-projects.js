import prisma  from "../../../../lib/prisma.js";
import { indexProject } from "../output/project.rag.service.js";

export async function indexAllProjects() {
  const projects = await prisma.project.findMany({
    select: {
      id: true,
    },
  });

  console.log(`Found ${projects.length} projects to index.`);

  let successful = 0;
  let failed = 0;

  for (const project of projects) {
    try {
      await indexProject(project.id);

      successful++;

      console.log(
        `Indexed project ${successful}/${projects.length}: ${project.id}`
      );
    } catch (error) {
      failed++;

      console.error(
        `Failed to index project ${project.id}:`,
        error.message
      );
    }
  }

  console.log("\nProject indexing completed.");
  console.log(`Total projects: ${projects.length}`);
  console.log(`Successful: ${successful}`);
  console.log(`Failed: ${failed}`);

  return {
    total: projects.length,
    successful,
    failed,
  };
}