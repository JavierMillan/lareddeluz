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
    this.setupSectionNetworks();
    this.setupProgressNav();
    document.addEventListener('navbarLoaded', () => this.adjustNavbarLinks());

    // Cerrar inicialización
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
    document.querySelectorAll('.story-section').forEach(section => {
      observer.observe(section);
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
  // REDES DINÁMICAS EN CADA SECCIÓN
  // ===================================
  setupSectionNetworks() {
    document.querySelectorAll('.section-network').forEach(container => {
      const nodeCount = 12;
      for (let i = 0; i < nodeCount; i++) {
        const node = document.createElement('div');
        node.className = 'network-node';
        node.style.left = Math.random() * 100 + '%';
        node.style.top = Math.random() * 100 + '%';
        node.style.animationDelay = Math.random() * 3 + 's';
        container.appendChild(node);
      }

      for (let i = 0; i < nodeCount / 2; i++) {
        const line = document.createElement('div');
        line.className = 'network-line';
        line.style.left = Math.random() * 100 + '%';
        line.style.top = Math.random() * 100 + '%';
        line.style.width = Math.random() * 150 + 30 + 'px';
        line.style.transform = `rotate(${Math.random() * 360}deg)`;
        line.style.animationDelay = Math.random() * 4 + 's';
        container.appendChild(line);
      }
    });
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
  // Ajustar enlaces del navbar a anclas locales
  // ===================================
  adjustNavbarLinks() {
    document.querySelectorAll('a[href^="conocer.html#"]').forEach(link => {
      const id = link.getAttribute('href').split('#')[1];
      link.setAttribute('href', `#${id}`);
    });
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
    const heavyEffects = document.querySelectorAll('.story-section');
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

// --- INICIO: LIMPIEZA DE COMPORTAMIENTO NAVBAR ---
// (Se elimina todo el JS relacionado con menús, submenús, burger, nav-dropdown, nav-link, nav-toggle, etc.)
// --- FIN: LIMPIEZA DE COMPORTAMIENTO NAVBAR ---

// =====================
// Luxury conocer.html EXCLUSIVO

// Partículas exclusivas para conocer.html
function conocerParticles(selector, count = 12) {
  const container = document.querySelector(selector);
  if (!container) return;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.top = Math.random() * 100 + '%';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDelay = (Math.random() * 6) + 's';
    container.appendChild(p);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  conocerParticles('.conocer-particles', 16);
  conocerParticles('.conocer-encuentro-particles', 10);
});

// Halo reveal animación en El Llamado
function haloRevealAnim() {
  const halo = document.querySelector('.halo-anim');
  if (!halo) return;
  halo.style.opacity = '0';
  setTimeout(() => { halo.style.opacity = '1'; }, 400);
}
document.addEventListener('DOMContentLoaded', haloRevealAnim);

// Micro-interacción: animar cards al hacer scroll (ya cubierto por fade-in global)
// =====================
// HERO DISRUPTIVO LUXURY - conocer.html

// Canvas fondo liquid glass animado
function startLiquidGlassHero() {
  const canvas = document.getElementById('liquid-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = window.innerWidth, h = window.innerHeight;
  canvas.width = w; canvas.height = h;

  function resize() {
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = w; canvas.height = h;
  }
  window.addEventListener('resize', resize);

  // Parámetros de blobs
  const blobs = Array.from({length: 5}).map((_,i) => ({
    x: Math.random()*w, y: Math.random()*h, r: 120+Math.random()*80,
    dx: 0.5+Math.random(), dy: 0.5+Math.random(), phase: Math.random()*Math.PI*2
  }));

  function draw() {
    ctx.clearRect(0,0,w,h);
    ctx.globalAlpha = 0.7;
    blobs.forEach((b,i) => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(
        b.x + Math.sin(Date.now()/1200 + b.phase)*30,
        b.y + Math.cos(Date.now()/1400 + b.phase)*30,
        b.r + Math.sin(Date.now()/900 + b.phase)*12,
        0, Math.PI*2
      );
      const grad = ctx.createRadialGradient(b.x, b.y, b.r*0.2, b.x, b.y, b.r);
      grad.addColorStop(0, 'rgba(228,205,133,0.18)');
      grad.addColorStop(0.5, 'rgba(22,51,132,0.13)');
      grad.addColorStop(1, 'rgba(13,11,22,0.9)');
      ctx.fillStyle = grad;
      ctx.filter = 'blur(2.5px)';
      ctx.fill();
      ctx.restore();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  draw();
}

document.addEventListener('DOMContentLoaded', startLiquidGlassHero);

// Partículas luxury con parallax mouse
function heroParticlesParallax() {
  const container = document.querySelector('.conocer-particles');
  if (!container) return;
  const count = 18;
  const particles = [];
  for(let i=0;i<count;i++){
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.top = (10+Math.random()*80)+'%';
    p.style.left = (5+Math.random()*90)+'%';
    p.style.opacity = 0.5+Math.random()*0.5;
    container.appendChild(p);
    particles.push(p);
  }
  document.addEventListener('mousemove', e => {
    const cx = window.innerWidth/2, cy = window.innerHeight/2;
    const mx = (e.clientX-cx)/cx, my = (e.clientY-cy)/cy;
    particles.forEach((p,i) => {
      p.style.transform = `translate(${mx*10*(i%3-1)}px,${my*10*(i%3-1)}px)`;
      p.style.filter = `blur(${Math.abs(mx*my)*2+0.5}px)`;
    });
  });
}
document.addEventListener('DOMContentLoaded', heroParticlesParallax);

// Sombra animada que se aclara al hacer scroll
function heroShadowScroll() {
  window.addEventListener('scroll', () => {
    if(window.scrollY > 60) {
      document.body.classList.add('hero-scrolled');
    } else {
      document.body.classList.remove('hero-scrolled');
    }
  });
}
document.addEventListener('DOMContentLoaded', heroShadowScroll);

// Nebula Canvas Animation for conocer.html
(function() {
  const canvas = document.getElementById('nebula-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  // Handle resize
  window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  });

  // Nebula particles
  const PARTICLE_COUNT = 90;
  const STAR_COUNT = 120;
  const particles = [];
  const stars = [];
  const nebulaColors = [
    'rgba(22,51,132,0.18)', // deep blue
    'rgba(228,205,133,0.10)', // gold
    'rgba(44, 0, 80, 0.18)', // purple
    'rgba(0, 80, 180, 0.13)', // blue
    'rgba(255,255,255,0.08)' // white
  ];

  // Particle class for nebula clouds
  class NebulaParticle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = 80 + Math.random() * 120;
      this.color = nebulaColors[Math.floor(Math.random() * nebulaColors.length)];
      this.opacity = 0.18 + Math.random() * 0.18;
      this.dx = (Math.random() - 0.5) * 0.18;
      this.dy = (Math.random() - 0.5) * 0.18;
      this.blur = 30 + Math.random() * 40;
    }
    draw(ctx) {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.filter = `blur(${this.blur}px)`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.restore();
    }
    update() {
      this.x += this.dx;
      this.y += this.dy;
      // Rebote suave en bordes
      if (this.x < -this.radius) this.x = width + this.radius;
      if (this.x > width + this.radius) this.x = -this.radius;
      if (this.y < -this.radius) this.y = height + this.radius;
      if (this.y > height + this.radius) this.y = -this.radius;
    }
  }

  // Star class for twinkling stars
  class Star {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = 0.4 + Math.random() * 1.2;
      this.opacity = 0.5 + Math.random() * 0.5;
      this.baseOpacity = this.opacity;
      this.twinkleSpeed = 0.008 + Math.random() * 0.012;
      this.twinklePhase = Math.random() * Math.PI * 2;
      this.color = Math.random() > 0.7 ? 'rgba(228,205,133,0.7)' : 'rgba(255,255,255,0.8)';
    }
    draw(ctx, t) {
      // Parpadeo suave
      const twinkle = Math.sin(t * this.twinkleSpeed + this.twinklePhase) * 0.3 + 0.7;
      ctx.save();
      ctx.globalAlpha = this.baseOpacity * twinkle;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();
    }
  }

  // Inicializa partículas y estrellas
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new NebulaParticle());
  }
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push(new Star());
  }

  // Animación principal
  function animate(t) {
    ctx.clearRect(0, 0, width, height);
    // Fondo espacial
    ctx.fillStyle = '#0d0b16';
    ctx.fillRect(0, 0, width, height);
    // Dibuja partículas de nebulosa
    for (let p of particles) {
      p.update();
      p.draw(ctx);
    }
    // Dibuja estrellas parpadeantes
    for (let s of stars) {
      s.draw(ctx, t || 0);
    }
    requestAnimationFrame(animate);
  }
  animate();
})();

// El Llamado: estrellas animadas exclusivas
(function() {
  const container = document.querySelector('.llamado-stars');
  if (!container) return;
  const STAR_COUNT = 60;
  const stars = [];
  const width = container.offsetWidth || window.innerWidth;
  const height = container.offsetHeight || 400;

  for (let i = 0; i < STAR_COUNT; i++) {
    const star = document.createElement('div');
    const size = Math.random() * 1.8 + 0.7;
    star.style.position = 'absolute';
    star.style.left = (Math.random() * 100) + '%';
    star.style.top = (Math.random() * 100) + '%';
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    star.style.borderRadius = '50%';
    star.style.background = Math.random() > 0.7 ? 'rgba(228,205,133,0.7)' : 'rgba(255,255,255,0.8)';
    star.style.opacity = 0.5 + Math.random() * 0.5;
    star.style.filter = 'blur(' + (Math.random() * 1.2) + 'px)';
    star.style.transition = 'opacity 1.2s';
    container.appendChild(star);
    stars.push({el: star, tw: Math.random() * Math.PI * 2, sp: 0.008 + Math.random() * 0.012});
  }

  function animate(t) {
    for (let s of stars) {
      const twinkle = Math.sin(t * s.sp + s.tw) * 0.3 + 0.7;
      s.el.style.opacity = 0.5 * twinkle + 0.5;
    }
    requestAnimationFrame(animate);
  }
  animate();
})();

// El Encuentro: estrellas internas y efecto agua
(function() {
  document.querySelectorAll('.encuentro-stars').forEach(container => {
    const STAR_COUNT = 22;
    const stars = [];
    const width = container.offsetWidth || 220;
    const height = container.offsetHeight || 120;
    for (let i = 0; i < STAR_COUNT; i++) {
      const star = document.createElement('div');
      const size = Math.random() * 1.5 + 0.7;
      star.style.position = 'absolute';
      star.style.left = (Math.random() * 100) + '%';
      star.style.top = (Math.random() * 100) + '%';
      star.style.width = size + 'px';
      star.style.height = size + 'px';
      star.style.borderRadius = '50%';
      star.style.background = Math.random() > 0.7 ? 'rgba(228,205,133,0.7)' : 'rgba(255,255,255,0.8)';
      star.style.opacity = 0.4 + Math.random() * 0.5;
      star.style.filter = 'blur(' + (Math.random() * 1.2) + 'px)';
      container.appendChild(star);
      stars.push({el: star, tw: Math.random() * Math.PI * 2, sp: 0.01 + Math.random() * 0.02});
    }
    function animate(t) {
      for (let s of stars) {
        const twinkle = Math.sin(t * s.sp + s.tw) * 0.3 + 0.7;
        s.el.style.opacity = 0.4 * twinkle + 0.5;
      }
      requestAnimationFrame(animate);
    }
    animate();
  });

  // Efecto agua/dispersión al interactuar
  document.querySelectorAll('.conocer-encuentro-card').forEach(card => {
    card.addEventListener('pointerdown', () => {
      card.classList.add('active-water');
      setTimeout(() => card.classList.remove('active-water'), 700);
    });
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        card.classList.add('active-water');
        setTimeout(() => card.classList.remove('active-water'), 700);
      }
    });
  });
})();
