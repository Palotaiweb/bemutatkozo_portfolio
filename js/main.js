/* =========================================================
   MAIN.JS – Core Vanilla JS Utilities
   Palotai Dániel AI Oktatói Portfólió
   ========================================================= */

'use strict';

/* ---------------------------------------------------------
   SCROLL REVEAL – Intersection Observer
   Watches all .anim-fade-in-up elements and adds
   .is-visible when they enter the viewport.
   --------------------------------------------------------- */
function initScrollReveal() {
  const elements = document.querySelectorAll('.anim-fade-in-up');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // Fire once
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach((el) => observer.observe(el));
}

/* ---------------------------------------------------------
   SMOOTH SCROLL – Native `scroll-behavior: smooth` is set
   in CSS. This handler ensures any JS-driven anchor
   navigation also works gracefully.
   --------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ---------------------------------------------------------
   INIT
   --------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initSmoothScroll();
});

/* ---------------------------------------------------------
   NOTE: window.ENV kiegészítés az index.html <script>-ben
   történik. Az N8N_WEBHOOK_URL placeholder ott kerül be.
   --------------------------------------------------------- */
