/* ============================================
   MAIN JAVASCRIPT
   ============================================ */

// 1. LENIS SMOOTH SCROLL
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: "vertical",
  smooth: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 2. GSAP ANIMATIONS
document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger);

  // Add loading class to body initially
  document.body.classList.add("is-loading");
  lenis.stop(); // Stop smooth scroll during loading

  // Preloader & Hero Animation Timeline
  const tl = gsap.timeline();
  tl.to("#preloader", {
    opacity: 0,
    duration: 0.8,
    delay: 2,
    onComplete: () => {
      document.getElementById("preloader").style.display = "none";
      document.body.classList.remove("is-loading"); // Enable interactions
      lenis.start(); // Start smooth scroll
    },
  })
    .to(
      ".gsap-header",
      { y: 0, opacity: 1, autoAlpha: 1, duration: 1, ease: "power3.out" },
      "-=0.2"
    )
    .to(
      ".gsap-hero-text",
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      },
      "-=0.5"
    )
    .to(
      ".gsap-hero-img",
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "elastic.out(1, 0.75)",
      },
      "-=1.2"
    );

  // Scroll Reveal Animations for Sections
  gsap.utils.toArray(".gsap-reveal").forEach((element) => {
    gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        start: "top 85%", // Trigger when element is near bottom of view
        toggleActions: "play none none reverse",
      },
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
    });
  });
});

// 3. MOBILE MENU
const menuCheckbox = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const navLinks = document.querySelectorAll("#mobile-menu a");
const menuTl = gsap.timeline({ paused: true });

menuTl
  .to("#mobile-menu", { autoAlpha: 1, duration: 0.4, ease: "power2.out" })
  .from(
    ".mobile-nav-link",
    {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "power3.out",
    },
    "-=0.2"
  )
  .from(
    ".mobile-extras",
    { y: 20, opacity: 0, duration: 0.4, ease: "power3.out" },
    "-=0.3"
  );

menuCheckbox.addEventListener("change", function () {
  if (this.checked) {
    lenis.stop();
    menuTl.play();
  } else {
    lenis.start();
    menuTl.reverse();
  }
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuCheckbox.checked = false;
    lenis.start();
    menuTl.reverse();
  });
});

// 4. DARK MODE TOGGLE
const darkModeDesktop = document.getElementById("checkbox-desktop");
const darkModeMobile = document.getElementById("checkbox-mobile");
const htmlElement = document.documentElement;

// Check for saved preference or system preference
function initDarkMode() {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    htmlElement.classList.add("dark");
    if (darkModeDesktop) darkModeDesktop.checked = true;
    if (darkModeMobile) darkModeMobile.checked = true;
  } else {
    htmlElement.classList.remove("dark");
    if (darkModeDesktop) darkModeDesktop.checked = false;
    if (darkModeMobile) darkModeMobile.checked = false;
  }
}

// Toggle dark mode function
function toggleDarkMode(isDark) {
  if (isDark) {
    htmlElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    htmlElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
  // Sync both toggles
  if (darkModeDesktop) darkModeDesktop.checked = isDark;
  if (darkModeMobile) darkModeMobile.checked = isDark;
}

// Event listeners for both checkboxes
if (darkModeDesktop) {
  darkModeDesktop.addEventListener("change", function () {
    toggleDarkMode(this.checked);
  });
}

if (darkModeMobile) {
  darkModeMobile.addEventListener("change", function () {
    toggleDarkMode(this.checked);
  });
}

// Initialize on page load
initDarkMode();
