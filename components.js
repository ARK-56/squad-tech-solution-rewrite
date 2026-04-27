const siteBody = document.body;
const currentPage = siteBody.dataset.page || "home";

const navItems = [
  { href: "index.html", label: "Home", key: "home" },
  { href: "portfolio.html", label: "Portfolio", key: "portfolio" },
  { href: "services.html", label: "Services", key: "services" },
  { href: "about.html", label: "About", key: "about" },
  { href: "blog.html", label: "Blog", key: "blog" },
  { href: "contact.html", label: "Contact", key: "contact" }
];

const footerLinksByPage = {
  home: [
    { href: "services.html", label: "Services" },
    { href: "blog.html", label: "Blog" },
    { href: "portfolio.html", label: "Work" },
    { href: "contact.html", label: "Contact" }
  ],
  services: [
    { href: "about.html", label: "About" },
    { href: "blog.html", label: "Blog" },
    { href: "portfolio.html", label: "Work" },
    { href: "contact.html", label: "Contact" }
  ],
  about: [
    { href: "services.html", label: "Services" },
    { href: "blog.html", label: "Blog" },
    { href: "portfolio.html", label: "Work" },
    { href: "contact.html", label: "Contact" }
  ],
  blog: [
    { href: "services.html", label: "Services" },
    { href: "portfolio.html", label: "Work" },
    { href: "contact.html", label: "Contact" }
  ],
  portfolio: [
    { href: "services.html", label: "Services" },
    { href: "blog.html", label: "Blog" },
    { href: "about.html", label: "About" },
    { href: "contact.html", label: "Contact" }
  ],
  contact: [
    { href: "services.html", label: "Services" },
    { href: "blog.html", label: "Blog" },
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
    href: "https://www.facebook.com/squadtechsolution",
    label: "Facebook",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.9" stroke="currentColor"><path d="M15 8h3V3h-3a5 5 0 0 0-5 5v3H7v5h3v5h5v-5h3l1-5h-4V8a1 1 0 0 1 1-1Z"/></svg>`
  },
  {
    href: "https://www.pinterest.com/SquadTechSolution",
    label: "Pinterest",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="currentColor"><path d="M480 96L160 96C124.7 96 96 124.7 96 160L96 480C96 515.3 124.7 544 160 544L232.6 544L230.4 543.2C225 495.1 227.3 485.7 246.1 408.5C250 392.5 254.6 373.5 260 350.6C260 350.6 252.7 335.8 252.7 314.1C252.7 243.4 328.2 236.1 328.2 289.1C328.2 302.6 322.8 320.2 317 338.9C313.7 349.5 310.4 360.4 307.9 370.9C302.2 395.4 320.2 415.3 344.3 415.3C388 415.3 421.5 369.3 421.5 302.9C421.5 244.1 379.2 203 318.9 203C249 203 208 255.4 208 309.6C208 330.7 216.2 353.3 226.3 365.6C228.3 368 228.6 370.1 228 372.6C226.9 377.3 224.9 385.5 223.3 391.8C222.3 395.8 221.5 399.1 221.2 400.4C220.1 404.9 217.7 405.9 213 403.7C182.4 389.4 163.2 344.6 163.2 308.6C163.2 231.1 219.4 160 325.4 160C410.6 160 476.8 220.7 476.8 301.8C476.8 386.4 423.5 454.5 349.4 454.5C324.5 454.5 301.1 441.6 293.1 426.3C293.1 426.3 280.8 473.2 277.8 484.7C272.8 504 260.2 527.6 250.4 544L480 544C515.3 544 544 515.3 544 480L544 160C544 124.7 515.3 96 480 96z"/></svg>`
  },
  {
    href: "https://www.behance.net/squadtechsolution",
    label: "Behance",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="currentColor"><path d="M251.3 382.4C268.5 382.4 282.5 376.3 282.5 357C282.5 337.3 270.8 329.6 252.2 329.5L206.2 329.5L206.2 382.4L251.3 382.4zM245.9 252.8L206.3 252.8L206.3 297.6L249 297.6C264.1 297.6 274.8 291 274.8 274.7C274.8 257 261.1 252.8 245.9 252.8zM375.4 327.6L437.6 327.6C435.9 309.1 426.3 297.9 407.1 297.9C388.8 297.9 376.6 309.3 375.4 327.6zM480 96L160 96C124.7 96 96 124.7 96 160L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 160C544 124.7 515.3 96 480 96zM445.5 249L367.7 249L367.7 230.1L445.5 230.1L445.5 249zM289.7 307.7C313.3 314.4 324.7 335.2 324.7 359.3C324.7 398.3 292 415 257.1 415.2L164 415.2L164 223.2L254.5 223.2C287.4 223.2 315.9 232.5 315.9 270.7C315.9 290 306.9 299.5 289.7 307.7zM408.4 269.1C451.9 269.1 476 303.4 476 344.5C476 346.1 475.9 347.8 475.8 349.5C475.8 350.3 475.7 351 475.7 351.7L375.5 351.7C375.5 373.9 387.2 387 409.6 387C421.2 387 436.1 380.8 439.8 368.9L473.5 368.9C463.1 400.8 441.6 415.7 408.4 415.7C364.6 415.7 337.3 386 337.3 342.7C337.3 300.9 366 269.1 408.4 269.1z"/></svg>`
  },
  {
    href: "https://www.linkedin.com/company/squadtechsolution",
    label: "LinkedIn",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.9" stroke="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-12h4v2"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`
  },
  {
    href: "https://www.tiktok.com/@squadtechsolution",
    label: "TikTok",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="currentColor"><path d="M544.5 273.9C500.5 274 457.5 260.3 421.7 234.7L421.7 413.4C421.7 446.5 411.6 478.8 392.7 506C373.8 533.2 347.1 554 316.1 565.6C285.1 577.2 251.3 579.1 219.2 570.9C187.1 562.7 158.3 545 136.5 520.1C114.7 495.2 101.2 464.1 97.5 431.2C93.8 398.3 100.4 365.1 116.1 336C131.8 306.9 156.1 283.3 185.7 268.3C215.3 253.3 248.6 247.8 281.4 252.3L281.4 342.2C266.4 337.5 250.3 337.6 235.4 342.6C220.5 347.6 207.5 357.2 198.4 369.9C189.3 382.6 184.4 398 184.5 413.8C184.6 429.6 189.7 444.8 199 457.5C208.3 470.2 221.4 479.6 236.4 484.4C251.4 489.2 267.5 489.2 282.4 484.3C297.3 479.4 310.4 469.9 319.6 457.2C328.8 444.5 333.8 429.1 333.8 413.4L333.8 64L421.8 64C421.7 71.4 422.4 78.9 423.7 86.2C426.8 102.5 433.1 118.1 442.4 131.9C451.7 145.7 463.7 157.5 477.6 166.5C497.5 179.6 520.8 186.6 544.6 186.6L544.6 274z"/></svg>`
  },
  {
    href: "https://www.youtube.com/@SquadTechSolution",
    label: "YouTube",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="currentColor"><path d="M378 320.2L282.8 266.1L282.8 374.3L378 320.2zM480 96L160 96C124.7 96 96 124.7 96 160L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 160C544 124.7 515.3 96 480 96zM494.4 232.1C502 260.7 502 320.3 502 320.3C502 320.3 502 379.9 494.4 408.4C490.2 424.2 477.9 436.1 462.2 440.3C433.9 448 320 448 320 448C320 448 206.1 448 177.8 440.4C162.1 436.2 149.8 424.3 145.6 408.5C138 379.9 138 320.3 138 320.3C138 320.3 138 260.6 145.6 232.1C149.8 216.3 162.1 203.9 177.8 199.7C206.1 192 320 192 320 192C320 192 433.9 192 462.2 199.7C477.9 203.9 490.2 216.3 494.4 232.1z"/></svg>`
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
          <a href="https://calendly.com/squadtechsolution/30min" class="primary-button magnetic-button" target="_blank" rel="noreferrer">Start a Project</a>
        </div>
      </nav>
      <div id="mobile-menu" class="mobile-menu md:hidden">
        <div class="mobile-links">
          ${navLinksMarkup(activeKey)}
          <div class="mobile-actions">
            <button class="theme-toggle" type="button" aria-label="Toggle light and dark mode">
              ${themeIconsMarkup()}
            </button>
          <a href="https://calendly.com/squadtechsolution/30min" class="primary-button" target="_blank" rel="noreferrer">Start a Project</a>
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
