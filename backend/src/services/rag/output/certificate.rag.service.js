import prisma from "../../../lib/prisma.js";
import { generateCertificateDocument } from "../source/certificate.document.js";
import { indexDocument } from "../core/index.service.js";

export async function indexCertificate(certificateId) {
  const document = await generateCertificateDocument(certificateId);

  return indexDocument(document);
}
