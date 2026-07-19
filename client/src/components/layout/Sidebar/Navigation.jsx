import { menuItems } from "../../../constants/navigation";
import NavItem from "./NavItem";

export default function Navigation({ activeSection }) {
  return (
    <nav className="flex flex-col gap-5">
      {menuItems.map((item) => (
        <NavItem key={item.id} item={item} activeSection={activeSection} />
      ))}
    </nav>
  );
}
