/* ════════════════════════════════════════════════
   DESPEGA — Espiral ascendente
   No es una red de vínculos entre personas (eso es network.js,
   exclusivo de index.html/historia.html). Es UN viaje individual:
   partículas cobre subiendo en espiral desde un punto de origen.
   Motivo derivado de la portada real de DESPEGA 3.0 - Workbook.
   ════════════════════════════════════════════════ */

class DespegaSpiral {
    constructor() {
        this.canvas = document.getElementById('spiralCanvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.progress = 0; // 0→1, avanza con el scroll
        this.dpr = Math.min(window.devicePixelRatio || 1, 2);
        this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.copper = [212, 130, 63];
        this.count = window.innerWidth < 768 ? 90 : 160;
        this.init();
    }

    init() {
        this.resize();
        this.createParticles();
        window.addEventListener('resize', this.onResize.bind(this));
        if (this.reduceMotion) {
            this.draw();
        } else {
            this.animate();
        }
    }

    onResize() {
        clearTimeout(this._rt);
        this._rt = setTimeout(() => {
            this.dpr = Math.min(window.devicePixelRatio || 1, 2);
            this.count = window.innerWidth < 768 ? 90 : 160;
            this.resize();
            this.createParticles();
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

    /* Genera la espiral: t=0 en la base (centro-abajo), t=1 arriba.
       Cada partícula tiene un "t" fijo en la curva + una fase de
       parpadeo, para que la espiral se vea siempre completa (no
       nace de golpe) y solo el brillo/turno reacciona al scroll. */
    createParticles() {
        this.particles = [];
        const cx = this.w * 0.82; // la espiral vive a la derecha, deja el texto libre a la izquierda
        const baseY = this.h * 0.92;
        const topY = this.h * -0.1;
        const turns = 3.2;
        for (let i = 0; i < this.count; i++) {
            const t = i / this.count;
            const angle = t * turns * Math.PI * 2;
            const radius = 18 + t * (this.w < 768 ? 90 : 160) * (1 - t * 0.25);
            const y = baseY + (topY - baseY) * t;
            this.particles.push({
                t,
                angle,
                radius,
                baseX: cx + Math.cos(angle) * radius,
                y,
                size: 1 + Math.random() * 1.6,
                phase: Math.random() * Math.PI * 2,
                drift: (Math.random() - 0.5) * 0.4
            });
        }
    }

    setProgress(p) { this.progress = p; }

    update() {
        for (const pt of this.particles) {
            pt.phase += 0.02;
        }
    }

    draw() {
        const ctx = this.ctx, c = this.copper;
        ctx.clearRect(0, 0, this.w, this.h);

        // Línea guía de la espiral (muy tenue, el trazo del "camino")
        ctx.beginPath();
        for (let i = 0; i < this.particles.length; i++) {
            const pt = this.particles[i];
            const x = pt.baseX + Math.sin(pt.phase) * pt.drift * 6;
            if (i === 0) ctx.moveTo(x, pt.y); else ctx.lineTo(x, pt.y);
        }
        ctx.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},0.12)`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Partículas: las que ya "pasó" el progreso brillan más — asciendes leyendo.
        for (const pt of this.particles) {
            const passed = pt.t <= this.progress + 0.04;
            const pulse = Math.sin(pt.phase) * 0.25 + 0.75;
            const glow = passed ? 0.85 : 0.25;
            const x = pt.baseX + Math.sin(pt.phase) * pt.drift * 6;
            const r = pt.size * pulse * (passed ? 1.4 : 1);

            const g = ctx.createRadialGradient(x, pt.y, 0, x, pt.y, r * 4);
            g.addColorStop(0, `rgba(${c[0]},${c[1]},${c[2]},${glow * pulse})`);
            g.addColorStop(1, `rgba(${c[0]},${c[1]},${c[2]},0)`);
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(x, pt.y, r * 4, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${glow})`;
            ctx.beginPath();
            ctx.arc(x, pt.y, r, 0, Math.PI * 2);
            ctx.fill();
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
    window.despegaSpiral = new DespegaSpiral();
    window.addEventListener('beforeunload', () => window.despegaSpiral?.destroy());
});
