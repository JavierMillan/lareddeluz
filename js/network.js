class RedDeLuzBackground {
    constructor() {
        this.canvas = document.getElementById('networkCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.connections = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.animationId = null;

        // Configuration
        this.config = {
            nodeCount: window.innerWidth < 768 ? 40 : 60,
            maxDistance: window.innerWidth < 768 ? 120 : 150,
            nodeSpeed: 0.5,
            pulseIntensity: 0.8,
            colors: {
                gold: '#e4cd85',
                blue: '#163384',
                goldRgb: [228, 205, 133],
                blueRgb: [22, 51, 132]
            }
        };

        this.init();
    }

    init() {
        this.resizeCanvas();
        this.createNodes();
        this.createFloatingParticles();
        this.setupEventListeners();
        this.animate();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createNodes() {
        this.nodes = [];
        for (let i = 0; i < this.config.nodeCount; i++) {
            this.nodes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * this.config.nodeSpeed,
                vy: (Math.random() - 0.5) * this.config.nodeSpeed,
                radius: Math.random() * 3 + 2,
                intensity: Math.random() * 0.5 + 0.5,
                pulsePhase: Math.random() * Math.PI * 2,
                type: Math.random() > 0.7 ? 'primary' : 'secondary'
            });
        }
    }

    createFloatingParticles() {
        const particleCount = window.innerWidth < 768 ? 15 : 25;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = `light-particle ${['small', 'medium', 'large'][Math.floor(Math.random() * 3)]}`;

            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (6 + Math.random() * 4) + 's';

            document.body.appendChild(particle);
        }
    }

    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.createNodes();
        });

        window.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        // Touch events for mobile
        window.addEventListener('touchmove', (e) => {
            if (e.touches[0]) {
                this.mouseX = e.touches[0].clientX;
                this.mouseY = e.touches[0].clientY;
            }
        });
    }

    updateNodes() {
        this.nodes.forEach(node => {
            // Update position
            node.x += node.vx;
            node.y += node.vy;

            // Bounce off edges
            if (node.x < 0 || node.x > this.canvas.width) {
                node.vx *= -1;
                node.x = Math.max(0, Math.min(this.canvas.width, node.x));
            }
            if (node.y < 0 || node.y > this.canvas.height) {
                node.vy *= -1;
                node.y = Math.max(0, Math.min(this.canvas.height, node.y));
            }

            // Update pulse phase
            node.pulsePhase += 0.02;

            // Mouse attraction (subtle)
            const dx = this.mouseX - node.x;
            const dy = this.mouseY - node.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                const force = (100 - distance) / 100 * 0.001;
                node.vx += dx * force;
                node.vy += dy * force;
            }

            // Limit velocity
            const maxSpeed = this.config.nodeSpeed * 2;
            const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
            if (speed > maxSpeed) {
                node.vx = (node.vx / speed) * maxSpeed;
                node.vy = (node.vy / speed) * maxSpeed;
            }
        });
    }

    drawNodes() {
        this.nodes.forEach(node => {
            const pulse = Math.sin(node.pulsePhase) * 0.3 + 0.7;
            const radius = node.radius * pulse;

            // Node glow
            const gradient = this.ctx.createRadialGradient(
                node.x, node.y, 0,
                node.x, node.y, radius * 3
            );

            if (node.type === 'primary') {
                gradient.addColorStop(0, `rgba(${this.config.colors.goldRgb.join(',')}, ${node.intensity * pulse})`);
                gradient.addColorStop(0.5, `rgba(${this.config.colors.goldRgb.join(',')}, ${node.intensity * pulse * 0.3})`);
                gradient.addColorStop(1, 'rgba(228, 205, 133, 0)');
            } else {
                gradient.addColorStop(0, `rgba(${this.config.colors.blueRgb.join(',')}, ${node.intensity * pulse * 0.8})`);
                gradient.addColorStop(0.5, `rgba(${this.config.colors.blueRgb.join(',')}, ${node.intensity * pulse * 0.2})`);
                gradient.addColorStop(1, 'rgba(22, 51, 132, 0)');
            }

            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, radius * 3, 0, Math.PI * 2);
            this.ctx.fill();

            // Core node
            this.ctx.fillStyle = node.type === 'primary' ?
                `rgba(${this.config.colors.goldRgb.join(',')}, ${pulse})` :
                `rgba(${this.config.colors.blueRgb.join(',')}, ${pulse * 0.8})`;
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    drawConnections() {
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const nodeA = this.nodes[i];
                const nodeB = this.nodes[j];

                const dx = nodeA.x - nodeB.x;
                const dy = nodeA.y - nodeB.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.config.maxDistance) {
                    const opacity = (this.config.maxDistance - distance) / this.config.maxDistance;
                    const pulseA = Math.sin(nodeA.pulsePhase) * 0.3 + 0.7;
                    const pulseB = Math.sin(nodeB.pulsePhase) * 0.3 + 0.7;
                    const combinedPulse = (pulseA + pulseB) / 2;

                    // Create gradient line
                    const gradient = this.ctx.createLinearGradient(
                        nodeA.x, nodeA.y, nodeB.x, nodeB.y
                    );

                    if (nodeA.type === 'primary' || nodeB.type === 'primary') {
                        gradient.addColorStop(0, `rgba(${this.config.colors.goldRgb.join(',')}, ${opacity * combinedPulse * 0.6})`);
                        gradient.addColorStop(0.5, `rgba(${this.config.colors.blueRgb.join(',')}, ${opacity * combinedPulse * 0.4})`);
                        gradient.addColorStop(1, `rgba(${this.config.colors.goldRgb.join(',')}, ${opacity * combinedPulse * 0.6})`);
                    } else {
                        gradient.addColorStop(0, `rgba(${this.config.colors.blueRgb.join(',')}, ${opacity * combinedPulse * 0.3})`);
                        gradient.addColorStop(1, `rgba(${this.config.colors.blueRgb.join(',')}, ${opacity * combinedPulse * 0.3})`);
                    }

                    this.ctx.strokeStyle = gradient;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(nodeA.x, nodeA.y);
                    this.ctx.lineTo(nodeB.x, nodeB.y);
                    this.ctx.stroke();
                }
            }
        }
    }

    animate() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw
        this.updateNodes();
        this.drawConnections();
        this.drawNodes();

        // Continue animation
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }

        // Remove floating particles
        document.querySelectorAll('.light-particle, .pulse-wave, .energy-line').forEach(el => {
            if (el.parentNode) {
                el.parentNode.removeChild(el);
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const background = new RedDeLuzBackground();

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        background.destroy();
    });
});