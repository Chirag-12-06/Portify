import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import CertificateCard from "../components/sections/certificates/CertificateCard";
import Footer from "../components/sections/Footer";
import { useCertificates, useIssuers } from "../hooks/useCertificates";
import { useSkills } from "../hooks/useSkills";

export default function CertificatesPage() {
  const [search, setSearch] = useState("");
  const [issuer, setIssuer] = useState("");
  const [skill, setSkill] = useState("");
  const { data: certificates } = useCertificates();
  const { data: skills } = useSkills();
  const { data: issuers } = useIssuers();

  const filteredCertificates = certificates?.filter((certificate) => {
    const matchesSearch = certificate.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesIssuer = certificate.issuer.name
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
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold">Certificates</h1>
              <p className="mt-2 text-muted-foreground">
                Browse all certificates.
              </p>
            </div>

            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium transition hover:bg-accent hover:text-accent-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Home
            </Link>
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

            <select
              value={issuer}
              onChange={(e) => setIssuer(e.target.value)}
              className="h-11 rounded-lg border border-border bg-background px-4 outline-none transition focus:ring-2 focus:ring-primary"
            >
              <option value="" className="text-black">
                All Issuers
              </option>

              {issuers?.map((issuer) => (
                <option
                  className="text-black"
                  key={issuer.id}
                  value={issuer.name}
                >
                  {issuer.name}
                </option>
              ))}
            </select>

            <select
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              className="h-11 rounded-lg border border-border bg-background px-4 outline-none transition focus:ring-2 focus:ring-primary"
            >
              <option value="" className="text-black">
                All Skills
              </option>

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
          <Footer />
        </div>
      </div>
    </main>
  );
}
