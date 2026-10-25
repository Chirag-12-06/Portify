import { generateCertificateDocument } from "../source/certificate.document.js";
import { indexDocument } from "../core/indexing/index.service.js";

export async function indexCertificate(certificateId) {
  const document = await generateCertificateDocument(certificateId);

  return indexDocument(document);
}
