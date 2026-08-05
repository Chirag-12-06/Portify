import { Award, ExternalLink } from "lucide-react";
import { useState } from "react";
import CertificateSkillsModal from "./CertificateSkillsModal";

export default function CertificateCard({ certificate }) {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  return (
    <>
      <div
        onClick={() => setSelectedCertificate(certificate)}
        className="group hover:cursor-pointer rounded-2xl border border-slate-700/60 bg-slate-800/80 p-6 shadow-xl shadow-black/40 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/50"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-white">
                <img
                  src={certificate.issuer.logo}
                  alt={certificate.issuer.name}
                  className="h-full w-full object-contain p-2"
                />
              </div>

              <p className="text-xl">{certificate.issuer.name}</p>
            </div>

            <h3 className="text-2xl font-bold text-white">
              {certificate.title}
            </h3>
          </div>

          <div className="flex shrink-0 flex-col gap-2">
            {certificate.badgeImageUrl && (
              <a
                href={certificate.badgeImageUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-medium text-amber-300 transition-all hover:border-amber-400/60 hover:bg-amber-400/20"
              >
                <Award size={16} />
                Badge
              </a>
            )}

            <a
              href={certificate.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300 transition-all hover:border-cyan-400/60 hover:bg-cyan-400/20"
            >
              Credential
              <ExternalLink size={16} />
            </a>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-6 flex flex-wrap gap-2">
          {certificate.skills.slice(0, 5).map(({ skill }) => (
            <span
              key={skill.name}
              className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300"
            >
              {skill.name}
            </span>
          ))}

          {certificate.skills.length > 5 && (
            <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
              +{certificate.skills.length - 5} more
            </span>
          )}
        </div>
      </div>
      <CertificateSkillsModal
        certificate={selectedCertificate}
        open={!!selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />
    </>
  );
}
