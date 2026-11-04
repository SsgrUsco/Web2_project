import { beverageCategories } from '../data/catalog.js';
import styles from './BeverageCategories.module.css';

export default function BeverageCategories({ selected }) {
  return (
    <nav className={styles.categories} aria-label="Tipos de bebidas">
      <a className={!selected ? styles.selected : undefined} aria-current={!selected ? 'page' : undefined} href="#/compras?categoria=Bebidas">Todas las bebidas</a>
        {beverageCategories.map(group => (
          <a className={selected === group.name ? styles.selected : undefined} aria-current={selected === group.name ? 'page' : undefined} key={group.name} href={`#/compras?categoria=Bebidas&subcategoria=${encodeURIComponent(group.name)}`}>
            {group.name}
          </a>
        ))}
    </nav>
  );
}
