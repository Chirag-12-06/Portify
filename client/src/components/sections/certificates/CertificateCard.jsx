import { ExternalLink } from "lucide-react";

export default function CertificateCard({ certificate }) {
  return (
    <div className="group rounded-2xl border border-slate-700/60 bg-slate-900/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/50">
      {/* Header */}
      <div className="flex items-start justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-lg font-bold text-cyan-400">
            {certificate.issuer.charAt(0)}
          </div>

          <div>
            <p className="text-sm font-medium text-slate-400">
              {certificate.issuer}
            </p>

            <h3 className="mt-1 text-xl font-semibold text-white">
              {certificate.title}
            </h3>
          </div>
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