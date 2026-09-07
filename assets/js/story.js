/* One scroll listener; no continuous animation loop, dependencies or scroll hijacking. */
(() => {
  'use strict';
  const mascot = document.querySelector('#mascot');
  const origin = document.querySelector('#mascot-origin');
  const dock = document.querySelector('#mascot-dock');
  const header = document.querySelector('.site-header');
  const sections = [...document.querySelectorAll('[data-scene]')].filter(el => el !== mascot);
  const navLinks = [...document.querySelectorAll('nav a[href^="#"]')];
  if (!mascot || !origin || !dock) return;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let scheduled = false;
  let scene = '';
  const clamp = n => Math.min(1, Math.max(0, n));
  const mix = (a, b, t) => a + (b - a) * t;

  function positionInvitation() {
    const bubble = mascot.querySelector('.mascot-invite');
    if (!bubble) return;
    const r = mascot.getBoundingClientRect();
    const small = r.width < 130;
    const bubbleWidth = Math.min(innerWidth - 40, Math.max(176, Math.min(286, r.width * .55)));
    bubble.style.setProperty('--bubble-width', bubbleWidth + 'px');
    bubble.style.setProperty('--bubble-font', Math.max(18, Math.min(30, r.width * .058)) + 'px');
    bubble.style.setProperty('--bubble-padding', Math.max(12, Math.min(20, r.width * .035)) + 'px');
    const height = bubble.offsetHeight;
    const headTop = r.top + r.height * .1;
    const ceiling = header.getBoundingClientRect().bottom + 12;
    const below = small && headTop - height - 30 < ceiling;
    mascot.dataset.bubble = below ? 'below' : 'above';
    const idealLeft = below ? r.right - bubbleWidth : r.left + r.width * .51;
    const left = Math.max(20, Math.min(innerWidth - bubbleWidth - 20, idealLeft));
    const top = below ? Math.max(ceiling, r.top + r.height * .35 + 30) : Math.max(ceiling, headTop - height - 30);
    bubble.style.setProperty('--bubble-left', left - r.left + 'px');
    bubble.style.setProperty('--bubble-top', top - r.top + 'px');
  }

  function render() {
    scheduled = false;
    let active = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= innerHeight * .48) active = section;
    }
    if (scrollY > 0 && innerHeight + scrollY >= document.documentElement.scrollHeight - 2) {
      active = sections[sections.length - 1];
    }
    if (active && active.dataset.scene !== scene) {
      scene = active.dataset.scene;
      for (const link of navLinks) {
        if (link.hash === '#' + active.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      }
    }
    if (reducedMotion.matches) {
      mascot.dataset.scene = 'welcome';
      delete mascot.dataset.docked;
      mascot.removeAttribute('style');
      mascot.classList.remove('is-travelling');
      document.documentElement.classList.remove('has-motion');
      positionInvitation();
      return;
    }
    mascot.dataset.scene = scene;
    document.documentElement.classList.add('has-motion');
    const from = origin.getBoundingClientRect();
    const to = dock.getBoundingClientRect();
    const distance = Math.max(1, from.top + scrollY + from.height - header.getBoundingClientRect().bottom);
    const t = clamp(scrollY / distance);
    // Shrink within the right edge first, so the hit target never sweeps over links.
    const shrink = clamp(t * 2.5);
    const compact = shrink * shrink * (3 - 2 * shrink);
    const travel = clamp((t - .35) / .65);
    const eased = travel * travel * (3 - 2 * travel);
    const width = mix(from.width, to.width, compact);
    const startTop = innerWidth >= 2100 ? from.top + scrollY : Math.max(from.top, to.top);
    const top = mix(startTop, to.top, eased);
    mascot.dataset.docked = String(compact > .99 && Math.abs(top - to.top) < 2);
    mascot.classList.add('is-travelling');
    mascot.style.width = width + 'px';
    mascot.style.transform = `translate3d(${mix(from.right, to.right, eased) - width}px, ${top}px, 0)`;
    mascot.style.setProperty('--wave-angle', Math.sin(scrollY / 125) * 9 + 'deg');
    mascot.style.setProperty('--dna-angle', Math.sin(scrollY / 320) * 8 + 'deg');
    mascot.style.setProperty('--dock-progress', eased);
    positionInvitation();
  }
  function requestRender() {
    if (!scheduled) { scheduled = true; requestAnimationFrame(render); }
  }
  addEventListener('scroll', requestRender, { passive: true });
  addEventListener('resize', requestRender, { passive: true });
  addEventListener('pageshow', requestRender);
  reducedMotion.addEventListener('change', requestRender);
  render();
  // Pointer movement is sampled only over the character, once per frame.
  const hit = document.querySelector('#mascot-trigger');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  let pointerFrame = 0;
  let winkTimer = 0;
  let pointerX = 0;
  let pointerY = 0;
  function clearGreeting() {
    cancelAnimationFrame(pointerFrame);
    clearTimeout(winkTimer);
    pointerFrame = 0;
    mascot.classList.remove('is-curious', 'is-winking');
    mascot.style.removeProperty('--look-x');
    mascot.style.removeProperty('--look-y');
  }
  if (hit) {
    hit.addEventListener('pointerenter', () => {
      if (!finePointer.matches || hit.disabled) return;
      positionInvitation();
      mascot.classList.add('is-curious');
      if (!reducedMotion.matches) {
        mascot.classList.add('is-winking');
        winkTimer = setTimeout(() => mascot.classList.remove('is-winking'), 190);
      }
    });
    hit.addEventListener('pointermove', e => {
      if (!finePointer.matches || reducedMotion.matches || hit.disabled) return;
      pointerX = e.clientX;
      pointerY = e.clientY;
      if (!pointerFrame) pointerFrame = requestAnimationFrame(() => {
        pointerFrame = 0;
        const rect = hit.getBoundingClientRect();
        const x = Math.max(-1, Math.min(1, (pointerX - rect.left) / rect.width * 2 - 1));
        const y = Math.max(-1, Math.min(1, (pointerY - rect.top) / rect.height * 2 - 1));
        mascot.style.setProperty('--look-x', x * 3.2 + 'px');
        mascot.style.setProperty('--look-y', y * 2 + 'px');
      });
    });
    hit.addEventListener('focus', positionInvitation);
    hit.addEventListener('pointerleave', clearGreeting);
    hit.addEventListener('pointercancel', clearGreeting);
    hit.addEventListener('click', clearGreeting);
    reducedMotion.addEventListener('change', clearGreeting);
  }

})();
