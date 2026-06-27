/*
  Saif Alam Portfolio
  Production vanilla JavaScript for interactions, animation, accessibility and UI polish.
*/

"use strict";

(function () {
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));
  const body = document.body;
  const root = document.documentElement;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const isFinePointer = window.matchMedia("(pointer: fine)");

  const typedWords = [
    "HR Operations",
    "Office Administration",
    "Recruitment Support",
    "Documentation",
    "Employee Relations",
    "Office Coordination"
  ];

  const competencies = [
    {
      title: "Office Administration",
      copy: "Daily coordination, structured follow-through and reliable office support."
    },
    {
      title: "Scheduling",
      copy: "Calendar discipline, meeting readiness and professional time management."
    },
    {
      title: "Documentation",
      copy: "Accurate documents, organized files and controlled administrative records."
    },
    {
      title: "Compliance",
      copy: "Process awareness, confidentiality and careful record hygiene."
    },
    {
      title: "Recruitment Support",
      copy: "Candidate coordination, screening assistance and interview scheduling."
    },
    {
      title: "Employee Records",
      copy: "Personnel file updates, verification support and clean data maintenance."
    },
    {
      title: "Payroll Coordination",
      copy: "Attendance inputs, payroll assistance and timely internal follow-up."
    },
    {
      title: "MS Office & Excel",
      copy: "Reports, trackers, spreadsheets, forms and polished business documents."
    },
    {
      title: "Communication",
      copy: "Respectful, clear and professional communication across teams."
    },
    {
      title: "Reporting",
      copy: "Structured status updates, summaries and reliable information flow."
    },
    {
      title: "Data Management",
      copy: "Clean records, accuracy checks and organized digital systems."
    },
    {
      title: "Coordination",
      copy: "Smooth follow-ups between HR, administration, staff and management."
    }
  ];

  const hireReasons = [
    {
      title: "Attention to Detail",
      copy: "Every tracker, file and follow-up receives careful review."
    },
    {
      title: "Documentation Expert",
      copy: "Strong command over business documents and organized filing."
    },
    {
      title: "Administrative Excellence",
      copy: "Calm execution across schedules, records and office priorities."
    },
    {
      title: "Communication",
      copy: "Professional tone with employees, candidates and management."
    },
    {
      title: "Problem Solving",
      copy: "Practical thinking and ownership when processes need clarity."
    },
    {
      title: "Time Management",
      copy: "Reliable delivery across recurring, urgent and sensitive tasks."
    }
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

  let lastFocusedElement = null;

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
    initKeyboardA11y();
  }

  function hideLoader() {
    const loader = $(".loader");
    if (!loader) return;

    window.setTimeout(() => {
      loader.classList.add("hide");
      loader.setAttribute("aria-hidden", "true");
    }, 520);
  }

  function setCurrentYear() {
    const year = $("#year");
    if (year) year.textContent = String(new Date().getFullYear());
  }

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

  function escapeHTML(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

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
    const light = theme === "light";

    if (light) {
      root.dataset.theme = "light";
    } else {
      root.removeAttribute("data-theme");
    }

    if (themeButton) {
      themeButton.textContent = light ? "Sun" : "Moon";
      themeButton.setAttribute("aria-label", light ? "Switch to dark mode" : "Switch to light mode");
    }
  }

  function initNavigation() {
    const menu = $(".menu");
    const nav = $(".nav");
    const navLinks = $$(".nav a");
    const sections = $$("main section[id]");

    if (menu) {
      menu.addEventListener("click", () => {
        const isOpen = body.classList.toggle("nav-open");
        menu.setAttribute("aria-expanded", String(isOpen));
      });
    }

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        body.classList.remove("nav-open");
        if (menu) menu.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", (event) => {
      if (!body.classList.contains("nav-open")) return;
      if (!nav || !menu) return;
      const target = event.target;
      if (nav.contains(target) || menu.contains(target)) return;
      body.classList.remove("nav-open");
      menu.setAttribute("aria-expanded", "false");
    });

    if ("IntersectionObserver" in window && sections.length) {
      const activeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.hash === "#" + id);
          });
        });
      }, { threshold: .35, rootMargin: "-15% 0px -55% 0px" });

      sections.forEach((section) => activeObserver.observe(section));
    }
  }

  function initTypingEffect() {
    const target = $("#typing");
    if (!target) return;

    if (prefersReducedMotion.matches) {
      target.textContent = typedWords[0];
      return;
    }

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeLoop() {
      const word = typedWords[wordIndex];
      target.textContent = deleting ? word.slice(0, charIndex - 1) : word.slice(0, charIndex + 1);
      charIndex += deleting ? -1 : 1;

      let delay = deleting ? 42 : 76;

      if (!deleting && charIndex === word.length) {
        delay = 1250;
        deleting = true;
      }

      if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % typedWords.length;
        delay = 360;
      }

      window.setTimeout(typeLoop, delay);
    }

    typeLoop();
  }

  function initRevealAnimations() {
    const revealItems = $$(".reveal");
    if (!revealItems.length) return;

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
    }, { threshold: .16, rootMargin: "0px 0px -70px 0px" });

    revealItems.forEach((item, index) => {
      item.style.transitionDelay = Math.min(index % 6, 5) * 70 + "ms";
      revealObserver.observe(item);
    });
  }

  function initCounters() {
    const counters = $$('[data-count]');
    if (!counters.length) return;

    const animateCounter = (counter) => {
      const target = Number(counter.dataset.count || 0);
      const start = performance.now();
      const duration = 1500;

      if (prefersReducedMotion.matches) {
        counter.textContent = String(target);
        return;
      }

      function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = String(Math.floor(eased * target));
        if (progress < 1) window.requestAnimationFrame(update);
      }

      window.requestAnimationFrame(update);
    };

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
    let lastTrail = 0;

    window.addEventListener("pointermove", (event) => {
      if (event.pointerType === "touch") return;

      mouseX = event.clientX;
      mouseY = event.clientY;
      body.classList.add("ready");

      dot.style.left = mouseX + "px";
      dot.style.top = mouseY + "px";
      spotlight.style.setProperty("--x", mouseX + "px");
      spotlight.style.setProperty("--y", mouseY + "px");

      const now = performance.now();
      if (now - lastTrail > 32) {
        createTrail(mouseX, mouseY);
        lastTrail = now;
      }
    }, { passive: true });

    function animateCursor() {
      cursorX += (mouseX - cursorX) * .18;
      cursorY += (mouseY - cursorY) * .18;
      cursor.style.left = cursorX + "px";
      cursor.style.top = cursorY + "px";
      window.requestAnimationFrame(animateCursor);
    }

    animateCursor();

    $$("a, button, input, textarea, select").forEach((item) => {
      item.addEventListener("pointerenter", () => body.classList.add("hover"));
      item.addEventListener("pointerleave", () => body.classList.remove("hover"));
    });
  }

  function createTrail(x, y) {
    const trail = document.createElement("span");
    trail.setAttribute("aria-hidden", "true");
    trail.style.cssText = [
      "position:fixed",
      "left:" + x + "px",
      "top:" + y + "px",
      "width:6px",
      "height:6px",
      "border-radius:50%",
      "background:rgba(34,197,94,.45)",
      "pointer-events:none",
      "z-index:9998",
      "transform:translate(-50%,-50%)",
      "transition:opacity .55s ease, transform .55s ease"
    ].join(";");

    document.body.appendChild(trail);

    window.requestAnimationFrame(() => {
      trail.style.opacity = "0";
      trail.style.transform = "translate(-50%,-50%) scale(2.8)";
    });

    window.setTimeout(() => trail.remove(), 580);
  }

  function initParticles() {
    const particles = $("#particles");
    if (!particles || prefersReducedMotion.matches) return;

    const count = Math.min(52, Math.max(28, Math.floor(window.innerWidth / 28)));
    const fragment = document.createDocumentFragment();

    for (let index = 0; index < count; index += 1) {
      const particle = document.createElement("span");
      particle.style.left = Math.random() * 100 + "%";
      particle.style.bottom = (Math.random() * 100 - 20) + "%";
      particle.style.animationDuration = (8 + Math.random() * 12) + "s";
      particle.style.animationDelay = (Math.random() * -12) + "s";
      particle.style.opacity = String(.22 + Math.random() * .55);
      fragment.appendChild(particle);
    }

    particles.replaceChildren(fragment);
  }

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

  function initRipples() {
    $$(".ripple").forEach((button) => {
      button.addEventListener("click", (event) => {
        const rect = button.getBoundingClientRect();
        const ripple = document.createElement("span");
        ripple.className = "ripple-circle";
        ripple.style.left = event.clientX - rect.left + "px";
        ripple.style.top = event.clientY - rect.top + "px";
        button.appendChild(ripple);
        window.setTimeout(() => ripple.remove(), 650);
      });
    });
  }

  function initScrollEffects() {
    const topButton = $(".top");
    const blobs = $$(".blob");
    let ticking = false;

    function updateScrollEffects() {
      const y = window.scrollY || window.pageYOffset;

      if (!prefersReducedMotion.matches) {
        blobs.forEach((blob, index) => {
          blob.style.translate = "0 " + (y * (.03 + index * .015)) + "px";
        });
      }

      if (topButton) topButton.classList.toggle("show", y > 650);
      ticking = false;
    }

    updateScrollEffects();

    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateScrollEffects);
    }, { passive: true });
  }

  function initStepTimeline() {
    $$(".steps button").forEach((button) => {
      button.addEventListener("click", () => {
        $$(".steps button").forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
      });
    });
  }

  function initModals() {
    const modal = $("#modal");
    if (!modal) return;

    const closeButton = $(".close", modal);
    const title = $("h2", modal);
    const bodyText = $(".modal-card > p:last-child", modal);

    $$("[data-modal]").forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const detail = projectDetails[trigger.dataset.modal];
        if (!detail) return;
        if (title) title.textContent = detail.title;
        if (bodyText) bodyText.textContent = detail.body;
        openLayer(modal);
      });
    });

    if (closeButton) closeButton.addEventListener("click", () => closeLayer(modal));
    modal.addEventListener("click", (event) => {
      if (event.target === modal) closeLayer(modal);
    });
  }

  function initGalleryLightbox() {
    const lightbox = $("#lightbox");
    if (!lightbox) return;

    const image = $("img", lightbox);
    const closeButton = $(".close", lightbox);

    $$(".gallery button").forEach((button) => {
      button.addEventListener("click", () => {
        const source = $("img", button);
        if (!source || !image) return;
        image.src = source.currentSrc || source.src;
        image.alt = source.alt || "Gallery preview";
        openLayer(lightbox);
      });
    });

    if (closeButton) closeButton.addEventListener("click", () => closeLayer(lightbox));
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closeLayer(lightbox);
    });
  }

  function openLayer(layer) {
    lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    layer.classList.add("open");
    layer.setAttribute("aria-hidden", "false");
    body.classList.add("modal-open");

    const focusTarget = $("button, a, input, textarea, [tabindex]:not([tabindex='-1'])", layer);
    if (focusTarget) focusTarget.focus({ preventScroll: true });
  }

  function closeLayer(layer) {
    if (!layer || !layer.classList.contains("open")) return;
    layer.classList.remove("open");
    layer.setAttribute("aria-hidden", "true");

    const anyOpen = $$(".modal.open, .lightbox.open").length > 0;
    if (!anyOpen) body.classList.remove("modal-open");

    if (lastFocusedElement) {
      lastFocusedElement.focus({ preventScroll: true });
      lastFocusedElement = null;
    }
  }

  function initContactFormFeedback() {
    const form = $(".contact");
    if (!form || form.tagName !== "FORM") return;

    form.addEventListener("submit", () => {
      const button = $("button", form);
      if (!button) return;
      const original = button.textContent;
      button.textContent = "Opening Email";
      window.setTimeout(() => {
        button.textContent = original;
      }, 1800);
    });
  }

  function initKeyboardA11y() {
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        $$(".modal.open, .lightbox.open").forEach(closeLayer);
        body.classList.remove("nav-open");
        const menu = $(".menu");
        if (menu) menu.setAttribute("aria-expanded", "false");
      }

      if (event.key === "Tab") {
        trapFocus(event);
      }
    });
  }

  function trapFocus(event) {
    const layer = $(".modal.open, .lightbox.open");
    if (!layer) return;

    const focusable = $$('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])', layer)
      .filter((element) => element.offsetParent !== null || element === document.activeElement);

    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
})();
