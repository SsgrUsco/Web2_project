
import styles from './About.module.css';
import useReveal from '../hooks/useReveal.js';

export default function About() {
  const section = useReveal();
  return (
    <section ref={section} className={styles.about} aria-labelledby="about-title">
      <div className="container">
        <div className={styles.layout}>
          <figure className={styles.visual}>
            <img src="/images/about-burger-kitchen.webp" alt="Preparación de una hamburguesa junto a la parrilla" width="1086" height="1448" />
            <figcaption data-reveal><span>BURGER ZONE</span><strong>El antojo nos reúne.</strong></figcaption>
          </figure>
          <div className={styles.story}>
            <header data-reveal>
            <span className="eyebrow">SOBRE NOSOTROS</span>
            <h1 id="about-title">BUENA COMIDA.<br /><em>BUENOS MOMENTOS.</em></h1>
            </header>
            <p data-reveal data-reveal-order="1" className={styles.intro}>El punto de encuentro para tu antojo, aquí en Neiva.</p>
            <p data-reveal data-reveal-order="1">En Burger Zone nos gusta reunir lo que más disfrutas: buena comida, porciones para compartir y un momento para desconectarte.</p>
            <p data-reveal data-reveal-order="2">Hamburguesas, perros calientes, salchipapas, fritos y bebidas: un menú para venir con amigos, compartir en familia o darte ese gusto que tanto quieres.</p>
            <div data-reveal className={styles.highlight}>
              <h2>Tu antojo tiene su lugar</h2>
              <p>Una pausa entre clases, una salida después del trabajo o un plan de fin de semana. Queremos ser parte de esos momentos sencillos en los que una buena comida y una buena conversación hacen el día.</p>
            </div>
            <ul data-reveal data-reveal-order="2" className={styles.values}>
              <li><span uk-icon="heart" aria-hidden="true" /><div><h2>Para todos los antojos</h2><p>Encuentra tu favorito y hazlo a tu manera.</p></div></li>
              <li><span uk-icon="users" aria-hidden="true" /><div><h2>Mejor en compañía</h2><p>Combos y porciones para compartir la mesa.</p></div></li>
              <li><span uk-icon="settings" aria-hidden="true" /><div><h2>A tu manera</h2><p>Consulta los ingredientes, agrega extras y elige qué prefieres quitar de tu pedido.</p></div></li>
              <li><span uk-icon="bag" aria-hidden="true" /><div><h2>Para tu plan de hoy</h2><p>Elige recoger en el local o recibir tu pedido a domicilio al finalizar tu compra.</p></div></li>
            </ul>
            <div data-reveal className={styles.closing}>
              <h2>De los clásicos a tu nuevo favorito</h2>
              <p>Prueba una hamburguesa con tocineta, un perro con pollo o una salchipapa para compartir. Acompaña tu elección con un jugo, una gaseosa o una limonada y encuentra la combinación que más te guste.</p>
              <a href="#/contacto">¿Tienes una sugerencia? Queremos escucharte <span uk-icon="icon: arrow-right; ratio: .8" aria-hidden="true" /></a>
            </div>
            <a data-reveal data-reveal-order="3" className="btn-primary" href="#/compras">Explorar el menú <span uk-icon="arrow-right" aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

