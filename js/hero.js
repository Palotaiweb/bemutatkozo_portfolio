/* =========================================================
   HERO.JS – Hero Section Interactive Effects
   - Particle / dot-grid canvas animation
   - Nav scroll behaviour
   - No external libraries
   ========================================================= */

'use strict';

/* ---------------------------------------------------------
   NAV – Add .scrolled class on scroll
   --------------------------------------------------------- */
function initNavScroll() {
    const header = document.getElementById('site-header');
    if (!header) return;

    const onScroll = () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run immediately in case page loaded mid-scroll
}

/* ---------------------------------------------------------
   PARTICLE CANVAS ANIMATION
   Minimalist dot-grid that shifts slightly with mouse.
   Uses requestAnimationFrame – no external libs.
   --------------------------------------------------------- */
function initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height, particles;
    let mouseX = 0;
    let mouseY = 0;
    let rafId;

    const PARTICLE_COUNT = 80;
    const MAX_DISTANCE = 130;
    const BASE_RADIUS = 1.5;
    const COLOR_PRIMARY = '14, 165, 233';    // --color-primary RGB
    const COLOR_ACCENT = '139, 92, 246';   // --color-accent RGB

    // Particle class
    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.baseX = this.x;
            this.baseY = this.y;
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = (Math.random() - 0.5) * 0.3;
            this.radius = BASE_RADIUS + Math.random() * 1.5;
            this.color = Math.random() > 0.6 ? COLOR_ACCENT : COLOR_PRIMARY;
            this.opacity = 0.15 + Math.random() * 0.35;
        }

        update() {
            // Gentle drift
            this.x += this.vx;
            this.y += this.vy;

            // Subtle magnetic pull toward mouse (very soft)
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 180) {
                this.x += dx * 0.003;
                this.y += dy * 0.003;
            }

            // Wrap around edges
            if (this.x < -10) this.x = width + 10;
            if (this.x > width + 10) this.x = -10;
            if (this.y < -10) this.y = height + 10;
            if (this.y > height + 10) this.y = -10;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
            ctx.fill();
        }
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < MAX_DISTANCE) {
                    const alpha = (1 - dist / MAX_DISTANCE) * 0.12;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(${COLOR_PRIMARY}, ${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach((p) => {
            p.update();
            p.draw();
        });
        connectParticles();
        rafId = requestAnimationFrame(animate);
    }

    function resize() {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;

        // Recreate particles on resize so they fill the new dimensions
        particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
    }

    // Mouse tracking
    document.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    // Start
    resize();
    animate();

    // Resize observer
    const ro = new ResizeObserver(() => {
        cancelAnimationFrame(rafId);
        resize();
        animate();
    });
    ro.observe(canvas.parentElement);

    // Respect reduced-motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        cancelAnimationFrame(rafId);
        canvas.style.display = 'none';
    }
}

/* ---------------------------------------------------------
   INIT
   --------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    initNavScroll();
    initHeroCanvas();
});
