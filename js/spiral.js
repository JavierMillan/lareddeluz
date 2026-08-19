/* ════════════════════════════════════════════════
   DESPEGA — Espiral ascendente
   No es una red de vínculos entre personas (eso es network.js,
   exclusivo de index.html/historia.html). Es UN viaje individual:
   una espiral de Arquímedes (radio crece linealmente con el ángulo)
   de partículas cobre subiendo desde un punto de origen con luz.
   Motivo derivado de la portada real de DESPEGA 3.0 - Workbook.

   Dos capas:
   - "hero": espiral grande y brillante, solo detrás del hero,
     protagonista de la composición (como en la portada real).
   - "ambient": espiral tenue de fondo, cubre toda la página,
     mucho más discreta — atmósfera, no protagonista.
   ════════════════════════════════════════════════ */

class DespegaSpiral {
    constructor() {
        this.canvas = document.getElementById('spiralCanvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.heroSection = document.getElementById('inicio');
        this.particles = [];
        this.progress = 0; // 0→1, avanza con el scroll
        this.dpr = Math.min(window.devicePixelRatio || 1, 2);
        this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.copper = [212, 130, 63];
        this.copperLight = [230, 166, 104];
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

    /* Espiral de Arquímedes real: r = a + b·θ (radio crece linealmente
       con el ángulo). i=0 es el núcleo (origen, abajo), i=count es la
       punta arriba. Esto es lo que hace que se lea como UN objeto
       geométrico deliberado, no como puntos sueltos con curva encima. */
    buildSpiral({ count, cx, baseY, topY, turns, maxRadius, sizeBase, sizeGrowth }) {
        const pts = [];
        for (let i = 0; i < count; i++) {
            const t = i / (count - 1);
            const angle = t * turns * Math.PI * 2;
            const radius = maxRadius * t; // Arquímedes: r crece linealmente con t (∝ θ)
            const y = baseY + (topY - baseY) * t;
            pts.push({
                t,
                angle,
                baseX: cx + Math.cos(angle) * radius,
                y,
                size: sizeBase + t * sizeGrowth, // crecen hacia la punta, como en la portada
                phase: Math.random() * Math.PI * 2,
                drift: (Math.random() - 0.5) * 0.35
            });
        }
        return pts;
    }

    createParticles() {
        const mobile = this.w < 768;
        const heroH = this.heroSection ? this.heroSection.offsetHeight || this.h : this.h;

        // Capa hero: grande, centrada, brillante — vive solo en la sección hero.
        this.heroSpiral = this.buildSpiral({
            count: mobile ? 70 : 110,
            cx: this.w * (mobile ? 0.5 : 0.68),
            baseY: heroH * 0.88,
            topY: heroH * 0.06,
            turns: 2.6,
            maxRadius: mobile ? this.w * 0.32 : Math.min(this.w * 0.22, 260),
            sizeBase: 1.1,
            sizeGrowth: 2.3
        });

        // Capa ambiente: tenue, cubre toda la altura del documento visible en viewport,
        // discreta — atmósfera de fondo para el resto de la página.
        this.ambientSpiral = this.buildSpiral({
            count: mobile ? 50 : 90,
            cx: this.w * 0.86,
            baseY: this.h * 0.95,
            topY: this.h * -0.15,
            turns: 3.4,
            maxRadius: mobile ? 70 : 130,
            sizeBase: 0.8,
            sizeGrowth: 0.9
        });
    }

    setProgress(p) { this.progress = p; }

    update() {
        for (const pt of this.heroSpiral) pt.phase += 0.018;
        for (const pt of this.ambientSpiral) pt.phase += 0.014;
    }

    drawSpiralLayer(pts, { lineAlpha, glowAlpha, coreGlow, color }) {
        const ctx = this.ctx, c = color;

        // Trazo guía — visible de verdad, no un rumor.
        ctx.beginPath();
        for (let i = 0; i < pts.length; i++) {
            const pt = pts[i];
            const x = pt.baseX + Math.sin(pt.phase) * pt.drift * 6;
            if (i === 0) ctx.moveTo(x, pt.y); else ctx.lineTo(x, pt.y);
        }
        ctx.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},${lineAlpha})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Núcleo: halo grande en el origen (i=0) — el punto de partida con luz real.
        if (coreGlow > 0 && pts.length) {
            const origin = pts[0];
            const ox = origin.baseX;
            const oy = origin.y;
            const g0 = ctx.createRadialGradient(ox, oy, 0, ox, oy, 90);
            g0.addColorStop(0, `rgba(${c[0]},${c[1]},${c[2]},${coreGlow})`);
            g0.addColorStop(1, `rgba(${c[0]},${c[1]},${c[2]},0)`);
            ctx.fillStyle = g0;
            ctx.beginPath();
            ctx.arc(ox, oy, 90, 0, Math.PI * 2);
            ctx.fill();
        }

        // Partículas como orbes con volumen (gradiente radial), no puntos planos.
        for (const pt of pts) {
            const pulse = Math.sin(pt.phase) * 0.25 + 0.75;
            const x = pt.baseX + Math.sin(pt.phase) * pt.drift * 6;
            const r = pt.size * pulse;

            const g = ctx.createRadialGradient(x, pt.y, 0, x, pt.y, r * 4.5);
            g.addColorStop(0, `rgba(${c[0]},${c[1]},${c[2]},${glowAlpha * pulse})`);
            g.addColorStop(1, `rgba(${c[0]},${c[1]},${c[2]},0)`);
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(x, pt.y, r * 4.5, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = `rgba(255,255,255,${glowAlpha * pulse * 0.5})`;
            ctx.beginPath();
            ctx.arc(x, pt.y, r * 0.35, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${glowAlpha})`;
            ctx.beginPath();
            ctx.arc(x, pt.y, r, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.w, this.h);
        // Ambiente primero (detrás, tenue).
        this.drawSpiralLayer(this.ambientSpiral, {
            lineAlpha: 0.08,
            glowAlpha: 0.28,
            coreGlow: 0,
            color: this.copper
        });
        // Hero encima: la que domina, con el núcleo brillante.
        this.drawSpiralLayer(this.heroSpiral, {
            lineAlpha: 0.22,
            glowAlpha: 0.9,
            coreGlow: 0.35,
            color: this.copperLight
        });
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
