document.addEventListener("DOMContentLoaded", () => {
  // Animate skill bars on scroll
  const progressBars = document.querySelectorAll(".progress-bar");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.getAttribute("style").split(":")[1];
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  progressBars.forEach(bar => observer.observe(bar));

  // Send message button
  const sendBtn = document.getElementById("sendBtn");
  if (sendBtn) {
    sendBtn.addEventListener("click", () => {
      const msg = document.getElementById("message").value || "Hello Mustahid —";
      window.location.href = `mailto:mustahidhasan9@gmail.com?subject=Portfolio Inquiry&body=${encodeURIComponent(msg)}`;
    });
  }

  // Back to Top Button
  const backToTopBtn = document.getElementById("backToTopBtn");

  // Show button when user scrolls down 200px
  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      backToTopBtn.style.display = "block";
    } else {
      backToTopBtn.style.display = "none";
    }
  });

  // Smooth scroll to top
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});
