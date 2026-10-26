/* Choose once per page load, before styles: each palette has probability 1/2. */
(() => {
  'use strict';
  const root = document.documentElement;
  root.dataset.theme = Math.random() < 0.5 ? 'slate' : 'original';

  async function mountCharacterSprite() {
    const uses = [...document.querySelectorAll('use[href*="/assets/images/researcher.svg"]')];
    if (!uses.length) return;
    try {
      // External SVG paint servers resolve colours in their source document.
      // Mount one local sprite so gradient stops inherit this page's palette too.
      const response = await fetch(uses[0].getAttribute('href').split('#')[0]);
      if (!response.ok) return;
      const source = new DOMParser().parseFromString(await response.text(), 'image/svg+xml');
      if (source.querySelector('parsererror')) return;
      const sprite = document.importNode(source.documentElement, true);
      sprite.classList.add('theme-sprite');
      sprite.setAttribute('aria-hidden', 'true');
      sprite.setAttribute('focusable', 'false');
      document.body.append(sprite);
      uses.forEach(use => use.setAttribute('href', '#researcher'));
    } catch { /* Keep the original external illustration if loading is unavailable. */ }
  }

  function init() {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = getComputedStyle(root).getPropertyValue('--paper').trim();
    mountCharacterSprite();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true });
  else init();
})();
