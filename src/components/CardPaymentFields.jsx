import styles from './Checkout.module.css';
import { useState } from 'react';
import { checkoutFieldError } from '../data/checkoutValidation.js';

function CardInput(props) {
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);
  const check = field => {
    const message = checkoutFieldError(field.name, field.value);
    field.setCustomValidity(message);
    setError(message);
  };
  return <>
    <input {...props} aria-invalid={Boolean(error)} aria-describedby={error ? `${props.name}-error` : undefined}
      onBlur={event => { setTouched(true); check(event.target); }}
      onInput={event => { if (touched) check(event.target); }} />
    {error && <span id={`${props.name}-error`} className="uk-text-danger uk-text-small" role="status">{error}</span>}
  </>;
}

// Interfaz preparada para sustituirla por campos seguros de la pasarela.
// No se guardan ni se envían datos de tarjeta desde este componente.
export default function CardPaymentFields() {
  return (
    <div>
      <div className={styles.fields}>
        <label className={styles.full}>Titular de la tarjeta
          <CardInput className="uk-input" name="cardholder" autoComplete="off" placeholder="Nombre como aparece en la tarjeta" maxLength={80} required />
        </label>
        <label className={styles.full}>Número de tarjeta
          <CardInput className="uk-input" name="cardNumber" inputMode="numeric" autoComplete="off" placeholder="0000 0000 0000 0000" maxLength={23} pattern="[0-9 ]{13,23}" required />
        </label>
        <label>Fecha de vencimiento
          <CardInput className="uk-input" name="cardExpiry" inputMode="numeric" autoComplete="off" placeholder="MM/AA" maxLength={5} pattern="(0[1-9]|1[0-2])/[0-9]{2}" title="Usa el formato MM/AA, por ejemplo 12/28." required />
        </label>
        <label>Código de seguridad
          <CardInput className="uk-input" name="cardSecurity" type="password" inputMode="numeric" autoComplete="off" placeholder="CVV" maxLength={4} pattern="[0-9]{3,4}" title="Ingresa los 3 o 4 dígitos del código de seguridad." required />
        </label>
      </div>
      <p className={styles.hint} id="card-payment-status">Pago en línea pendiente de habilitación. Usa solo datos de prueba.</p>
    </div>
  );
}
