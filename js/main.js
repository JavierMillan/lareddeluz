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

// Modal Constelación - Funcionalidad
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('constelacionModal');
    const modalContent = document.getElementById('modalContent');
    const form = document.getElementById('constelacionForm');
    const closeModalBtn = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelBtn');
    
    // Abrir modal
    function openModal() {
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modalContent.classList.remove('scale-95');
        }, 10);
        
        // Prevenir scroll del body
        document.body.style.overflow = 'hidden';
    }
    
    // Cerrar modal
    function closeModal() {
        modal.classList.add('opacity-0');
        modalContent.classList.add('scale-95');
        
        setTimeout(() => {
            modal.classList.add('hidden');
            form.reset();
        }, 300);
        
        // Restaurar scroll del body
        document.body.style.overflow = 'auto';
    }
    
    // Event listeners para abrir modal
    const proposeLinks = document.querySelectorAll('a[href="mailto:hola@lareddeluz.com"]');
    proposeLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
    });
    
    // Event listeners para cerrar modal
    closeModalBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    
    // Cerrar modal al hacer click fuera del contenido
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Cerrar modal con tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
    
    // Manejar envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener datos del formulario
        const formData = new FormData(form);
        const nombre = formData.get('nombre').trim();
        const correo = formData.get('correo').trim();
        const contexto = formData.get('contexto').trim();
        
        // Obtener pilares seleccionados
        const pilaresSeleccionados = [];
        const pilaresCheckboxes = form.querySelectorAll('input[name="pilares"]:checked');
        pilaresCheckboxes.forEach(checkbox => {
            pilaresSeleccionados.push(checkbox.value);
        });
        
        // Validaciones
        if (!nombre || !correo || !contexto) {
            showNotification('Por favor completa todos los campos obligatorios', 'error');
            return;
        }
        
        if (pilaresSeleccionados.length === 0) {
            showNotification('Selecciona al menos un pilar relacionado', 'error');
            return;
        }
        
        if (!isValidEmail(correo)) {
            showNotification('Por favor ingresa un correo electrónico válido', 'error');
            return;
        }
        
        // Crear mensaje para WhatsApp
        const mensaje = createWhatsAppMessage(nombre, correo, pilaresSeleccionados, contexto);
        
        // Abrir WhatsApp
        const whatsappUrl = `https://wa.me/526221424577?text=${encodeURIComponent(mensaje)}`;
        window.open(whatsappUrl, '_blank');
        
        // Mostrar confirmación y cerrar modal
        showNotification('¡Propuesta enviada! Te contactaremos pronto 🌟', 'success');
        
        setTimeout(() => {
            closeModal();
        }, 1500);
    });
    
    // Función para crear el mensaje de WhatsApp
    function createWhatsAppMessage(nombre, correo, pilares, contexto) {
        const pilaresText = pilares.join(', ');
        
        return ` *NUEVA PROPUESTA DE CONSTELACIÓN* 

 *Nombre:* ${nombre}
 *Correo:* ${correo}
 *Pilares relacionados:* ${pilaresText}

 *Contexto de la idea:*
${contexto}

---
_Propuesta enviada desde La Red de Luz_`;
    }
    
    // Validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Sistema de notificaciones
    function showNotification(message, type = 'info') {
        // Remover notificación existente si hay una
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = `notification fixed top-4 right-4 z-[60] px-6 py-4 rounded-xl font-medium text-white transform translate-x-full transition-all duration-300`;
        
        // Estilos según el tipo
        if (type === 'success') {
            notification.classList.add('bg-green-600');
        } else if (type === 'error') {
            notification.classList.add('bg-red-600');
        } else {
            notification.classList.add('bg-blue-600');
        }
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Auto-remover después de 4 segundos
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    }
    
    // Mejorar UX de los checkboxes
    const checkboxes = form.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const label = this.closest('label');
            if (this.checked) {
                label.classList.add('bg-gold-light/10');
            } else {
                label.classList.remove('bg-gold-light/10');
            }
        });
    });
    
    // Contador de caracteres para el textarea
    const contextoTextarea = document.getElementById('contexto');
    const maxLength = 500;
    
    // Crear contador
    const counterDiv = document.createElement('div');
    counterDiv.className = 'text-xs text-white/50 mt-1 text-right';
    counterDiv.textContent = `0/${maxLength}`;
    contextoTextarea.parentNode.appendChild(counterDiv);
    
    contextoTextarea.addEventListener('input', function() {
        const currentLength = this.value.length;
        counterDiv.textContent = `${currentLength}/${maxLength}`;
        
        if (currentLength > maxLength * 0.9) {
            counterDiv.classList.add('text-yellow-400');
        } else {
            counterDiv.classList.remove('text-yellow-400');
        }
        
        if (currentLength > maxLength) {
            this.value = this.value.substring(0, maxLength);
            counterDiv.textContent = `${maxLength}/${maxLength}`;
            counterDiv.classList.add('text-red-400');
        } else {
            counterDiv.classList.remove('text-red-400');
        }
    });
    
    // Animación del botón de envío
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.addEventListener('click', function() {
        if (form.checkValidity()) {
            this.classList.add('animate-pulse');
            setTimeout(() => {
                this.classList.remove('animate-pulse');
            }, 1000);
        }
    });
});

// Función global para abrir el modal (por si se necesita desde otro lugar)
window.openConstelacionModal = function() {
    const modal = document.getElementById('constelacionModal');
    const modalContent = document.getElementById('modalContent');
    
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        modalContent.classList.remove('scale-95');
    }, 10);
    
    document.body.style.overflow = 'hidden';
};