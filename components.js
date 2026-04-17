const siteBody = document.body;
const currentPage = siteBody.dataset.page || "home";

const navItems = [
  { href: "index.html", label: "Home", key: "home" },
  { href: "services.html", label: "Services", key: "services" },
  { href: "about.html", label: "About", key: "about" },
  { href: "portfolio.html", label: "Portfolio", key: "portfolio" },
  { href: "contact.html", label: "Contact", key: "contact" }
];

const footerLinksByPage = {
  home: [
    { href: "services.html", label: "Services" },
    { href: "portfolio.html", label: "Work" },
    { href: "contact.html", label: "Contact" }
  ],
  services: [
    { href: "about.html", label: "About" },
    { href: "portfolio.html", label: "Work" },
    { href: "contact.html", label: "Contact" }
  ],
  about: [
    { href: "services.html", label: "Services" },
    { href: "portfolio.html", label: "Work" },
    { href: "contact.html", label: "Contact" }
  ],
  portfolio: [
    { href: "services.html", label: "Services" },
    { href: "about.html", label: "About" },
    { href: "contact.html", label: "Contact" }
  ],
  contact: [
    { href: "services.html", label: "Services" },
    { href: "about.html", label: "About" },
    { href: "portfolio.html", label: "Work" }
  ]
};

const socialLinks = [
  {
    href: "https://www.instagram.com/squadtechsolution",
    label: "Instagram",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.9" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.4" cy="6.6" r="0.8" fill="currentColor" stroke="none"/></svg>`
  },
  {
    href: "https://www.linkedin.com/company/squad-tech-solution",
    label: "LinkedIn",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.9" stroke="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-12h4v2"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`
  },
  {
    href: "https://www.facebook.com/squadtechsolution",
    label: "Facebook",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.9" stroke="currentColor"><path d="M15 8h3V3h-3a5 5 0 0 0-5 5v3H7v5h3v5h5v-5h3l1-5h-4V8a1 1 0 0 1 1-1Z"/></svg>`
  }
];

function themeIconsMarkup() {
  return `
    <span class="theme-toggle-track">
      <span class="theme-icon sun" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
        </svg>
      </span>
      <span class="theme-icon moon" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
        </svg>
      </span>
    </span>
  `;
}

function navLinksMarkup(activeKey) {
  return navItems
    .map((item) => `<a href="${item.href}" class="nav-link${item.key === activeKey ? " is-active" : ""}">${item.label}</a>`)
    .join("");
}

function renderLoader() {
  return `
    <div class="page-loader" aria-hidden="true">
      <div class="loader-core">
        <div class="loader-ring"></div>
        <div class="loader-mark"><img src="loader-icon.png" alt=""></div>
      </div>
    </div>
  `;
}

function renderHeader(activeKey) {
  return `
    <header class="site-header">
      <nav class="site-nav">
        <a href="index.html" class="brand-lockup" aria-label="Squadtech Solution home">
          <img src="logo.png" data-logo-dark="logo.png" data-logo-light="logo-light.webp" alt="Squadtech Solution">
        </a>
        <button class="menu-toggle md:hidden" type="button" aria-expanded="false" aria-controls="mobile-menu">
          <span></span>
          <span></span>
        </button>
        <div class="nav-cluster hidden md:flex">
          ${navLinksMarkup(activeKey)}
        </div>
        <div class="header-actions hidden md:flex">
          <button class="theme-toggle" type="button" aria-label="Toggle light and dark mode">
            ${themeIconsMarkup()}
          </button>
          <a href="contact.html" class="primary-button magnetic-button">Start a Project</a>
        </div>
      </nav>
      <div id="mobile-menu" class="mobile-menu md:hidden">
        <div class="mobile-links">
          ${navLinksMarkup(activeKey)}
          <div class="mobile-actions">
            <button class="theme-toggle" type="button" aria-label="Toggle light and dark mode">
              ${themeIconsMarkup()}
            </button>
            <a href="contact.html" class="primary-button">Start a Project</a>
          </div>
        </div>
      </div>
    </header>
  `;
}

function renderFooter(activeKey) {
  const links = footerLinksByPage[activeKey] || footerLinksByPage.home;
  const footerLinks = links.map((item) => `<a href="${item.href}">${item.label}</a>`).join("");
  const socials = socialLinks
    .map((item) => `<a href="${item.href}" class="social-link" target="_blank" rel="noreferrer" aria-label="${item.label}">${item.icon}</a>`)
    .join("");

  return `
    <footer class="site-footer">
      <div class="section-inner footer-row">
        <div class="brand-lockup footer-logo">
          <img src="logo.png" data-logo-dark="logo.png" data-logo-light="logo-light.webp" alt="Squadtech Solution">
        </div>
        <p>Premium digital experiences for modern brands.</p>
        <div class="footer-meta">
          <div class="footer-links">
            ${footerLinks}
          </div>
          <div class="social-links">
            ${socials}
          </div>
        </div>
      </div>
    </footer>
  `;
}

const loaderSlot = document.querySelector("[data-site-loader]");
const headerSlot = document.querySelector("[data-site-header]");
const footerSlot = document.querySelector("[data-site-footer]");

if (loaderSlot) {
  loaderSlot.outerHTML = renderLoader();
}

if (headerSlot) {
  headerSlot.outerHTML = renderHeader(currentPage);
}

if (footerSlot) {
  footerSlot.outerHTML = renderFooter(currentPage);
}
