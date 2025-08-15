// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            mobileMenu.classList.add('hidden');
        }
    });
});

// Create Dynamic Stars in Starfield
function createStarfield() {
    const starfield = document.querySelector('.starfield');
    const starCount = 50;

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
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.liquid-glass, .testimonial-card').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// Enhanced Hover Effects for Pillar Cards
function setupPillarEffects() {
    document.querySelectorAll('.liquid-glass').forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', function () {
    createStarfield();
    setupScrollAnimations();
    setupPillarEffects();
});

// Parallax Effect for Background Elements
function parallaxEffect() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-particle');

    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}

window.addEventListener('scroll', parallaxEffect);

// Add Glow Effect on Scroll
function addScrollGlow() {
    const scrollPosition = window.scrollY;
    const navbar = document.querySelector('.navbar');

    if (scrollPosition > 50) {
        navbar.style.background = 'rgba(13, 11, 22, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(228, 205, 133, 0.1)';
    } else {
        navbar.style.background = 'rgba(13, 11, 22, 0.8)';
        navbar.style.boxShadow = 'none';
    }
}

window.addEventListener('scroll', addScrollGlow);

// Enhanced Click Effects
document.querySelectorAll('.liquid-glass').forEach(element => {
    element.addEventListener('click', function (e) {
        // Create ripple effect
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