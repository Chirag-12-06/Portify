import { useEffect } from "react";

export default function useActiveSection(setActiveSection) {
  const ids = [
    "home",
    "about",
    "skills",
    "projects",
    "experience",
    "education",
    "certificates",
    "socials",
  ];

  useEffect(() => {
  const headings = ids
    .map(id => document.querySelector(`#${id} h1`))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.parentElement.id);
        }
      });
    },
    {
      rootMargin: "-80px 0px -80% 0px",
      threshold: 0,
    }
  );

  headings.forEach(h => observer.observe(h));

  return () => observer.disconnect();
}, []);
}