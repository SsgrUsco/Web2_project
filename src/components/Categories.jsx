import SectionHeading from './SectionHeading.jsx';
import useReveal from '../hooks/useReveal.js';
import styles from './Categories.module.css';
import { categories } from '../data/menu.js';

export default function Categories() {
  const section = useReveal();
  return (
    <section ref={section} className={styles.categoriesSection} id="menu">
      <div className="container">
        <div data-reveal><SectionHeading
          eyebrow="NUESTRAS CATEGORÍAS"
          title="¿Qué se te antoja hoy?"
          light
        /></div>

        <div className={styles.categoryGrid}>
          {categories.map((category, index) => (
            <a
              data-reveal data-reveal-order={index}
              className={styles.categoryCard}
              href={`#/compras?categoria=${encodeURIComponent(category.name)}`}
              key={category.name}
            >
              <img src={category.image} alt={category.name} />
              <div className={styles.categoryInfo}>
                <span className={styles.categoryIcon}>{category.icon}</span>
                <div>
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                </div>
                <span className={styles.roundArrow}>↗</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
