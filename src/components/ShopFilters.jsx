import { useState } from 'react';
import { shopCategories } from '../data/catalog.js';
import BeverageCategories from './BeverageCategories.jsx';
import styles from './ShopFilters.module.css';

export default function ShopFilters({ selected, drinkGroup, catalog, status, searching, onClear }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside className={styles.panel} aria-label="Filtros de productos">
      <div className={styles.header}>
        <h2><span uk-icon="icon: settings; ratio: .85" aria-hidden="true" /> Filtros</h2>
        <button type="button" className={styles.clear} aria-pressed={selected === 'Todos' && !searching} onClick={() => onClear()}>Todos</button>
        <button type="button" className={styles.toggle} aria-expanded={expanded} aria-controls="shop-filter-options" onClick={() => setExpanded(value => !value)}>
          {expanded ? 'Ocultar' : 'Mostrar'} <span uk-icon={expanded ? 'chevron-up' : 'chevron-down'} aria-hidden="true" />
        </button>
      </div>
      <div id="shop-filter-options" className={`${styles.body} ${expanded ? styles.expanded : ''}`}>
        <h3>Categorías</h3>
        <nav className={styles.categories} aria-label="Categorías del menú">
          {shopCategories.map(name => (
            <a key={name} href={`#/compras?categoria=${encodeURIComponent(name)}`} onClick={() => onClear(false)} className={!searching && selected === name ? styles.selected : undefined} aria-current={!searching && selected === name ? 'page' : undefined}>
              <span className={styles.dot} aria-hidden="true" />
              <span>{name}</span>
              <span className={styles.count}>{status === 'ready' ? catalog.filter(item => item.category === name).length : '—'}<span className="uk-hidden-visually"> productos</span></span>
            </a>
          ))}
        </nav>
        {selected === 'Bebidas' && <div className={styles.beverages}>
          <h3>Tipos de bebidas</h3>
          <BeverageCategories selected={drinkGroup} catalog={catalog} status={status} searching={searching} onSelect={() => onClear(false)} />
        </div>}
      </div>
    </aside>
  );
}
