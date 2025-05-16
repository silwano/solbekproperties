document.addEventListener('DOMContentLoaded', function() {
    // Animation System
    const viewportObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('element-in-view');
          
          // Add delay to each gallery item
          if (entry.target.classList.contains('gallery-grid')) {
            const items = entry.target.querySelectorAll('.gallery-item');
            items.forEach((item, index) => {
              item.style.transitionDelay = `${index * 0.1}s`;
            });
          }
        }
      });
    }, { threshold: 0.1 });
  
    document.querySelectorAll('.slide-in-element').forEach(el => {
      viewportObserver.observe(el);
    });
  
    // Gallery Filtering
    const galleryFilters = document.querySelectorAll('.gallery-filter');
    const galleryItems = document.querySelectorAll('.gallery-item');
  
    galleryFilters.forEach(filter => {
      filter.addEventListener('click', () => {
        // Update active filter
        galleryFilters.forEach(f => f.classList.remove('active-filter'));
        filter.classList.add('active-filter');
        
        // Filter items
        const filterValue = filter.dataset.filter;
        galleryItems.forEach(item => {
          if (filterValue === 'all' || item.dataset.category === filterValue) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  
    // Fallback Animation
    function checkVisibility() {
      document.querySelectorAll('.slide-in-element').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
          el.classList.add('element-in-view');
        }
      });
    }
  
    window.addEventListener('load', checkVisibility);
    window.addEventListener('scroll', checkVisibility);
  });