/* ════════════════════════════════════════════════
   LA RED DE LUZ — El recorrido
   Sincroniza el texto con el cielo: cada capítulo que entra
   le dice a la constelación cómo debe verse.
   ════════════════════════════════════════════════ */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ─── Menú móvil ─── */
const menuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        const open = mobileMenu.classList.toggle('hidden') === false;
        menuBtn.setAttribute('aria-expanded', String(open));
        menuBtn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuBtn.setAttribute('aria-expanded', 'false');
        });
    });
}

/* ─── Scroll progress rail + sky scroll ─── */
const railFill = document.getElementById('scrollRailFill');
function onScrollProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? window.scrollY / max : 0;
    if (railFill) railFill.style.width = (p * 100) + '%';
    if (window.redLuzSky) window.redLuzSky.setScroll(p);
}
function rafThrottle(fn) {
    let ticking = false;
    return () => {
        if (!ticking) { ticking = true; requestAnimationFrame(() => { fn(); ticking = false; }); }
    };
}
window.addEventListener('scroll', rafThrottle(onScrollProgress), { passive: true });
onScrollProgress();

/* ─── Capítulo activo → el cielo evoluciona + nav activa ─── */
const chapters = document.querySelectorAll('.chapter[data-chapter]');
const navLinks = document.querySelectorAll('.nav-link[data-nav]');
const navMap = {};
navLinks.forEach(l => { navMap[l.dataset.nav] = l; });

if (chapters.length) {
    const chapterObserver = new IntersectionObserver((entries) => {
        // Elige el capítulo más visible.
        let best = null, bestRatio = 0;
        entries.forEach(e => {
            if (e.intersectionRatio > bestRatio) { bestRatio = e.intersectionRatio; best = e.target; }
        });
        if (best && bestRatio > 0.15) {
            const ch = parseInt(best.dataset.chapter, 10);
            if (window.redLuzSky) window.redLuzSky.setChapter(ch);

            // Nav activa por sección.
            const sec = best.dataset.section;
            navLinks.forEach(l => l.classList.remove('is-active'));
            if (navMap[sec]) navMap[sec].classList.add('is-active');
        }
    }, { threshold: [0.15, 0.4, 0.7] });

    chapters.forEach(c => chapterObserver.observe(c));
}

/* ─── Reveals ─── */
const reveals = document.querySelectorAll('.reveal');
if (reduceMotion) {
    reveals.forEach(el => el.classList.add('is-visible'));
} else {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(el => revealObserver.observe(el));
}

/* ─── Demo del vínculo (cap 02): se dibuja al entrar ─── */
const demoLink = document.querySelector('.demo-link');
if (demoLink && !reduceMotion) {
    const demoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-drawn');
                demoObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.6 });
    demoObserver.observe(demoLink);
} else if (demoLink) {
    demoLink.classList.add('is-drawn');
}

/* ─── Tipografía que se constela ─── */
function buildConstellateWords() {
    const words = document.querySelectorAll('.constellate-word');
    words.forEach(word => {
        if (reduceMotion) { word.classList.add('lit'); return; }
        const overlay = document.createElement('span');
        overlay.className = 'cw-stars';
        overlay.setAttribute('aria-hidden', 'true');
        for (let i = 0; i < 5; i++) {
            const dot = document.createElement('span');
            dot.className = 'cw-star';
            dot.style.left = (10 + Math.random() * 80) + '%';
            dot.style.top = (15 + Math.random() * 70) + '%';
            dot.style.setProperty('--sd', (i * 0.08) + 's');
            overlay.appendChild(dot);
        }
        word.appendChild(overlay);
    });
    const wordObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('lit');
                wordObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.6 });
    words.forEach(w => wordObserver.observe(w));
}
buildConstellateWords();

/* ─── Constelaciones: encender tarjeta ───
   Desktop ancho → cursor. Pantalla angosta → al entrar en viewport. */
const cards = document.querySelectorAll('.constellation-card');
const useCursor = window.matchMedia('(hover: hover) and (min-width: 1024px)').matches;
if (useCursor) {
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => card.classList.add('is-lit'));
        card.addEventListener('mouseleave', () => card.classList.remove('is-lit'));
    });
} else {
    const litObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => entry.target.classList.toggle('is-lit', entry.isIntersecting));
    }, { threshold: 0.55 });
    cards.forEach(c => litObserver.observe(c));
}
