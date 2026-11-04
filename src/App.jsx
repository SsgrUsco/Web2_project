import { useEffect, useState, useSyncExternalStore } from 'react';
import Shop from './components/Shop.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Categories from './components/Categories.jsx';
import Drinks from './components/Drinks.jsx';
import Combos from './components/Combos.jsx';
import Footer from './components/Footer.jsx';
import About from './components/About.jsx';

const subscribeToHash = (callback) => {
  window.addEventListener('hashchange', callback);
  return () => window.removeEventListener('hashchange', callback);
};
const getHash = () => window.location.hash;

export default function App() {
  const hash = useSyncExternalStore(subscribeToHash, getHash);
  const isShop = hash.startsWith('#/compras');
  const category = new URLSearchParams(hash.split('?')[1]).get('categoria') || 'Todos';
  const subcategory = new URLSearchParams(hash.split('?')[1]).get('subcategoria') || '';

  useEffect(() => {
    if (isShop) window.scrollTo({ top: 0, behavior: 'instant' });
    else document.getElementById(hash.slice(1) || 'inicio')?.scrollIntoView();
  }, [hash, isShop]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    if (!isCartOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsCartOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isCartOpen]);

  const addToCart = (product) => {
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

  const payCart = () => {
    if (cart.length === 0) return;

    // Compra de demostración: no se envían datos a una pasarela de pago.
    setPayment({
      total: cart.reduce((sum, item) => sum + item.price * item.qty, 0),
      count: cart.reduce((sum, item) => sum + item.qty, 0),
    });
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <>
      <Navbar
        isShop={isShop}
        cart={cart}
        cartCount={cartCount}
        isCartOpen={isCartOpen}
        onToggleCart={() => setIsCartOpen((open) => !open)}
        onIncrease={increaseQty}
        onQuantityChange={changeQty}
        onDecrease={decreaseQty}
        onRemove={removeFromCart}
        onClear={clearCart}
        onPay={payCart}
        payment={payment}
        onClose={() => setIsCartOpen(false)}
      />
      <main>
        {isShop ? <Shop category={category} subcategory={subcategory} onAdd={addToCart} onOpenCart={() => setIsCartOpen(true)} cartCount={cartCount} /> : <>
        <Hero />
        <Categories />
        <Drinks />
        <Combos onAdd={addToCart} />
        <About />
        </>}
      </main>
      <Footer />
    </>
  );
}
