/* Afyra Digital — runtime compatibility for the final CSS/interaction fixes.
   Keeps the packaged prebuilt client visually aligned with the updated source. */
(() => {
  const initialized = new WeakSet();

  function fixFooter(root = document) {
    root.querySelectorAll?.('.af-footer__big span').forEach((el) => {
      if (el.textContent?.trim() !== 'Afyra Digital') el.textContent = 'Afyra Digital';
    });
    root.querySelectorAll?.('.af-footer__social a').forEach((a) => {
      a.setAttribute('data-af-social-medium', 'true');
    });
  }

  function processCard(card) {
    if (initialized.has(card)) return;
    initialized.add(card);
    const num = card.querySelector('.af-proc__num');
    const animate = (enter) => {
      if (!card.animate) return;
      card.getAnimations?.().forEach((a) => a.cancel());
      card.animate(
        enter
          ? [
              { transform: 'translateY(0) scale(1)', boxShadow: '0 0 0 rgba(0,0,0,0)' },
              { transform: 'translateY(-7px) scale(1.018)', boxShadow: '0 24px 55px rgba(0,187,160,.14)' }
            ]
          : [
              { transform: 'translateY(-7px) scale(1.018)', boxShadow: '0 24px 55px rgba(0,187,160,.14)' },
              { transform: 'translateY(0) scale(1)', boxShadow: '0 0 0 rgba(0,0,0,0)' }
            ],
        { duration: enter ? 340 : 380, easing: 'cubic-bezier(.18,.82,.41,1)', fill: 'forwards' }
      );
      if (num?.animate) {
        num.getAnimations?.().forEach((a) => a.cancel());
        num.animate(
          enter ? [{ transform: 'scale(1)' }, { transform: 'scale(1.035)' }] : [{ transform: 'scale(1.035)' }, { transform: 'scale(1)' }],
          { duration: 320, easing: 'ease-out', fill: 'forwards' }
        );
      }
    };
    card.addEventListener('mouseenter', () => animate(true));
    card.addEventListener('mouseleave', () => animate(false));
    card.addEventListener('focusin', () => animate(true));
    card.addEventListener('focusout', () => animate(false));
  }

  function fixProcess(root = document) {
    root.querySelectorAll?.('.af-proc__item').forEach(processCard);
  }

  function tagServiceHero(root = document) {
    root.querySelectorAll?.('.sv-page .sv-hero__art').forEach((art) => {
      if (initialized.has(art)) return;
      initialized.add(art);
      art.setAttribute('data-af-final-hero', 'true');
    });
  }

  function run(root = document) {
    fixFooter(root);
    fixProcess(root);
    tagServiceHero(root);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => run());
  else run();

  const observer = new MutationObserver((records) => {
    for (const record of records) {
      record.addedNodes.forEach((node) => {
        if (node.nodeType === 1) run(node);
      });
    }
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
