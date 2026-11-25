import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/motion.js';

// Cada componente limpia sus animaciones y ScrollTriggers al desmontarse.
export default function useReveal({ immediate = false, enabled = true } = {}) {
  const scope = useRef(null);

  useGSAP(() => {
    if (!scope.current || !enabled) return;
    const media = gsap.matchMedia();
    media.add({ reduce: '(prefers-reduced-motion: reduce)', standard: '(prefers-reduced-motion: no-preference)' }, context => {
      const targets = scope.current.matches('[data-reveal]')
        ? [scope.current] : [...scope.current.querySelectorAll('[data-reveal]')];
      targets.forEach(target => {
        const delay = Math.min(Number(target.dataset.revealOrder) || 0, 3) * 0.1;
        const timeline = gsap.timeline({
          ...(immediate ? {} : { scrollTrigger: { trigger: target, start: 'top 92%', once: true } }),
        });
        // Las transiciones CSS de hover se restauran al terminar la entrada.
        timeline.set(target, { transition: 'none' })
          .from(target, {
            opacity: 0.15,
            y: context.conditions.reduce ? 0 : immediate ? -12 : 30,
            duration: immediate ? 0.28 : 0.65,
            ease: 'power2.out',
            immediateRender: true,
            clearProps: 'opacity,transform,transition',
          }, delay);
      });
    });
    return () => media.revert();
  }, { scope, dependencies: [immediate, enabled], revertOnUpdate: true });

  return scope;
}
