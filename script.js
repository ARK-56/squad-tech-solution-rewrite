const body = document.body;
const revealNodes = document.querySelectorAll(".reveal");
const tiltNodes = document.querySelectorAll("[data-tilt]");
const themeToggles = document.querySelectorAll(".theme-toggle");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const filterChips = document.querySelectorAll(".filter-chip");
const filterItems = document.querySelectorAll(".filter-item");
const accordions = document.querySelectorAll(".accordion-item");
const pageLoader = document.querySelector(".page-loader");
const pageLinks = document.querySelectorAll('a[href$=".html"]');

const savedTheme = localStorage.getItem("squadtech-theme");
if (savedTheme === "light") {
  body.classList.add("light-theme");
}

window.addEventListener("load", () => {
  body.classList.remove("is-loading");

  if (!pageLoader) {
    return;
  }

  pageLoader.classList.add("is-hidden");
});

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

accordions.forEach((item) => {
  const trigger = item.querySelector(".accordion-trigger");
  if (!trigger) {
    return;
  }

  trigger.addEventListener("click", () => {
    const isOpen = item.classList.toggle("is-open");
    trigger.setAttribute("aria-expanded", String(isOpen));
  });
});

pageLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");

    if (!href || href.startsWith("#") || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    body.classList.add("is-loading");

    if (pageLoader) {
      pageLoader.classList.remove("is-hidden");
    }
  });
});
