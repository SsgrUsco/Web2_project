import { useState } from 'react';
import styles from './QuantityInput.module.css';

export default function QuantityInput({ quantity, name, onChange }) {
  const [draft, setDraft] = useState(null);

  const handleChange = (event) => {
    const value = event.target.value;
    if (!/^\d{0,2}$/.test(value) || (value !== '' && Number(value) < 1)) return;
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
      onBlur={() => setDraft(null)}
      onKeyDown={event => {
        if (event.key.length === 1 && !/\d/.test(event.key) && !event.ctrlKey && !event.metaKey && !event.altKey) {
          event.preventDefault();
        }
        if (event.key === 'Enter') event.currentTarget.blur();
      }}
    />
  );
}
