import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProductCard from './ProductCard.jsx';
import ProductDetails from './ProductDetails.jsx';
import styles from './Combos.module.css';
import CatalogStatus from './CatalogStatus.jsx';
import useReveal from '../hooks/useReveal.js';

export default function Combos({ onAdd, catalogState }) {
  const heading = useReveal();
  const slider = useRef(null);
  const { products, status, retry } = catalogState;
  const combos = products.filter(product => product.category === 'Combos');
  const [productDetails, setProductDetails] = useState(null);
  useEffect(() => {
    // Actualiza las posiciones de entrada cuando llega el catálogo remoto.
    ScrollTrigger.refresh();
  }, [combos.length]);
  useEffect(() => {
    const element = slider.current;
    if (!element) return;
    const media = gsap.matchMedia();
    media.add({ reduce: '(prefers-reduced-motion: reduce)', standard: '(prefers-reduced-motion: no-preference)' }, mediaContext => {
      const context = gsap.context(() => {}, element);
      context.add('revealSlide', event => {
        // UIkit emite el evento por tarjeta: animar solo la entrante y sin ocultarla.
        const card = event.target.querySelector('[data-combo-motion]');
        if (!card || mediaContext.conditions.reduce) return;
        gsap.fromTo(card, { y: 12 }, {
          y: 0, duration: .45, ease: 'power2.out',
          overwrite: true, clearProps: 'transform',
        });
      });
      element.addEventListener('itemshow', context.revealSlide);
      return () => {
        element.removeEventListener('itemshow', context.revealSlide);
        context.revert();
      };
    });
    return () => media.revert();
  }, [combos.length]);
  return (
    <section className={styles.combosSection} id="combos">
      <div className="container">
        <div ref={heading} data-reveal className={styles.combosHeading}>
          <div>
            {/* .eyebrow es global: lo comparte con Hero */}
            <span className="eyebrow">PARA COMPARTIR</span>
            <h2>
              COMBOS <em>ESPECIALES</em>
            </h2>
          </div>
        </div>

        <CatalogStatus status={status} onRetry={retry} />
        {status === 'ready' && combos.length === 0 && <p>No hay combos disponibles en este momento.</p>}
        {combos.length > 0 && <div ref={slider} className={styles.slider} uk-slider="finite: true; sets: true" role="region" aria-label="Combos especiales">
          <div className={styles.stage}>
          <div className="uk-slider-container">
          <ul className={`uk-slider-items uk-child-width-1-1 uk-child-width-1-2@s uk-child-width-1-4@m uk-grid uk-grid-small ${styles.slides}`}>
          {combos.map((combo) => (
            <li key={combo.id} className={styles.slide}>
            <div data-combo-motion className={styles.cardMotion}>
            <ProductCard
              product={combo}
              animateEntrance={false}
              onAdd={onAdd}
              onDetails={setProductDetails}
            />
            </div>
            </li>
          ))}
          </ul>
          </div>
          <div className={styles.controls}>
            <button type="button" uk-slider-item="previous" aria-label="Combos anteriores"><span uk-icon="arrow-left" aria-hidden="true" /></button>
            <button type="button" uk-slider-item="next" aria-label="Siguientes combos"><span uk-icon="arrow-right" aria-hidden="true" /></button>
          </div>
          </div>
          <ul className={`uk-slider-nav uk-dotnav ${styles.dots}`} aria-label="Páginas de combos" />
        </div>}
        {productDetails && <ProductDetails key={productDetails.id} product={productDetails} onAdd={onAdd} onClose={() => setProductDetails(null)} />}
      </div>
    </section>
  );
}
