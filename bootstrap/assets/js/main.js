document.addEventListener("DOMContentLoaded", () => {
  initIcons();
  initDarkMode();
  initMobileMenu();
  initFooterYear();
});

function initIcons() {
  if (window.lucide) {
    lucide.createIcons();
  }
}

function initDarkMode() {
  const html = document.documentElement;
  const toggle = document.getElementById("theme-toggle");

  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (saved === "dark" || (!saved && prefersDark)) {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }

  toggle.addEventListener("click", () => {
    const isDark = html.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}

function initMobileMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  if (!menuToggle || !mobileMenu || !window.bootstrap) return;

  const bsCollapse =
    window.bootstrap.Collapse.getOrCreateInstance(mobileMenu, { toggle: false });

  mobileMenu.addEventListener("shown.bs.collapse", () => {
    menuToggle.classList.add("open");
  });
  mobileMenu.addEventListener("hidden.bs.collapse", () => {
    menuToggle.classList.remove("open");
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => bsCollapse.hide());
  });
}

function initFooterYear() {
  const el = document.getElementById("footer-year");
  if (el) el.textContent = new Date().getFullYear();
}