import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Drawer from "../components/layout/Sidebar/Drawer";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Technologies from "../components/sections/Technologies";
import Skills from "../components/sections/Skills";
import Experience from "../components/sections/Experience";
import Projects from "../components/sections/Projects";
import Certificates from "../components/sections/certificates/Certificates";
import Education from "../components/sections/Education/Education";
import Socials from "../components/sections/Socials/Socials";
import Footer from "../components/sections/Footer";
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
        <Hero />
        <About />
        <Skills />
        <Technologies />
        <Projects />
        <Experience />
        <Education />
        <Certificates />
        <Socials />
        <Footer />
      </main>

      <ContactButton />

      <Outlet />
    </>
  );
}
