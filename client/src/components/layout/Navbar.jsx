import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b px-6 py-4">
      <h1 className="text-xl font-bold">Portfolio</h1>

      <div className="flex gap-6">
        <Link to="/">Home</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
}