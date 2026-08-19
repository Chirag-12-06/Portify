import prisma from "../../../lib/prisma.js";
import { generateCertificateDocument } from "../source/certificate.document.js";
import { indexDocument } from "../core/index.service.js";

export async function indexCertificate(certificateId) {
  const document = await generateCertificateDocument(certificateId);

  return indexDocument(document);
}

export async function indexAllCertificates() {
  const certificates = await prisma.certificate.findMany({
    select: {
      id: true,
    },
  });

  const results = [];

  for (const certificate of certificates) {
    try {
      const result = await indexCertificate(certificate.id);

      results.push({
        certificateId: certificate.id,
        success: true,
        result,
      });

      console.log(`Indexed certificate: ${certificate.id}`);
    } catch (error) {
      console.error(
        `Failed to index certificate ${certificate.id}:`,
        error.message
      );

      results.push({
        certificateId: certificate.id,
        success: false,
        error: error.message,
      });
    }
  }

  return results;
}