import {
  Award,
  BadgeCheck,
  Book,
  BookOpen,
  Briefcase,
  BriefcaseBusiness,
  CircuitBoard,
  Cpu,
  Folder,
  FolderOpen,
  GraduationCap,
  Handshake,
  School,
  Speech,
  UserRound,
  UserRoundCheck,
} from "lucide-react";

export const menuItems = [
  {
    id: "about",
    name: "About",
    icon: UserRound,
    hoverIcon: UserRoundCheck,
  },
  {
    id: "skills",
    name: "Skills",
    icon: Book,
    hoverIcon: BookOpen,
  },
  {
    id: "technologies",
    name: "Technologies",
    icon: Cpu,
    hoverIcon: CircuitBoard,
  },
  {
    id: "projects",
    name: "Projects",
    icon: Folder,
    hoverIcon: FolderOpen,
  },
  {
    id: "experience",
    name: "Experience",
    icon: Briefcase,
    hoverIcon: BriefcaseBusiness,
  },
  {
    id: "education",
    name: "Education",
    icon: School,
    hoverIcon: GraduationCap,
  },
  {
    id: "certificates",
    name: "Certificates",
    icon: Award,
    hoverIcon: BadgeCheck,
  },
  {
    id: "socials",
    name: "Socials",
    icon: Speech,
    hoverIcon: Handshake,
  },
];