const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector("#nav-links");
const backToTop = document.querySelector(".back-to-top");

function setMenuOpen(isOpen) {
    navLinks.classList.toggle("open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Tutup menu" : "Buka menu");
    menuButton.textContent = isOpen ? "×" : "☰";
}

menuButton.addEventListener("click", () => {
    setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
});

navLinks.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
        setMenuOpen(false);
    }
});

document.addEventListener("click", (event) => {
    if (
        menuButton.getAttribute("aria-expanded") === "true"
        && !navLinks.contains(event.target)
        && !menuButton.contains(event.target)
    ) {
        setMenuOpen(false);
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
        setMenuOpen(false);
        menuButton.focus();
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 800 && menuButton.getAttribute("aria-expanded") === "true") {
        setMenuOpen(false);
    }
});

if ("IntersectionObserver" in window) {
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
} else {
    document.querySelectorAll(".reveal").forEach((element) => {
        element.classList.add("visible");
    });
}

function updateBackToTop() {
    backToTop.classList.toggle("visible", window.scrollY > 500);
}

window.addEventListener("scroll", updateBackToTop, { passive: true });
updateBackToTop();