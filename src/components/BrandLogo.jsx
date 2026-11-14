import styles from './BrandLogo.module.css';

export default function BrandLogo({ large = false }) {
  return (
    <a href="#inicio" className={`${styles.logo} ${large ? styles.large : ''}`} aria-label="Burger Zone, inicio">
      <img src="/images/burger-zone-logo-transparent.png" alt="Burger Zone" width="2172" height="724" />
    </a>
  );
}
