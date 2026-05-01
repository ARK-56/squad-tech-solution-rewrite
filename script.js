const body = document.body;
const revealNodes = document.querySelectorAll(".reveal");
const tiltNodes = document.querySelectorAll("[data-tilt]:not(.article-shell)");
const themeToggles = document.querySelectorAll(".theme-toggle");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const filterChips = document.querySelectorAll(".filter-chip");
const filterItems = document.querySelectorAll(".filter-item");
const pageLoader = document.querySelector(".page-loader");
const pageLinks = document.querySelectorAll('a[href$=".html"]');
const themeLogos = document.querySelectorAll("[data-logo-dark]");
const formStatusNode = document.querySelector("[data-form-status]");
const faqGroups = document.querySelectorAll("[data-faq-categories]");

const faqs = [
  {
    cat: "general",
    q: "What exactly does Squadtech Solution do?",
    a: "We are a premium digital agency that designs and builds high-performance digital experiences for startups, service brands, and product-led companies. Our work spans brand identity, web design and development, social media marketing, SEO & PPC, media production, and dedicated remote staffing. Every project is shaped around a single goal: making your brand look, feel, and perform at the level you are actually aiming for."
  },
  {
    cat: "general",
    q: "Who do you typically work with?",
    a: "Our clients tend to be founders, marketing leads, and product directors who know their current digital presence is not reflecting the quality of their business. We work across industries — fintech, SaaS, e-commerce, professional services, and more — but the common thread is ambition. Our clients are not looking for a generic template; they want something built specifically for where they are going."
  },
  {
    cat: "general",
    q: "Are you a design agency, a development agency, or a marketing agency?",
    a: "All three, working as one. Most agencies split design and engineering, or treat marketing as a separate retainer. We intentionally keep these disciplines under one roof because the best digital results happen when your visual direction, your codebase, and your content strategy are built to reinforce each other — not handed off between different vendors."
  },
  {
    cat: "process",
    q: "How does a typical project get started?",
    a: "It starts with a discovery call — usually 30 minutes — where we map out your positioning, goals, timeline, and where your current digital presence is falling short. From there we put together a focused proposal. Once aligned, we move into strategic discovery: understanding your offer, your users, and what the final experience needs to communicate before any design begins."
  },
  {
    cat: "process",
    q: "How long does a project take from brief to delivery?",
    a: "Project timelines depend on scope. A brand identity system typically takes 2–4 weeks. A full website design and build ranges from 4–10 weeks depending on complexity. We are transparent about timelines upfront and do not pad them unnecessarily. We use focused feedback loops to keep the project moving without sacrificing quality at the final layer."
  },
  {
    cat: "process",
    q: "How involved does our team need to be during the project?",
    a: "Involved at the right moments — not constantly. We handle the heavy lifting of strategy, design, and execution. What we need from you is clear feedback at defined review stages, answers to questions about your brand and audience early on, and final approvals before delivery. We design our process so that your time investment produces maximum impact rather than maximum meetings."
  },
  {
    cat: "process",
    q: "Do you work with clients remotely or in-person?",
    a: "Fully remotely, and by design. Our team is distributed and has built a collaboration system specifically for async-first work — structured briefs, clear design rationale at every stage, and visible progress so nothing feels like a black box. Distance has never been a barrier to delivering premium work."
  },
  {
    cat: "services",
    q: "Can you handle just one service, or do I need to take a bundle?",
    a: "Either works. Some clients come to us for a single service — a brand identity refresh, a new website, or an SEO strategy — while others engage us across multiple disciplines simultaneously. We are just as thorough on a focused single-service engagement as we are on a full integrated project. You do not need to buy more than you need."
  },
  {
    cat: "services",
    q: "What does 'Dedicated Remote Staff' actually mean in practice?",
    a: "It means you get a skilled team member — or a small team — embedded into your workflow on a sustained basis. This works well for businesses that need consistent output (content creation, design work, marketing execution, operations support) but are not ready to hire full-time in-house. Your dedicated staff works within your tools and processes, not ours."
  },
  {
    cat: "services",
    q: "Do you build on specific platforms or are you platform-agnostic?",
    a: "We are platform-agnostic by default. Our recommendations are driven by what best serves your business — whether that means a custom-built frontend, a CMS like Webflow or Framer, or a commerce platform like Shopify. We do not push clients toward tools that are convenient for us at the expense of what is right for the project."
  },
  {
    cat: "cost",
    q: "How is your work priced?",
    a: "Projects are quoted on a per-scope basis, not by the hour. Once we understand your brief, we provide a fixed-price proposal so there are no surprises mid-project. Dedicated remote staff engagements are structured as monthly retainers. We are transparent about what is included and what falls outside scope before any agreement is signed."
  },
  {
    cat: "cost",
    q: "Is there a minimum project size?",
    a: "We do not publish a hard minimum, but we are most effective — and you get the most value — on projects where there is genuine strategic intent behind the work. A one-page website built in a day is not something we are suited for. If you are not sure whether your project is the right fit, the discovery call is the best place to find out."
  },
  {
    cat: "results",
    q: "How do you measure whether a project has been successful?",
    a: "Success is defined at the start, not after the fact. Before we design a single screen, we agree on what a successful outcome looks like for your business — whether that is demo bookings, conversion rate, time-on-site, brand perception, or launch speed. Every design decision is evaluated against those goals, not just whether it looks premium."
  },
  {
    cat: "results",
    q: "Can you guarantee results like conversion lifts or traffic growth?",
    a: "No agency can ethically guarantee specific performance numbers — too many variables sit outside any agency's control. What we can guarantee is the quality of strategic thinking, visual execution, and implementation that creates the conditions for those results. We will always tell you what is realistic for your project, not what sounds impressive in a proposal."
  },
  {
    cat: "results",
    q: "What happens after the project is delivered?",
    a: "Delivery is not a handoff and disappearance. We make sure your team is fully equipped to manage and operate what we have built — with documentation, a walkthrough, and a defined support window. For ongoing needs, many clients transition into a retainer or dedicated staff arrangement so the momentum built during the project does not stall."
  }
];

const faqCategoryLabels = {
  general: "General",
  process: "Process",
  services: "Services",
  cost: "Cost",
  results: "Results"
};

const savedTheme = localStorage.getItem("squadtech-theme");
if (savedTheme === "light") {
  body.classList.add("light-theme");
}

function syncThemeLogos() {
  const useLightLogo = body.classList.contains("light-theme");

  themeLogos.forEach((logo) => {
    logo.src = useLightLogo ? logo.dataset.logoLight : logo.dataset.logoDark;
  });
}

syncThemeLogos();

function renderFaqGroups() {
  faqGroups.forEach((group) => {
    const categories = Object.keys(faqCategoryLabels);
    const limit = Number(group.dataset.faqLimit || "0");
    const groupedOutput = categories
      .map((category) => {
        const categoryItems = faqs.filter((item) => item.cat === category);
        const output = limit > 0 ? categoryItems.slice(0, limit) : categoryItems;

        if (!output.length) {
          return "";
        }

        return `
          <div class="faq-category-group${category === categories[0] ? " is-active" : ""}" data-faq-panel="${category}">
            <div class="faq-category-head">
              <p class="faq-category-label">${faqCategoryLabels[category] || category}</p>
            </div>
            <div class="faq-category-accordion">
              ${output
                .map(
                  (item, index) => `
                    <div class="accordion-item${index === 0 ? " is-open" : ""}">
                      <button class="accordion-trigger" type="button" aria-expanded="${index === 0 ? "true" : "false"}">
                        ${item.q}
                        <span class="accordion-icon">+</span>
                      </button>
                      <div class="accordion-content">
                        <div class="accordion-content-inner">
                          <p>${item.a}</p>
                        </div>
                      </div>
                    </div>
                  `
                )
                .join("")}
            </div>
          </div>
        `;
      })
      .join("");

    const toggleMarkup = categories
      .map(
        (category, index) => `
          <button class="filter-chip faq-category-toggle${index === 0 ? " is-active" : ""}" type="button" data-faq-toggle="${category}">
            ${faqCategoryLabels[category] || category}
          </button>
        `
      )
      .join("");

    group.innerHTML = `
      <div class="faq-category-toggles" role="tablist" aria-label="FAQ categories">
        ${toggleMarkup}
      </div>
      <div class="faq-category-panels">
        ${groupedOutput}
      </div>
    `;
  });
}

function initFaqCategoryToggles() {
  faqGroups.forEach((group) => {
    const toggles = group.querySelectorAll("[data-faq-toggle]");
    const panels = group.querySelectorAll("[data-faq-panel]");

    toggles.forEach((toggle) => {
      if (toggle.dataset.faqToggleBound === "true") {
        return;
      }

      toggle.dataset.faqToggleBound = "true";

      toggle.addEventListener("click", () => {
        const target = toggle.dataset.faqToggle;

        toggles.forEach((item) => {
          item.classList.toggle("is-active", item === toggle);
        });

        panels.forEach((panel) => {
          panel.classList.toggle("is-active", panel.dataset.faqPanel === target);
        });
      });
    });
  });
}

function initAccordions() {
  const accordions = document.querySelectorAll(".accordion-item");

  accordions.forEach((item) => {
    if (item.dataset.accordionBound === "true") {
      return;
    }

    const trigger = item.querySelector(".accordion-trigger");
    if (!trigger) {
      return;
    }

    item.dataset.accordionBound = "true";

    trigger.addEventListener("click", () => {
      const isOpen = item.classList.toggle("is-open");
      trigger.setAttribute("aria-expanded", String(isOpen));
    });
  });
}

renderFaqGroups();
initFaqCategoryToggles();
initAccordions();

if (formStatusNode) {
  const params = new URLSearchParams(window.location.search);
  const status = params.get("status");

  if (status === "success") {
    formStatusNode.textContent = "Thanks. Your inquiry has been sent successfully and we will reply soon.";
    formStatusNode.classList.remove("is-hidden");
    formStatusNode.classList.add("is-success");
  } else if (status === "error") {
    formStatusNode.textContent = "We could not send your inquiry right now. Please try again or email inquiry@squadtechsol.com directly.";
    formStatusNode.classList.remove("is-hidden");
    formStatusNode.classList.add("is-error");
  } else if (status === "invalid") {
    formStatusNode.textContent = "Please complete the form with a valid name, email, and message.";
    formStatusNode.classList.remove("is-hidden");
    formStatusNode.classList.add("is-error");
  }
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
    syncThemeLogos();
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
      const categories = (item.dataset.category || "").split(/\s+/).filter(Boolean);
      const matches = filter === "all" || categories.includes(filter);
      item.classList.toggle("is-hidden", !matches);
    });

    if (window.location.pathname.endsWith("portfolio.html")) {
      if (filter === "all") {
        history.replaceState(null, "", "portfolio.html");
      } else {
        history.replaceState(null, "", `portfolio.html#${filter}`);
      }
    }
  });
});

if (filterChips.length && filterItems.length) {
  const filterFromHash = window.location.hash.replace("#", "");
  if (filterFromHash) {
    const targetChip = Array.from(filterChips).find((chip) => chip.dataset.filter === filterFromHash);
    if (targetChip) {
      targetChip.click();
    }
  }
}

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
