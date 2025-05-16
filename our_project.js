document.addEventListener('DOMContentLoaded', function() {
    // Animation Trigger System
    const scrollAnimator = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('element-visible');
        }
      });
    }, { threshold: 0.08 });
  
    document.querySelectorAll('.fade-element').forEach(element => {
      scrollAnimator.observe(element);
    });
  
    // Property Filter Mechanism
    const filterTabs = document.querySelectorAll('.tab-btn');
    const propertyItems = document.querySelectorAll('.listing-card');
  
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Update active tab
        filterTabs.forEach(t => t.classList.remove('active-tab'));
        tab.classList.add('active-tab');
        
        // Filter properties
        const filterValue = tab.dataset.category;
        propertyItems.forEach(item => {
          if (filterValue === 'all' || item.dataset.category === filterValue) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  
    // Animation Fallback
    const animationFallback = () => {
      document.querySelectorAll('.fade-element').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.85) {
          el.classList.add('element-visible');
        }
      });
    };
  
    window.addEventListener('load', animationFallback);
    window.addEventListener('scroll', animationFallback);
  });