import { Link } from "react-router-dom";

export default function Navbar({ activeSection }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#111827]">
  <div className="relative flex items-center justify-end h-full px-8">
    <h1 className="absolute left-1/2 -translate-x-1/2 text-5xl font-bold capitalize">
      {activeSection}
    </h1>

    <button className="text-sm font-medium">
      Resume
    </button>
  </div>
</header>
  );
}
