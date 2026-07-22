import {
  BadgeCheck,
  Briefcase,
  BriefcaseBusiness,
  Code2,
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
    id: "technologies",
    name: "Technologies",
    icon: Code2,
    hoverIcon: Code2,
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
    icon: BadgeCheck,
    hoverIcon: BadgeCheck,
  },
  {
    id: "socials",
    name: "Socials",
    icon: Speech,
    hoverIcon: Handshake,
  },
];