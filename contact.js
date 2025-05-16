document.addEventListener('DOMContentLoaded', function() {
    // Animation Trigger
    const contactObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('contact-visible');
        }
      });
    }, { threshold: 0.1 });
  
    document.querySelectorAll('.fade-in-contact').forEach(el => {
      // Add staggered delays
      if (el.classList.contains('contact-info')) {
        el.style.transitionDelay = '0.2s';
      } else if (el.classList.contains('contact-form')) {
        el.style.transitionDelay = '0.4s';
      } else if (el.classList.contains('contact-map')) {
        el.style.transitionDelay = '0.6s';
      }
      contactObserver.observe(el);
    });
  
    // Form Label Animation Fallback
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    formInputs.forEach(input => {
      input.addEventListener('focus', function() {
        this.nextElementSibling.classList.add('active-label');
      });
      input.addEventListener('blur', function() {
        if (!this.value) {
          this.nextElementSibling.classList.remove('active-label');
        }
      });
    });
  
    // Fallback Animation
    function checkContactVisibility() {
      document.querySelectorAll('.fade-in-contact').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
          el.classList.add('contact-visible');
        }
      });
    }
  
    window.addEventListener('load', checkContactVisibility);
    window.addEventListener('scroll', checkContactVisibility);
  });