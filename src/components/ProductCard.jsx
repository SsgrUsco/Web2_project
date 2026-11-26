import useReveal from '../hooks/useReveal.js';
import { formatPrice } from '../data/menu.js';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, onAdd, onDetails, entranceOrder = 0, animateEntrance = true }) {
  const card = useReveal({ enabled: animateEntrance });
  const description = (product.description || '').split(/\.\s+Incluye\s+/i)[0];
  const summary = description.length > 110
    ? `${description.slice(0, 107).replace(/\s+\S*$/, '').replace(/[,;.]$/, '')}…`
    : description;

  return (
    <article ref={card} data-reveal data-reveal-order={entranceOrder} className={styles.productCard}>
      <img src={product.image} alt={product.name} loading="lazy" decoding="async" />
      <div className={styles.productInfo}>
        <h3>{product.name}</h3>
        <p className={styles.description}>{summary}</p>
        <strong className={styles.price}>{formatPrice(product.price)}</strong>
        {onDetails && <button type="button" className={styles.detailsButton} onClick={() => onDetails(product)} aria-label={`Ver detalles y opciones de ${product.name}`}>Ver detalles y opciones <span uk-icon="arrow-right" /></button>}
        <button
          type="button"
          className={`btn-primary ${styles.addButton}`}
          onClick={() => onAdd(product)}
        >
          <span uk-icon="icon: cart" /> Agregar al carrito
        </button>
      </div>
    </article>
  );
}
