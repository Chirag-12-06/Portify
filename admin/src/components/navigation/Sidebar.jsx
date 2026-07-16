import { NavLink } from "react-router-dom";
import { Routes } from "../../lib/routes";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r p-4">
      <h2 className="mb-6 text-xl font-bold">Portfolio CMS</h2>

      <nav className="flex flex-col gap-3">
        <NavLink to={Routes.DASHBOARD}>Dashboard</NavLink>
      </nav>
      <nav className="flex flex-col gap-3">
        <NavLink to={Routes.PROFILE}>Profile</NavLink>
      </nav>
      <nav className="flex flex-col gap-3">
        <NavLink to={Routes.SOCIAL_LINKS}>Social Links</NavLink>
      </nav>
      <nav className="flex flex-col gap-3">
        <NavLink to={Routes.SKILLS}>Skills</NavLink>
      </nav>
      <nav className="flex flex-col gap-3">
        <NavLink to={Routes.EDUCATIONS}>Education</NavLink>
      </nav>
    </aside>
  );
}
