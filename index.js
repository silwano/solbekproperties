
// current year in footer
document.addEventListener('DOMContentLoaded', function() {
  var currentYear = new Date().getFullYear();
  document.getElementById('currentYear').textContent = currentYear;
  });

setInterval(showSlides, 3000); // Change slide every 3 seconds

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

let slideIndex = 1;
let slideInterval;

// Initialize slideshow
showSlides(slideIndex);

// Auto-advance slides every 5 seconds
startSlideShow();

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
    resetSlideShow();
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
    resetSlideShow();
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    
    // Hide all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    // Remove active class from all dots
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    // Show current slide and activate dot
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}

function startSlideShow() {
    slideInterval = setInterval(() => {
        plusSlides(1);
    }, 5000);
}

function resetSlideShow() {
    clearInterval(slideInterval);
    startSlideShow();
}



// Pause on hover
document.querySelector('.slideshow-container').addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

document.querySelector('.slideshow-container').addEventListener('mouseleave', () => {
    startSlideShow();
});

// Touch events for mobile
let touchStartX = 0;
let touchEndX = 0;

document.querySelector('.slideshow-container').addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    clearInterval(slideInterval);
}, {passive: true});

document.querySelector('.slideshow-container').addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    startSlideShow();
}, {passive: true});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        plusSlides(1); // Swipe left
    }
    if (touchEndX > touchStartX + 50) {
        plusSlides(-1); // Swipe right
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const welcomeLines = document.querySelectorAll('.welcome-line');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate each line with a slight delay
          welcomeLines.forEach((line, index) => {
            setTimeout(() => {
              line.classList.add('animate');
            }, index * 300); // 300ms delay between lines
          });
          
          // Optional: Unobserve after animating to prevent re-animation
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5, // Trigger when 50% of element is visible
      rootMargin: '0px 0px -50px 0px' // Adjust trigger point slightly upward
    });
  
    observer.observe(document.querySelector('.welcome-message'));
  });

const imageTextElements = document.querySelectorAll('.image-text-section .scroll-animate');

const imageTextObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const elements = entry.target.closest('.image-text-section').querySelectorAll('.scroll-animate');
      elements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('animate');
        }, index * 200);
      });
      imageTextObserver.unobserve(entry.target);
    }
  });
}, { 
  threshold: 0.2,
  rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.image-text-section').forEach(section => {
  imageTextObserver.observe(section);
});

document.addEventListener('DOMContentLoaded', function() {
    const propertyPanels = document.querySelectorAll('.gallery-panel');
    let visiblePanelIndex = 0;
    let panelRotationTimer;
    
    // Initialize first panel
    showCurrentPanel();
    
    // Start auto-rotation
    startPanelRotation();
    
    // Handle panel rotation
    function rotatePanels() {
      propertyPanels[visiblePanelIndex].classList.remove('current-panel');
      visiblePanelIndex = (visiblePanelIndex + 1) % propertyPanels.length;
      showCurrentPanel();
    }
    
    function showCurrentPanel() {
      const currentPanel = propertyPanels[visiblePanelIndex];
      currentPanel.classList.add('current-panel');
      animatePanelContent(currentPanel);
    }
    
    function animatePanelContent(panel) {
      const content = panel.querySelector('.panel-info');
      content.style.opacity = '0';
      content.style.transform = 'translateY(40px)';
      
      // Trigger reflow
      void content.offsetWidth;
      
      content.style.opacity = '1';
      content.style.transform = 'translateY(0)';
    }
    
    function startPanelRotation() {
      panelRotationTimer = setInterval(rotatePanels, 3000);
    }
    
    // Pause on hover
    const gallery = document.querySelector('.home-gallery');
    gallery.addEventListener('mouseenter', () => {
      clearInterval(panelRotationTimer);
    });
    
    gallery.addEventListener('mouseleave', () => {
      startPanelRotation();
    });
    
    // Animate when visible in viewport
    const galleryObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const activePanel = entry.target.querySelector('.current-panel');
          animatePanelContent(activePanel);
        }
      });
    }, { threshold: 0.15 });
    
    galleryObserver.observe(document.querySelector('.home-gallery'));
  });


