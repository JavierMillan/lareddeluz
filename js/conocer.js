// ===================================
// CONOCER.JS - Orquestador de la Experiencia del Viaje Interior
// Maneja las animaciones de scroll y efectos de revelación
// ===================================

class StoryExperience {
  constructor() {
    this.init();
  }

  init() {
    this.setupObserver();
    this.setupStaggeredAnimations();
    this.setupScrollEffects();
    this.setupParticles();
    this.setupProgressNav();
  }

  // ===================================
  // INTERSECTION OBSERVER - Revelación por Scroll
  // ===================================
  setupObserver() {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '-50px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.revealSection(entry.target);
        }
      });
    }, observerOptions);

    // Observar todas las secciones de la historia
    document.querySelectorAll('.story-block').forEach(block => {
      observer.observe(block);
    });
  }

  revealSection(section) {
    // Marcar sección como visible
    section.classList.add('in-view');
    
    // Animar elementos fade-in con delay escalonado
    const fadeElements = section.querySelectorAll('.fade-in');
    fadeElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, index * 200);
    });
  }

  // ===================================
  // ANIMACIONES ESCALONADAS
  // ===================================
  setupStaggeredAnimations() {
    // Animar spans en text-group con delays incrementales
    document.querySelectorAll('.text-group').forEach(group => {
      const spans = group.querySelectorAll('span');
      spans.forEach((span, index) => {
        span.style.transitionDelay = `${index * 0.3}s`;
      });
    });
  }

  // ===================================
  // EFECTOS DE SCROLL PARALLAX SUTIL
  // ===================================
  setupScrollEffects() {
    let ticking = false;

    const updateScrollEffects = () => {
      const scrollY = window.pageYOffset;
      
      // Efecto parallax en hero
      const hero = document.querySelector('.story-hero');
      if (hero) {
        const heroRect = hero.getBoundingClientRect();
        if (heroRect.bottom > 0) {
          const transform = scrollY * 0.3;
          hero.style.transform = `translateY(${transform}px)`;
        }
      }

      // Efecto de fade en partículas según scroll
      const particles = document.querySelector('.story-particles');
      if (particles) {
        const opacity = Math.max(0, 1 - (scrollY / window.innerHeight));
        particles.style.opacity = opacity;
      }

      ticking = false;
    };

    const requestScrollUpdate = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
      }
    };

    // Throttled scroll listener
    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
  }

  // ===================================
  // SISTEMA DE PARTÍCULAS DINÁMICAS
  // ===================================
  setupParticles() {
    const particles = document.querySelector('.story-particles');
    if (!particles) return;

    // Crear partículas adicionales dinámicamente
    for (let i = 0; i < 6; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: 1px;
        height: 1px;
        background: var(--spark-gold);
        border-radius: 50%;
        pointer-events: none;
        opacity: 0;
        animation: pulse ${3 + Math.random() * 4}s infinite ease-in-out;
        animation-delay: ${Math.random() * 4}s;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
      `;
      particles.appendChild(particle);
    }

    // Animar entrada de partículas
    setTimeout(() => {
      particles.style.opacity = '1';
    }, 2000);
  }

  // ===================================
  // PROGRESS NAVIGATION
  // ===================================
  setupProgressNav() {
    const links = document.querySelectorAll('.story-progress a');
    const sections = document.querySelectorAll('section[id]');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(link => {
            const target = link.getAttribute('href').slice(1);
            if (target === entry.target.id) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, { threshold: 0.6 });

    sections.forEach(section => observer.observe(section));
  }

  // ===================================
  // EFECTOS ESPECIALES PARA SECCIONES CLAVE
  // ===================================
  setupSpecialEffects() {
    // Efecto especial para la sección "El Origen" (Big Bang)
    const origenSection = document.querySelector('#origen');
    if (origenSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.triggerBigBangEffect(entry.target);
          }
        });
      }, { threshold: 0.5 });

      observer.observe(origenSection);
    }
  }

  triggerBigBangEffect(section) {
    // Crear ondas de expansión
    const waves = document.createElement('div');
    waves.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      width: 10px;
      height: 10px;
      border: 2px solid var(--spark-gold);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 0;
      animation: big-bang 3s ease-out forwards;
    `;
    section.appendChild(waves);

    // Remover después de la animación
    setTimeout(() => {
      waves.remove();
    }, 3000);
  }

  // ===================================
  // SMOOTH SCROLL PARA NAVEGACIÓN
  // ===================================
  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // ===================================
  // OPTIMIZACIÓN DE RENDIMIENTO
  // ===================================
  optimizePerformance() {
    // Lazy loading de efectos pesados
    const heavyEffects = document.querySelectorAll('.story-block');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Activar efectos solo cuando la sección es visible
          entry.target.style.willChange = 'auto';
        } else {
          // Desactivar efectos para secciones no visibles
          entry.target.style.willChange = 'unset';
        }
      });
    }, { rootMargin: '100px' });

    heavyEffects.forEach(section => observer.observe(section));
  }
}

// ===================================
// INICIALIZACIÓN
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  const storyExperience = new StoryExperience();
  
  // Configurar efectos especiales después de la carga inicial
  setTimeout(() => {
    storyExperience.setupSpecialEffects();
    storyExperience.setupSmoothScroll();
    storyExperience.optimizePerformance();
  }, 500);
});

// ===================================
// OPTIMIZACIÓN PARA DISPOSITIVOS MÓVILES
// ===================================
if ('ontouchstart' in window) {
  // Reducir efectos en móviles para mejor rendimiento
  document.body.classList.add('touch-device');
  
  // CSS adicional para touch devices
  const style = document.createElement('style');
  style.textContent = `
    .touch-device .story-hero::before {
      animation: none;
    }
    .touch-device .story-particles {
      display: none;
    }
  `;
  document.head.appendChild(style);
}