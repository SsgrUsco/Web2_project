import styles from './Hero.module.css';
import useReveal from '../hooks/useReveal.js';

export default function Hero() {
  const content = useReveal({ fromY: 30 });
  return (
    <section className={styles.hero} id="inicio">
      <video
        className={styles.heroVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src="/videos/hero-burger.mp4" type="video/mp4" />
      </video>
      <div ref={content} className={styles.heroContent}>
        {/* .eyebrow es global: lo comparte con Combos */}
        <span data-reveal className="eyebrow">COMIDA RÁPIDA QUE SIEMPRE</span>
        <h1 data-reveal data-reveal-order="1">
          TE HACE <em>FELIZ</em>
        </h1>
        <p data-reveal data-reveal-order="2">
          Hamburguesas jugosas, perros calientes y salchipapas
          irresistibles. ¡El antojo perfecto en un solo lugar!
        </p>
        <a data-reveal data-reveal-order="3" href="#/compras" className="btn-primary">
          EXPLORAR MENÚ <span uk-icon="arrow-right"></span>
        </a>
      </div>

    </section>
  );
}
