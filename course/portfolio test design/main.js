// ===== THEME TOGGLE FUNCTIONALITY =====
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const body = document.body;

// Check for saved theme preference or default to 'light' mode
const currentTheme = localStorage.getItem("theme") || "light";
body.setAttribute("data-theme", currentTheme);

// Update icon based on current theme
updateThemeIcon(currentTheme);

themeToggle.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  if (theme === "dark") {
    themeIcon.className = "fas fa-sun";
  } else {
    themeIcon.className = "fas fa-moon";
  }
}

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector(".navbar");
let lastScrollTop = 0;

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Add/remove background when scrolling
  if (scrollTop > 50) {
    navbar.style.background =
      body.getAttribute("data-theme") === "dark"
        ? "rgba(17, 24, 39, 0.95)"
        : "rgba(255, 255, 255, 0.95)";
  } else {
    navbar.style.background =
      body.getAttribute("data-theme") === "dark"
        ? "rgba(17, 24, 39, 0.85)"
        : "rgba(255, 255, 255, 0.85)";
  }

  lastScrollTop = scrollTop;
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// ===== TYPING EFFECT FOR HERO TITLE =====
const heroTitle = document.querySelector(".hero-title");
const text = "Victor";
let index = 0;

function typeWriter() {
  if (index < text.length) {
    heroTitle.textContent = text.slice(0, index + 1);
    index++;
    setTimeout(typeWriter, 150);
  }
}

// Start typing effect when page loads
window.addEventListener("load", () => {
  setTimeout(typeWriter, 500);
});

// ===== SKILL CARDS HOVER EFFECT =====
const skillCards = document.querySelectorAll(".skill-card");

skillCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
  });
});

// ===== CONTACT FORM FUNCTIONALITY (if needed) =====
// You can add form handling here when you create a contact form

// ===== PRELOADER (OPTIONAL) =====
window.addEventListener("load", () => {
  const preloader = document.querySelector(".preloader");
  if (preloader) {
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.style.display = "none";
    }, 300);
  }
});

// ===== SOCIAL LINKS ANALYTICS (OPTIONAL) =====
document.querySelectorAll(".social-links a").forEach((link) => {
  link.addEventListener("click", (e) => {
    const platform = e.target.closest("a").title;
    console.log(`Clicked ${platform} link`);
    // Add analytics tracking here if needed
  });
});

// ===== PERFORMANCE MONITORING =====
window.addEventListener("load", () => {
  if ("performance" in window) {
    const loadTime =
      performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log(`Page loaded in ${loadTime}ms`);
  }
});

// ===== ERROR HANDLING =====
window.addEventListener("error", (e) => {
  console.error("JavaScript error:", e.error);
  // You can add error reporting here
});

// ===== ACCESSIBILITY ENHANCEMENTS =====
// Focus management for keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    document.body.classList.add("keyboard-navigation");
  }
});

document.addEventListener("mousedown", () => {
  document.body.classList.remove("keyboard-navigation");
});

// ===== LAZY LOADING IMAGES (if needed) =====
const images = document.querySelectorAll("img[data-src]");
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute("data-src");
      imageObserver.unobserve(img);
    }
  });
});

images.forEach((img) => imageObserver.observe(img));
