document.addEventListener("DOMContentLoaded", () => {

  // === Animate Skill Bars on Scroll ===
  const progressBars = document.querySelectorAll(".progress-bar");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate the width to the value already set in inline style
        entry.target.style.width = entry.target.getAttribute("style").split(":")[1];
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  progressBars.forEach(bar => observer.observe(bar));


  // === Send Message via Mailto ===
  const sendBtn = document.getElementById("sendBtn");
  if (sendBtn) {
    sendBtn.addEventListener("click", () => {
      const msg = document.getElementById("message").value || "Hello Mustahid —";
      window.location.href = `mailto:mustahidhasan9@gmail.com?subject=Portfolio Inquiry&body=${encodeURIComponent(msg)}`;
    });
  }


  // === Back to Top Button ===
  const backToTopBtn = document.getElementById("backToTopBtn");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      backToTopBtn.style.display = "block";
    } else {
      backToTopBtn.style.display = "none";
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });


  // === Projects Horizontal Slider Buttons ===
  const slider = document.querySelector('.projects-slider');
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');

  if (slider && nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
      slider.scrollBy({ left: 320, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
      slider.scrollBy({ left: -320, behavior: 'smooth' });
    });
  }

});
