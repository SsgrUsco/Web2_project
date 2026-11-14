import styles from './CatalogStatus.module.css';

export default function CatalogStatus({ status, onRetry }) {
  if (status === 'ready') return null;
  return (
    <div className={styles.status} role={status === 'error' ? 'alert' : 'status'}>
      {status === 'loading' ? <><span uk-spinner="ratio: 0.8" aria-hidden="true" /><p>Cargando productos…</p></>
        : <><p>No pudimos cargar los productos. Revisa tu conexión e inténtalo de nuevo.</p><button type="button" className="btn-primary" onClick={onRetry}>Reintentar <span uk-icon="refresh" aria-hidden="true" /></button></>}
    </div>
  );
}
