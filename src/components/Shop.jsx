import { useEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProductCard from './ProductCard.jsx';
import ProductDetails from './ProductDetails.jsx';
import { shopCategories, beverageCategories } from '../data/catalog.js';
import CatalogStatus from './CatalogStatus.jsx';
import ShopFilters from './ShopFilters.jsx';
import ProductSort from './ProductSort.jsx';
import { sortProducts } from '../data/productSort.js';
import styles from './Shop.module.css';

const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export default function Shop({ category, subcategory, onAdd, catalogState, sortOrder, onSortChange }) {
  const { products: catalog, status, retry } = catalogState;
  const [query, setQuery] = useState('');
  const [productDetails, setProductDetails] = useState(null);
  const selected = category === 'Todos' || shopCategories.includes(category) ? category : 'Hamburguesas';
  const drinkGroup = selected === 'Bebidas' && beverageCategories.some(group => group.name === subcategory) ? subcategory : '';
  const search = normalize(query.trim());
  const items = sortProducts(catalog.filter(item => search
    ? normalize(`${item.name} ${item.description}`).includes(search)
    : (selected === 'Todos' || item.category === selected) && (!drinkGroup || item.subcategory === drinkGroup)), sortOrder);
  const visibleOrder = items.map(item => item.id).join(',');
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [visibleOrder]);

  const clearFilters = (resetCategory = true) => {
    setQuery('');
    if (resetCategory === true) window.location.hash = '/compras?categoria=Todos';
  };

  return (
    <section className={styles.shop} aria-labelledby="shop-title">
      <div className="container">
        <div className={styles.heading}>
          <div><p className="eyebrow">ELIGE TU ANTOJO</p><h1 id="shop-title">Nuestro menú</h1></div>
        </div>
        <div className={styles.layout}>
        <ShopFilters selected={selected} drinkGroup={drinkGroup} catalog={catalog} status={status} searching={Boolean(search)} onClear={clearFilters} />
        <div className={styles.results}>
        <div className={styles.toolbar}>
          <div>
            <h2>{search ? 'Resultados de búsqueda' : drinkGroup || selected}</h2>
            <p className={styles.count} aria-live="polite">{status === 'ready' ? `${items.length} productos${search ? ' en todo el menú' : ''}` : 'Consultando catálogo'}</p>
          </div>
          <div className={styles.controls}>
          <label className={styles.search}>
            <span uk-icon="icon: search; ratio: .85" aria-hidden="true" />
            <input type="search" aria-label="Buscar en todo el menú" placeholder="Buscar en todo el menú…" value={query} onChange={event => setQuery(event.target.value)} />
          </label>
          <ProductSort value={sortOrder} onChange={onSortChange} />
          </div>
        </div>
        <CatalogStatus status={status} onRetry={retry} />
        {status === 'ready' && items.length === 0 && <div className={styles.empty}><h2>No encontramos ese antojo</h2><p>Prueba con otro nombre o categoría.</p>{query && <button type="button" className="btn-primary" onClick={() => setQuery('')}>Limpiar búsqueda</button>}</div>}
        <div className={`product-grid ${styles.grid}`}>
          {items.map((product, index) => <ProductCard key={product.id} product={product} onAdd={onAdd} onDetails={setProductDetails} entranceOrder={index % 3} />)}
        </div>
        </div>
        </div>
        {productDetails && <ProductDetails key={productDetails.id} product={productDetails} onAdd={onAdd} onClose={() => setProductDetails(null)} />}
      </div>
    </section>
  );
}
