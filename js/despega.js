// ==========================================
// DESPEGA - La Red de Luz JavaScript
// ==========================================

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Enhanced Methodology Navigation
const methodologyNav = document.getElementById('methodologyNav');
const navToggle = document.getElementById('navToggle');
const navToggleIcon = document.getElementById('navToggleIcon');
let isNavCollapsed = false;

// Toggle navigation visibility
navToggle.addEventListener('click', () => {
    isNavCollapsed = !isNavCollapsed;
    toggleNavigation();
});

function toggleNavigation() {
    if (isNavCollapsed) {
        methodologyNav.classList.add('collapsed');
        navToggleIcon.textContent = '▶';
        navToggle.setAttribute('aria-label', 'Mostrar navegación');
    } else {
        methodologyNav.classList.remove('collapsed');
        navToggleIcon.textContent = '◀';
        navToggle.setAttribute('aria-label', 'Ocultar navegación');
    }
}

// Auto-collapse on smaller screens
function checkNavVisibility() {
    const windowWidth = window.innerWidth;
    
    if (windowWidth <= 1280) {
        // En pantallas pequeñas, solo colapsamos automáticamente la primera vez
        if (!isNavCollapsed) {
            isNavCollapsed = true;
            toggleNavigation();
        }
    } else if (windowWidth > 1280) {
        // En pantallas grandes, expandimos automáticamente si estaba colapsado por responsive
        if (isNavCollapsed) {
            isNavCollapsed = false;
            toggleNavigation();
        }
    }
}

// Check on load and resize
window.addEventListener('load', checkNavVisibility);
window.addEventListener('resize', checkNavVisibility);

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

// Step Reveal Animation
function setupStepAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.classList.add('animate-step-reveal');

                const progressBar = entry.target.querySelector('.step-progress');
                if (progressBar) {
                    setTimeout(() => {
                        progressBar.classList.add('active');
                    }, 200);
                }
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });

    document.querySelectorAll('.step-card').forEach(step => {
        observer.observe(step);
    });
}

// Enhanced Step Navigation
function setupStepNavigation() {
    const steps = document.querySelectorAll('[id^="step-"]');
    const navSteps = document.querySelectorAll('.nav-step');

    // Click navigation
    navSteps.forEach((navStep, index) => {
        navStep.addEventListener('click', () => {
            const targetId = navStep.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });

    // Update active state on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stepIndex = Array.from(steps).indexOf(entry.target);
                navSteps.forEach((nav, index) => {
                    if (index === stepIndex) {
                        nav.classList.add('active');
                    } else {
                        nav.classList.remove('active');
                    }
                });
            }
        });
    }, { threshold: 0.6 });

    steps.forEach(step => observer.observe(step));
}

// Enhanced Hover Effects
function setupEnhancedEffects() {
    document.querySelectorAll('.step-card').forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-12px) scale(1.02)';
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 1.6, 0.6, 1)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Progress tracking for methodology
function setupProgressTracking() {
    const steps = document.querySelectorAll('[id^="step-"]');
    const globalProgress = document.getElementById('global-progress');
    let currentStep = 0;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stepIndex = Array.from(steps).indexOf(entry.target);
                if (stepIndex > currentStep) {
                    currentStep = stepIndex;
                    const progress = ((currentStep + 1) / steps.length) * 100;
                    if (globalProgress) {
                        globalProgress.style.transform = `scaleX(${progress / 100})`;
                    }
                }
            }
        });
    }, { threshold: 0.5 });

    steps.forEach(step => observer.observe(step));
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

// Airplane animation enhancement
function enhanceAirplaneAnimation() {
    const airplane = document.querySelector('.airplane');
    if (airplane) {
        let angle = 0;
        setInterval(() => {
            angle += 0.5;
            const wobble = Math.sin(angle * Math.PI / 180) * 2;
            airplane.style.transform = `translate(-50%, -50%) rotate(${wobble}deg)`;
        }, 100);
    }
}

// Add click ripple effect
function setupRippleEffect() {
    document.querySelectorAll('.step-card, .liquid-glass').forEach(element => {
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
}

// Ritual boxes interactive behavior
function setupRitualBoxes() {
    document.querySelectorAll('.ritual-box').forEach(box => {
        box.addEventListener('click', function () {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 8px 32px rgba(228, 205, 133, 0.2)';

            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '';
            }, 200);
        });
    });
}

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    console.log('🚀 DESPEGA: Inicializando la experiencia...');
    
    // Core functionality
    createStarfield();
    setupStepAnimations();
    setupEnhancedEffects();
    setupStepNavigation();
    setupProgressTracking();
    enhanceAirplaneAnimation();
    
    // Interactive enhancements
    setupRippleEffect();
    setupRitualBoxes();
    
    console.log('✨ DESPEGA: Listo para el viaje interior');
});

// Add scroll effects with throttling for performance
window.addEventListener('scroll', throttle(() => {
    parallaxEffect();
}, 16)); // ~60fps

// Handle window resize events
window.addEventListener('resize', throttle(() => {
    checkNavVisibility();
}, 250));

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
    }
    
    // Arrow keys for step navigation when nav is focused
    if (document.activeElement.closest('.methodology-nav')) {
        const navSteps = document.querySelectorAll('.nav-step');
        const currentIndex = Array.from(navSteps).findIndex(step => 
            step.classList.contains('active')
        );
        
        if (e.key === 'ArrowUp' && currentIndex > 0) {
            e.preventDefault();
            navSteps[currentIndex - 1].click();
        } else if (e.key === 'ArrowDown' && currentIndex < navSteps.length - 1) {
            e.preventDefault();
            navSteps[currentIndex + 1].click();
        }
    }
});

// Smooth fade-in for sections on scroll
function setupSectionFadeIn() {
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });
}

// Enhanced loading experience
window.addEventListener('load', function() {
    setupSectionFadeIn();
    
    // Hide loading indicator if exists
    const loader = document.querySelector('.loading-indicator');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }
    
    console.log('🌟 DESPEGA: Experiencia completamente cargada');
});

// Export functions for potential external use
window.DESPEGA = {
    createStarfield,
    setupStepNavigation,
    setupProgressTracking,
    parallaxEffect,
    checkNavVisibility
};