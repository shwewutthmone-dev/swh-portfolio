const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#navLinks");
const menuOverlay = document.querySelector(".menu-overlay");

const setMenuOpen = (open) => {
  navLinks.classList.toggle("open", open);
  document.body.classList.toggle("menu-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
};

menuButton.addEventListener("click", () => {
  setMenuOpen(!navLinks.classList.contains("open"));
});

menuOverlay.addEventListener("click", () => setMenuOpen(false));

navLinks.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => setMenuOpen(false)),
);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuOpen(false);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 620) setMenuOpen(false);
});

document.querySelector("#year").textContent = new Date().getFullYear();
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
} else {
  document
    .querySelectorAll(".reveal")
    .forEach((el) => el.classList.add("visible"));
}
