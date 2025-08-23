// Enhanced Yoga Website JavaScript
class YogaShowcase {
  constructor() {
    this.yogaCards = [
      {
        img: "https://images.unsplash.com/photo-1506629905607-94d8ac2d5b20",
        title: "Morning Flow",
        description: "Improved Flexibility"
      },
      {
        img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
        title: "Core Power",
        description: "Build Core Strength"
      },
      {
        img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
        title: "Sunset Calm",
        description: "Relaxation & Calm"
      },
      {
        img: "https://images.unsplash.com/photo-1592621385612-4d7129426394",
        title: "Align & Flow",
        description: "Better Posture"
      },
      {
        img: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad5d",
        title: "Stress Release",
        description: "Stress Relief"
      },
      {
        img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
        title: "Balance Flow",
        description: "Increased Balance"
      },
      {
        img: "https://images.unsplash.com/photo-1588286840104-8957b019727f",
        title: "Deep Stretch",
        description: "Full Body Stretch"
      },
      {
        img: "https://images.unsplash.com/photo-1593810451130-ad8046b3d0db",
        title: "Mindful Movement",
        description: "Mindfulness Practice"
      },
      {
        img: "https://images.unsplash.com/photo-1570303345338-e1f0eddf4946",
        title: "Joint Care",
        description: "Joint Mobility"
      },
      {
        img: "https://images.unsplash.com/photo-1591228127791-8ff44ad05b00",
        title: "Energy Boost",
        description: "Energy Boost"
      },
      {
        img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
        title: "Evening Flow",
        description: "Relaxing Flow"
      },
      {
        img: "https://images.unsplash.com/photo-1597689248238-82eafa2fed41",
        title: "Power Yoga",
        description: "Strength Training"
      }
    ];

    this.currentIndex = 0;
    this.cardWidth = 320 + 16; // Card width + gap
    this.visibleCards = this.getVisibleCards();
    this.autoScrollInterval = null;
    this.isUserInteracting = false;
    
    this.init();
  }

  init() {
    this.container = document.getElementById('imageShowcase');
    this.prevButton = document.getElementById('prevButton');
    this.nextButton = document.getElementById('nextButton');
    this.navDots = document.getElementById('navDots');

    if (!this.container) return;

    this.generateCards();
    this.setupNavigation();
    this.setupEventListeners();
    this.updateNavigation();
    this.startAutoScroll();

    // Update visible cards on resize
    window.addEventListener('resize', this.debounce(() => {
      this.visibleCards = this.getVisibleCards();
      this.updateNavigation();
    }, 300));
  }

  getVisibleCards() {
    const containerWidth = window.innerWidth;
    if (containerWidth < 480) return 1;
    if (containerWidth < 768) return 2;
    if (containerWidth < 1024) return 3;
    return 4;
  }

  generateCards() {
    this.container.innerHTML = '';
    
    this.yogaCards.forEach((card, index) => {
      const cardElement = this.createCardElement(card, index);
      this.container.appendChild(cardElement);
    });
  }

  createCardElement(card, index) {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('showcase-card');
    cardDiv.setAttribute('data-index', index);
    
    cardDiv.innerHTML = `
      <img src="${card.img}" alt="${card.description}" class="card-image" loading="lazy">
      <div class="card-content">
        <div class="card-header">
          <span class="card-tag">${card.title}</span>
          <div class="card-icon">
            <i class="ri-play-circle-line"></i>
          </div>
        </div>
        <h3 class="card-title">${card.description}</h3>
      </div>
    `;

    // Add click handler for individual cards
    cardDiv.addEventListener('click', () => {
      this.handleCardClick(card, index);
    });

    return cardDiv;
  }

  handleCardClick(card, index) {
    // Handle card click - could open modal, navigate to page, etc.
    console.log(`Clicked on ${card.description}`);
    
    // Example: Add some visual feedback
    const cardElement = this.container.children[index];
    cardElement.style.transform = 'scale(0.98)';
    setTimeout(() => {
      cardElement.style.transform = '';
    }, 150);
  }

  setupNavigation() {
    // Generate navigation dots
    const totalDots = Math.max(1, this.yogaCards.length - this.visibleCards + 1);
    this.navDots.innerHTML = '';
    
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('button');
      dot.classList.add('nav-dot');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => this.goToSlide(i));
      this.navDots.appendChild(dot);
    }
  }

  setupEventListeners() {
    // Navigation buttons
    this.prevButton?.addEventListener('click', () => this.previousSlide());
    this.nextButton?.addEventListener('click', () => this.nextSlide());

    // Touch/Mouse events for swiping
    this.setupTouchEvents();

    // Pause auto-scroll on hover
    this.container.addEventListener('mouseenter', () => {
      this.isUserInteracting = true;
      this.pauseAutoScroll();
    });

    this.container.addEventListener('mouseleave', () => {
      this.isUserInteracting = false;
      this.startAutoScroll();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.previousSlide();
      if (e.key === 'ArrowRight') this.nextSlide();
    });
  }

  setupTouchEvents() {
    let startX = 0;
    let startY = 0;
    let isDragging = false;
    let currentX = 0;
    let initialTransform = 0;

    const handleStart = (e) => {
      this.isUserInteracting = true;
      this.pauseAutoScroll();
      
      startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
      startY = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;
      isDragging = true;
      initialTransform = this.currentIndex * -this.cardWidth;
      
      this.container.style.cursor = 'grabbing';
      this.container.style.transition = 'none';
    };

    const handleMove = (e) => {
      if (!isDragging) return;
      
      e.preventDefault();
      currentX = (e.type === 'mousemove' ? e.clientX : e.touches[0].clientX) - startX;
      const currentY = (e.type === 'mousemove' ? e.clientY : e.touches[0].clientY) - startY;
      
      // Only allow horizontal scrolling if horizontal movement is greater than vertical
      if (Math.abs(currentX) > Math.abs(currentY)) {
        const newTransform = initialTransform + currentX;
        this.container.style.transform = `translateX(${newTransform}px)`;
      }
    };

    const handleEnd = () => {
      if (!isDragging) return;
      
      isDragging = false;
      this.container.style.cursor = 'grab';
      this.container.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      
      // Determine if swipe was significant enough
      const threshold = this.cardWidth * 0.3;
      
      if (currentX > threshold) {
        this.previousSlide();
      } else if (currentX < -threshold) {
        this.nextSlide();
      } else {
        // Snap back to current position
        this.updateTransform();
      }
      
      currentX = 0;
      setTimeout(() => {
        this.isUserInteracting = false;
        this.startAutoScroll();
      }, 300);
    };

    // Mouse events
    this.container.addEventListener('mousedown', handleStart);
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);

    // Touch events
    this.container.addEventListener('touchstart', handleStart, { passive: false });
    this.container.addEventListener('touchmove', handleMove, { passive: false });
    this.container.addEventListener('touchend', handleEnd);

    // Prevent context menu on long press
    this.container.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  previousSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateTransform();
      this.updateNavigation();
    }
  }

  nextSlide() {
    const maxIndex = Math.max(0, this.yogaCards.length - this.visibleCards);
    if (this.currentIndex < maxIndex) {
      this.currentIndex++;
      this.updateTransform();
      this.updateNavigation();
    }
  }

  goToSlide(index) {
    const maxIndex = Math.max(0, this.yogaCards.length - this.visibleCards);
    this.currentIndex = Math.min(Math.max(0, index), maxIndex);
    this.updateTransform();
    this.updateNavigation();
  }

  updateTransform() {
    const translateX = -this.currentIndex * this.cardWidth;
    this.container.style.transform = `translateX(${translateX}px)`;
  }

  updateNavigation() {
    const maxIndex = Math.max(0, this.yogaCards.length - this.visibleCards);
    
    // Update navigation buttons
    if (this.prevButton) {
      this.prevButton.disabled = this.currentIndex === 0;
    }
    
    if (this.nextButton) {
      this.nextButton.disabled = this.currentIndex === maxIndex;
    }

    // Update navigation dots
    const dots = this.navDots.querySelectorAll('.nav-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentIndex);
    });
  }

  startAutoScroll() {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
    }
    
    this.autoScrollInterval = setInterval(() => {
      if (!this.isUserInteracting) {
        const maxIndex = Math.max(0, this.yogaCards.length - this.visibleCards);
        
        if (this.currentIndex < maxIndex) {
          this.nextSlide();
        } else {
          // Reset to beginning for infinite loop
          this.currentIndex = 0;
          this.updateTransform();
          this.updateNavigation();
        }
      }
    }, 4000); // Auto-scroll every 4 seconds
  }

  pauseAutoScroll() {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
      this.autoScrollInterval = null;
    }
  }

  // Utility function to debounce resize events
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Public method to destroy the instance
  destroy() {
    this.pauseAutoScroll();
    window.removeEventListener('resize', this.handleResize);
    
    // Remove all event listeners
    const cards = this.container.querySelectorAll('.showcase-card');
    cards.forEach(card => {
      card.replaceWith(card.cloneNode(true));
    });
  }
}

// Enhanced Header Scroll Effect
class HeaderEffects {
  constructor() {
    this.header = document.querySelector('.header');
    this.lastScrollY = 0;
    this.init();
  }

  init() {
    if (!this.header) return;

    window.addEventListener('scroll', this.throttle(() => {
      this.handleScroll();
    }, 10));
  }

  handleScroll() {
    const currentScrollY = window.scrollY;
    
    // Add shadow when scrolled
    if (currentScrollY > 10) {
      this.header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
      this.header.style.boxShadow = 'none';
    }

    this.lastScrollY = currentScrollY;
  }

  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

// Smooth Scroll for Navigation Links
class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (!target) return;
        
        e.preventDefault();
        
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const targetPosition = target.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      });
    });
  }
}

// Intersection Observer for Animations
class ScrollAnimations {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    this.init();
  }

  init() {
    if (!('IntersectionObserver' in window)) return;

    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      this.observerOptions
    );

    // Observe elements that should animate on scroll
    const animatedElements = document.querySelectorAll(
      '.hero-content, .section-header, .showcase-card, .footer-section'
    );

    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      this.observer.observe(el);
    });
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        this.observer.unobserve(entry.target);
      }
    });
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize main components
  const showcase = new YogaShowcase();
  const headerEffects = new HeaderEffects();
  const smoothScroll = new SmoothScroll();
  const scrollAnimations = new ScrollAnimations();

  // Add loading state management
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Optional: Add a subtle entrance animation
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
      heroSection.style.opacity = '0';
      heroSection.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        heroSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
      }, 100);
    }
  });

  // Handle visibility change (pause/resume auto-scroll when tab is not visible)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      showcase.pauseAutoScroll();
    } else if (!showcase.isUserInteracting) {
      showcase.startAutoScroll();
    }
  });

  // Expose showcase instance globally for debugging
  window.yogaShowcase = showcase;
});

// Service Worker Registration (optional, for PWA features)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Only register service worker in production
    if (window.location.protocol === 'https:' || window.location.hostname === 'localhost') {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }
  });
}