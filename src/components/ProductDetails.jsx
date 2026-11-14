import { useRef, useState } from 'react';
import { gsap, useGSAP } from '../lib/motion.js';
import { formatPrice } from '../data/menu.js';
import { configureProduct, getProductOptions } from '../data/productOptions.js';
import styles from './ProductDetails.module.css';

export default function ProductDetails({ product, onAdd, onClose }) {
  const dialog = useRef(null);
  const [size, setSize] = useState(0);
  const [extras, setExtras] = useState([]);
  const [removed, setRemoved] = useState([]);
  const [limitReached, setLimitReached] = useState(false);
  const options = getProductOptions(product);
  const order = configureProduct(product, size, extras, removed);
  const toggle = (setter, name) => setter(current => current.includes(name) ? current.filter(value => value !== name) : [...current, name]);

  useGSAP(() => {
    const element = dialog.current;
    element.showModal();
    const media = gsap.matchMedia();
    media.add({ reduce: '(prefers-reduced-motion: reduce)', standard: '(prefers-reduced-motion: no-preference)' }, context => {
      gsap.from(element, {
        y: context.conditions.reduce ? 0 : 24,
        scale: context.conditions.reduce ? 1 : 0.96,
        opacity: 0,
        duration: 0.45,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
      });
    });
    return () => {
      media.revert();
      element.close();
    };
  }, { scope: dialog });

  return (
    <dialog ref={dialog} className={styles.dialog} aria-labelledby="product-title" onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => { if (event.target === dialog.current) onClose(); }}>
      <div className={styles.content}>
        <button className={styles.close} type="button" onClick={onClose} aria-label="Cerrar detalles" title="Cerrar"><span uk-icon="close" /></button>
        <img className={styles.image} src={product.image} alt={product.name} />
        <div className={styles.body}>
          <span className="eyebrow">{product.category}</span>
          <h2 id="product-title">{product.name}</h2>
          <p>{product.description}</p>
          {options.sizes.length > 1 && <fieldset><legend>Tamaño</legend>{options.sizes.map((option, index) => <label key={option.name}><input className="uk-radio" type="radio" name="size" checked={size === index} onChange={() => setSize(index)} /><span>{option.name}</span><strong>{option.price ? `+ ${formatPrice(option.price)}` : 'Incluido'}</strong></label>)}</fieldset>}
          {options.extras.length > 0 && <fieldset><legend>Agrega extras</legend>{options.extras.map(extra => <label key={extra.name}><input className="uk-checkbox" type="checkbox" checked={extras.includes(extra.name)} onChange={() => toggle(setExtras, extra.name)} /><span>{extra.name}</span><strong>+ {formatPrice(extra.price)}</strong></label>)}</fieldset>}
          {options.removable.length > 0 && <fieldset><legend>¿Lo prefieres sin algo?</legend>{options.removable.map(name => <label key={name}><input className="uk-checkbox" type="checkbox" checked={removed.includes(name)} onChange={() => toggle(setRemoved, name)} /><span>Sin {name.toLowerCase()}</span></label>)}</fieldset>}
          {limitReached && <p role="alert">Ya tienes 99 unidades de esta combinación en el carrito.</p>}
          <button className={`btn-primary ${styles.add}`} type="button" onClick={() => { if (onAdd(order) !== false) onClose(); else setLimitReached(true); }}><span uk-icon="cart" /> Agregar · {formatPrice(order.price)}</button>
        </div>
      </div>
    </dialog>
  );
}
