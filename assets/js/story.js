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
      mascot.removeAttribute('style');
      mascot.classList.remove('is-travelling');
      document.documentElement.classList.remove('has-motion');
      return;
    }
    mascot.dataset.scene = scene;
    document.documentElement.classList.add('has-motion');
    const from = origin.getBoundingClientRect();
    const to = dock.getBoundingClientRect();
    const distance = Math.max(1, from.top + scrollY + from.height - header.getBoundingClientRect().bottom);
    const t = clamp(scrollY / distance);
    const eased = t * t * (3 - 2 * t);
    mascot.classList.add('is-travelling');
    mascot.style.width = mix(from.width, to.width, eased) + 'px';
    mascot.style.transform = `translate3d(${mix(from.left, to.left, eased)}px, ${mix(from.top, to.top, eased)}px, 0)`;
    mascot.style.setProperty('--wave-angle', Math.sin(scrollY / 125) * 9 + 'deg');
    mascot.style.setProperty('--dna-angle', Math.sin(scrollY / 320) * 8 + 'deg');
    mascot.style.setProperty('--dock-progress', eased);
  }
  function requestRender() {
    if (!scheduled) { scheduled = true; requestAnimationFrame(render); }
  }
  addEventListener('scroll', requestRender, { passive: true });
  addEventListener('resize', requestRender, { passive: true });
  addEventListener('pageshow', requestRender);
  reducedMotion.addEventListener('change', requestRender);
  render();
})();
