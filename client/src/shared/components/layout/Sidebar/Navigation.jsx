import { menuItems } from "./constants/navigation";
import NavItem from "./NavItem";

export default function Navigation({ activeSection }) {
  return (
    <nav className="flex w-full flex-col">
      {menuItems.map((item) => (
        <NavItem key={item.id} item={item} activeSection={activeSection} />
      ))}
    </nav>
  );
}
