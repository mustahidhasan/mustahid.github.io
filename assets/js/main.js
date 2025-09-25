document.addEventListener("DOMContentLoaded", () => {

  // Animate skill bars on scroll
  const skills = document.querySelectorAll("#skills .skill");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target.querySelector(".progress-bar");
        const value = progressBar.textContent.trim();
        progressBar.style.width = value; // Animate width
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  skills.forEach(skill => observer.observe(skill));
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
    backToTopBtn.style.display = window.scrollY > 200 ? "block" : "none";
  });
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // === Projects Slider Buttons ===
  const slider = document.querySelector('.projects-slider');
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  if (slider && nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => { slider.scrollBy({ left: 320, behavior: 'smooth' }); });
    prevBtn.addEventListener('click', () => { slider.scrollBy({ left: -320, behavior: 'smooth' }); });
  }

});
