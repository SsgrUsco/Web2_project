
import styles from './About.module.css';

export default function About() {
  return (
    <section className={styles.about} aria-labelledby="about-title">
      <div className="container">
        <div className={styles.layout}>
          <figure className={styles.visual}>
            <img src="/images/about-burger-kitchen.png" alt="Preparación de una hamburguesa junto a la parrilla" width="1086" height="1448" />
            <figcaption><span>BURGER ZONE</span><strong>El antojo nos reúne.</strong></figcaption>
          </figure>
          <div className={styles.story}>
            <span className="eyebrow">SOBRE NOSOTROS</span>
            <h1 id="about-title">BUENA COMIDA.<br /><em>BUENOS MOMENTOS.</em></h1>
            <p className={styles.intro}>El punto de encuentro para tu antojo, aquí en Neiva.</p>
            <p>En Burger Zone nos gusta reunir lo que más disfrutas: buena comida, porciones para compartir y un momento para desconectarte.</p>
            <p>Hamburguesas, perros calientes, salchipapas, fritos y bebidas: un menú para venir con amigos, compartir en familia o darte ese gusto que tanto quieres.</p>
            <ul className={styles.values}>
              <li><span uk-icon="heart" aria-hidden="true" /><div><h2>Para todos los antojos</h2><p>Encuentra tu favorito y hazlo a tu manera.</p></div></li>
              <li><span uk-icon="users" aria-hidden="true" /><div><h2>Mejor en compañía</h2><p>Combos y porciones para compartir la mesa.</p></div></li>
            </ul>
            <a className="btn-primary" href="#/compras">Explorar el menú <span uk-icon="arrow-right" aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

