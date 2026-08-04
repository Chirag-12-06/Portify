import { useProfile } from "../../../features/profile/hooks/useProfile";

export default function Navbar({ activeSection }) {
  const { data: profile, isLoading } = useProfile();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 border-b border-white/10 bg-slate-900/80 shadow-lg shadow-black/40 backdrop-blur-xl">
      <div className="relative flex items-center justify-end h-full px-8">
        <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl capitalize font-bold text-white">
          {activeSection}
        </h1>

        {!isLoading && profile?.resumeUrl && (
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium"
          >
            Resume
          </a>
        )}
      </div>
    </header>
  );
}
