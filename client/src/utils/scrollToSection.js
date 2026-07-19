// export function scrollToSection(id) {
//   document.getElementById(id)?.scrollIntoView({
//     behavior: "smooth",
//     block: "start",
//   });
// }

export function scrollToSection(id) {
  const section = document.getElementById(id);
  if (!section) return;

  window.scrollTo({
    top: section.offsetTop,
    behavior: "smooth",
  });
}