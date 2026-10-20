/* Section navigation and a small, optional character interaction. */
(() => {
  'use strict';
  const sections = [...document.querySelectorAll('main > [data-scene]')];
  const links = [...document.querySelectorAll('nav a[href^="#"]')];
  let scheduled = false;
  function render() {
    scheduled = false;
    let active = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= innerHeight * .4) active = section;
    }
    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 2) active = sections[sections.length - 1];
    for (const link of links) {
      if (active && link.hash === '#' + active.id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  }
  function requestRender() {
    if (!scheduled) { scheduled = true; requestAnimationFrame(render); }
  }
  addEventListener('scroll', requestRender, { passive: true });
  addEventListener('resize', requestRender, { passive: true });
  addEventListener('pageshow', requestRender);
  render();
  const mascot = document.querySelector('#mascot');
  const trigger = document.querySelector('#mascot-trigger');
  if (!mascot || !trigger) return;
  trigger.addEventListener('pointerenter', () => {
    if (!trigger.disabled) mascot.classList.add('is-curious');
  });
  const clearGreeting = () => mascot.classList.remove('is-curious');
  trigger.addEventListener('pointerleave', clearGreeting);
  trigger.addEventListener('pointercancel', clearGreeting);
  trigger.addEventListener('click', clearGreeting);
})();
