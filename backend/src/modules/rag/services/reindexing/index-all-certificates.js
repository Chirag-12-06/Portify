import prisma from "../../../../lib/prisma.js";
import { indexCertificate } from "../output/certificate.rag.service.js";

export async function indexAllCertificates() {
  const certificates = await prisma.certificate.findMany({
    select: {
      id: true,
    },
  });

  console.log(`Found ${certificates.length} certificates to index.`);

  let successful = 0;
  let failed = 0;

  for (const certificate of certificates) {
    try {
      await indexCertificate(certificate.id);
      successful++;
      console.log(`Indexed certificate: ${certificate.id}`);
    } catch (error) {
      failed++;
      console.error(
        `Failed to index certificate ${certificate.id}:`,
        error.message,
      );
    }
  }

  console.log("\nCertificate indexing completed.");
  console.log(`Total certificates: ${certificates.length}`);
  console.log(`Successful: ${successful}`);
  console.log(`Failed: ${failed}`);

  return { total: certificates.length, successful, failed };
}
