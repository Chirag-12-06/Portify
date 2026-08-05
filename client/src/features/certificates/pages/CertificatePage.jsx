import {
  ArrowLeft,
  Search,
  Database,
  Server,
  Award,
  ShieldCheck,
  LayoutGrid,
  Rocket,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../footer/FooterSection";
import Button from "../../../shared/components/ui/Button";
import Input from "../../../shared/components/ui/Input";
import Select from "../../../shared/components/ui/Select";
import LoadingScreen from "../../../shared/components/ui/LoadingScreen";
import { skillLabels } from "../../skills/constants/skillLabels";
import { useSkills } from "../../skills/hooks/useSkills";
import CertificateCard from "../components/CertificateCard";
import { useCertificateCards, useIssuers } from "../hooks/useCertificates";

const LOADING_STEPS = [
  { icon: Database, text: "Connecting to backend" },
  { icon: Server, text: "Fetching certificate data" },
  { icon: Award, text: "Loading credentials" },
  { icon: ShieldCheck, text: "Verifying badges" },
  { icon: LayoutGrid, text: "Forming certificate cards" },
  { icon: Rocket, text: "Ready to explore" },
];

export default function CertificatesPage() {
  const navigate = useNavigate();
  const [booting, setBooting] = useState(true);
  const [search, setSearch] = useState("");
  const [issuer, setIssuer] = useState("");
  const [skillCategory, setSkillCategory] = useState("");
  const [skill, setSkill] = useState("");

  const { data: certificates = [], isLoading } = useCertificateCards();
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
    <>
      {booting && (
        <LoadingScreen
          steps={LOADING_STEPS}
          isReady={!isLoading}
          onDone={() => setBooting(false)}
        />
      )}

      <main className="h-screen bg-slate-950 text-white flex flex-col">
      {/* Fixed Header */}
      <div className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/95 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold">Certificates</h1>
              <p className="mt-2 text-slate-400">Browse all certificates.</p>
            </div>

            <Button
              variant="secondary"
              icon={ArrowLeft}
              iconPosition="left"
              onClick={() =>
                navigate("/", {
                  state: { scrollTo: "certificates" },
                })
              }
            >
              Home
            </Button>
          </div>

          {/* Filters */}
          <div className="space-y-4">
            {/* Search */}
            <Input
              icon={Search}
              type="text"
              placeholder="Search certificates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {/* Filters */}
            <div className="grid gap-4 md:grid-cols-3">
              {/* Issuer */}
              <Select
                value={issuer}
                onChange={setIssuer}
                options={[
                  { value: "", label: "All Issuers" },
                  ...issuers.map((issuer) => ({
                    value: issuer.name,
                    label: issuer.name,
                  })),
                ]}
              />

              {/* Skill Category */}
              <Select
                value={skillCategory}
                onChange={(value) => {
                  setSkillCategory(value);
                  setSkill("");
                }}
                options={[
                  { value: "", label: "All Categories" },
                  ...categories.map((category) => ({
                    value: category,
                    label: skillLabels[category],
                  })),
                ]}
              />

              {/* Skill */}
              <Select
                value={skill}
                onChange={setSkill}
                options={[
                  { value: "", label: "All Skills" },
                  ...filteredSkills.map((skill) => ({
                    value: skill.name,
                    label: skill.name,
                  })),
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl px-6 py-8">
          {filteredCertificates.length > 0 ? (
            <div className="space-y-5">
              {filteredCertificates?.map((certificate) => (
                <CertificateCard
                  key={certificate.id}
                  certificate={certificate}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-slate-900/50 py-24 text-center">
              <p className="text-lg font-medium text-white">
                No certificates match your filters
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Try adjusting your search or filters.
              </p>
            </div>
          )}

          <Footer />
        </div>
      </div>
      </main>
    </>
  );
}
