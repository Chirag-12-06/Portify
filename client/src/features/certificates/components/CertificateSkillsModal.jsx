import Modal from "../../../shared/components/ui/Modal";
import { Award, ExternalLink } from "lucide-react";

export default function CertificateSkillsModal({ certificate, open, onClose }) {
  if (!certificate) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-8 pr-14">
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-start gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white">
              <img
                src={certificate.issuer.logo}
                alt={certificate.title}
                className="h-full w-full object-contain p-2"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">
                {certificate.title}
              </h2>

              <p className="mt-1 text-slate-400">{certificate.issuer.name}</p>
            </div>
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

        <div className="mt-8 border-t border-white/10 pt-6">
          <h3 className="mb-4 text-lg font-semibold text-white">
            Skills Learned
          </h3>

          <div className="flex flex-wrap gap-3">
            {certificate.skills.map(({ skill }) => (
              <span
                key={skill.id}
                className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300 transition-colors duration-200 hover:border-cyan-400/50 hover:bg-cyan-400/15"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
