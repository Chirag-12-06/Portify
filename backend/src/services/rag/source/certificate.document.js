import prisma from "../../../lib/prisma.js";

export async function generateCertificateDocument(certificateId) {
  const certificate = await prisma.certificate.findUnique({
    where: {
      id: certificateId,
    },
    include: {
      issuer: true,
      skills: {
        include: {
          skill: true,
        },
      },
    },
  });

  if (!certificate) {
    throw new Error("Certificate not found");
  }

  const skills = certificate.skills.map(({ skill }) => skill.name);

  const issueDate = certificate.issueDate.toISOString().split("T")[0];

  const expiryDate = certificate.expiryDate
    ? certificate.expiryDate.toISOString().split("T")[0]
    : "N/A";

  const content = `
Certificate: ${certificate.title}

Issuer: ${certificate.issuer.name}

Issue Date: ${issueDate}

Expiry Date: ${expiryDate}

Skills:
${skills.join(", ")}
`.trim();

  return {
    sourceType: "CERTIFICATE",
    sourceId: certificate.id,
    title: certificate.title,
    skills,
    technologies: [],
    content,
  };
}
