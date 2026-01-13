const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: "vertical",
  smooth: true,
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger);

  const projects = [
    {
      id: "reelify",
      title: "Reelify",
      number: "01",
      desc: "A Reels-style video feed built without frameworks, using Cloudinary for media.",
      tags: ["JS", "Cloudinary"],
      demo: "https://codebysrk.github.io/reelify/",
      code: "https://github.com/codebysrk/reelify",
      video: "./assets/projects/reelify.webm",
      poster: "./assets/projects/thumb-reelify.png",
      address: "github.com/codebysrk/reelify",
      tab: "Reelify",
    },
    {
      id: "apple",
      title: "Apple Clone",
      number: "02",
      desc: "Responsive clone of Apple's landing page featuring complex layouts and GSAP animations.",
      tags: ["GSAP", "Swiper.js"],
      demo: "https://codebysrk.github.io/apple-clone/",
      code: "https://github.com/codebysrk/apple-clone",
      video: "./assets/projects/apple-clone.webm",
      poster: "./assets/projects/thumb-apple.png",
      address: "apple.com",
      tab: "Apple",
    },
    {
      id: "sheryians",
      title: "Sheryians Clone",
      number: "03",
      desc: "Pixel-perfect clone of Sheryians Coding School featuring dynamic course listings.",
      tags: ["HTML", "CSS"],
      demo: "https://codebysrk.github.io/Sheryians-clone/",
      code: "https://github.com/codebysrk/Sheryians-clone",
      video: "./assets/projects/shery-clone.webm",
      poster: "./assets/projects/thumb-sheryians.png",
      address: "sheryians.com/courses",
      tab: "Sheryians",
    },
    {
      id: "rastro",
      title: "Rastro Dining",
      number: "04",
      desc: "Premium dining website with glassmorphism UI and IntersectionObserver animations.",
      tags: ["Tailwind", "IntersectionObserver"],
      demo: "https://codebysrk.github.io/Rastro/",
      code: "https://github.com/codebysrk/Rastro",
      video: "./assets/projects/rastro.webm",
      poster: "./assets/projects/thumb-rastro.png",
      address: "rastro.cafe",
      tab: "Rastro",
    },
    {
      id: "clock",
      title: "CyberClock",
      number: "05",
      desc: "Futuristic Neon Digital Clock with glassmorphism UI and customizable settings.",
      tags: ["HTML", "CSS", "JS"],
      demo: "https://codebysrk.github.io/CyberClock/",
      code: "https://github.com/codebysrk/CyberClock",
      video: "./assets/projects/clock.webm",
      poster: "./assets/projects/thumb-clock.png",
      address: "cyberclock.app",
      tab: "Clock",
    },
    {
      id: "portfolio",
      title: "Portfolio",
      number: "06",
      desc: "Personal portfolio with GSAP animations, smooth scroll, and premium design.",
      tags: ["Tailwind", "GSAP", "Lenis"],
      demo: "https://codebysrk.github.io/profile/",
      code: "https://github.com/codebysrk/profile",
      video: "./assets/projects/portfolio.webm",
      poster: "./assets/projects/thumb-portfolio.png",
      address: "shahrukh.dev",
      tab: "Portfolio",
    },
  ];

  const projectsContainer = document.getElementById("projects-container");
  if (projectsContainer) {
    projectsContainer.innerHTML = projects
      .map(
        (project, index) => `
      <div class="project-card group cursor-pointer gsap-reveal ${
        index % 2 !== 0 ? "md:mt-20" : ""
      }">
        <div class="browser mb-6">
          <div class="tabs-head">
            <div class="tabs">
              <div class="tab-open">
                <div class="rounded-l"><div class="mask-round"></div></div>
                <span>${project.tab}</span>
                <div class="close-tab">✕</div>
                <div class="rounded-r"><div class="mask-round"></div></div>
              </div>
            </div>
            <div class="window-opt">
              <button>-</button>
              <button>□</button>
              <button class="window-close">✕</button>
            </div>
          </div>
          <div class="head-browser">
            <button>←</button>
            <button disabled="">→</button>
            <input type="text" readonly value="${project.address}" />
            <button>⋮</button>
            <div class="star">★</div>
          </div>
          <div class="browser-content">
            <video
              src="${project.video}"
              poster="${project.poster}"
              muted
              loop
              preload="none"
              class="w-full h-full object-cover object-top"
              onmouseenter="this.play()"
              onmouseleave="this.pause();this.currentTime=0;this.load();"
            ></video>
            <div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
          </div>
        </div>

        <div class="flex justify-between items-start mb-2">
          <h3 class="font-serif text-3xl font-bold text-black group-hover:text-coral transition-colors">
            ${project.title}
          </h3>
          <span class="font-sans font-bold text-5xl text-stone/50 group-hover:text-stone transition-colors">
            ${project.number}
          </span>
        </div>
        <p class="font-sans text-lg text-gray-600 mb-4 line-clamp-2">
          ${project.desc}
        </p>
        <div class="flex gap-3 mb-4">
          ${project.tags
            .map(
              (tag) =>
                `<span class="px-3 py-1 bg-stone text-black text-xs font-bold rounded-full">${tag}</span>`
            )
            .join("")}
        </div>
        <div class="flex gap-4">
          <a href="${
            project.demo
          }" target="_blank" class="text-coral font-bold hover:text-black transition-colors border-b-2 border-coral hover:border-black">Live Demo</a>
          <a href="${
            project.code
          }" target="_blank" class="text-gray-500 font-bold hover:text-black transition-colors">View Code</a>
        </div>
      </div>
    `
      )
      .join("");
  }

  document.body.classList.add("is-loading");
  lenis.stop();

  const tl = gsap.timeline();
  tl.to("#preloader", {
    opacity: 0,
    duration: 0.8,
    delay: 0.8,
    onComplete: () => {
      document.getElementById("preloader").style.display = "none";
      document.body.classList.remove("is-loading");
      lenis.start();
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

  gsap.utils.toArray(".gsap-reveal").forEach((element) => {
    gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        start: "top 95%",
        toggleActions: "play none none reverse",
      },
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
    });
  });
});

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

const darkModeDesktop = document.getElementById("checkbox-desktop");
const darkModeMobile = document.getElementById("checkbox-mobile");
const htmlElement = document.documentElement;

localStorage.removeItem("theme");

function initDarkMode() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (prefersDark) {
    htmlElement.classList.add("dark");
    if (darkModeDesktop) darkModeDesktop.checked = true;
    if (darkModeMobile) darkModeMobile.checked = true;
  } else {
    htmlElement.classList.remove("dark");
    if (darkModeDesktop) darkModeDesktop.checked = false;
    if (darkModeMobile) darkModeMobile.checked = false;
  }
}

function toggleDarkMode(isDark) {
  if (isDark) {
    htmlElement.classList.add("dark");
  } else {
    htmlElement.classList.remove("dark");
  }
  if (darkModeDesktop) darkModeDesktop.checked = isDark;
  if (darkModeMobile) darkModeMobile.checked = isDark;
}

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

const systemThemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
systemThemeQuery.addEventListener("change", (e) => {
  const isDark = e.matches;
  if (isDark) {
    htmlElement.classList.add("dark");
  } else {
    htmlElement.classList.remove("dark");
  }
  if (darkModeDesktop) darkModeDesktop.checked = isDark;
  if (darkModeMobile) darkModeMobile.checked = isDark;
});

initDarkMode();

function initSmartHeader() {
  const header = document.querySelector(".gsap-header");
  if (!header) return;

  let lastScroll = 0;
  let ticking = false;

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScroll = window.scrollY;

        if (currentScroll > 100 && currentScroll > lastScroll) {
          header.style.transform = "translateY(-150%)";
        } else {
          header.style.transform = "translateY(0)";
        }
        lastScroll = currentScroll;
        ticking = false;
      });
      ticking = true;
    }
  });
}

function initActiveNav() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-btn");

  function highlightNav() {
    let current = "";

    // Logic: Find the LAST section whose top is at or above the viewport top (plus offset)
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      // offset 200px to trigger slightly before it hits absolute top
      if (sectionTop <= 200) {
        current = section.getAttribute("id");
      }
    });

    const sectionMap = {
      home: "tab-1",
      about: "tab-2",
      skills: "tab-3",
      projects: "tab-4",
      experience: "tab-5",
    };

    if (current && sectionMap[current]) {
      const radioButton = document.getElementById(sectionMap[current]);
      if (radioButton) radioButton.check = true; // Wait check or checked? checked
      if (radioButton) radioButton.checked = true;
    }
  }

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        highlightNav();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Init check
  highlightNav();
}

initSmartHeader();
initActiveNav();

function initStickyFooter() {
  const mainContent = document.getElementById("sticky-main");
  const footer = document.getElementById("contact");

  if (!mainContent || !footer) return;

  function adjustFooter() {
    const footerHeight = footer.offsetHeight;
    mainContent.style.marginBottom = `${footerHeight}px`;
  }

  window.addEventListener("load", adjustFooter);
  window.addEventListener("resize", adjustFooter);

  let intervals = 0;
  const interval = setInterval(() => {
    adjustFooter();
    intervals++;
    if (intervals > 20) clearInterval(interval);
  }, 100);

  const resizeObserver = new ResizeObserver(adjustFooter);
  resizeObserver.observe(footer);
}

initStickyFooter();
