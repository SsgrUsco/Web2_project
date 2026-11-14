import styles from './Footer.module.css';
import SocialLinks from './SocialLinks.jsx';
import BrandLogo from './BrandLogo.jsx';
import { business } from '../data/business.js';

export default function Footer() {
  return (
    <footer className={styles.footer} id="contacto">
      <div className={`container ${styles.footerGrid}`}>
        <BrandLogo large />

        <div>
          <h3>Enlaces</h3>
          <a href="#inicio">Inicio</a>
          <a href="#/compras">Menú</a>
          <a href="#/nosotros">Nosotros</a>
          <a href="#bebidas">Bebidas</a>
          <a href="#combos">Combos</a>
        </div>

        <div>
          <h3>Horario</h3>
          <p>{business.days}</p>
          <p>{business.hours}</p>
        </div>

        <div>
          <h3>Contacto</h3>
          <p>{business.city}</p>
          <p>{business.phone}</p>
          <p>{business.email}</p>
          <SocialLinks />
        </div>
      </div>

      <div className={styles.copyright}>
        © {new Date().getFullYear()} Burger Zone. Todos los derechos reservados.
      </div>
    </footer>
  );
}

