import prisma from "../../../../lib/prisma.js";
import { indexAllCertificates } from "../reindexing/index-all-certificates.js";

try {
  await indexAllCertificates();
} catch (error) {
  console.error("Certificate re-indexing failed:", error);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
