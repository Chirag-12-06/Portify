import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Drawer from "../components/layout/Sidebar/Drawer";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Skills from "../components/sections/Skills";
import Experience from "../components/sections/Experience";
import Projects from "../components/sections/Projects";
import Certificates from "../components/sections/Certificates";
import Education from "../components/sections/Education";
import Socials from "../components/sections/Socials";
import Footer from "../components/sections/Footer";
import ContactBar from "../components/layout/ContactBar";
import useActiveSection from "../hooks/useActiveSection";

export default function MainLayout() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  
  useActiveSection(setActiveSection);

  return (
    <>
      <Navbar 
      activeSection={activeSection}
        />

      <Drawer
        open={open}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Certificates />
        <Socials />
        <Footer />
      </main>

      <ContactBar />

      <Outlet />
    </>
  );
}
