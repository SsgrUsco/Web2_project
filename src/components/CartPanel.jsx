import { formatPrice } from '../data/menu.js';
import PaymentConfirmation from './PaymentConfirmation.jsx';
import QuantityInput from './QuantityInput.jsx';
import styles from './CartPanel.module.css';
import useReveal from '../hooks/useReveal.js';

export default function CartPanel({ items, onIncrease, onDecrease, onRemove, onClear, onClose, onPay, payment, onQuantityChange }) {
  const panel = useReveal({ immediate: true });
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div ref={panel} data-reveal className={styles.cartPanel} id="carrito-panel">
      <div className={styles.cartPanelHeader}>
        <h3>Tu carrito</h3>
        <button type="button" className={styles.cartClose} onClick={onClose} aria-label="Cerrar carrito">
          ×
        </button>
      </div>

      {payment ? (
        <PaymentConfirmation payment={payment} onClose={onClose} />
      ) : items.length === 0 ? (
        <p className={styles.cartEmpty}>Tu carrito está vacío. ¡Agrega algo rico!</p>
      ) : (
        <>
          <ul className={styles.cartItems}>
            {items.map((item) => (
              <li className={styles.cartItem} key={item.id}>
                <img src={item.image} alt={item.name} />

                <div className={styles.cartItemInfo}>
                  <span className={styles.cartItemName}>{item.name}</span>
                  {item.options && <span className={styles.cartOptions}>{item.options}</span>}
                  <span className={styles.cartItemPrice}>{formatPrice(item.price)} c/u</span>

                  <div className={styles.qtyControls}>
                    <button
                      type="button"
                      onClick={() => onDecrease(item.id)}
                      aria-label={`Quitar uno de ${item.name}`}
                    >
                      −
                    </button>
                    <QuantityInput quantity={item.qty} name={item.name} onChange={qty => onQuantityChange(item.id, qty)} />
                    <button
                      type="button"
                      onClick={() => onIncrease(item.id)}
                      disabled={item.qty >= 99}
                      aria-label={`Agregar uno de ${item.name}`}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      className={styles.cartRemove}
                      onClick={() => onRemove(item.id)}
                    >
                      Quitar
                    </button>
                  </div>
                </div>

                <strong className={styles.cartItemSubtotal}>
                  {formatPrice(item.price * item.qty)}
                </strong>
              </li>
            ))}
          </ul>

          <div className={styles.cartPanelFooter}>
            <div className={styles.cartTotal}>
              <span>Total</span>
              <strong>{formatPrice(total)}</strong>
            </div>
            <button type="button" className={`btn-primary ${styles.cartPay}`} onClick={onPay}>
              <span uk-icon="icon: credit-card" aria-hidden="true" />
              Pagar
            </button>
            <button type="button" className={styles.cartClear} onClick={onClear}>
              Vaciar carrito
            </button>
          </div>
        </>
      )}
    </div>
  );
}
