(() => {
  const SELECTOR = '.rs-layout-03 .dp-trust-reveal[data-rs-hero-line]';
  let frame = 0;
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  function updateLine(line) {
    const rect = line.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight || 800;
    const start = vh * 0.93;
    const end = vh * 0.56;
    const progress = clamp((start - rect.top) / Math.max(1, start - end), 0, 1);
    const eased = 1 - Math.pow(1 - progress, 3);

    const track = line.querySelector('.dp-trust-reveal__track--full');
    const left = line.querySelector('.dp-trust-reveal__gate--left');
    const right = line.querySelector('.dp-trust-reveal__gate--right');
    const center = line.querySelector('.dp-trust-reveal__center');
    const maxOffset = Math.min(Math.max(line.clientWidth * 0.235, 150), 320);
    const baseGap = 12;

    line.style.setProperty('--dp-open', eased.toFixed(4));

    if (track) {
      track.style.clipPath = 'inset(0 0% 0 0% round 18px)';
      track.style.webkitClipPath = 'inset(0 0% 0 0% round 18px)';
      track.style.opacity = '1';
    }
    if (left) {
      left.style.left = `calc(50% - ${baseGap + maxOffset * eased}px)`;
      left.style.transform = 'none';
    }
    if (right) {
      right.style.left = `calc(50% + ${baseGap + maxOffset * eased}px)`;
      right.style.transform = 'none';
    }
    if (center) {
      const cp = clamp((eased - 0.24) / 0.76, 0, 1);
      center.style.opacity = String(0.10 + cp * 0.90);
      center.style.transform = `translate(-50%, -50%) scale(${0.78 + cp * 0.22})`;
    }
  }

  function update() {
    frame = 0;
    document.querySelectorAll(SELECTOR).forEach(updateLine);
  }
  function requestUpdate() { if (!frame) frame = requestAnimationFrame(update); }
  function boot() {
    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate, { passive: true });
    new MutationObserver(requestUpdate).observe(document.documentElement, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();
