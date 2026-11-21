const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector("#nav-links");
const backToTop = document.querySelector(".back-to-top");

menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.textContent = isOpen ? "×" : "☰";
});

navLinks.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
        navLinks.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.textContent = "☰";
    }
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => {
    revealObserver.observe(element);
});

window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 500);
}, { passive: true });