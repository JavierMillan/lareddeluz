/* ════════════════════════════════════════════════
   LA RED DE LUZ — Constelación narrativa
   No es un fondo: es el protagonista. Evoluciona capítulo
   a capítulo. Empiezas como UNA estrella sola; terminas
   como una estrella conectada al centro de la red.
   El cielo cuenta la misma historia que el texto.
   ════════════════════════════════════════════════ */

class RedDeLuzSky {
    constructor() {
        this.canvas = document.getElementById('networkCanvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.scrollProgress = 0;
        this.chapter = 0;
        // density: cuántas conexiones se permiten (0 = nadie, 1 = todas las cercanas)
        this.density = 0;
        this.densityTarget = 0;
        this.animationId = null;
        this.dpr = Math.min(window.devicePixelRatio || 1, 2);
        this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Densidad de conexión objetivo por capítulo (la historia).
        // 0 sola · 1 reflejo (otras aparecen, sin unir) · 2 primer vínculo ·
        // 3 constelación · 4 red densa · 5 red + tú al centro
        this.chapterDensity = [0.0, 0.0, 0.22, 0.5, 0.9, 1.0];

        this.config = {
            nodeCount: window.innerWidth < 768 ? 40 : 72,
            maxDistance: window.innerWidth < 768 ? 135 : 170,
            speed: 0.22,
            gold: [228, 205, 133]
        };

        this.init();
    }

    init() {
        this.resize();
        this.createNodes();
        window.addEventListener('resize', this.onResize.bind(this));
        if (this.reduceMotion) {
            this.density = 0.6;
            this.draw();
        } else {
            this.animate();
        }
    }

    onResize() {
        clearTimeout(this._rt);
        this._rt = setTimeout(() => {
            this.dpr = Math.min(window.devicePixelRatio || 1, 2);
            this.config.nodeCount = window.innerWidth < 768 ? 40 : 72;
            this.config.maxDistance = window.innerWidth < 768 ? 135 : 170;
            this.resize();
            this.createNodes();
            if (this.reduceMotion) this.draw();
        }, 200);
    }

    resize() {
        this.w = window.innerWidth;
        this.h = window.innerHeight;
        this.canvas.width = this.w * this.dpr;
        this.canvas.height = this.h * this.dpr;
        this.canvas.style.width = this.w + 'px';
        this.canvas.style.height = this.h + 'px';
        this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    }

    createNodes() {
        this.nodes = [];
        const n = this.config.nodeCount;
        for (let i = 0; i < n; i++) {
            this.nodes.push({
                x: Math.random() * this.w,
                y: Math.random() * this.h,
                vx: (Math.random() - 0.5) * this.config.speed,
                vy: (Math.random() - 0.5) * this.config.speed,
                radius: Math.random() * 1.5 + 1,
                intensity: Math.random() * 0.4 + 0.5,
                pulse: Math.random() * Math.PI * 2,
                hero: i === 0,      // la estrella protagonista (tú)
                born: Math.random() // umbral de "aparición" según capítulo
            });
        }
        // La estrella protagonista: centro-arriba.
        const hero = this.nodes[0];
        if (hero) {
            hero.x = this.w * 0.5;
            hero.y = this.h * 0.4;
            hero.radius = 3.2;
            hero.intensity = 1;
            hero.born = 0;
        }
    }

    /* Llamado desde main.js cuando cambia el capítulo activo. */
    setChapter(ch) {
        this.chapter = ch;
        this.densityTarget = this.chapterDensity[ch] ?? this.density;
    }

    setScroll(p) { this.scrollProgress = p; }

    update() {
        // density se acerca suavemente al objetivo del capítulo.
        this.density += (this.densityTarget - this.density) * 0.04;

        for (const node of this.nodes) {
            if (!node.hero) {
                node.x += node.vx;
                node.y += node.vy;
                if (node.x < 0 || node.x > this.w) { node.vx *= -1; node.x = Math.max(0, Math.min(this.w, node.x)); }
                if (node.y < 0 || node.y > this.h) { node.vy *= -1; node.y = Math.max(0, Math.min(this.h, node.y)); }
            } else {
                // En el último capítulo, la estrella protagonista deriva hacia el centro real.
                if (this.chapter >= 5) {
                    node.x += (this.w * 0.5 - node.x) * 0.02;
                    node.y += (this.h * 0.5 - node.y) * 0.02;
                }
            }
            node.pulse += 0.02;
        }
    }

    draw() {
        const ctx = this.ctx, c = this.config.gold;
        ctx.clearRect(0, 0, this.w, this.h);

        const reach = this.config.maxDistance;
        const density = this.density;

        // ── Conexiones ──
        // Sólo se dibujan según la densidad del capítulo. En cap 0/1 (density~0)
        // casi nada: estás solo. Crece hasta tejer todo el cielo.
        if (density > 0.01) {
            ctx.lineWidth = 1;
            const nodes = this.nodes;
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const a = nodes[i], b = nodes[j];
                    const dx = a.x - b.x, dy = a.y - b.y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < reach) {
                        // Cada par tiene un "umbral" estable; se conecta sólo si la densidad lo alcanza.
                        const pairThreshold = (a.born + b.born) / 2;
                        const heroLink = a.hero || b.hero;
                        // Los vínculos del héroe aparecen primero (la historia es sobre TI conectándote).
                        const effThreshold = heroLink ? pairThreshold * 0.4 : pairThreshold;
                        if (density >= effThreshold) {
                            const fade = Math.min(1, (density - effThreshold) * 4);
                            const o = (1 - dist / reach) * 0.5 * fade;
                            ctx.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},${o})`;
                            ctx.beginPath();
                            ctx.moveTo(a.x, a.y);
                            ctx.lineTo(b.x, b.y);
                            ctx.stroke();
                        }
                    }
                }
            }
        }

        // ── Estrellas ──
        for (const node of this.nodes) {
            // En cap 0 sólo la estrella protagonista existe plenamente; las demás
            // van "naciendo" conforme avanza la historia (density como proxy de progreso).
            let appear = node.hero ? 1 : Math.min(1, Math.max(0, (this.density * 1.6 + 0.15 - node.born) * 3));
            if (this.chapter === 0 && !node.hero) appear *= 0.35; // tenues al inicio
            if (appear <= 0.02) continue;

            const pulse = Math.sin(node.pulse) * 0.3 + 0.7;
            const r = node.radius * pulse;

            const g = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 4);
            const a0 = node.intensity * pulse * (node.hero ? 0.95 : 0.55) * appear;
            g.addColorStop(0, `rgba(${c[0]},${c[1]},${c[2]},${a0})`);
            g.addColorStop(1, `rgba(${c[0]},${c[1]},${c[2]},0)`);
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(node.x, node.y, r * 4, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${pulse * appear})`;
            ctx.beginPath();
            ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
            ctx.fill();

            // Halo extra para la estrella protagonista en el umbral.
            if (node.hero && this.chapter >= 5) {
                ctx.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},${0.25 * pulse})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(node.x, node.y, r * 5, 0, Math.PI * 2);
                ctx.stroke();
            }
        }
    }

    animate() {
        this.update();
        this.draw();
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        if (this.animationId) cancelAnimationFrame(this.animationId);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.redLuzSky = new RedDeLuzSky();
    window.addEventListener('beforeunload', () => window.redLuzSky?.destroy());
});
