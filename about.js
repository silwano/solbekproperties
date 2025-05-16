// Scroll Animation Trigger
function initAnimations() {
  const elements = document.querySelectorAll('.hidden');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Animate numbers if it's a stat item
        if (entry.target.classList.contains('story-stats')) {
          animateNumbers();
        }
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}

// Number Counting Animation
function animateNumbers() {
  const counters = document.querySelectorAll('.stat-number');
  const speed = 200;
  
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-count');
    const count = +counter.innerText;
    const increment = target / speed;
    
    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(animateNumbers, 1);
    } else {
      counter.innerText = target;
    }
  });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initAnimations);

// Fallback in case observer fails
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelectorAll('.hidden').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add('visible');
      }
    });
  }, 500);
});
