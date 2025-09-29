document.addEventListener("DOMContentLoaded", () => {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* === Animate Skills === */
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

  /* === Navbar scrolled effect === */
  const navbar = $(".navbar");
  const onScrollNavbar = () => {
    if (!navbar) return;
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  };
  window.addEventListener("scroll", onScrollNavbar, { passive: true });
  onScrollNavbar();

  /* === Back to Top Button === */
  const backToTopBtn = $("#backToTopBtn");
  const toggleBackBtn = () => {
    if (!backToTopBtn) return;
    backToTopBtn.classList.toggle("show", window.scrollY > 220);
  };
  window.addEventListener("scroll", toggleBackBtn, { passive: true });
  toggleBackBtn();

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* === Projects Slider === */
  const slider = $(".projects-slider");
  const nextBtn = $("#nextBtn");
  const prevBtn = $("#prevBtn");

  if (slider && nextBtn && prevBtn) {
    const getScrollAmount = () => {
      const card = slider.querySelector(".project-card");
      if (!card) return 320;
      const style = window.getComputedStyle(slider);
      const gap = parseInt(style.columnGap || style.gap || 20, 10);
      return card.offsetWidth + gap;
    };

    nextBtn.addEventListener("click", () => {
      slider.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
    });

    prevBtn.addEventListener("click", () => {
      slider.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
    });
  }

  /* === Contact Form Mailto === */
  const sendBtn = $("#sendBtn");
  if (sendBtn) {
    sendBtn.addEventListener("click", () => {
      const msg = $("#message")?.value?.trim() || "Hello Mustahid —";
      window.location.href =
        `mailto:mustahidhasan9@gmail.com?subject=Portfolio Inquiry&body=${encodeURIComponent(msg)}`;
    });
  }
});
