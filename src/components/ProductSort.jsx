import { sortOptions } from '../data/productSort.js';
import styles from './ProductSort.module.css';

export default function ProductSort({ value, onChange }) {
  return (
    <label className={styles.sort}>
      <span>Ordenar</span>
      <select className="uk-select" aria-label="Ordenar productos" value={value} onChange={event => onChange(event.target.value)}>
        {sortOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  );
}
