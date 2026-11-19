import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';
import AddNotice from './components/AddNotice.jsx';
import Shop from './components/Shop.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Categories from './components/Categories.jsx';
import Drinks from './components/Drinks.jsx';
import Combos from './components/Combos.jsx';
import Footer from './components/Footer.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Chatbot from './components/Chatbot.jsx';
import Checkout from './components/Checkout.jsx';

import useCatalog from './hooks/useCatalog.js';

const subscribeToHash = (callback) => {
  window.addEventListener('hashchange', callback);
  return () => window.removeEventListener('hashchange', callback);
};
const getHash = () => window.location.hash;

export default function App() {
  const catalogState = useCatalog();
  const hash = useSyncExternalStore(subscribeToHash, getHash);
  const isShop = hash.startsWith('#/compras');
  const isContact = ['#/contacto', '#contacto'].includes(hash);
  const isCheckout = hash === '#/checkout';
  const isAbout = ['#/nosotros', '#nosotros'].includes(hash);
  const category = new URLSearchParams(hash.split('?')[1]).get('categoria') || 'Hamburguesas';
  const subcategory = new URLSearchParams(hash.split('?')[1]).get('subcategoria') || '';

  useEffect(() => {
    if (isShop || isAbout || isCheckout || isContact) window.scrollTo({ top: 0, behavior: 'instant' });
    else document.getElementById(hash.slice(1) || 'inicio')?.scrollIntoView();
  }, [hash, isShop, isAbout, isCheckout, isContact]);
  const [cart, setCart] = useState([]);
  const [sortOrder, setSortOrder] = useState('category');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [payment, setPayment] = useState(null);
  const [notice, setNotice] = useState(null);
  const dismissNotice = useCallback(() => setNotice(null), []);

  useEffect(() => {
    if (!isCartOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsCartOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isCartOpen]);

  const addToCart = (product) => {
    if (cart.some(item => item.id === product.id && item.qty >= 99)) {
      setNotice({ message: 'Ya tienes el máximo de 99 unidades de este producto.' });
      return false;
    }
    setNotice({ message: `${product.name} agregado al carrito` });
    setPayment(null);
    setCart((current) => {
      const exists = current.some((item) => item.id === product.id);

      if (exists) {
        return current.map((item) =>
          item.id === product.id ? { ...item, qty: Math.min(99, item.qty + 1) } : item,
        );
      }

      return [
        ...current,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          options: product.options || '',
          qty: 1,
        },
      ];
    });
  };

  const increaseQty = (id) => {
    setCart((current) =>
      current.map((item) =>
        item.id === id ? { ...item, qty: Math.min(99, item.qty + 1) } : item,
      ),
    );
  };

  const decreaseQty = (id) => {
    setCart((current) =>
      current.flatMap((item) => {
        if (item.id !== id) return [item];
        return item.qty > 1 ? [{ ...item, qty: item.qty - 1 }] : [];
      }),
    );
  };

  const removeFromCart = (id) => {
    setCart((current) => current.filter((item) => item.id !== id));
  };

  const changeQty = (id, qty) => {
    if (!Number.isSafeInteger(qty) || qty < 1 || qty > 99) return;
    setCart(current => current.map(item => item.id === id ? { ...item, qty } : item));
  };

  const clearCart = () => setCart([]);

  const payCart = ({ delivery, method }) => {
    if (cart.length === 0) return;

    // Compra de demostración: no se envían datos a una pasarela de pago.
    setPayment({
      total: cart.reduce((sum, item) => sum + item.price * item.qty, 0),
      count: cart.reduce((sum, item) => sum + item.qty, 0),
      delivery,
      method,
    });
    setCart([]);
    setIsCartOpen(false);
  };

  const openCheckout = () => {
    setIsCartOpen(false);
    window.location.hash = '/checkout';
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <>
      {notice && <AddNotice notice={notice} onDismiss={dismissNotice} />}
      <Navbar
        isShop={isShop}
        isAbout={isAbout} isContact={isContact}
        isCheckout={isCheckout}
        cart={cart}
        cartCount={cartCount}
        isCartOpen={isCartOpen}
        onToggleCart={() => setIsCartOpen((open) => !open)}
        onIncrease={increaseQty}
        onQuantityChange={changeQty}
        onDecrease={decreaseQty}
        onRemove={removeFromCart}
        onClear={clearCart}
        onPay={openCheckout}
        payment={payment}
        onClose={() => setIsCartOpen(false)}
      />
      <main>
        {isContact ? <Contact /> : isCheckout ? <Checkout items={cart} payment={payment} onConfirm={payCart} onQuantityChange={changeQty} onRemove={removeFromCart} /> : isAbout ? <About /> : isShop ? <Shop key={`${category}:${subcategory}`} category={category} subcategory={subcategory} onAdd={addToCart} catalogState={catalogState} sortOrder={sortOrder} onSortChange={setSortOrder} /> : <>
        <Hero />
        <Categories />
        <Drinks />
        <Combos onAdd={addToCart} catalogState={catalogState} />

        </>}
      </main>
      <Footer />
      <Chatbot cart={cart} onOpenCart={() => setIsCartOpen(true)} catalogState={catalogState} />
    </>
  );
}


