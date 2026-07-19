import { Link } from "react-router-dom";
import { useProfile } from "../../hooks/useProfile";

export default function Navbar({ activeSection }) {
  const { data: profile, isLoading } = useProfile();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#111827]">
      <div className="relative flex items-center justify-end h-full px-8">
        <h1 className="absolute left-1/2 -translate-x-1/2 text-5xl capitalize font-bold text-white">
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
