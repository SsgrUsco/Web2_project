import { beverageCategories } from '../data/catalog.js';
import styles from './BeverageCategories.module.css';

export default function BeverageCategories({ selected, catalog = [], status = 'ready', searching = false, onSelect }) {
  const groups = [{ name: 'Todas las bebidas', value: '' }, ...beverageCategories.map(group => ({ name: group.name, value: group.name }))];
  return (
    <nav className={styles.categories} aria-label="Tipos de bebidas">
        {groups.map(group => (
          <a onClick={onSelect} className={!searching && selected === group.value ? styles.selected : undefined} aria-current={!searching && selected === group.value ? 'page' : undefined} key={group.name} href={`#/compras?categoria=Bebidas${group.value ? `&subcategoria=${encodeURIComponent(group.value)}` : ''}`}>
            <span className={styles.dot} aria-hidden="true" /><span>{group.name}</span>
            <span className={styles.count}>{status === 'ready' ? catalog.filter(item => item.category === 'Bebidas' && (!group.value || item.subcategory === group.value)).length : '—'}<span className="uk-hidden-visually"> productos</span></span>
          </a>
        ))}
    </nav>
  );
}
