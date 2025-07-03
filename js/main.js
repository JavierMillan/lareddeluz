// Network Animation
function createNetwork() {
    const container = document.getElementById('networkBg');
    const nodeCount = 20;
    
    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
        const node = document.createElement('div');
        node.className = 'network-node';
        node.style.left = Math.random() * 100 + '%';
        node.style.top = Math.random() * 100 + '%';
        node.style.animationDelay = Math.random() * 3 + 's';
        container.appendChild(node);
    }
    
    // Create connections
    for (let i = 0; i < nodeCount / 2; i++) {
        const line = document.createElement('div');
        line.className = 'network-line';
        line.style.left = Math.random() * 100 + '%';
        line.style.top = Math.random() * 100 + '%';
        line.style.width = Math.random() * 200 + 50 + 'px';
        line.style.transform = `rotate(${Math.random() * 360}deg)`;
        line.style.animationDelay = Math.random() * 4 + 's';
        container.appendChild(line);
    }
}

// Floating Particles
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    container.innerHTML = '';
    const particleCount = 15;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        container.appendChild(particle);
    }
}

// Magical effects for pillar cards
function createMagicalEffects() {
    const cards = document.querySelectorAll('.pillar-card');
    
    cards.forEach(card => {
        // Efecto de brillo radial que sigue al mouse
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / card.offsetWidth) * 100;
            const y = ((e.clientY - rect.top) / card.offsetHeight) * 100;
            card.style.setProperty('--x', `${x}%`);
            card.style.setProperty('--y', `${y}%`);
        });

        // Crear estrellas con posiciones y animaciones aleatorias
        for (let i = 0; i < 8; i++) {
            const star = document.createElement('div');
            star.className = 'magical-star';
            
            // Posición aleatoria
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            
            // Animación aleatoria
            const duration = 2 + Math.random() * 3;
            const delay = Math.random() * 2;
            star.style.setProperty('--duration', `${duration}s`);
            star.style.animationDelay = `${delay}s`;
            
            card.appendChild(star);
        }

        // Crear destellos flotantes
        for (let i = 0; i < 4; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'magical-sparkle';
            
            // Posición aleatoria
            sparkle.style.left = `${Math.random() * 100}%`;
            sparkle.style.top = `${Math.random() * 100}%`;
            
            // Animación aleatoria
            const duration = 3 + Math.random() * 2;
            const delay = Math.random() * 2;
            sparkle.style.setProperty('--float-duration', `${duration}s`);
            sparkle.style.animationDelay = `${delay}s`;
            
            card.appendChild(sparkle);
        }
    });
}

// Scroll Reveal optimizado con IntersectionObserver
function setupRevealObserver() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(reveal => observer.observe(reveal));
}

// Smooth scroll for anchor links
function enableSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Smooth scroll para los links del navbar
document.querySelectorAll('.dropdown-content a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Pillar card hover effect
function enablePillarCardHover() {
    document.querySelectorAll('.pillar-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(228, 205, 133, 0.15)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(228, 205, 133, 0.1)';
        });
    });
}

// Pillar card click effect for mobile y accesibilidad
function enablePillarCardClick() {
    const pillarCards = document.querySelectorAll('.pillar-card');
    pillarCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Si ya está activa, la desactivamos
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                return;
            }
            // Desactivamos todas las demás tarjetas
            pillarCards.forEach(c => c.classList.remove('active'));
            // Activamos esta tarjeta
            this.classList.add('active');
            e.stopPropagation();
        });
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    // Cerrar tarjeta activa al hacer click fuera
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.pillar-card')) {
            pillarCards.forEach(card => card.classList.remove('active'));
        }
    });
}

// Navbar hamburger y links responsive
function enableNavbarHamburger() {
    const hamburger = document.querySelector('.navbar-hamburger');
    const navLinks = document.querySelector('.navbar-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    document.querySelectorAll('.navbar-link').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 900 && navLinks) {
                navLinks.classList.remove('active');
            }
        });
    });
}

// Scroll next buttons
function enableScrollNextButtons() {
    document.querySelectorAll('.scroll-next').forEach(btn => {
        btn.addEventListener('click', function() {
            const next = this.closest('section').nextElementSibling;
            if (next) {
                next.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Scroll next buttons (scroll-down)
function enableScrollDownButtons() {
    document.querySelectorAll('.scroll-down').forEach(btn => {
        btn.addEventListener('click', function() {
            const selector = btn.getAttribute('data-scroll');
            if (selector) {
                const target = document.querySelector(selector);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
}

// Mejorar la función de scroll para que funcione con cualquier selector
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Event listeners para los botones de scroll
document.querySelectorAll('.scroll-down').forEach(arrow => {
    arrow.addEventListener('click', function(e) {
        e.preventDefault();
        const targetSection = this.getAttribute('data-scroll');
        smoothScroll(targetSection);
    });
});

// Initialize all
function initLaRedDeLuz() {
    createNetwork();
    createParticles();
    setupRevealObserver();
    enableSmoothScroll();
    enablePillarCardHover();
    createMagicalEffects();
    enableNavbarHamburger();
    enableScrollNextButtons();
    enableScrollDownButtons();
    enablePillarCardClick(); // <-- activar click en cartas
}

document.addEventListener('DOMContentLoaded', function() {
    initLaRedDeLuz();

    // Mejorada la función de scroll
    document.querySelectorAll('.scroll-down').forEach(arrow => {
        arrow.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-scroll');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});
