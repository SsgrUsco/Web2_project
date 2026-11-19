import QuantityInput from './QuantityInput.jsx';
import { formatPrice } from '../data/menu.js';
import styles from './Checkout.module.css';

export default function CheckoutSummary({ items, delivery, onQuantityChange, onRemove }) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  return (
    <aside className={styles.summary} aria-labelledby="order-title">
      <div className={styles.summaryHeading}><h2 id="order-title">Tu pedido</h2><a href="#/compras">Seguir eligiendo</a></div>
      <ul className={styles.items}>
        {items.map(item => <li key={item.id} className={styles.item}>
          <img src={item.image} alt="" width="64" height="64" />
          <div className={styles.itemBody}><h3>{item.name}</h3>{item.options && <p>{item.options}</p>}<div className={styles.quantity}><QuantityInput quantity={item.qty} name={item.name} onChange={qty => onQuantityChange(item.id, qty)} /><strong>{formatPrice(item.price * item.qty)}</strong></div></div>
          <button className={styles.remove} type="button" aria-label={`Quitar ${item.name}`} onClick={() => onRemove(item.id)}>×</button>
        </li>)}
      </ul>
      <dl className={styles.totals}><div><dt>Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div><div><dt>{delivery === 'pickup' ? 'Recogida en el local' : 'Domicilio'}</dt><dd>{delivery === 'pickup' ? 'Sin costo' : 'Por confirmar'}</dd></div><div className={styles.total}><dt>{delivery === 'pickup' ? 'Total' : 'Total de productos'}</dt><dd>{formatPrice(subtotal)}</dd></div></dl>
      {delivery === 'delivery' && <p className={styles.hint}>El costo de entrega se confirma según tu dirección.</p>}
      <button className={`btn-primary ${styles.confirm}`} type="submit" form="checkout-form">Confirmar pedido <span uk-icon="arrow-right" aria-hidden="true" /></button>
    </aside>
  );
}
