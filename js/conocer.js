document.addEventListener('DOMContentLoaded', () => {
    // Create story particles
    const storyParticles = document.querySelector('.story-particles');
    if (storyParticles) {
        for(let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'story-particle';
        for(let i = 0; i < 60; i++) {
            const particle = document.createElement('div');
            particle.className = 'magical-star';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.setProperty('--duration', `${2 + Math.random() * 4}s`);
            dust.appendChild(particle);
        }
        originSection.appendChild(dust);
    }

    // Nebulosa en .awakening-section
    const awakeningSection = document.querySelector('.awakening-section');
    if (awakeningSection && !awakeningSection.querySelector('.nebula-effect')) {
        const nebula = document.createElement('div');
        nebula.className = 'nebula-effect';
        awakeningSection.appendChild(nebula);
    }

    // Animación de las palabras constelación
    const words = document.querySelectorAll('.word');
    words.forEach((word, index) => {
        word.style.animation = `constellationFade 6s infinite ${index * 2}s`;
        word.style.left = `${Math.random() * 80}%`;
        word.style.top = `${Math.random() * 80}%`;
    });
    
    // Crear partículas flotantes
    const storyParticles = document.querySelector('.story-particles');
    
    for(let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'story-particle';
        
        // Posición aleatoria
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Animación única para cada partícula
        particle.style.animation = `
            float ${5 + Math.random() * 5}s infinite ease-in-out ${Math.random() * 5}s,
            twinkle ${3 + Math.random() * 2}s infinite ease-in-out ${Math.random() * 3}s
        `;
        
        storyParticles.appendChild(particle);
    }

    // Revelar texto al scrollear
    const storyParagraphs = document.querySelectorAll('.story-text p');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal');
                }
            });
        },
        { threshold: 0.2 }
    );

    storyParagraphs.forEach(p => observer.observe(p));

    // Efecto de ondulación para el Awakening
    const awakenText = document.querySelector('.awakening-text');
    
    if (awakenText) {
        awakenText.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = awakenText.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;
            
            awakenText.style.setProperty('--x', `${x * 100}%`);
            awakenText.style.setProperty('--y', `${y * 100}%`);
        });
    }

    // Crear efecto de polvo cósmico
    const createCosmicDust = () => {
        const dust = document.createElement('div');
        dust.className = 'cosmic-dust';
        document.body.appendChild(dust);

        for(let i = 0; i < 100; i++) {
            const particle = document.createElement('div');
            particle.className = 'magical-star';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.setProperty('--duration', `${2 + Math.random() * 4}s`);
            particle.style.setProperty('--delay', `${Math.random() * 2}s`);
            dust.appendChild(particle);
        }
    };

    createCosmicDust();

    // Efecto de parallax sutil en scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        document.querySelectorAll('.nebula-effect').forEach(nebula => {
            nebula.style.transform = `translateY(${scrolled * 0.1}px)`;
        });
    });

    // Scroll suave entre secciones
    document.querySelectorAll('.scroll-down').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const target = this.getAttribute('data-scroll');
            if (target && document.querySelector(target)) {
                document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Inicializar efectos
    createOrbs();
    createGeometric();
    initScrollReveal();
    
    // Event listeners
    window.addEventListener('scroll', handleScroll);
    initSmoothScroll();
});

function createOrbs() {
    const container = document.getElementById('orbs');
    if (!container) return;
    
    const orbCount = 12;
    for (let i = 0; i < orbCount; i++) {
        const orb = document.createElement('div');
        orb.className = 'orb';
        orb.style.left = `${Math.random() * 100}%`;
        orb.style.top = `${Math.random() * 100}%`;
        orb.style.setProperty('--size', `${Math.random() * 3 + 2}rem`);
        orb.style.setProperty('--duration', `${Math.random() * 2 + 3}s`);
        orb.style.setProperty('--delay', `${Math.random() * 5}s`);
        container.appendChild(orb);
    }
}

// Add Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Handle block titles
            if (entry.target.classList.contains('block-title')) {
                entry.target.classList.add('visible');
            }
            
            // Handle text groups
            if (entry.target.classList.contains('text-group')) {
                const spans = entry.target.querySelectorAll('span');
                spans.forEach((span, index) => {
                    setTimeout(() => {
                        span.classList.add('visible');
                    }, index * 200);
                });
            }
            
            // Handle quotes
            if (entry.target.classList.contains('text-quote')) {
                entry.target.classList.add('visible');
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.block-title, .text-group, .text-quote').forEach(element => {
    observer.observe(element);
});
