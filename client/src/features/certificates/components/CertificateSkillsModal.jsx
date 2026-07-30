import Modal from "../../../shared/components/ui/Modal";

export default function CertificateSkillsModal({ certificate, open, onClose }) {
  if (!certificate) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-8">
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-start gap-5">
            <img
              src={certificate.issuer.logo}
              alt={certificate.title}
              className="h-14 w-14 rounded-xl object-cover bg-white"
            />

            <div>
              <h2 className="text-2xl font-bold text-white">
                {certificate.title}
              </h2>

              <p className="mt-1 text-slate-400">{certificate.issuer.name}</p>
            </div>
          </div>

          <a
            href={certificate.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg
      border border-cyan-500/40
      bg-cyan-500/10
      px-4 py-2
      text-sm font-medium text-cyan-300
      transition-all
      hover:bg-cyan-500
      hover:text-slate-950"
          >
            View Credential ↗
          </a>
        </div>

        <div className="mt-8">
          <h3 className="mb-4 text-lg font-semibold text-white">
            Skills Learned
          </h3>

          <div className="flex flex-wrap gap-3">
            {certificate.skills.map(({ skill }) => (
              <span
                key={skill.id}
                className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300"
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
