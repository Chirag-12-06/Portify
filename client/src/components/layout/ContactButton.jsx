import { Mail } from "lucide-react";
import { useProfile } from "../../hooks/useProfile";

export default function ContactButton() {
  const { data: profile } = useProfile();

  const handleMailClick = () => {
  if (!profile?.email) return;

  const subject = encodeURIComponent("Hello Chirag");
  const body = encodeURIComponent(`Hi Chirag,

I came across your portfolio and wanted to reach out.

[Your message here]

Best regards,
[Your Name]`);

  window.open(
    `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}&su=${subject}&body=${body}`,
    "_blank"
  );
};

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="group flex items-center gap-3 rounded-full border border-slate-700 bg-slate-900/90 px-6 py-3 shadow-2xl backdrop-blur-xl">
        <button
          onClick={handleMailClick}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/10 transition-all duration-300 hover:scale-110 hover:bg-cyan-500/20"
          aria-label="Send Email"
        >
          <Mail className="h-5 w-5 text-cyan-400" />
        </button>

        <div className="text-left">
          <p className="text-sm font-semibold text-white">Get in Touch</p>
          <p className="text-xs text-slate-400">
            Let's build something together
          </p>
        </div>
      </div>
    </div>
  );
}
