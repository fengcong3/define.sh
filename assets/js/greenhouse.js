/* Optional, local-only single-gene playground. No accounts, storage or requests. */
(() => {
  'use strict';
  const trigger = document.querySelector('#mascot-trigger');
  const dialog = document.querySelector('#pocket-greenhouse');
  if (!trigger || !dialog || typeof dialog.showModal !== 'function') return;
  const growButton = dialog.querySelector('.lab-grow');
  const resetButton = dialog.querySelector('.lab-reset');
  const fields = [...dialog.querySelectorAll('fieldset')];
  const title = dialog.querySelector('#lab-result-title');
  const detail = dialog.querySelector('#lab-result-detail');
  const seedLabel = dialog.querySelector('#lab-seed-label');
  const seeds = dialog.querySelector('#harvest-seeds');
  const countLabel = dialog.querySelector('#harvest-count');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let pending = null;
  let timer = 0;
  let total = 0;
  let yellow = 0;

  // Each parent contributes one of its two alleles with equal probability.
  function possibleOffspring() {
    const a = dialog.querySelector('[name="pea-parent-a"]:checked').value;
    const b = dialog.querySelector('[name="pea-parent-b"]:checked').value;
    return [...a].flatMap(left => [...b].map(right => ({
      left, right, genotype: [left, right].sort().join('')
    })));
  }
  function updatePrediction() {
    const yellowChance = possibleOffspring().filter(p => p.genotype.includes('Y')).length * 25;
    dialog.querySelector('#yellow-probability').textContent = `Yellow ${yellowChance}%`;
    dialog.querySelector('#green-probability').textContent = `Green ${100 - yellowChance}%`;
    dialog.querySelector('#yellow-probability-bar').style.width = yellowChance + '%';
  }
  function setBusy(busy) {
    growButton.disabled = busy;
    for (const field of fields) field.disabled = busy;
    resetButton.disabled = busy || total === 0;
    dialog.setAttribute('aria-busy', String(busy));
  }
  function cancelGrowth() {
    clearTimeout(timer);
    timer = 0;
    pending = null;
    setBusy(false);
  }
  function resetHarvest() {
    cancelGrowth();
    total = 0;
    yellow = 0;
    seeds.replaceChildren();
    resetButton.disabled = true;
    dialog.dataset.phase = 'idle';
    delete dialog.dataset.seed;
    title.textContent = 'Ready when you are.';
    detail.textContent = 'Choose your parents, then grow a pea.';
    seedLabel.textContent = 'a possibility';
    countLabel.textContent = 'No peas yet. Every draw is a fresh chance.';
  }
  function finishGrowth() {
    if (!pending || !dialog.open) return;
    const result = pending;
    clearTimeout(timer);
    pending = null;
    timer = 0;
    const isYellow = result.genotype.includes('Y');
    const colour = isYellow ? 'Yellow' : 'Green';
    total += 1;
    if (isYellow) yellow += 1;
    dialog.dataset.phase = 'grown';
    title.textContent = `${result.genotype} · ${colour} pea`;
    detail.textContent = `Pea ${total}: ${result.left} from parent one + ${result.right} from parent two. One possible offspring.`;
    seedLabel.textContent = `${result.genotype} · ${colour.toLowerCase()}`;
    const seed = document.createElement('span');
    seed.className = 'harvest-pea' + (isYellow ? '' : ' is-green');
    seed.textContent = result.genotype;
    seeds.append(seed);
    if (seeds.children.length > 12) seeds.firstElementChild.remove();
    countLabel.textContent = `${total} grown · ${yellow} yellow / ${total - yellow} green${total > 12 ? ' · showing the latest 12' : ''}`;
    setBusy(false);
  }
  function grow() {
    if (pending) return;
    const outcomes = possibleOffspring();
    pending = outcomes[Math.floor(Math.random() * outcomes.length)];
    dialog.dataset.seed = pending.genotype.includes('Y') ? 'yellow' : 'green';
    dialog.dataset.phase = 'growing';
    title.textContent = 'A possibility is taking root…';
    detail.textContent = 'One allele from each parent.';
    seedLabel.textContent = `${pending.left} + ${pending.right}`;
    setBusy(true);
    if (reducedMotion.matches) finishGrowth();
    else timer = setTimeout(finishGrowth, 780);
  }
  trigger.addEventListener('click', () => {
    if (dialog.open) return;
    dialog.showModal();
    document.documentElement.classList.add('greenhouse-open');
  });
  dialog.querySelector('.lab-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    const stops = [...dialog.querySelectorAll('button:not(:disabled), input:checked:not(:disabled), a[href]')];
    const first = stops[0];
    const last = stops[stops.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
  // A backdrop click closes only when the gesture began outside the dialog.
  let backdropDown = false;
  const outsideDialog = e => {
    const r = dialog.getBoundingClientRect();
    return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
  };
  dialog.addEventListener('pointerdown', e => { backdropDown = e.target === dialog && outsideDialog(e); });
  dialog.addEventListener('click', e => {
    if (backdropDown && e.target === dialog && outsideDialog(e)) dialog.close();
    backdropDown = false;
  });
  dialog.addEventListener('close', () => {
    if (pending) {
      cancelGrowth();
      dialog.dataset.phase = 'idle';
      title.textContent = 'Ready to try again.';
      detail.textContent = 'Your unfinished draw was cancelled.';
      seedLabel.textContent = 'a possibility';
    }
    document.documentElement.classList.remove('greenhouse-open');
    trigger.focus({ preventScroll: true });
  });
  dialog.querySelectorAll('input[type="radio"]').forEach(input => input.addEventListener('change', () => {
    resetHarvest();
    updatePrediction();
  }));
  growButton.addEventListener('click', grow);
  resetButton.addEventListener('click', resetHarvest);
  reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) finishGrowth(); });
  updatePrediction();
  trigger.disabled = false;
  const invitation = document.querySelector('.scroll-note');
  if (invitation) invitation.firstChild.textContent = 'Click for a little discovery. ';
})();
