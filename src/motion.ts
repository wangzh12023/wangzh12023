const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
let cancelScroll: (() => void) | undefined;
let motionObserver: IntersectionObserver | undefined;

export function scrollToSection(section: HTMLElement, toTop = false) {
 cancelScroll?.();
 const from = window.scrollY;
 // Re-read the target while scrolling: lazy-loaded media can change its position.
 const destination = () => toTop ? 0 : Math.max(0, Math.min(section.getBoundingClientRect().top + window.scrollY - 86, document.documentElement.scrollHeight - innerHeight));
 const target = destination();
 if (reducedMotion()) {
  window.scrollTo({top: target, behavior: 'instant'});
  return;
 }
 const duration = Math.min(1100, 480 + Math.abs(target - from) * .12);
 let frame = 0;
 let start: number | undefined;
 const stop = () => {
  cancelAnimationFrame(frame);
  window.removeEventListener('wheel', stop);
  window.removeEventListener('touchstart', stop);
  window.removeEventListener('pointerdown', stop);
  window.removeEventListener('keydown', onKey);
  cancelScroll = undefined;
 };
 const onKey = (event: KeyboardEvent) => {
  if (['ArrowUp','ArrowDown','PageUp','PageDown','Home','End','Escape',' '].includes(event.key)) stop();
 };
 cancelScroll = stop;
 window.addEventListener('wheel', stop, {passive: true});
 window.addEventListener('touchstart', stop, {passive: true});
 window.addEventListener('pointerdown', stop, {passive: true});
 window.addEventListener('keydown', onKey);
 const tick = (time: number) => {
  start ??= time;
  const t = Math.min((time - start) / duration, 1);
  const eased = t < .5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2;
  window.scrollTo({top: from + (destination() - from) * eased, behavior: 'instant'});
  if (t < 1) frame = requestAnimationFrame(tick);
  else {
   stop();
   const heading = section.matches('h1,h2,h3') ? section : section.querySelector('h2,h3');
   heading?.animate([{transform:'translateY(4px)'},{transform:'translateY(-2px)',offset:.65},{transform:'translateY(0)'}], {duration:520,easing:'cubic-bezier(.22,1,.36,1)'});
  }
 };
 frame = requestAnimationFrame(tick);
}

export function installMotion(root: HTMLElement) {
 cancelScroll?.();
 motionObserver?.disconnect();
 if (reducedMotion()) return;
 motionObserver = new IntersectionObserver(entries => {
  for (const entry of entries) {
   if (!entry.isIntersecting) continue;
   entry.target.animate([{opacity:.5,transform:'translateY(10px)'},{opacity:1,transform:'translateY(0)'}], {duration:650,easing:'cubic-bezier(.16,1,.3,1)'});
   motionObserver?.unobserve(entry.target);
  }
 }, {threshold:.35});
 root.querySelectorAll('.section-heading,.interest-heading').forEach(heading => motionObserver!.observe(heading));
}
