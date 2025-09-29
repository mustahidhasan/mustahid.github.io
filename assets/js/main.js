/**
 * main.js
 * - Skill bar animation (IntersectionObserver)
 * - Navbar scrolled class
 * - Scroll-spy (IntersectionObserver)
 * - Back-to-top button
 * - Projects slider prev/next
 * - Close mobile navbar when link clicked
 */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------------------
     Helper: clamp and safe query
     --------------------------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* =========================
     Animate skill bars
     ========================= */
  const skillItems = $$("#skills .skill");
  if (skillItems.length) {
    const skillObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target.querySelector(".progress-bar");
          if (bar) {
            const value = parseInt(bar.getAttribute("data-value"), 10) || 0;
            bar.style.width = value + "%";
            bar.setAttribute("aria-valuenow", value);
          }
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.45 });

    skillItems.forEach(it => skillObserver.observe(it));
  }

  /* =========================
     Navbar: add scrolled class
     ========================= */
  const navbar = document.querySelector(".navbar");
  const onScrollToggleNavbar = () => {
    if (!navbar) return;
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  };
  onScrollToggleNavbar();
  window.addEventListener("scroll", onScrollToggleNavbar, { passive: true });

  /* =========================
     Scroll spy (IntersectionObserver)
     ========================= */
  const sections = Array.from(document.querySelectorAll("section[id]"));
  const navLinks = Array.from(document.querySelectorAll(".navbar-nav .nav-link"));

  if (sections.length && navLinks.length) {
    const spyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.id;
        const link = document.querySelector(`.navbar-nav .nav-link[href="#${id}"]`);
        if (entry.isIntersecting) {
          navLinks.forEach(l => l.classList.remove("active"));
          if (link) link.classList.add("active");
        }
      });
    }, { threshold: 0.6 });

    sections.forEach(sec => spyObserver.observe(sec));
  }

  /* =========================
     Close mobile nav on link click
     ========================= */
  const navCollapse = document.getElementById("navbarNav");
  const bsCollapse = (navCollapse && typeof bootstrap !== "undefined")
    ? bootstrap.Collapse.getOrCreateInstance(navCollapse)
    : null;

  document.querySelectorAll(".navbar-nav .nav-link").forEach(link => {
    link.addEventListener("click", (e) => {
      // Smooth scroll handled by browser - collapse the nav
      if (bsCollapse && window.getComputedStyle(navCollapse).display !== "none") {
        bsCollapse.hide();
      }
    });
  });

  /* =========================
     Back to top button
     ========================= */
  const backToTopBtn = document.getElementById("backToTopBtn");
  const onScrollBackToTop = () => {
    if (!backToTopBtn) return;
    if (window.scrollY > 220) backToTopBtn.classList.add("show");
    else backToTopBtn.classList.remove("show");
  };
  window.addEventListener("scroll", onScrollBackToTop, { passive: true });
  onScrollBackToTop();

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  /* =========================
     Projects slider prev/next
     ========================= */
  const slider = document.querySelector(".projects-slider");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  if (slider) {
    const scrollAmount = () => {
      // prefer card width if available
      const card = slider.querySelector(".project-card");
      if (card) return Math.round(card.offsetWidth + 20); // include gap
      return Math.round(slider.clientWidth * 0.8);
    };

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        slider.scrollBy({ left: scrollAmount(), behavior: "smooth" });
      });
    }
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        slider.scrollBy({ left: -scrollAmount(), behavior: "smooth" });
      });
    }

    // Enable swipe-like flick for mobile (optional small enhancement)
    let isDown = false, startX, scrollLeft;
    slider.addEventListener('mousedown', e => { isDown = true; slider.classList.add('active'); startX = e.pageX - slider.offsetLeft; scrollLeft = slider.scrollLeft; });
    slider.addEventListener('mouseleave', () => { isDown = false; slider.classList.remove('active'); });
    slider.addEventListener('mouseup', () => { isDown = false; slider.classList.remove('active'); });
    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1; //scroll-fast
      slider.scrollLeft = scrollLeft - walk;
    });
  }

  /* =========================
     Contact form -> mailto
     ========================= */
  const sendBtn = document.getElementById("sendBtn");
  if (sendBtn) {
    sendBtn.addEventListener("click", () => {
      const msg = document.getElementById("message")?.value?.trim() || "Hello Mustahid —";
      const href = `mailto:mustahidhasan9@gmail.com?subject=${encodeURIComponent("Portfolio Inquiry")}&body=${encodeURIComponent(msg)}`;
      window.location.href = href;
    });
  }

  /* =========================
     Small safety: re-run skill animation if section already visible (initial)
     ========================= */
  // (IntersectionObserver unobserves when visible; if already visible, the observer callback runs on registration,
  // but to be safe we trigger manual check)
  if ('IntersectionObserver' in window && skillItems.length) {
    skillItems.forEach(it => {
      const rect = it.getBoundingClientRect();
      if (rect.top >= 0 && rect.top < window.innerHeight) {
        const bar = it.querySelector(".progress-bar");
        if (bar) {
          const value = parseInt(bar.getAttribute("data-value"), 10) || 0;
          bar.style.width = value + "%";
          bar.setAttribute("aria-valuenow", value);
        }
      }
    });
  }

});
