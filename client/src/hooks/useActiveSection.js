import { useEffect } from "react";

export default function useActiveSection(setActiveSection) {
  const ids = [
    "home",
    "about",
    "skills",
    "technologies",
    "projects",
    "experience",
    "education",
    "certificates",
    "socials",
  ];

  useEffect(() => {
    const navbarHeight = 64;

    const updateActiveSection = () => {
      let current = ids[0];

      for (const id of ids) {
        const section = document.getElementById(id);
        if (!section) continue;

        const heading = section.querySelector("[data-section-heading]");
        if (!heading) continue;

        const top = heading.getBoundingClientRect().top;

        if (top <= navbarHeight) {
          current = id;
        } else {
          break;
        }
      }

      setActiveSection(current);
    };

    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", updateActiveSection);
  }, [setActiveSection]);
}