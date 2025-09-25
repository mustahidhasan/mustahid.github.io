// Animate skill bars on scroll
document.addEventListener("DOMContentLoaded", () => {
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
});
