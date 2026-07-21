import { ExternalLink } from "lucide-react";

export default function CertificateCard({ certificate }) {
  return (
    <div className="group rounded-2xl border border-slate-700/60 bg-slate-900/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/50">
      {/* Header */}
      <div className="flex items-start justify-between gap-6">
        <div className="flex flex-col gap-2">
  <div className="flex items-center gap-2">
    <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-white">
      <img
        src={certificate.issuer.logo}
        alt={certificate.issuer.name}
        className="h-full w-full object-contain p-2"
      />
    </div>

    <p className="text-xl">
      {certificate.issuer.name}
    </p>
  </div>

  <h3 className="text-2xl font-bold text-white">
    {certificate.title}
  </h3>
</div>

        <a
          href={certificate.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-cyan-400 transition-all hover:border-cyan-400 hover:bg-cyan-400/10"
        >
          Credential
          <ExternalLink size={16} />
        </a>
      </div>

      {/* Skills */}
      <div className="mt-6 flex flex-wrap gap-2">
        {certificate.skills.slice(0, 5).map(({ skill }) => (
          <div
            key={skill.id}
            className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-3 py-1"
          >
            <span className="text-xs font-medium text-slate-300">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
