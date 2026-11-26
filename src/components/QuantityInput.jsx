import { useState } from 'react';
import styles from './QuantityInput.module.css';

export default function QuantityInput({ quantity, name, onChange }) {
  const [draft, setDraft] = useState(null);

  const handleChange = (event) => {
    const value = event.target.value;
    if (!/^\d{0,2}$/.test(value)) return;
    setDraft(value);
    const number = Number(value);
    if (/^\d+$/.test(value) && Number.isSafeInteger(number) && number >= 1) {
      onChange(number);
    }
  };

  return (
    <input
      className={styles.input}
      type="text"
      inputMode="numeric"
      pattern="[0-9]+"
      maxLength={2}
      title="Cantidad entre 1 y 99"
      aria-label={`Cantidad de ${name}`}
      value={draft ?? quantity}
      onChange={handleChange}
      onFocus={event => event.target.select()}
      onBlur={() => {
        if (draft !== null && draft !== '') onChange(Math.max(1, Math.min(99, Number(draft))));
        setDraft(null);
      }}
      onKeyDown={event => {
        if (event.key === 'Enter') {
          event.preventDefault();
          event.currentTarget.blur();
        }
      }}
    />
  );
}
