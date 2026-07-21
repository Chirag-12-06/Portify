import { useState } from "react";
import { useCertificates } from "../hooks/useCertificates";
import { useSkills } from "../hooks/useSkills";
import CertificateCard from "../components/sections/certificates/CertificateCard";

export default function CertificatesPage() {
  const [search, setSearch] = useState("");
  const [issuer, setIssuer] = useState("");
  const [skill, setSkill] = useState("");
  const { data: certificates } = useCertificates();
  const { data: skills } = useSkills();

  const filteredCertificates = certificates?.filter((certificate) => {
    const matchesSearch = certificate.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesIssuer = certificate.issuer
      .toLowerCase()
      .includes(issuer.toLowerCase());

    const matchesSkill =
      skill === "" ||
      certificate.skills?.some((s) =>
        s.skill.name.toLowerCase().includes(skill.toLowerCase()),
      );

    return matchesSearch && matchesIssuer && matchesSkill;
  });

  return (
    <main className="h-screen bg-background flex flex-col">
      {/* Fixed Header */}
      <div className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="mb-6">
            <h1 className="text-4xl font-bold">Certificates</h1>
            <p className="mt-2 text-muted-foreground">
              Browse all certificates.
            </p>
          </div>

          {/* Filters */}
          <div className="grid gap-4 md:grid-cols-3">
            <input
              type="text"
              placeholder="Search certificates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 rounded-lg border border-border bg-background px-4 outline-none transition focus:ring-2 focus:ring-primary"
            />

            <input
              type="text"
              placeholder="Issuer..."
              value={issuer}
              onChange={(e) => setIssuer(e.target.value)}
              className="h-11 rounded-lg border border-border bg-background px-4 outline-none transition focus:ring-2 focus:ring-primary"
            />

            <select
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              className="h-11 rounded-lg border border-border bg-background px-4 outline-none transition focus:ring-2 focus:ring-primary"
            >
              <option value="">All Skills</option>

              {skills?.map((skill) => (
                <option
                  className="text-black"
                  key={skill.id}
                  value={skill.name}
                >
                  {skill.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full px-6 py-8">
          <div>
            {filteredCertificates?.map((certificate) => (
              <CertificateCard key={certificate.id} certificate={certificate} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
