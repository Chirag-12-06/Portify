import prisma from "../../../../lib/prisma.js";
import { indexExperience } from "../output/experience.rag.service.js";

export async function indexAllExperiences() {
  const experiences = await prisma.experience.findMany({
    select: {
      id: true,
    },
  });

  console.log(`Found ${experiences.length} experiences to index.`);

  let successful = 0;
  let failed = 0;

  for (const experience of experiences) {
    try {
      await indexExperience(experience.id);
      successful++;
      console.log(`Indexed experience: ${experience.id}`);
    } catch (error) {
      failed++;
      console.error(
        `Failed to index experience ${experience.id}:`,
        error.message
      );
    }
  }

  console.log("\nExperience indexing completed.");
  console.log(`Total experiences: ${experiences.length}`);
  console.log(`Successful: ${successful}`);
  console.log(`Failed: ${failed}`);

  return {
    total: experiences.length,
    successful,
    failed,
  };
}