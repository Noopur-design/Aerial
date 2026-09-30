'use client';

import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap';

/*
  Declarative animation language used across the site:
    data-reveal            fade + rise when entering the viewport (data-delay optional)
    data-reveal-stagger    children fade + rise in sequence
    data-reveal-img        clip-path image reveal (child <img> settles from a slight zoom)
    data-parallax="0.12"   subtle scrubbed parallax on an image wrapper
    data-split             heading whose .split-line-inner spans rise in turn
*/

const DONE = 'motionDone';

function animate(el) {
  if (el.dataset[DONE]) return;
  el.dataset[DONE] = '1';
  const delay = parseFloat(el.dataset.delay || 0);
  const start = el.dataset.start || 'top 88%';

  if (el.hasAttribute('data-reveal')) {
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 28 },
      { autoAlpha: 1, y: 0, duration: 1, delay, scrollTrigger: { trigger: el, start, once: true } }
    );
  }

  if (el.hasAttribute('data-reveal-stagger')) {
    gsap.fromTo(
      el.children,
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: 0.9, delay, stagger: 0.08, scrollTrigger: { trigger: el, start, once: true } }
    );
  }

  if (el.hasAttribute('data-reveal-img')) {
    const img = el.querySelector('img');
    const tl = gsap.timeline({ delay, scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
    tl.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'expo.out' });
    if (img) tl.fromTo(img, { scale: 1.14 }, { scale: 1, duration: 1.6, ease: 'expo.out' }, 0);
  }

  if (el.hasAttribute('data-parallax')) {
    const amount = parseFloat(el.dataset.parallax) || 0.1;
    const target = el.querySelector('img') || el;
    gsap.fromTo(
      target,
      { yPercent: -amount * 50, scale: 1 + amount },
      {
        yPercent: amount * 50,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
      }
    );
  }

  if (el.hasAttribute('data-split')) {
    const lines = el.querySelectorAll('.split-line-inner');
    gsap.fromTo(
      lines,
      { yPercent: 110, autoAlpha: 1 },
      {
        yPercent: 0,
        autoAlpha: 1,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.09,
        delay: delay || 0.1,
        scrollTrigger: el.dataset.immediate ? undefined : { trigger: el, start, once: true },
      }
    );
  }
}

const SELECTOR = '[data-reveal],[data-reveal-stagger],[data-reveal-img],[data-parallax],[data-split]';

function scan(node) {
  if (!(node instanceof Element)) return;
  if (node.matches(SELECTOR)) animate(node);
  node.querySelectorAll(SELECTOR).forEach(animate);
}

/** Wire up all declarative animations within `root`. Returns a cleanup function. */
export function initMotion(root) {
  if (!root) return () => {};
  if (prefersReducedMotion()) return () => {};

  const ctx = gsap.context(() => scan(root), root);
  let refreshTimer;

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((m) => m.addedNodes.forEach((n) => ctx.add(() => scan(n))));
    clearTimeout(refreshTimer);
    refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 150);
  });
  observer.observe(root, { childList: true, subtree: true });

  const onLoad = () => ScrollTrigger.refresh();
  window.addEventListener('load', onLoad);

  return () => {
    observer.disconnect();
    clearTimeout(refreshTimer);
    window.removeEventListener('load', onLoad);
    ctx.revert();
    root.querySelectorAll('[data-motion-done]').forEach((el) => delete el.dataset[DONE]);
    if (root.dataset?.[DONE]) delete root.dataset[DONE];
  };
}
