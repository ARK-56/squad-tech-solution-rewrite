const body = document.body;
const revealNodes = document.querySelectorAll(".reveal");
const tiltNodes = document.querySelectorAll("[data-tilt]");
const themeToggles = document.querySelectorAll(".theme-toggle");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const filterChips = document.querySelectorAll(".filter-chip");
const filterItems = document.querySelectorAll(".filter-item");

const savedTheme = localStorage.getItem("squadtech-theme");
if (savedTheme === "light") {
  body.classList.add("light-theme");
}

revealNodes.forEach((node, index) => {
  if (node.classList.contains("stagger")) {
    node.style.setProperty("--delay", `${index * 90}ms`);
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -8% 0px"
  }
);

revealNodes.forEach((node) => observer.observe(node));

themeToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    body.classList.toggle("light-theme");
    localStorage.setItem("squadtech-theme", body.classList.contains("light-theme") ? "light" : "dark");
  });
});

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

tiltNodes.forEach((node) => {
  node.addEventListener("pointermove", (event) => {
    const rect = node.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -6;
    const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 8;

    node.style.setProperty("--mx", `${x}%`);
    node.style.setProperty("--my", `${y}%`);
    node.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });

  node.addEventListener("pointerleave", () => {
    node.style.transform = "";
    node.style.removeProperty("--mx");
    node.style.removeProperty("--my");
  });
});

filterChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const filter = chip.dataset.filter;

    filterChips.forEach((button) => button.classList.remove("is-active"));
    chip.classList.add("is-active");

    filterItems.forEach((item) => {
      const matches = filter === "all" || item.dataset.category === filter;
      item.classList.toggle("is-hidden", !matches);
    });
  });
});
