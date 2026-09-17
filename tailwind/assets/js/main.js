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
  const header = document.getElementById("header");

  menuToggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");
    menuToggle.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    mobileMenu.setAttribute("aria-hidden", String(!isOpen));
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => closeMenu());
  });

  document.addEventListener("click", (e) => {
    if (!header.contains(e.target) && mobileMenu.classList.contains("open")) {
      closeMenu();
    }
  });

  function closeMenu() {
    mobileMenu.classList.remove("open");
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");
  }
}

function initFooterYear() {
  const el = document.getElementById("footer-year");
  if (el) el.textContent = new Date().getFullYear();
}
