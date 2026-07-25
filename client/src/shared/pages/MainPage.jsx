import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Drawer from "../components/layout/Sidebar/Drawer";
import HeroSection from "../../features/hero/HeroSection";
import AboutSection from "../../features/about/AboutSection";
import TechnologiesSection from "../../features/technologies/TechnologiesSection";
import SkillsSection from "../../features/skills/SkillsSection";
import ExperienceSection from "../../features/experience/ExperienceSection";
import ProjectsSection from "../../features/projects/ProjectsSection";
import CertificatesSection from "../../features/certificates/CertificatesSection";
import EducationSection from "../../features/education/EducationSection";
import SocialsSection from "../../features/socials/SocialsSection";
import FooterSection from "../../features/footer/FooterSection";
import ContactButton from "../components/layout/ContactButton";
import useActiveSection from "../hooks/useActiveSection";

export default function MainLayout() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useActiveSection(setActiveSection);

  return (
    <>
      <Navbar activeSection={activeSection} />

      <Drawer
        open={open}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main className="pb-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <TechnologiesSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <CertificatesSection />
        <SocialsSection />
        <FooterSection />
      </main>

      <ContactButton />

      <Outlet />
    </>
  );
}
