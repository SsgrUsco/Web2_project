import { useState } from 'react';
import CheckoutSummary from './CheckoutSummary.jsx';
import PaymentConfirmation from './PaymentConfirmation.jsx';
import { business } from '../data/business.js';
import styles from './Checkout.module.css';

export default function Checkout({ items, payment, onConfirm, onQuantityChange, onRemove }) {
  const [delivery, setDelivery] = useState('pickup');
  const [method, setMethod] = useState('cash');
  const submit = event => {
    event.preventDefault();
    if (!items.length) return;
    onConfirm({ delivery, method });
  };

  return (
    <section className={styles.checkout} aria-labelledby="checkout-title">
      <div className="container">
        <header className={styles.heading}>
          <span className="eyebrow">A UN PASO DE TU ANTOJO</span>
          <h1 id="checkout-title">Finaliza tu pedido</h1>
          <p>Revisa tu selección y elige cómo quieres recibirla.</p>
        </header>
        {payment ? <div className={styles.result}><PaymentConfirmation payment={payment} onClose={() => { window.location.hash = '/compras'; }} /></div>
          : !items.length ? <div className={styles.result}><span uk-icon="icon: cart; ratio: 2" /><h2>Tu carrito está vacío</h2><p>Encuentra tu próximo favorito en nuestro menú.</p><a className="btn-primary" href="#/compras">Explorar el menú</a></div>
          : <div className={styles.layout}>
            <form id="checkout-form" className={`uk-form-stacked ${styles.form}`} onSubmit={submit}>
              <fieldset className={styles.section}>
                <legend><span>01</span> Tus datos</legend>
                <div className={styles.fields}>
                  <label>Nombre<input className="uk-input" name="firstName" autoComplete="given-name" placeholder="Tu nombre" maxLength={80} required pattern=".*\S.*" /></label>
                  <label>Apellido<input className="uk-input" name="lastName" autoComplete="family-name" placeholder="Tu apellido" maxLength={80} required pattern=".*\S.*" /></label>
                  <label>Teléfono<input className="uk-input" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="300 123 4567" maxLength={20} pattern="[+0-9 ()\-]{7,20}" required /></label>
                  <label>Correo electrónico<input className="uk-input" name="email" type="email" autoComplete="email" placeholder="nombre@correo.com" maxLength={254} required /></label>
                </div>
              </fieldset>
              <fieldset className={styles.section}>
                <legend><span>02</span> Entrega</legend>
                <div className={styles.choices}>
                  <label><input className="uk-radio" type="radio" name="delivery" value="pickup" checked={delivery === 'pickup'} onChange={() => setDelivery('pickup')} /> Recoger en el local</label>
                  <label><input className="uk-radio" type="radio" name="delivery" value="delivery" checked={delivery === 'delivery'} onChange={() => setDelivery('delivery')} /> A domicilio</label>
                </div>
                {delivery === 'pickup' ? <p className={styles.location}><span uk-icon="location" /> {business.address} · {business.city}</p> : <div className={styles.fields}>
                  <label>Ciudad<input className="uk-input" name="city" value="Neiva" readOnly /></label>
                  <label>Barrio<input className="uk-input" name="neighborhood" placeholder="Nombre de tu barrio" maxLength={100} required pattern=".*\S.*" /></label>
                  <label className={styles.full}>Dirección<input className="uk-input" name="address" autoComplete="street-address" placeholder="Calle, carrera, número, apartamento" maxLength={200} required pattern=".*\S.*" /></label>
                </div>}
                <label className={styles.notes}>Indicaciones adicionales <span>(opcional)</span><textarea className="uk-textarea" name="notes" placeholder="Una referencia para la entrega o una indicación para tu pedido" rows={3} maxLength={500} /></label>
              </fieldset>
              <fieldset className={styles.section}>
                <legend><span>03</span> Forma de pago</legend>
                <p className={styles.hint}>Paga al recibir tu pedido.</p>
                <div className={styles.choices}>
                  <label><input className="uk-radio" type="radio" name="method" checked={method === 'cash'} onChange={() => setMethod('cash')} /> Efectivo</label>
                  <label><input className="uk-radio" type="radio" name="method" checked={method === 'card'} onChange={() => setMethod('card')} /> Tarjeta al recibir</label>
                </div>
              </fieldset>
            </form>
            <CheckoutSummary items={items} delivery={delivery} onQuantityChange={onQuantityChange} onRemove={onRemove} />
          </div>}
      </div>
    </section>
  );
}
