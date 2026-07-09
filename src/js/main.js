// Main JavaScript for responsive content functionality

(function() {
  'use strict';
  
  // DOM ready function
  function domReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  }
  
  // Initialize responsive features
  function initializeResponsiveFeatures() {
    // Add container wrapper if not present
    const body = document.body;
    const content = body.innerHTML;
    
    if (!body.querySelector('.container')) {
      body.innerHTML = '<div class="container">' + content + '</div>';
    }
    
    // Add viewport meta tag if not present
    if (!document.querySelector('meta[name="viewport"]')) {
      const viewport = document.createElement('meta');
      viewport.name = 'viewport';
      viewport.content = 'width=device-width, initial-scale=1.0';
      document.head.appendChild(viewport);
    }
    
    // Enhance accessibility
    enhanceAccessibility();
    
    // Add smooth scrolling for anchor links
    addSmoothScrolling();
    
    // Initialize responsive images if any
    initializeResponsiveImages();
  }
  
  // Enhance accessibility features
  function enhanceAccessibility() {
    // Add skip link for keyboard navigation
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: #000;
      color: #fff;
      padding: 8px;
      text-decoration: none;
      z-index: 1000;
      border-radius: 4px;
    `;
    
    // Show skip link on focus
    skipLink.addEventListener('focus', function() {
      this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
      this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content ID if not present
    const container = document.querySelector('.container');
    if (container && !container.id) {
      container.id = 'main-content';
    }
    
    // Ensure headings have proper hierarchy
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(function(heading) {
      if (!heading.id) {
        const text = heading.textContent.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        heading.id = text;
      }
    });
  }
  
  // Add smooth scrolling for anchor links
  function addSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
  
  // Initialize responsive images
  function initializeResponsiveImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(function(img) {
      // Add responsive attributes if not present
      if (!img.style.maxWidth) {
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
      }
      
      // Add loading attribute for performance
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
    });
  }
  
  // Handle responsive font size adjustments
  function handleResponsiveFonts() {
    const updateFontSize = function() {
      const viewportWidth = window.innerWidth;
      const root = document.documentElement;
      
      // Adjust base font size based on viewport
      if (viewportWidth < 480) {
        root.style.fontSize = '14px';
      } else if (viewportWidth < 768) {
        root.style.fontSize = '15px';
      } else {
        root.style.fontSize = '16px';
      }
    };
    
    // Initial call
    updateFontSize();
    
    // Update on resize with debouncing
    let resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateFontSize, 250);
    });
  }
  
  // Initialize everything when DOM is ready
  domReady(function() {
    initializeResponsiveFeatures();
    handleResponsiveFonts();
    
    // Log initialization for debugging
    console.log('Responsive content initialized');
  });
  
})();