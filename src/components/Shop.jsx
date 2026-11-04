import ProductCard from './ProductCard.jsx';
import { catalog, shopCategories, beverageCategories } from '../data/catalog.js';
import BeverageCategories from './BeverageCategories.jsx';
import styles from './Shop.module.css';

export default function Shop({ category, subcategory, onAdd, onOpenCart, cartCount }) {
  const selected = shopCategories.includes(category) ? category : 'Todos';
  const drinkGroup = selected === 'Bebidas' && beverageCategories.some(group => group.name === subcategory) ? subcategory : '';
  const items = catalog.filter(item => (selected === 'Todos' || item.category === selected) && (!drinkGroup || item.subcategory === drinkGroup));

  return (
    <section className={styles.shop} aria-labelledby="shop-title">
      <div className="container">
        <a className={styles.back} href="#inicio"><span uk-icon="arrow-left" /> Volver al inicio</a>
        <div className={styles.heading}>
          <div><p className="eyebrow">ELIGE TU ANTOJO</p><h1 id="shop-title">Nuestro menú</h1></div>
          <button className="btn-primary" type="button" onClick={onOpenCart}><span uk-icon="cart" /> Ver carrito ({cartCount})</button>
        </div>
        <nav className={styles.filters} aria-label="Categorías del menú">
          {shopCategories.map(name => <a key={name} className={selected === name ? styles.selected : undefined} aria-current={selected === name ? 'page' : undefined} href={`#/compras?categoria=${encodeURIComponent(name)}`}>{name}</a>)}
        </nav>
        {selected === 'Bebidas' && <BeverageCategories selected={drinkGroup} />}
        <p className={styles.count} aria-live="polite">{items.length} productos · {drinkGroup || selected}</p>
        <div className="product-grid">
          {items.map(product => <ProductCard key={product.id} product={product} onAdd={onAdd} />)}
        </div>
      </div>
    </section>
  );
}
