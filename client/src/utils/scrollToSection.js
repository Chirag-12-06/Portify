export function scrollToSection(id) {
  const section = document.getElementById(id);
  if (!section) return;

  const heading = section.querySelector("[data-section-heading]");
  const navbarHeight = 80;

  const top =
    heading.getBoundingClientRect().top +
    window.scrollY -
    navbarHeight;

  window.scrollTo({
    top,
    behavior: "smooth",
  });
}