import SectionHeading from './SectionHeading.jsx';
import useReveal from '../hooks/useReveal.js';
import styles from './Drinks.module.css';
import { drinks } from '../data/menu.js';

export default function Drinks() {
  const section = useReveal();
  return (
    <section ref={section} className={styles.drinksSection} id="bebidas">
      <div className="container">
        <div data-reveal><SectionHeading
          eyebrow="BEBIDAS REFRESCANTES"
          title="Para acompañar tu comida"
          light
        /></div>
        <div className={styles.drinksGrid}>
          {drinks.map((drink, index) => (
            <a data-reveal data-reveal-order={index} className={styles.drinkCard} key={drink.name} href={`#/compras?categoria=Bebidas&subcategoria=${encodeURIComponent(drink.name)}`}>
              <img src={drink.image} alt={drink.name} />
              <div className={styles.drinkInfo}>
                <span className={styles.drinkIcon}>✳</span>
                <div>
                  <h3>{drink.name}</h3>
                  <p>{drink.description}</p>
                </div>
                <span className={styles.roundArrow} aria-hidden="true">↗</span>
              </div>
            </a>
          ))}

          <div data-reveal data-reveal-order="3" className={styles.drinkPromo}>
            <span>EL COMPLEMENTO</span>
            <h3>PERFECTO PARA TU COMIDA</h3>
            <p>Encuentra tu bebida favorita</p>
          </div>
        </div>
      </div>
    </section>
  );
}
