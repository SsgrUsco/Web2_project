import SectionHeading from './SectionHeading.jsx';
import styles from './About.module.css';

export default function About() {
  return (
    <section className={styles.about} id="nosotros" aria-label="Sobre nosotros">
      <div className={`container ${styles.layout}`}>
        <div>
          <SectionHeading eyebrow="SOBRE NOSOTROS" title="El punto de encuentro para tu antojo" light />
          <a className="btn-primary" href="#/compras">
            Conoce nuestro menú <span uk-icon="arrow-right" aria-hidden="true" />
          </a>
        </div>
        <div className={styles.story}>
          <p className={styles.intro}>En Burger Zone nos gusta reunir lo que más disfrutas: buena comida, porciones para compartir y un momento para desconectarte.</p>
          <p>Somos una propuesta de comida rápida en Neiva. En nuestro menú encontrarás hamburguesas, perros calientes, salchipapas, fritos y bebidas para acompañar cada antojo.</p>
          <ul className={styles.values}>
            <li><span uk-icon="heart" aria-hidden="true" /><span>Sabores para todos los gustos</span></li>
            <li><span uk-icon="users" aria-hidden="true" /><span>Combos para compartir</span></li>
            <li><span uk-icon="location" aria-hidden="true" /><span>Neiva, Huila</span></li>
          </ul>
        </div>
      </div>
    </section>
  );
}
