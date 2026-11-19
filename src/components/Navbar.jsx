import { useRef } from 'react';
import CartPanel from './CartPanel.jsx';
import BrandLogo from './BrandLogo.jsx';
import styles from './Navbar.module.css';

export default function Navbar({
  isShop,
  isAbout,
  isContact,
  isCheckout,
  cart,
  cartCount,
  isCartOpen,
  onToggleCart,
  onIncrease,
  onQuantityChange,
  onDecrease,
  onRemove,
  onClear,
  onPay,
  payment,
  onClose,
}) {
  const cartButtonRef = useRef(null);

  const closeCart = () => {
    onClose();
    cartButtonRef.current?.focus();
  };

  return (
    <nav className={styles.navbar}>
      <BrandLogo />

      <div className={styles.navLinks}>
        <a className={!isShop && !isAbout && !isCheckout && !isContact ? styles.active : undefined} aria-current={!isShop && !isAbout && !isCheckout && !isContact ? 'page' : undefined} href="#inicio">Inicio</a>
        <a className={isAbout ? styles.active : undefined} aria-current={isAbout ? 'page' : undefined} href="#/nosotros">Nosotros</a>
        <a className={isContact ? styles.active : undefined} aria-current={isContact ? 'page' : undefined} href="#/contacto">Contacto</a>
        <a className={isShop ? styles.active : undefined} aria-current={isShop ? 'page' : undefined} href="#/compras">Menú</a>
      </div>

      <div className={styles.cartDropdown}>
        <button
          ref={cartButtonRef}
          type="button"
          className={styles.cartLink}
          aria-label="Carrito de compras"
          aria-expanded={isCartOpen}
          aria-controls="carrito-panel"
          onClick={onToggleCart}
        >
          <span uk-icon="icon: cart; ratio: 1.3"></span>
          <span className={styles.cartCount} aria-live="polite">{cartCount}</span>
        </button>

        {isCartOpen && (
          <CartPanel
            items={cart}
            onIncrease={onIncrease}
            onQuantityChange={onQuantityChange}
            onDecrease={onDecrease}
            onRemove={onRemove}
            onClear={onClear}
            onPay={onPay}
            payment={payment}
            onClose={closeCart}
          />
        )}
      </div>
    </nav>
  );
}


