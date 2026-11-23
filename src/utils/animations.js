// Animation utility functions using GSAP
import gsap from 'gsap';

/**
 * Typewriter animation for a DOM element.
 * @param {HTMLElement} el - Target element
 * @param {string} text - Text to type
 * @param {number} speed - Delay between chars in seconds (default 0.04)
 * @returns {gsap.core.Timeline}
 */
export function typewriterAnim(el, text, speed = 0.04) {
  if (!el) return null;
  el.textContent = '';
  const tl = gsap.timeline();
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    tl.call(() => { el.textContent += char; }, null, i * speed);
  }
  return tl;
}

/**
 * Fade-in animation.
 */
export function fadeIn(el, duration = 0.5, delay = 0, vars = {}) {
  if (!el) return null;
  return gsap.fromTo(el,
    { opacity: 0, ...vars.from },
    { opacity: 1, duration, delay, ease: 'power2.out', ...vars.to }
  );
}

/**
 * Fade-out animation.
 */
export function fadeOut(el, duration = 0.4, delay = 0, vars = {}) {
  if (!el) return null;
  return gsap.to(el, { opacity: 0, duration, delay, ease: 'power2.in', ...vars });
}

/**
 * Particle burst — creates floating hearts/stars from a source point.
 * @param {HTMLElement} container - Parent container element
 * @param {number} x - Spawn x (px)
 * @param {number} y - Spawn y (px)
 * @param {number} count - Number of particles
 */
export function spawnParticleBurst(container, x, y, count = 6) {
  if (!container) return;
  const shapes = ['♡', '✦', '✿', '★'];
  const colors = ['#F4A6C1', '#DCCBFF', '#FFE082', '#A88BE8', '#F8BBD0'];

  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.textContent = shapes[Math.floor(Math.random() * shapes.length)];
    p.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      font-size: ${8 + Math.random() * 10}px;
      color: ${colors[Math.floor(Math.random() * colors.length)]};
      pointer-events: none;
      user-select: none;
      z-index: 999;
      opacity: 1;
    `;
    container.appendChild(p);

    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
    const dist = 30 + Math.random() * 50;

    gsap.to(p, {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist - 20,
      opacity: 0,
      scale: 0.4,
      duration: 0.8 + Math.random() * 0.4,
      ease: 'power1.out',
      onComplete: () => { if (p.parentNode) p.parentNode.removeChild(p); }
    });
  }
}

/**
 * Gentle floating loop for an element.
 */
export function floatLoop(el, amplitude = 6, duration = 2.5) {
  if (!el) return null;
  return gsap.to(el, {
    y: -amplitude,
    duration,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
  });
}

/**
 * Screen flash transition — fade in then out.
 */
export function screenFlash(el, duration = 0.4) {
  if (!el) return null;
  const tl = gsap.timeline();
  tl.to(el, { opacity: 1, duration: duration / 2, ease: 'power2.in' });
  tl.to(el, { opacity: 0, duration: duration / 2, ease: 'power2.out' });
  return tl;
}
