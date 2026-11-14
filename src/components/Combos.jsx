import { useEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProductCard from './ProductCard.jsx';
import ProductDetails from './ProductDetails.jsx';
import styles from './Combos.module.css';
import CatalogStatus from './CatalogStatus.jsx';
import useReveal from '../hooks/useReveal.js';

export default function Combos({ onAdd, catalogState }) {
  const heading = useReveal();
  const { products, status, retry } = catalogState;
  const combos = products.filter(product => product.category === 'Combos');
  const [productDetails, setProductDetails] = useState(null);
  useEffect(() => {
    // El catálogo remoto cambia la altura de la sección y desplaza Sobre nosotros.
    ScrollTrigger.refresh();
  }, [combos.length]);
  return (
    <section className={styles.combosSection} id="combos">
      <div className="container">
        <div ref={heading} data-reveal className={styles.combosHeading}>
          <div>
            {/* .eyebrow es global: lo comparte con Hero */}
            <span className="eyebrow">PARA COMPARTIR</span>
            <h2>
              COMBOS <em>ESPECIALES</em>
            </h2>
          </div>
        </div>

        <CatalogStatus status={status} onRetry={retry} />
        {status === 'ready' && combos.length === 0 && <p>No hay combos disponibles en este momento.</p>}
        {/* .product-grid es global: lo comparte con Favoritos */}
        <div className="product-grid">
          {combos.map((combo, index) => (
            <ProductCard
              key={combo.id}
              product={combo}
              entranceOrder={index % 4}
              onAdd={onAdd}
              onDetails={setProductDetails}
            />
          ))}
        </div>
        {productDetails && <ProductDetails key={productDetails.id} product={productDetails} onAdd={onAdd} onClose={() => setProductDetails(null)} />}
      </div>
    </section>
  );
}
