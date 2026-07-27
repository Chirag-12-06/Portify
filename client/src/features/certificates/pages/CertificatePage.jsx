import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../footer/FooterSection";
import { skillLabels } from "../../skills/constants/skillLabels";
import { useSkills } from "../../skills/hooks/useSkills";
import CertificateCard from "../components/CertificateCard";
import { useCertificateCards, useIssuers } from "../hooks/useCertificates";

export default function CertificatesPage() {
  const [search, setSearch] = useState("");
  const [issuer, setIssuer] = useState("");
  const [skillCategory, setSkillCategory] = useState("");
  const [skill, setSkill] = useState("");

  const { data: certificates = [] } = useCertificateCards();
  const { data: skills = [] } = useSkills();
  const { data: issuers = [] } = useIssuers();

  // Unique skill categories
  const categories = [...new Set(skills.map((skill) => skill.category))];

  // Skills shown in dropdown
  const filteredSkills =
    skillCategory === ""
      ? skills
      : skills.filter((skill) => skill.category === skillCategory);

  // Filter certificates
  const filteredCertificates = certificates.filter((certificate) => {
    const matchesSearch = certificate.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesIssuer =
      issuer === "" ||
      certificate.issuer.name.toLowerCase() === issuer.toLowerCase();

    const matchesCategory =
      skillCategory === "" ||
      certificate.skills.some(({ skill }) => skill.category === skillCategory);

    const matchesSkill =
      skill === "" ||
      certificate.skills.some(
        ({ skill: certSkill }) =>
          certSkill.name.toLowerCase() === skill.toLowerCase(),
      );

    return matchesSearch && matchesIssuer && matchesCategory && matchesSkill;
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
          <div className="space-y-4">
            {/* Search */}
            <input
              type="text"
              placeholder="Search certificates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 w-full rounded-lg border border-border bg-background px-4 outline-none transition focus:ring-2 focus:ring-primary"
            />

            {/* Filters */}
            <div className="grid gap-4 md:grid-cols-3">
              {/* Issuer */}
              <select
                value={issuer}
                onChange={(e) => setIssuer(e.target.value)}
                className="h-11 rounded-lg border border-border bg-background px-4 outline-none transition focus:ring-2 focus:ring-primary"
              >
                <option value="" className="text-black">
                  All Issuers
                </option>

                {issuers.map((issuer) => (
                  <option
                    key={issuer.id}
                    value={issuer.name}
                    className="text-black"
                  >
                    {issuer.name}
                  </option>
                ))}
              </select>

              {/* Skill Category */}
              <select
                value={skillCategory}
                onChange={(e) => {
                  setSkillCategory(e.target.value);
                  setSkill("");
                }}
                className="h-11 rounded-lg border border-border bg-background px-4 outline-none transition focus:ring-2 focus:ring-primary"
              >
                <option value="" className="text-black">
                  All Categories
                </option>

                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                    className="text-black"
                  >
                    {skillLabels[category]}
                  </option>
                ))}
              </select>

              {/* Skill */}
              <select
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                className="h-11 rounded-lg border border-border bg-background px-4 outline-none transition focus:ring-2 focus:ring-primary"
              >
                <option value="" className="text-black">
                  All Skills
                </option>

                {filteredSkills.map((skill) => (
                  <option
                    key={skill.id}
                    value={skill.name}
                    className="text-black"
                  >
                    {skill.name}
                  </option>
                ))}
              </select>
            </div>
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
