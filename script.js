/*
  Saif Alam Portfolio — Production JavaScript
  HR & Administration Professional | Founder of EduSkillPath
  Interactions, animations, accessibility, and UI polish.
*/

"use strict";

(function () {
  // ───────────────────────────────────────
  // UTILITY HELPERS
  // ───────────────────────────────────────
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));
  const body = document.body;
  const root = document.documentElement;

  // Media query checks (cached for performance)
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const isFinePointer = window.matchMedia("(pointer: fine)");

  /**
   * Debounce utility — limits function calls to once per `delay` ms.
   * Used for scroll and resize handlers.
   */
  function debounce(fn, delay = 16) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  /**
   * Escape HTML special characters to prevent XSS in dynamically rendered content.
   */
  function escapeHTML(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  /**
   * Check if an element is truly focusable (visible and not disabled).
   * More reliable than checking offsetParent alone.
   */
  function isFocusable(element) {
    if (element.disabled) return false;
    if (element.getAttribute("aria-hidden") === "true") return false;
    const style = window.getComputedStyle(element);
    if (style.display === "none" || style.visibility === "hidden") return false;
    if (parseFloat(style.opacity) === 0) return false;
    return true;
  }

  // ───────────────────────────────────────
  // DATA
  // ───────────────────────────────────────

  const typedWords = [
    "HR Operations",
    "Office Administration",
    "Recruitment Support",
    "Documentation",
    "Employee Relations",
    "Office Coordination"
  ];

  const competencies = [
    { title: "Office Administration", copy: "Daily coordination, structured follow-through and reliable office support." },
    { title: "Scheduling", copy: "Calendar discipline, meeting readiness and professional time management." },
    { title: "Documentation", copy: "Accurate documents, organized files and controlled administrative records." },
    { title: "Compliance", copy: "Process awareness, confidentiality and careful record hygiene." },
    { title: "Recruitment Support", copy: "Candidate coordination, screening assistance and interview scheduling." },
    { title: "Employee Records", copy: "Personnel file updates, verification support and clean data maintenance." },
    { title: "Payroll Coordination", copy: "Attendance inputs, payroll assistance and timely internal follow-up." },
    { title: "MS Office & Excel", copy: "Reports, trackers, spreadsheets, forms and polished business documents." },
    { title: "Communication", copy: "Respectful, clear and professional communication across teams." },
    { title: "Reporting", copy: "Structured status updates, summaries and reliable information flow." },
    { title: "Data Management", copy: "Clean records, accuracy checks and organized digital systems." },
    { title: "Coordination", copy: "Smooth follow-ups between HR, administration, staff and management." }
  ];

  const hireReasons = [
    { title: "Attention to Detail", copy: "Every tracker, file and follow-up receives careful review." },
    { title: "Documentation Expert", copy: "Strong command over business documents and organized filing." },
    { title: "Administrative Excellence", copy: "Calm execution across schedules, records and office priorities." },
    { title: "Communication", copy: "Professional tone with employees, candidates and management." },
    { title: "Problem Solving", copy: "Practical thinking and ownership when processes need clarity." },
    { title: "Time Management", copy: "Reliable delivery across recurring, urgent and sensitive tasks." }
  ];

  const projectDetails = {
    process: {
      title: "Administrative Process Coordination",
      body: "Coordinated routine administrative flows by tracking document movement, organizing follow-ups, supporting office communication and keeping task ownership visible for smoother daily operations."
    },
    recruitment: {
      title: "Recruitment Support",
      body: "Supported hiring activity through candidate communication, profile organization, interview scheduling, document collection and timely updates to internal stakeholders."
    },
    records: {
      title: "Employee Record Management",
      body: "Maintained structured employee records, assisted verification, improved file readiness and supported confidential HR documentation with accuracy-focused practices."
    }
  };

  // Track the element that had focus before opening a modal/lightbox
  let lastFocusedElement = null;

  // ───────────────────────────────────────
  // INITIALIZATION
  // ───────────────────────────────────────

  document.addEventListener("DOMContentLoaded", init);
  window.addEventListener("load", hideLoader, { once: true });

  function init() {
    setCurrentYear();
    renderDynamicCards();
    initTheme();
    initNavigation();
    initTypingEffect();
    initRevealAnimations();
    initCounters();
    initCursorSystem();
    initParticles();
    initTiltCards();
    initMagneticElements();
    initRipples();
    initScrollEffects();
    initStepTimeline();
    initModals();
    initGalleryLightbox();
    initContactFormFeedback();
    initKeyboardAccessibility();
  }

  // ───────────────────────────────────────
  // LOADER
  // ───────────────────────────────────────

  function hideLoader() {
    const loader = $(".loader");
    if (!loader) return;

    window.setTimeout(() => {
      loader.classList.add("hide");
      loader.setAttribute("aria-hidden", "true");
    }, 520);
  }

  // ───────────────────────────────────────
  // FOOTER YEAR
  // ───────────────────────────────────────

  function setCurrentYear() {
    const year = $("#year");
    if (year) {
      year.textContent = String(new Date().getFullYear());
    }
  }

  // ───────────────────────────────────────
  // DYNAMIC CARDS (Skills & Why Hire Me)
  // ───────────────────────────────────────

  function renderDynamicCards() {
    const skillsGrid = $(".skills");
    const whyGrid = $(".why");

    if (skillsGrid && !skillsGrid.children.length) {
      skillsGrid.innerHTML = competencies.map((item, index) => createCardMarkup(item, index)).join("");
    }

    if (whyGrid && !whyGrid.children.length) {
      whyGrid.innerHTML = hireReasons.map((item, index) => createCardMarkup(item, index)).join("");
    }
  }

  function createCardMarkup(item, index) {
    const number = String(index + 1).padStart(2, "0");
    return [
      '<article class="tilt reveal">',
      '<span>' + escapeHTML(number) + '</span>',
      '<h3>' + escapeHTML(item.title) + '</h3>',
      '<p>' + escapeHTML(item.copy) + '</p>',
      '</article>'
    ].join("");
  }

  // ───────────────────────────────────────
  // THEME (Dark / Light)
  // ───────────────────────────────────────

  function initTheme() {
    const themeButton = $(".theme");
    if (!themeButton) return;

    const savedTheme = localStorage.getItem("saif-theme");
    const shouldUseLight = savedTheme === "light";
    applyTheme(shouldUseLight ? "light" : "dark");

    themeButton.addEventListener("click", () => {
      const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
      applyTheme(nextTheme);
      localStorage.setItem("saif-theme", nextTheme);
    });
  }

  function applyTheme(theme) {
    const themeButton = $(".theme");
    const themeIcon = $(".theme-icon");
    const isLight = theme === "light";

    if (isLight) {
      root.dataset.theme = "light";
    } else {
      root.removeAttribute("data-theme");
    }

    // Update the theme icon span with appropriate symbol
    if (themeIcon) {
      themeIcon.textContent = isLight ? "☀" : "☽";
    }

    // Update button aria-label for screen readers
    if (themeButton) {
      themeButton.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
    }
  }

  // ───────────────────────────────────────
  // NAVIGATION
  // ───────────────────────────────────────

  function initNavigation() {
    const menu = $(".menu");
    const nav = $(".nav");
    const navLinks = $$(".nav a");
    const sections = $$("main section[id]");

    // Mobile menu toggle
    if (menu) {
      menu.addEventListener("click", () => {
        const isOpen = body.classList.toggle("nav-open");
        menu.setAttribute("aria-expanded", String(isOpen));
      });
    }

    // Close nav when a link is clicked
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        closeNav(menu);
      });
    });

    // Close nav when clicking outside
    document.addEventListener("click", (event) => {
      if (!body.classList.contains("nav-open")) return;
      if (!nav || !menu) return;
      const target = event.target;
      if (nav.contains(target) || menu.contains(target)) return;
      closeNav(menu);
    });

    // Active section highlighting via Intersection Observer
    if ("IntersectionObserver" in window && sections.length) {
      const activeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === "#" + id);
          });
        });
      }, {
        threshold: .35,
        rootMargin: "-15% 0px -55% 0px"
      });

      sections.forEach((section) => activeObserver.observe(section));
    }
  }

  function closeNav(menu) {
    body.classList.remove("nav-open");
    if (menu) {
      menu.setAttribute("aria-expanded", "false");
    }
  }

  // ───────────────────────────────────────
  // TYPING EFFECT
  // ───────────────────────────────────────

  function initTypingEffect() {
    const target = $("#typing");
    if (!target) return;

    // For reduced motion preference, display the first word statically
    if (prefersReducedMotion.matches) {
      target.textContent = typedWords[0];
      return;
    }

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeLoop() {
      const currentWord = typedWords[wordIndex];

      if (isDeleting) {
        target.textContent = currentWord.slice(0, charIndex - 1);
        charIndex -= 1;
      } else {
        target.textContent = currentWord.slice(0, charIndex + 1);
        charIndex += 1;
      }

      let delay = isDeleting ? 42 : 76;

      // Pause at the end of typing a full word
      if (!isDeleting && charIndex === currentWord.length) {
        delay = 1250;
        isDeleting = true;
      }

      // Move to next word after fully deleting
      if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % typedWords.length;
        delay = 360;
      }

      window.setTimeout(typeLoop, delay);
    }

    typeLoop();
  }

  // ───────────────────────────────────────
  // SCROLL REVEAL ANIMATIONS
  // ───────────────────────────────────────

  function initRevealAnimations() {
    const revealItems = $$(".reveal");
    if (!revealItems.length) return;

    // Show immediately if reduced motion is preferred or IntersectionObserver is unsupported
    if (prefersReducedMotion.matches || !("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("show"));
      return;
    }

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target);
      });
    }, {
      threshold: .16,
      rootMargin: "0px 0px -70px 0px"
    });

    // Stagger animation delays for a cascading effect
    revealItems.forEach((item, index) => {
      item.style.transitionDelay = Math.min(index % 6, 5) * 70 + "ms";
      revealObserver.observe(item);
    });
  }

  // ───────────────────────────────────────
  // ANIMATED COUNTERS
  // ───────────────────────────────────────

  function initCounters() {
    const counters = $$("[data-count]");
    if (!counters.length) return;

    const animateCounter = (counter) => {
      const target = Number(counter.dataset.count || 0);
      const startTime = performance.now();
      const duration = 1500;

      if (prefersReducedMotion.matches) {
        counter.textContent = String(target);
        return;
      }

      function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic for smooth deceleration
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = String(Math.floor(eased * target));

        if (progress < 1) {
          window.requestAnimationFrame(update);
        }
      }

      window.requestAnimationFrame(update);
    };

    // Animate immediately if IntersectionObserver is not supported
    if (!("IntersectionObserver" in window)) {
      counters.forEach(animateCounter);
      return;
    }

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      });
    }, { threshold: .65 });

    counters.forEach((counter) => counterObserver.observe(counter));
  }

  // ───────────────────────────────────────
  // CUSTOM CURSOR & SPOTLIGHT
  // ───────────────────────────────────────

  function initCursorSystem() {
    const cursor = $(".cursor");
    const dot = $(".cursor-dot");
    const spotlight = $(".spotlight");

    if (!cursor || !dot || !spotlight) return;
    if (!isFinePointer.matches || prefersReducedMotion.matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let lastTrailTime = 0;

    // Track pointer movement
    window.addEventListener("pointermove", (event) => {
      if (event.pointerType === "touch") return;

      mouseX = event.clientX;
      mouseY = event.clientY;
      body.classList.add("ready");

      // Position the dot instantly (no lag)
      dot.style.left = mouseX + "px";
      dot.style.top = mouseY + "px";

      // Update spotlight position
      spotlight.style.setProperty("--x", mouseX + "px");
      spotlight.style.setProperty("--y", mouseY + "px");

      // Throttled trail creation
      const now = performance.now();
      if (now - lastTrailTime > 32) {
        createTrail(mouseX, mouseY);
        lastTrailTime = now;
      }
    }, { passive: true });

    // Smooth cursor follow animation (spring-like)
    function animateCursor() {
      cursorX += (mouseX - cursorX) * .18;
      cursorY += (mouseY - cursorY) * .18;
      cursor.style.left = cursorX + "px";
      cursor.style.top = cursorY + "px";
      window.requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Enlarge cursor on interactive elements
    const interactiveElements = $$("a, button, input, textarea, select");
    interactiveElements.forEach((element) => {
      element.addEventListener("pointerenter", () => body.classList.add("hover"));
      element.addEventListener("pointerleave", () => body.classList.remove("hover"));
    });
  }

  function createTrail(x, y) {
    const trail = document.createElement("span");
    trail.setAttribute("aria-hidden", "true");

    // Use an object for cleaner style assignment
    const styles = {
      position: "fixed",
      left: x + "px",
      top: y + "px",
      width: "6px",
      height: "6px",
      "border-radius": "50%",
      background: "rgba(34, 197, 94, .45)",
      "pointer-events": "none",
      "z-index": "9998",
      transform: "translate(-50%, -50%)",
      transition: "opacity .55s ease, transform .55s ease"
    };

    Object.assign(trail.style, styles);
    document.body.appendChild(trail);

    // Fade out and expand
    window.requestAnimationFrame(() => {
      trail.style.opacity = "0";
      trail.style.transform = "translate(-50%, -50%) scale(2.8)";
    });

    // Remove from DOM after animation completes
    window.setTimeout(() => {
      if (trail.parentNode) {
        trail.remove();
      }
    }, 580);
  }

  // ───────────────────────────────────────
  // FLOATING PARTICLES
  // ───────────────────────────────────────

  function initParticles() {
    const particlesContainer = $("#particles");
    if (!particlesContainer || prefersReducedMotion.matches) return;

    // Calculate particle count based on viewport width
    const count = Math.min(52, Math.max(28, Math.floor(window.innerWidth / 28)));
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i += 1) {
      const particle = document.createElement("span");
      particle.style.left = Math.random() * 100 + "%";
      particle.style.bottom = (Math.random() * 100 - 20) + "%";
      particle.style.animationDuration = (8 + Math.random() * 12) + "s";
      particle.style.animationDelay = (Math.random() * -12) + "s";
      particle.style.opacity = String(.22 + Math.random() * .55);
      fragment.appendChild(particle);
    }

    particlesContainer.replaceChildren(fragment);
  }

  // ───────────────────────────────────────
  // 3D TILT EFFECT
  // ───────────────────────────────────────

  function initTiltCards() {
    const tiltItems = $$(".tilt");
    if (!tiltItems.length || prefersReducedMotion.matches || !isFinePointer.matches) return;

    tiltItems.forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const rotateX = ((y / rect.height) - .5) * -8;
        const rotateY = ((x / rect.width) - .5) * 8;
        card.style.transform = "perspective(900px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) translateY(-4px)";
      });

      card.addEventListener("pointerleave", () => {
        card.style.transform = "";
      });
    });
  }

  // ───────────────────────────────────────
  // MAGNETIC ELEMENTS (buttons follow cursor slightly)
  // ───────────────────────────────────────

  function initMagneticElements() {
    const magneticItems = $$(".magnetic");
    if (!magneticItems.length || prefersReducedMotion.matches || !isFinePointer.matches) return;

    magneticItems.forEach((item) => {
      item.addEventListener("pointermove", (event) => {
        const rect = item.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        item.style.transform = "translate(" + (x * .18) + "px, " + (y * .18) + "px)";
      });

      item.addEventListener("pointerleave", () => {
        item.style.transform = "";
      });
    });
  }

  // ───────────────────────────────────────
  // RIPPLE EFFECT ON BUTTONS
  // ───────────────────────────────────────

  function initRipples() {
    $$(".ripple").forEach((button) => {
      button.addEventListener("click", (event) => {
        const rect = button.getBoundingClientRect();
        const ripple = document.createElement("span");
        ripple.className = "ripple-circle";
        ripple.style.left = event.clientX - rect.left + "px";
        ripple.style.top = event.clientY - rect.top + "px";
        button.appendChild(ripple);

        window.setTimeout(() => {
          if (ripple.parentNode) {
            ripple.remove();
          }
        }, 650);
      });
    });
  }

  // ───────────────────────────────────────
  // SCROLL EFFECTS
  // ───────────────────────────────────────

  function initScrollEffects() {
    const topButton = $(".top");
    const blobs = $$(".blob");
    let ticking = false;

    function updateScrollEffects() {
      const scrollY = window.scrollY || window.pageYOffset;

      // Parallax blob movement
      if (!prefersReducedMotion.matches) {
        blobs.forEach((blob, index) => {
          blob.style.translate = "0 " + (scrollY * (.03 + index * .015)) + "px";
        });
      }

      // Show/hide back-to-top button
      if (topButton) {
        topButton.classList.toggle("show", scrollY > 650);
      }

      ticking = false;
    }

    // Initial check
    updateScrollEffects();

    // Use requestAnimationFrame for smooth, throttled updates
    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateScrollEffects);
    }, { passive: true });
  }

  // ───────────────────────────────────────
  // STEP TIMELINE (About section)
  // ───────────────────────────────────────

  function initStepTimeline() {
    $$(".steps button").forEach((button) => {
      button.addEventListener("click", () => {
        // Remove active state from all step buttons
        $$(".steps button").forEach((item) => {
          item.classList.remove("active");
          item.setAttribute("aria-expanded", "false");
        });

        // Set active state on clicked button
        button.classList.add("active");
        button.setAttribute("aria-expanded", "true");
      });
    });
  }

  // ───────────────────────────────────────
  // MODALS (Project Details)
  // ───────────────────────────────────────

  function initModals() {
    const modal = $("#modal");
    if (!modal) return;

    const closeButton = $(".close", modal);
    const title = $("h2", modal);
    const bodyText = $(".modal-card > p:last-child", modal);

    // Open modal on project card click
    $$("[data-modal]").forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const detailKey = trigger.dataset.modal;
        const detail = projectDetails[detailKey];
        if (!detail) return;

        if (title) title.textContent = detail.title;
        if (bodyText) bodyText.textContent = detail.body;

        openLayer(modal);
      });
    });

    // Close modal
    if (closeButton) {
      closeButton.addEventListener("click", () => closeLayer(modal));
    }

    // Close on backdrop click
    modal.addEventListener("click", (event) => {
      if (event.target === modal) closeLayer(modal);
    });
  }

  // ───────────────────────────────────────
  // GALLERY LIGHTBOX
  // ───────────────────────────────────────

  function initGalleryLightbox() {
    const lightbox = $("#lightbox");
    if (!lightbox) return;

    const image = $("img", lightbox);
    const closeButton = $(".close", lightbox);

    // Open lightbox on gallery image click
    $$(".gallery button").forEach((button) => {
      button.addEventListener("click", () => {
        const source = $("img", button);
        if (!source || !image) return;

        image.src = source.currentSrc || source.src;
        image.alt = source.alt || "Gallery preview";
        openLayer(lightbox);
      });
    });

    // Close lightbox
    if (closeButton) {
      closeButton.addEventListener("click", () => closeLayer(lightbox));
    }

    // Close on backdrop click
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closeLayer(lightbox);
    });
  }

  // ───────────────────────────────────────
  // LAYER MANAGEMENT (Modal & Lightbox)
  // ───────────────────────────────────────

  function openLayer(layer) {
    // Save currently focused element for restoration
    lastFocusedElement = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;

    layer.classList.add("open");
    layer.setAttribute("aria-hidden", "false");
    body.classList.add("modal-open");

    // Move focus to first focusable element inside the layer
    const focusTarget = $("button, a, input, textarea, [tabindex]:not([tabindex='-1'])", layer);
    if (focusTarget) {
      focusTarget.focus({ preventScroll: true });
    }
  }

  function closeLayer(layer) {
    if (!layer || !layer.classList.contains("open")) return;

    layer.classList.remove("open");
    layer.setAttribute("aria-hidden", "true");

    // Only remove modal-open if no other layer is open
    const anyOpen = $$(".modal.open, .lightbox.open").length > 0;
    if (!anyOpen) {
      body.classList.remove("modal-open");
    }

    // Restore focus to the element that was focused before opening
    if (lastFocusedElement) {
      lastFocusedElement.focus({ preventScroll: true });
      lastFocusedElement = null;
    }
  }

  // ───────────────────────────────────────
  // CONTACT FORM FEEDBACK
  // ───────────────────────────────────────

  function initContactFormFeedback() {
    const form = $(".contact");
    if (!form || form.tagName !== "FORM") return;

    form.addEventListener("submit", () => {
      const button = $("button[type='submit']", form);
      if (!button) return;

      const originalText = button.textContent;
      button.textContent = "Opening Email…";
      button.disabled = true;

      window.setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
      }, 1800);
    });
  }

  // ───────────────────────────────────────
  // KEYBOARD ACCESSIBILITY
  // ───────────────────────────────────────

  function initKeyboardAccessibility() {
    document.addEventListener("keydown", (event) => {
      // Escape: Close all layers and mobile nav
      if (event.key === "Escape") {
        $$(".modal.open, .lightbox.open").forEach(closeLayer);

        const menu = $(".menu");
        if (body.classList.contains("nav-open")) {
          closeNav(menu);
        }
      }

      // Tab: Focus trap within open modals/lightboxes
      if (event.key === "Tab") {
        trapFocus(event);
      }
    });
  }

  function trapFocus(event) {
    const layer = $(".modal.open, .lightbox.open");
    if (!layer) return;

    const focusableElements = $$(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      layer
    ).filter(isFocusable);

    if (!focusableElements.length) return;

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    // Wrap focus: Shift+Tab from first → last
    if (event.shiftKey && document.activeElement === firstFocusable) {
      event.preventDefault();
      lastFocusable.focus();
    }
    // Wrap focus: Tab from last → first
    else if (!event.shiftKey && document.activeElement === lastFocusable) {
      event.preventDefault();
      firstFocusable.focus();
    }
  }
})();
