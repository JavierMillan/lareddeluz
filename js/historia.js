// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      mobileMenu.classList.add('hidden');
    }
  });
});

// Create Dynamic Stars
function createStarfield() {
  const starfield = document.querySelector('.starfield');
  const starCount = 60;

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'absolute w-1 h-1 bg-gold-light rounded-full opacity-0';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    star.style.animationDuration = (2 + Math.random() * 4) + 's';
    star.classList.add('animate-twinkle');
    starfield.appendChild(star);
  }
}

// Intersection Observer for Animations
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.classList.add('animate-fade-in-up');
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document.querySelectorAll('.liquid-enhanced, .liquid-glass').forEach(el => {
    if (!el.style.opacity) {
      el.style.opacity = '0';
      observer.observe(el);
    }
  });
}

// Parallax effect for floating particles
function parallaxEffect() {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.floating-particle');

  parallaxElements.forEach((element, index) => {
    const speed = 0.3 + (index * 0.1);
    const yPos = -(scrolled * speed);
    element.style.transform = `translateY(${yPos}px)`;
  });
}

// Chapter progress indicator
function setupChapterProgress() {
  const chapters = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add visual feedback for current chapter
        const chapterNumber = entry.target.querySelector('.chapter-number');
        if (chapterNumber) {
          chapterNumber.style.background = 'linear-gradient(135deg, #e4cd85, #c08a2d)';
          chapterNumber.style.color = '#0d0b16';
          chapterNumber.style.transform = 'scale(1.1)';
        }
      } else {
        const chapterNumber = entry.target.querySelector('.chapter-number');
        if (chapterNumber) {
          chapterNumber.style.background = 'linear-gradient(135deg, rgba(228, 205, 133, 0.2), rgba(22, 51, 132, 0.15))';
          chapterNumber.style.color = '#e4cd85';
          chapterNumber.style.transform = 'scale(1)';
        }
      }
    });
  }, { threshold: 0.5 });

  chapters.forEach(chapter => observer.observe(chapter));
}

// Enhanced hover effects
function setupEnhancedEffects() {
  document.querySelectorAll('.liquid-glass, .liquid-enhanced').forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-8px) scale(1.02)';
      this.style.transition = 'all 0.4s cubic-bezier(0.4, 1.6, 0.6, 1)';
    });

    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function () {
  createStarfield();
  setupScrollAnimations();
  setupChapterProgress();
  setupEnhancedEffects();
});

// Add scroll effects
window.addEventListener('scroll', () => {
  parallaxEffect();

 });

// Add click ripple effect
document.querySelectorAll('.liquid-glass, .liquid-enhanced').forEach(element => {
  element.addEventListener('click', function (e) {
    const ripple = document.createElement('div');
    ripple.className = 'absolute rounded-full bg-gold-light opacity-30 pointer-events-none';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.left = (e.clientX - this.offsetLeft - 10) + 'px';
    ripple.style.top = (e.clientY - this.offsetTop - 10) + 'px';
    ripple.style.animation = 'ping 0.6s ease-out';

    this.style.position = 'relative';
    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});