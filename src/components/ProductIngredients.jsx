import styles from './ProductIngredients.module.css';

export default function ProductIngredients({ description, className = '' }) {
  const ingredients = (description || '')
    .replace(/\.?\s+Incluye\s+/gi, '\n')
    .replace(/\s+en pan de\s+/gi, '\nPan de ')
    .replace(/,?\s+acompañad[ao]s? de\s+/gi, '\n')
    .replace(/,?\s+preparad[ao]s? (?:con|en)\s+/gi, '\n')
    .replace(/,?\s+con\s+/gi, '\n')
    .split(/\n|,\s*|\s+y\s+/)
    .map(item => item.trim().replace(/\.$/, ''))
    .filter(Boolean);

  return <ul className={`uk-list ${styles.ingredients} ${className}`}>
    {ingredients.map((item, index) => <li key={`${index}-${item}`}>{item.charAt(0).toUpperCase() + item.slice(1)}</li>)}
  </ul>;
}
