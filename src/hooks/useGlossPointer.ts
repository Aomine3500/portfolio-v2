import { useEffect } from 'react';

const GLOSS_SELECTOR = '.card, .btn-gradient, .btn-outline';

/**
 * Feeds the pointer position into --gx / --gy on glossy surfaces so their specular
 * highlight (see .card::after in index.css) sits under the cursor. Mouse/trackpad only;
 * on touch the highlight keeps its default top-centre position.
 */
export const useGlossPointer = () => {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let frame = 0;
    let lastEvent: PointerEvent | null = null;

    const update = () => {
      frame = 0;
      if (!lastEvent) return;
      const { clientX, clientY, target } = lastEvent;
      // Nested surfaces (a button inside a card) both follow the pointer.
      let el = target instanceof Element ? target.closest<HTMLElement>(GLOSS_SELECTOR) : null;
      while (el) {
        const rect = el.getBoundingClientRect();
        el.style.setProperty('--gx', `${clientX - rect.left}px`);
        el.style.setProperty('--gy', `${clientY - rect.top}px`);
        el = el.parentElement?.closest<HTMLElement>(GLOSS_SELECTOR) ?? null;
      }
    };

    const onMove = (e: PointerEvent) => {
      lastEvent = e;
      if (!frame) frame = requestAnimationFrame(update);
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      document.removeEventListener('pointermove', onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
};
